(function () {
  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
    );
  }

  const cfg = window.CS_SUPABASE;
  let enabled = false;
  let started = false;
  let client = null;
  let session = null;
  let profile = null;
  let lastError = "";
  const listeners = [];
  let resolveReady = function () {};
  const ready = new Promise((resolve) => {
    resolveReady = resolve;
  });

  function canStart() {
    return !!(
      cfg &&
      typeof cfg.url === "string" &&
      /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(cfg.url) &&
      typeof cfg.anonKey === "string" &&
      cfg.anonKey.length > 20 &&
      cfg.anonKey !== "YOUR_ANON_KEY" &&
      window.supabase &&
      typeof window.supabase.createClient === "function"
    );
  }

  async function loadProfile() {
    profile = null;
    if (!client || !session) return;
    const { data, error } = await client
      .from("profiles")
      .select("id,email,display_name,role")
      .eq("id", session.user.id)
      .maybeSingle();
    if (error) {
      lastError = "לא נטען הפרופיל.";
      return;
    }
    profile = data;
    lastError = "";
  }

  function emit(event) {
    listeners.forEach((fn) => {
      try {
        fn(event);
      } catch (err) {
        /* המאזין מטפל בעצמו */
      }
    });
  }

  async function init() {
    try {
      if (!client) return;
      const { data, error } = await client.auth.getSession();
      if (error) lastError = "ההתחברות לא נטענה.";
      session = data && data.session ? data.session : null;
      if (session) await loadProfile();
      client.auth.onAuthStateChange((event, next) => {
        if (event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED") return;
        session = next;
        setTimeout(() => {
          loadProfile().then(() => emit(event));
        }, 0);
      });
    } finally {
      resolveReady();
    }
  }

  function start() {
    if (started) return ready;
    started = true;
    if (!canStart()) {
      resolveReady();
      return ready;
    }
    try {
      enabled = true;
      client = window.supabase.createClient(cfg.url, cfg.anonKey, {
        auth: {
          flowType: "pkce",
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
      init();
    } catch (err) {
      enabled = false;
      client = null;
      resolveReady();
    }
    return ready;
  }

  function displayName() {
    if (profile && profile.display_name) return profile.display_name;
    if (profile && profile.email) return profile.email;
    if (session && session.user && session.user.email) return session.user.email;
    return "חשבון";
  }

  function controlsHtml() {
    if (!enabled) return "";
    if (!session) {
      return `<button type="button" class="ghost-btn account-btn" data-auth-in>התחברות עם Google</button>`;
    }
    const admin = profile && profile.role === "admin";
    return `<a class="ghost-btn account-link" href="#/me">${esc(displayName())}</a>
      ${admin ? `<a class="ghost-btn account-link" href="#/admin">ניהול</a>` : ""}
      <button type="button" class="ghost-btn account-btn" data-auth-out>יציאה</button>`;
  }

  window.CSAuth = {
    enabled: function () {
      return enabled;
    },
    ready: ready,
    client: function () {
      return client;
    },
    user: function () {
      return session ? session.user : null;
    },
    profile: function () {
      return profile;
    },
    isAdmin: function () {
      return !!(profile && profile.role === "admin");
    },
    displayName: displayName,
    lastError: function () {
      return lastError;
    },
    controlsHtml: controlsHtml,
    signIn: function () {
      if (!client) return Promise.reject(new Error("auth disabled"));
      return client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: location.origin + location.pathname,
          queryParams: { prompt: "select_account" },
        },
      });
    },
    signOut: function () {
      if (!client) return Promise.resolve();
      return client.auth.signOut();
    },
    start: start,
    onChange: function (fn) {
      listeners.push(fn);
    },
  };
})();
