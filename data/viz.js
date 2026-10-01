function vizBox(title, inner) {
  return `<aside class="viz" aria-label="${title}">
    <p class="viz-kicker">המחשה</p>
    <h3>${title}</h3>
    ${inner}
  </aside>`;
}

window.VIZ = {
  cia() {
    return vizBox(
      "משולש CIA (Confidentiality, Integrity, Availability)",
      `<div class="cia-stage" data-cia-stage>
        <div class="cia-tri">
          <button type="button" class="cia-node" data-viz="cia" data-viz-k="c">סודיות<br><span dir="ltr">C</span></button>
          <button type="button" class="cia-node" data-viz="cia" data-viz-k="i">שלמות<br><span dir="ltr">I</span></button>
          <button type="button" class="cia-node" data-viz="cia" data-viz-k="a">זמינות<br><span dir="ltr">A</span></button>
        </div>
        <div class="layer-side">
          <figure class="side-draw" data-side="c" hidden>
            <p class="side-kicker">סודיות · מעטפה חתומה</p>
            <svg class="draw-svg" viewBox="0 0 220 150" role="img" aria-label="מעטפה עם חותם שעווה">
              <rect class="paper" x="28" y="46" width="164" height="86" rx="6"/>
              <path class="ink-line" d="M28 46 L110 96 L192 46"/>
              <path class="flap" d="M28 46 L110 18 L192 46 L110 90 Z"/>
              <g class="seal">
                <circle cx="110" cy="78" r="16"/>
                <path d="M110 68 v20 M102 78 h16"/>
              </g>
            </svg>
            <figcaption>הסוד נשאר במעטפה. החותם אומר שרק מי שרשאי פותח.</figcaption>
          </figure>
          <figure class="side-draw" data-side="i" hidden>
            <p class="side-kicker">שלמות · מסמך חתום</p>
            <svg class="draw-svg" viewBox="0 0 240 150" role="img" aria-label="מסמך עם חותם ועט שנעצר">
              <rect class="paper" x="28" y="22" width="110" height="112" rx="4"/>
              <path class="ink-line" d="M44 48 h78 M44 66 h78 M44 84 h52"/>
              <text class="doc-num" x="48" y="112">100</text>
              <circle class="seal small-seal" cx="112" cy="108" r="12"/>
              <g class="pen">
                <path d="M168 96 l46 14 l-8 10 l-46-14 z"/>
                <path d="M206 104 l10 8"/>
              </g>
            </svg>
            <figcaption>המספר חתום. העט מגיע ולא משנה אותו.</figcaption>
          </figure>
          <figure class="side-draw" data-side="a" hidden>
            <p class="side-kicker">זמינות · הדלת מתמלאת</p>
            <div class="avail-frame">
              <svg class="draw-svg" viewBox="0 0 240 150" role="img" aria-label="דלת ותור שנעצר בקו">
                <rect class="door-leaf" x="28" y="22" width="70" height="110" rx="4"/>
                <circle cx="84" cy="80" r="3" class="knob"/>
                <path class="queue-line" d="M118 132 H220"/>
                <g class="q q1"><circle cx="132" cy="108" r="10"/><path d="M132 118 v16"/></g>
                <g class="q q2"><circle cx="160" cy="108" r="10"/><path d="M160 118 v16"/></g>
                <g class="q q3"><circle cx="188" cy="108" r="10"/><path d="M188 118 v16"/></g>
                <g class="q q4"><circle cx="214" cy="78" r="10"/><path d="M214 88 v16"/></g>
              </svg>
              <span class="full-sign">מלא</span>
            </div>
            <figcaption>השירות עומד. כשהתור עובר את הקו — הדלת כבר לא פנויה.</figcaption>
          </figure>
        </div>
      </div>
      <p class="viz-fb muted" data-viz-fb="cia">לחצו על קודקוד: מה נשבר, ודוגמה מהכספומט / השרת.</p>`
    );
  },
  layers() {
    return vizBox(
      "שכבות הגנה (Defense in depth)",
      `<div class="layer-stage" data-layer-stage>
        <div class="layer-stack">
          <button type="button" class="layer-row" data-viz="layers" data-viz-k="d">
            <svg class="layer-ico" viewBox="0 0 64 48" aria-hidden="true">
              <rect class="ink-line" x="8" y="6" width="48" height="36"/>
              <path class="ink-line" d="M8 16 h48 M8 32 h48"/>
              <text class="ico-mark" x="14" y="28">+</text>
            </svg>
            <span>תכנון (Design)<small>מי רשאי, מה מוסתר</small></span>
          </button>
          <button type="button" class="layer-row" data-viz="layers" data-viz-k="i">
            <svg class="layer-ico" viewBox="0 0 64 48" aria-hidden="true">
              <rect class="cell" x="4" y="14" width="10" height="16"/>
              <rect class="cell" x="16" y="14" width="10" height="16"/>
              <rect class="cell" x="28" y="14" width="10" height="16"/>
              <rect class="cell" x="40" y="14" width="10" height="16"/>
              <path class="gate-line" d="M54 8 v32"/>
            </svg>
            <span>מימוש (Implementation)<small>גבול וטיפוס</small></span>
          </button>
          <button type="button" class="layer-row" data-viz="layers" data-viz-k="o">
            <svg class="layer-ico" viewBox="0 0 64 48" aria-hidden="true">
              <rect class="ink-line" x="14" y="16" width="22" height="16" rx="2"/>
              <path class="ink-line" d="M20 16 v-5 a6 6 0 0 1 12 0 v5"/>
              <circle class="eye-ico" cx="48" cy="24" r="8"/>
              <circle cx="48" cy="24" r="2.5" class="pupil"/>
            </svg>
            <span>הפעלה (Operations)<small>עדכון, הרשאה, ניטור</small></span>
          </button>
        </div>
        <div class="layer-side">
          <figure class="side-draw" data-side="d" hidden>
            <p class="side-kicker">תכנון · תרשים מחלקה (UML)</p>
            <svg class="draw-svg uml-svg" viewBox="0 0 280 228" role="img" aria-label="תיבת מחלקה עם טיפוס ונראות">
              <rect class="uml-frame" x="12" y="8" width="256" height="212"/>
              <path class="uml-rule" d="M12 44 H268 M12 132 H268"/>
              <text class="uml-title" x="140" y="32" text-anchor="middle">Ride</text>
              <text class="uml-mem mark-priv" x="24" y="68">- seats : int</text>
              <text class="uml-mem mark-priv" x="24" y="90">- route : Route</text>
              <text class="uml-mem mark-prot" x="24" y="112"># status : string</text>
              <text class="uml-mem mark-pub" x="24" y="160">+ setSeats(n : int) : void</text>
              <text class="uml-mem mark-pub" x="24" y="184">+ book() : void</text>
            </svg>
            <ul class="mark-legend">
              <li><bdi class="latn" dir="ltr">+ public</bdi> ציבורי</li>
              <li><bdi class="latn" dir="ltr">- private</bdi> פרטי</li>
              <li><bdi class="latn" dir="ltr"># protected</bdi> מוגן</li>
            </ul>
            <figcaption>ציבורי לכולם, פרטי רק למחלקה, מוגן גם ליורשות. <bdi dir="ltr">setSeats()</bdi> בודק טווח במקום לכתוב ל־<bdi dir="ltr">seats</bdi> מבחוץ.</figcaption>
          </figure>
          <figure class="side-draw" data-side="i" hidden>
            <p class="side-kicker">מימוש · שער על הגבול</p>
            <svg class="draw-svg" viewBox="0 0 300 160" role="img" aria-label="ארבעה תאים ושער שעוצר בית חמישי">
              <text class="size-label" x="112" y="28" text-anchor="middle">size = 4</text>
              <path class="ink-line" d="M16 40 H214 V124 H16 Z"/>
              <rect class="cell" x="28" y="58" width="40" height="40" rx="4"/>
              <rect class="cell" x="74" y="58" width="40" height="40" rx="4"/>
              <rect class="cell" x="120" y="58" width="40" height="40" rx="4"/>
              <rect class="cell" x="166" y="58" width="40" height="40" rx="4"/>
              <path class="gate-line" d="M214 46 V118"/>
              <g class="extra-byte">
                <rect x="236" y="58" width="40" height="40" rx="4"/>
              </g>
            </svg>
            <figcaption>ארבעה מקומות כתובים מראש. הבית החמישי מגיע לשער ונעצר.</figcaption>
          </figure>
          <figure class="side-draw" data-side="o" hidden>
            <p class="side-kicker">הפעלה · נוהל, לא שורת קוד</p>
            <svg class="draw-svg" viewBox="0 0 300 150" role="img" aria-label="מסך נעול, לוח עדכון ועין">
              <rect class="paper" x="16" y="28" width="78" height="58" rx="4"/>
              <rect class="lock-body" x="42" y="58" width="26" height="18" rx="2"/>
              <path class="shackle" d="M48 58 v-8 a7 7 0 0 1 14 0 v8"/>
              <rect class="paper" x="112" y="22" width="70" height="86" rx="4"/>
              <path class="ink-line" d="M112 42 H182"/>
              <path class="ops-check" d="M132 70 l10 10 l18-22"/>
              <ellipse class="eye-shape" cx="244" cy="70" rx="34" ry="18"/>
              <circle class="pupil" cx="244" cy="70" r="7"/>
            </svg>
            <figcaption class="lane-cap" dir="ltr"><span dir="rtl">מסך נעול</span><span dir="rtl">עדכון</span><span dir="rtl">ניטור</span></figcaption>
            <figcaption>חשבון חזק מדי, בלי עדכון ובלי מי שמסתכל — זו שכבת ההפעלה.</figcaption>
          </figure>
        </div>
      </div>
      <p class="viz-fb muted" data-viz-fb="layers">שכבה אחת שנשברת לא אמורה להפיל את הכל. לחצו על שכבה.</p>`
    );
  },
  trust() {
    return vizBox(
      "שרשרת אמון (Trust chain)",
      `<figure class="trust-draw" data-trust-draw>
        <svg class="draw-svg" viewBox="0 0 320 150" role="img" aria-label="שלוש חוליות, A מימין ו-C משמאל, וקו גבול מקווקו">
          <path class="chain-link" d="M270 74 H170"/>
          <path class="chain-link" d="M170 74 H50"/>
          <path class="fence" d="M110 28 V122"/>
          <g class="medallion">
            <circle cx="270" cy="74" r="28"/>
            <text x="270" y="80" text-anchor="middle">A</text>
          </g>
          <g class="medallion">
            <circle cx="170" cy="74" r="28"/>
            <text x="170" y="80" text-anchor="middle">B</text>
          </g>
          <g class="medallion">
            <circle cx="50" cy="74" r="28"/>
            <text x="50" y="80" text-anchor="middle">C</text>
          </g>
          <path class="chain-crack" d="M34 58 l10 14 l-6 4 l14 16"/>
          <circle class="pulse" cy="74" r="6">
            <animate attributeName="cx" from="270" to="50" dur="1.15s" begin="indefinite" fill="freeze"/>
          </circle>
        </svg>
        <figcaption class="lane-cap" dir="ltr">
          <span><bdi dir="ltr">C</bdi> <bdi dir="rtl">נתונים</bdi></span>
          <span dir="rtl">גבול אמון</span>
          <span><bdi dir="ltr">A</bdi> <bdi dir="rtl">קלט</bdi></span>
        </figcaption>
      </figure>
      <button type="button" class="primary" data-viz="trust-play">הדליקו את השרשרת</button>
      <p class="viz-fb muted" data-viz-fb="trust">A סומך על B, B על C. חוליה חלשה אחת שוברת את כולם.</p>`
    );
  },
  threat() {
    return vizBox(
      "עץ איומים (Threat tree)",
      `<figure class="threat-draw">
        <svg class="draw-svg wide threat-svg" viewBox="0 0 520 250" role="img" aria-label="שורש מחובר בשלושה קווים לעיגול, למלבן ולעיגול">
          <path class="twires" d="M260 58 V86 H80 V118 M260 86 V128 M260 86 H440 V118"/>
          <g class="t-node" tabindex="0" role="button" data-viz="threat" data-viz-k="root" aria-pressed="false">
            <rect x="165" y="8" width="190" height="50"/>
            <text x="260" y="39" text-anchor="middle" direction="rtl">גניבת תשלום</text>
          </g>
          <g class="t-node" tabindex="0" role="button" data-viz="threat" data-viz-k="enc" aria-pressed="false">
            <circle cx="80" cy="170" r="52"/>
            <text x="80" y="164" text-anchor="middle" direction="rtl">ערוץ</text>
            <text x="80" y="186" text-anchor="middle" direction="rtl">מוצפן</text>
          </g>
          <g class="t-node" tabindex="0" role="button" data-viz="threat" data-viz-k="auth" aria-pressed="false">
            <rect x="175" y="128" width="170" height="52"/>
            <text x="260" y="160" text-anchor="middle" direction="rtl">הרשאת יתר</text>
          </g>
          <g class="t-node" tabindex="0" role="button" data-viz="threat" data-viz-k="lib" aria-pressed="false">
            <circle cx="440" cy="170" r="52"/>
            <text x="440" y="164" text-anchor="middle" direction="rtl">עדכון</text>
            <text x="440" y="186" text-anchor="middle" direction="rtl">ספרייה</text>
          </g>
        </svg>
        <ul class="mark-legend">
          <li><span class="swatch round" aria-hidden="true"></span> עיגול — עלה שכבר יש לו אפחות</li>
          <li><span class="swatch box" aria-hidden="true"></span> מלבן — בעיה שטרם טופלה</li>
        </ul>
      </figure>
      <p class="viz-fb muted" data-viz-fb="tree">השורש הוא המטרה. לחצו על עלה: עיגול סגור, מלבן עדיין פתוח.</p>`
    );
  },
  ptr() {
    return vizBox(
      "מצביע (Pointer): כתובת, לא הבית עצמו",
      `<div class="ptr-scene">
        <div class="ptr-house" data-ptr-house>
          <span class="ptr-roof"></span>
          <span class="ptr-body">x = 7</span>
        </div>
        <div class="ptr-mail" data-ptr-mail>
          <p dir="ltr">p</p>
          <p class="muted">כתובת של x</p>
        </div>
      </div>
      <div class="lab-actions">
        <button type="button" class="primary" data-viz="ptr" data-viz-k="addr">&amp;x — כתובת</button>
        <button type="button" class="primary" data-viz="ptr" data-viz-k="deref">*p — תוכן</button>
        <button type="button" class="primary" data-viz="ptr" data-viz-k="null">nullptr</button>
      </div>
      <p class="viz-fb muted" data-viz-fb="ptr">המכתב אומר איפה הבית. לפתוח מכתב ריק (nullptr) אסור.</p>`
    );
  },
  plates() {
    return vizBox(
      "מחסנית קריאות (Call stack) — צלחות",
      `<div class="plate-rack" data-plate-rack>
        <div class="plate" data-plate="2">main</div>
        <div class="plate" data-plate="1">foo</div>
        <div class="plate on-top" data-plate="0">bar · מסגרת עליונה</div>
      </div>
      <div class="lab-actions">
        <button type="button" class="primary" data-viz="plates" data-viz-k="push">קריאה (push)</button>
        <button type="button" class="primary" data-viz="plates" data-viz-k="pop">חזרה (pop)</button>
      </div>
      <p class="viz-fb muted" data-viz-fb="plates">נכנסים מלמעלה, יוצאים מלמעלה (LIFO). זו לא המחלקה Stack מיחידה 2.</p>`
    );
  },
  canary() {
    return vizBox(
      "מחסנית עם קנרית (Stack canary)",
      `<figure class="stack-scene" data-canary-stack>
        <svg class="draw-svg stack-svg" viewBox="0 0 220 340" role="img" aria-label="ערימת צלחות עם ציפור קנרית בין החוצץ לכתובת החזרה">
          <defs>
            <clipPath id="canaryClip">
              <rect x="46" y="18" width="108" height="250" rx="16"/>
            </clipPath>
          </defs>
          <g clip-path="url(#canaryClip)">
            <rect class="stack-water" x="46" y="22" width="108" height="8"/>
          </g>
          <g class="slab">
            <rect x="50" y="28" width="100" height="36" rx="10"/>
          </g>
          <g class="slab gold">
            <rect x="50" y="78" width="100" height="40" rx="10"/>
          </g>
          <g class="bird">
            <ellipse cx="118" cy="96" rx="16" ry="11"/>
            <circle cx="126" cy="93" r="1.7" class="eye"/>
            <path d="M132 96 l8 2.5 l-8 3 z"/>
            <path class="wing" d="M110 98 q-14 6 -6 12 q8-2 10-6 z"/>
          </g>
          <path class="crack" d="M78 86 l10 12 l-6 4 l12 14"/>
          <g class="slab">
            <rect x="50" y="132" width="100" height="34" rx="10"/>
          </g>
          <g class="slab ret-slab">
            <rect x="50" y="180" width="100" height="34" rx="10"/>
          </g>
          <g class="check">
            <circle cx="152" cy="197" r="11"/>
            <path d="M146 197 l4 4 l8-9"/>
          </g>
          <g class="stop">
            <circle cx="152" cy="197" r="11"/>
            <path d="M146 191 l12 12 M158 191 l-12 12"/>
          </g>
          <g class="slab base">
            <rect x="34" y="236" width="132" height="40" rx="12"/>
          </g>
          <g class="tag">
            <rect x="162" y="82" width="46" height="22" rx="6"/>
            <text x="185" y="97" text-anchor="middle">A7</text>
          </g>
          <g class="tag bad-tag">
            <rect x="162" y="82" width="46" height="22" rx="6"/>
            <text x="185" y="97" text-anchor="middle">??</text>
          </g>
        </svg>
        <ol class="stack-legend">
          <li>חוצץ</li>
          <li>קנרית</li>
          <li><bdi dir="ltr">EBP</bdi></li>
          <li>כתובת חזרה</li>
          <li><bdi dir="ltr">main</bdi> · הקורא</li>
        </ol>
        <figcaption>הציפור יושבת בין החוצץ לכתובת החזרה. העותק <bdi dir="ltr">A7</bdi> נבדק לפני החזרה.</figcaption>
      </figure>
      <div class="lab-actions">
        <button type="button" class="primary" data-viz="canary" data-viz-k="ok">יציאה תקינה</button>
        <button type="button" class="primary" data-viz="canary" data-viz-k="break">החוצץ גלש</button>
      </div>
      <p class="viz-fb muted" data-viz-fb="canary">גלישה יורדת מהחוצץ אל הקנרית. אם הציפור נשברת — עוצרים לפני החזרה. זו אפחות, לא תיקון של הכתיבה.</p>`
    );
  },
  vtable() {
    return vizBox(
      "טבלה וירטואלית (vtable) ו־vptr",
      `<div class="vt-scene">
        <div class="vt-obj">
          <div class="slot ok" dir="ltr">← vptr</div>
          <div class="slot">שדות האובייקט</div>
        </div>
        <div class="vt-arrow">←</div>
        <div class="vt-tab">
          <div class="slot">0 hop()</div>
          <div class="slot">1 speak()</div>
        </div>
      </div>
      <p class="viz-fb muted">הקישור הדינמי בוחר שורה בטבלה לפי האובייקט האמיתי, לא לפי טיפוס המצביע. בבנאי האב הטבלה עוד של האב.</p>`
    );
  },
  evalv() {
    return vizBox(
      "eval מול המרה: דלת לקוד מול דלת לנתון",
      `<div class="door-row">
        <button type="button" class="door bad-door" data-viz="evalv" data-viz-k="eval">
          <svg class="door-svg" viewBox="0 0 120 140" aria-hidden="true">
            <text class="door-inside" x="60" y="78" text-anchor="middle">{ }</text>
            <g class="door-panel">
              <rect x="26" y="16" width="68" height="108" rx="3"/>
              <circle class="knob" cx="80" cy="74" r="3.5"/>
            </g>
            <path class="ink-line" d="M22 12 H98 V128 H22 Z"/>
          </svg>
          <span class="door-tag"><bdi dir="ltr">eval(קלט)</bdi></span>
          <span>המחרוזת רצה כפייתון</span>
        </button>
        <button type="button" class="door ok-door" data-viz="evalv" data-viz-k="int">
          <svg class="door-svg" viewBox="0 0 120 140" aria-hidden="true">
            <text class="door-inside" x="60" y="82" text-anchor="middle">7</text>
            <g class="door-panel">
              <rect x="26" y="16" width="68" height="108" rx="3"/>
              <circle class="knob" cx="80" cy="74" r="3.5"/>
            </g>
            <path class="ink-line" d="M22 12 H98 V128 H22 Z"/>
          </svg>
          <span class="door-tag"><bdi dir="ltr">int</bdi> אחרי בדיקה</span>
          <span>המחרוזת נשארת מספר</span>
        </button>
      </div>
      <p class="viz-fb muted" data-viz-fb="evalv">try/except לא סוגר את דלת הקוד. בחרו דלת.</p>`
    );
  },
  tcpudp() {
    return vizBox(
      "TCP זרם מול UDP מנות",
      `<div class="track-pair">
        <button type="button" class="track tcp" data-viz="tcpudp" data-viz-k="tcp">
          <span class="track-label">TCP · SOCK_STREAM</span>
          <span class="pkt-line"><span class="pkt p1"></span><span class="pkt p2"></span><span class="pkt p3"></span></span>
          <span class="muted">מסודר, עם אישור. גבול הודעה לא שמור — צריך מסגור.</span>
        </button>
        <button type="button" class="track udp" data-viz="tcpudp" data-viz-k="udp">
          <span class="track-label">UDP · SOCK_DGRAM</span>
          <span class="pkt-line datagrams"><span class="pkt d1"></span><span class="pkt d2"></span></span>
          <span class="muted">כל מנה עצמאית. בלי הבטחת מסירה או סדר.</span>
        </button>
      </div>
      <p class="viz-fb muted" data-viz-fb="tcpudp">אותו מספר פורט (16 סיביות) בשניהם. לחצו על מסלול.</p>`
    );
  },
  endian() {
    return vizBox(
      "סדר בתים (endian) ו־htons",
      `<div class="endian-row">
        <div class="endian-box">
          <p>מחשב little-endian</p>
          <div class="bytes" dir="ltr"><span>34</span><span>12</span></div>
          <p class="muted">פורט 0x1234 בזיכרון</p>
        </div>
        <span class="trust-arr" dir="ltr">← htons</span>
        <div class="endian-box ok-box">
          <p>רשת big-endian</p>
          <div class="bytes" dir="ltr"><span>12</span><span>34</span></div>
          <p class="muted">כפי ש־IP מצפה</p>
        </div>
      </div>
      <p class="viz-fb muted">בלי htons על little-endian הפורט יוצא הפוך על הקו.</p>`
    );
  },
  http() {
    return vizBox(
      "בקשת HTTP: לקוח → שרת → תשובה",
      `<div class="http-road">
        <div class="http-end">דפדפן</div>
        <div class="http-wire">
          <span class="http-pkt" data-http-pkt>GET /</span>
        </div>
        <div class="http-end">שרת</div>
      </div>
      <div class="lab-actions">
        <button type="button" class="primary" data-viz="http" data-viz-k="get">שלחו GET</button>
        <button type="button" class="primary" data-viz="http" data-viz-k="cookie">הדביקו כרטיס (עוגיה)</button>
      </div>
      <p class="viz-fb muted" data-viz-fb="http">HTTP חסר מצב: כל בקשה נפרדת. העוגיה היא כרטיס שהלקוח מחזיר — מי שמחזיק אותו נראה כמו המשתמש.</p>`
    );
  },
  cookie() {
    return vizBox(
      "עוגיה (Cookie) ככרטיס כניסה",
      `<div class="ticket" data-ticket>
        <p><strong>כרטיס מושב</strong></p>
        <p dir="ltr">sid=… אקראי</p>
        <p class="muted">לא <code>admin=true</code></p>
      </div>
      <p class="viz-fb muted">בלי HTTPS הכרטיס גלוי בדרך (MITM). הסשן בשרת, לא בדגל בלקוח.</p>`
    );
  },
  vmct() {
    return vizBox(
      "מכונה וירטואלית מול מכולה",
      `<div class="iso-pair">
        <button type="button" class="iso-bldg pic-btn" data-viz="vmct" data-viz-k="vm">
          <svg viewBox="0 0 120 110" class="mini-svg tall" aria-hidden="true">
            <path class="roof" d="M18 46 L60 16 L102 46"/>
            <rect class="wall" x="30" y="46" width="60" height="48"/>
            <rect class="shaft" x="52" y="54" width="16" height="40"/>
            <rect class="cab" x="54" y="74" width="12" height="12"/>
          </svg>
          <span>מכונה וירטואלית</span>
          <span class="muted">ליבה ומעלית משלה</span>
        </button>
        <button type="button" class="iso-bldg pic-btn" data-viz="vmct" data-viz-k="ct">
          <svg viewBox="0 0 120 110" class="mini-svg tall" aria-hidden="true">
            <rect class="foundation" x="12" y="92" width="96" height="8" rx="2"/>
            <rect class="wall" x="18" y="42" width="26" height="50"/>
            <rect class="wall" x="47" y="42" width="26" height="50"/>
            <rect class="wall" x="76" y="42" width="26" height="50"/>
            <rect class="window" x="24" y="52" width="10" height="10"/>
            <rect class="window" x="55" y="52" width="10" height="10"/>
            <rect class="window" x="84" y="52" width="10" height="10"/>
          </svg>
          <span>מכולה</span>
          <span class="muted">דירות על אותה ליבה</span>
        </button>
      </div>
      <p class="viz-fb muted" data-viz-fb="vmct">במבחן: hypervisor מדמה חומרה; וירטואליזציית מ״ה חולקת ליבה. לחצו על בניין.</p>`
    );
  },
  sqlv() {
    return vizBox(
      "שרשור למחרוזת SQL מול קשירה ל-?",
      `<div class="sql-pair">
        <button type="button" class="sql-pipe bad-pipe pic-btn" data-viz="sqlv" data-viz-k="concat">
          <svg viewBox="0 0 140 88" class="mini-svg tall" aria-hidden="true">
            <path class="pipe" d="M16 58 H124"/>
            <g class="glyph g1">
              <circle cx="48" cy="28" r="8"/>
              <text class="glyph-ch" x="48" y="32" text-anchor="middle">A</text>
            </g>
            <g class="glyph g2">
              <circle cx="78" cy="22" r="8"/>
              <text class="glyph-ch" x="78" y="26" text-anchor="middle">B</text>
            </g>
          </svg>
          <span>שרשור</span>
          <span class="muted">האותיות נופלות לתוך הצינור</span>
        </button>
        <button type="button" class="sql-pipe ok-pipe pic-btn" data-viz="sqlv" data-viz-k="param">
          <svg viewBox="0 0 140 88" class="mini-svg tall" aria-hidden="true">
            <path class="pipe" d="M16 58 H124"/>
            <rect class="crate" x="86" y="18" width="36" height="28" rx="3"/>
            <text class="glyph-ch" x="104" y="37" text-anchor="middle">?</text>
          </svg>
          <span>קשירה</span>
          <span class="muted">הערך נשאר בארגז, ליד הצינור</span>
        </button>
      </div>
      <p class="viz-fb muted" data-viz-fb="sqlv">format ו־f-string הם עדיין שרשור. <code>?</code> לא לשם טבלה — רק לערך.</p>`
    );
  },
  wrap() {
    return vizBox(
      "גלישת מספר שלם (Integer overflow)",
      `<div class="wrap-meter">
        <div class="wrap-bar" data-wrap-bar></div>
        <span class="wrap-cap">תקרה של הטיפוס</span>
      </div>
      <button type="button" class="primary" data-viz="wrap">הוסיפו עד הגלישה</button>
      <p class="viz-fb muted" data-viz-fb="wrap">המונה לא "נעצר" — הוא מתקפל. הקצאה לפי n*size עלולה להיות קטנה מדי.</p>`
    );
  },
  hybrid() {
    return vizBox(
      "הצפנה היברידית: מפתח הסימטרי עובר באסימטרי",
      `<div class="hyb-row">
        <div class="hyb-box">מפתח פומבי → עוטף מפתח AES</div>
        <span class="trust-arr">←</span>
        <div class="hyb-box ok-box">AES על הנתונים</div>
      </div>
      <p class="viz-fb muted">אסימטרי איטי לנפח. סימטרי לבדו בלי אימות זהות לא מספיק מול MITM. צריך גם תעודה מול סמכות סרטיפיקטים.</p>`
    );
  },
  chain() {
    return vizBox(
      "ארבעה מושגים בשרשרת",
      `<div class="term-flow">
        <button type="button" class="pic-btn" data-viz="chain" data-viz-k="bug">
          <svg viewBox="0 0 72 64" class="mini-svg" aria-hidden="true"><path class="ink" d="M16 14 h28 v22 h-10 l-6 8 v-8 h-12 z"/><path class="ink tear" d="M30 20 l8 6 l-5 8"/></svg>
          <span>באג</span>
        </button>
        <button type="button" class="pic-btn" data-viz="chain" data-viz-k="vuln">
          <svg viewBox="0 0 72 64" class="mini-svg" aria-hidden="true"><path class="ink" d="M22 14 h28 v36 h-28 z"/><path class="ink door" d="M36 22 v20"/></svg>
          <span>חולשה</span>
        </button>
        <button type="button" class="pic-btn" data-viz="chain" data-viz-k="use">
          <svg viewBox="0 0 72 64" class="mini-svg" aria-hidden="true"><circle class="ink" cx="30" cy="28" r="12"/><path class="ink" d="M38 36 l14 14"/></svg>
          <span>ניצול</span>
        </button>
        <button type="button" class="pic-btn" data-viz="chain" data-viz-k="mit">
          <svg viewBox="0 0 72 64" class="mini-svg" aria-hidden="true"><path class="ink shield" d="M36 10 l16 6 v14 c0 12-8 20-16 24 c-8-4-16-12-16-24 v-14 z"/></svg>
          <span>אפחות</span>
        </button>
      </div>
      <p class="viz-fb muted" data-viz-fb="chain">רוב החולשות הן באגים. רוב הבאגים אינם חולשות. לחצו על ציור.</p>`
    );
  },
  isa() {
    return vizBox(
      "ירושה מול הכלה (is-a / has-a)",
      `<div class="isa-row">
        <button type="button" class="pic-btn" data-viz="isa" data-viz-k="isa">
          <svg viewBox="0 0 120 100" class="mini-svg tall" aria-hidden="true">
            <circle class="fruit" cx="58" cy="58" r="26"/>
            <path class="leaf" d="M58 34 q6-16 18-16 q-2 12-14 16"/>
            <path class="stem" d="M58 34 v-8"/>
          </svg>
          <span>תפוח הוא פרי · <bdi dir="ltr">is-a</bdi></span>
        </button>
        <button type="button" class="pic-btn" data-viz="isa" data-viz-k="hasa">
          <svg viewBox="0 0 120 100" class="mini-svg tall" aria-hidden="true">
            <path class="roof" d="M20 48 L60 18 L100 48"/>
            <rect class="wall" x="30" y="48" width="60" height="40"/>
            <rect class="window" x="52" y="58" width="16" height="14"/>
          </svg>
          <span>לבית יש חלון · <bdi dir="ltr">has-a</bdi></span>
        </button>
      </div>
      <p class="viz-fb muted" data-viz-fb="isa">"סוג של" הוא ירושה. "יש לו" הוא חלק בפנים, לא הורה.</p>`
    );
  },
  spill() {
    return vizBox(
      "כוס מים: גלישת חוצץ",
      `<figure class="cup-draw" data-cup>
        <svg class="draw-svg cup-svg" viewBox="0 0 220 300" role="img" aria-label="כוס שמתמלאת במים">
          <defs>
            <clipPath id="glassClip">
              <path d="M72 62 L60 214 Q60 230 80 230 H140 Q160 230 160 214 L148 62 Z"/>
            </clipPath>
          </defs>
          <ellipse class="table" cx="110" cy="272" rx="74" ry="9"/>
          <ellipse class="puddle" cx="110" cy="258" rx="40" ry="8"/>
          <path class="spill-stream left" d="M64 78 C36 120 42 168 68 214"/>
          <path class="spill-stream right" d="M156 78 C184 120 178 168 152 214"/>
          <circle class="drop d1" cx="46" cy="132" r="5"/>
          <circle class="drop d2" cx="178" cy="150" r="4"/>
          <circle class="drop d3" cx="38" cy="186" r="3.5"/>
          <g clip-path="url(#glassClip)">
            <rect class="water" x="48" y="54" width="124" height="186" rx="12"/>
          </g>
          <ellipse class="rim-water" cx="110" cy="62" rx="36" ry="7"/>
          <path class="glass" d="M68 56 L56 212 Q56 236 82 236 H138 Q164 236 164 212 L152 56"/>
          <ellipse class="glass-rim" cx="110" cy="56" rx="44" ry="11"/>
        </svg>
        <figcaption>הכוס היא החוצץ. השלולית היא מה שיושב אחריה בזיכרון.</figcaption>
      </figure>
      <div class="lab-actions">
        <button type="button" class="primary" data-viz="spill" data-viz-k="fit">מלאו עד השפה</button>
        <button type="button" class="primary" data-viz="spill" data-viz-k="over">מזגו יותר מדי</button>
      </div>
      <p class="viz-fb muted" data-viz-fb="spill">בחרו כמה למזוג. העודף לא נעלם — הוא נשפך אל השכן.</p>`
    );
  },
  guards() {
    return vizBox(
      "שלוש שכבות אחרי הקנרית",
      `<div class="guard-grid">
        <button type="button" class="pic-btn" data-viz="guards" data-viz-k="aslr">
          <svg viewBox="0 0 120 88" class="mini-svg tall" aria-hidden="true">
            <g class="pin a"><path d="M30 18 a12 12 0 0 1 0 24 l-8 14 l-8-14 a12 12 0 0 1 16-24 z"/><text x="22" y="32" text-anchor="middle">A</text></g>
            <g class="pin b"><path d="M86 18 a12 12 0 0 1 0 24 l-8 14 l-8-14 a12 12 0 0 1 16-24 z"/><text x="78" y="32" text-anchor="middle">B</text></g>
          </svg>
          <span><bdi dir="ltr">ASLR</bdi></span>
        </button>
        <button type="button" class="pic-btn" data-viz="guards" data-viz-k="dep">
          <svg viewBox="0 0 120 88" class="mini-svg tall" aria-hidden="true">
            <rect class="page" x="28" y="16" width="40" height="52" rx="4"/>
            <path class="lines" d="M36 30 h24 M36 40 h24 M36 50 h16"/>
            <circle class="ban" cx="78" cy="48" r="16"/>
            <path class="ban-slash" d="M68 38 l20 20"/>
            <path class="play" d="M74 40 l12 8 l-12 8 z"/>
          </svg>
          <span><bdi dir="ltr">DEP</bdi></span>
        </button>
        <button type="button" class="pic-btn" data-viz="guards" data-viz-k="cet">
          <svg viewBox="0 0 120 88" class="mini-svg tall" aria-hidden="true">
            <rect class="col bad" x="24" y="18" width="28" height="18" rx="3"/>
            <rect class="col" x="24" y="40" width="28" height="14" rx="3"/>
            <rect class="col" x="24" y="58" width="28" height="14" rx="3"/>
            <rect class="col good" x="68" y="18" width="28" height="18" rx="3"/>
            <rect class="col good" x="68" y="40" width="28" height="14" rx="3"/>
            <rect class="col good" x="68" y="58" width="28" height="14" rx="3"/>
          </svg>
          <span><bdi dir="ltr">CET</bdi></span>
        </button>
      </div>
      <p class="viz-fb muted" data-viz-fb="guards">לחצו על ציור. כל שכבה עוצרת כישלון אחר, ואף אחת לא מוחקת את הבאג בקלט.</p>`
    );
  },
  gil() {
    return vizBox(
      "מנעול אחד על המפרש (GIL)",
      `<div class="gil-draw" data-gil-box>
        <svg class="draw-svg" viewBox="0 0 300 150" role="img" aria-label="שני אנשים ומנעול אחד">
          <g class="person on" data-gil-t="a">
            <circle class="head" cx="70" cy="42" r="16"/>
            <path class="limb" d="M70 58 v34 M70 74 h-18 M70 74 h18 M70 92 l-14 28 M70 92 l14 28"/>
          </g>
          <g class="person" data-gil-t="b">
            <circle class="head" cx="230" cy="42" r="16"/>
            <path class="limb" d="M230 58 v34 M230 74 h-18 M230 74 h18 M230 92 l-14 28 M230 92 l14 28"/>
          </g>
          <g class="lock">
            <rect x="132" y="58" width="36" height="28" rx="4"/>
            <path d="M140 58 v-10 a10 10 0 0 1 20 0 v10"/>
          </g>
        </svg>
      </div>
      <div class="lab-actions">
        <button type="button" class="primary" data-viz="gil" data-viz-k="swap">העבירו את המנעול</button>
      </div>
      <p class="viz-fb muted" data-viz-fb="gil">ב־CPython חוט אחד מבצע bytecode בכל רגע. חוטים עדיין עוזרים ל־I/O. חישוב כבד — תהליכים נפרדים.</p>`
    );
  },
  lane() {
    return vizBox(
      "על הנתיב מול הודעה ישנה",
      `<figure class="lane-draw" data-lane>
        <svg class="draw-svg" viewBox="0 0 320 150" role="img" aria-label="לקוח, נתיב ושרת">
          <path class="road" d="M40 108 H280"/>
          <rect class="screen" x="28" y="48" width="52" height="36" rx="4"/>
          <rect class="screen" x="240" y="48" width="52" height="36" rx="4"/>
          <g class="walker">
            <circle cx="160" cy="52" r="11"/>
            <path d="M160 64 v24 M160 76 h-14 M160 76 h14 M160 88 l-12 20 M160 88 l12 20"/>
          </g>
          <g class="mail">
            <rect x="108" y="6" width="26" height="18" rx="2"/>
            <path d="M108 6 l13 10 l13-10"/>
          </g>
          <g class="mail echo">
            <rect x="140" y="6" width="26" height="18" rx="2"/>
            <path d="M140 6 l13 10 l13-10"/>
          </g>
        </svg>
        <figcaption class="lane-cap" dir="ltr"><span>לקוח</span><span>הנתיב</span><span>שרת</span></figcaption>
      </figure>
      <div class="lab-actions">
        <button type="button" class="primary" data-viz="lane" data-viz-k="mitm">אדם באמצע</button>
        <button type="button" class="primary" data-viz="lane" data-viz-k="replay">שידור חוזר</button>
      </div>
      <p class="viz-fb muted" data-viz-fb="lane">שני ציורים שונים. באמצע: דמות על הקו. חוזר: אותה מעטפה פעמיים.</p>`
    );
  },
  usecase() {
    return vizBox(
      "תרחיש שימוש (UML Use Case)",
      `<figure class="uml-diagram" data-usecase>
        <svg class="draw-svg wide" viewBox="0 0 560 300" role="img" aria-label="שחקנים מחוץ למלבן המערכת, אליפסות בתוכו">
          <path class="uc-link a-pass" d="M94 118 L196 108"/>
          <path class="uc-link a-pass" d="M94 142 C170 158 320 158 394 156"/>
          <path class="uc-link a-drive" d="M90 214 H200"/>
          <rect class="sys-bound" x="168" y="28" width="372" height="250"/>
          <text class="uml-name" x="354" y="52" text-anchor="middle" direction="rtl">שיתוף נסיעות</text>
          <g class="actor">
            <circle cx="78" cy="92" r="14"/>
            <path d="M78 106 v36 M78 118 h-16 M78 118 h16 M78 142 l-14 28 M78 142 l14 28"/>
            <text class="uml-name" x="78" y="184" text-anchor="middle" direction="rtl">נוסע</text>
          </g>
          <g class="actor">
            <circle cx="78" cy="214" r="14"/>
            <path d="M78 228 v28 M78 238 h-16 M78 238 h16 M78 256 l-14 22 M78 256 l14 22"/>
            <text class="uml-name" x="78" y="292" text-anchor="middle" direction="rtl">נהג</text>
          </g>
          <ellipse class="usecase-oval" cx="276" cy="108" rx="80" ry="32"/>
          <text class="uml-name" x="276" y="113" text-anchor="middle" direction="rtl">בקשת נסיעה</text>
          <ellipse class="usecase-oval" cx="276" cy="204" rx="80" ry="32"/>
          <text class="uml-name" x="276" y="209" text-anchor="middle" direction="rtl">הצעת נסיעה</text>
          <ellipse class="usecase-oval" cx="456" cy="156" rx="62" ry="32"/>
          <text class="uml-name" x="456" y="161" text-anchor="middle" direction="rtl">הרשמה</text>
        </svg>
      </figure>
      <div class="lab-actions">
        <button type="button" class="primary" data-viz="usecase" data-viz-k="pass">נוסע</button>
        <button type="button" class="primary" data-viz="usecase" data-viz-k="drive">נהג</button>
        <button type="button" class="primary" data-viz="usecase" data-viz-k="edge">מחוץ למלבן</button>
      </div>
      <p class="viz-fb muted" data-viz-fb="usecase">השחקן מחוץ למערכת. האליפסה היא תרחיש. הקו רק מחבר ביניהם.</p>`
    );
  },
  uml() {
    return vizBox(
      "תרשים מחלקות (UML Class Diagram)",
      `<figure class="uml-diagram" data-uml dir="ltr">
        <svg class="draw-svg wide" viewBox="0 0 700 420" role="img" aria-label="תרשים מחלקות: ירושה, מימוש ממשק, הרכבה וריבוי">
          <g class="cls cls-user">
            <rect x="28" y="16" width="176" height="112"/>
            <path class="uml-rule" d="M28 48 H204"/>
            <text class="uml-name" x="116" y="40" text-anchor="middle">User</text>
            <text class="uml-mem mark-prot" x="40" y="74"># id : string</text>
            <text class="uml-mem mark-pub" x="40" y="100">+ name : string</text>
          </g>
          <g class="cls cls-pass">
            <rect x="28" y="268" width="176" height="100"/>
            <path class="uml-rule" d="M28 300 H204"/>
            <text class="uml-name" x="116" y="292" text-anchor="middle">Passenger</text>
            <text class="uml-mem mark-pub" x="40" y="332">+ request() : void</text>
          </g>
          <g class="rel rel-gen">
            <polygon points="116,128 106,148 126,148"/>
            <path d="M116 148 V268"/>
          </g>
          <g class="cls cls-face">
            <rect x="268" y="8" width="220" height="104"/>
            <path class="uml-rule" d="M268 62 H488"/>
            <text class="uml-stereo" x="378" y="30" text-anchor="middle">ממשק</text>
            <text class="uml-name" x="378" y="52" text-anchor="middle">Payable</text>
            <text class="uml-mem mark-pub" x="280" y="90">+ pay(amount : int) : bool</text>
          </g>
          <g class="cls cls-ride">
            <rect x="248" y="196" width="250" height="188"/>
            <path class="uml-rule" d="M248 230 H498 M248 300 H498"/>
            <text class="uml-name" x="373" y="220" text-anchor="middle">Ride</text>
            <text class="uml-mem mark-priv" x="260" y="256">- seats : int</text>
            <text class="uml-mem mark-priv" x="260" y="280">- vehicle : Vehicle</text>
            <text class="uml-mem mark-pub" x="260" y="328">+ setSeats(n : int) : void</text>
            <text class="uml-mem mark-pub" x="260" y="354">+ book() : void</text>
          </g>
          <g class="rel rel-real">
            <polygon points="378,112 368,132 388,132"/>
            <path d="M378 132 V196"/>
          </g>
          <g class="cls cls-route">
            <rect x="548" y="236" width="136" height="96"/>
            <path class="uml-rule" d="M548 268 H684"/>
            <text class="uml-name" x="616" y="260" text-anchor="middle">Route</text>
            <text class="uml-mem mark-priv" x="560" y="298">- km : int</text>
          </g>
          <g class="rel rel-comp">
            <polygon points="498,284 510,274 522,284 510,294"/>
            <path d="M522 284 H548"/>
            <text class="uml-mult" x="534" y="270" text-anchor="middle">1</text>
          </g>
          <g class="rel rel-many">
            <path d="M204 318 H248"/>
            <text class="uml-mult" x="226" y="310" text-anchor="middle">0..*</text>
          </g>
        </svg>
        <ul class="mark-legend">
          <li><bdi class="latn" dir="ltr">+ public</bdi> ציבורי</li>
          <li><bdi class="latn" dir="ltr">- private</bdi> פרטי</li>
          <li><bdi class="latn" dir="ltr"># protected</bdi> מוגן</li>
          <li>משולש חלול על קו רצוף — ירושה, פונה אל ההורה</li>
          <li>משולש חלול על קו מקווקו — מימוש ממשק, פונה אל הממשק</li>
          <li>מעוין מלא — הכלה, על המכלול</li>
          <li><bdi class="latn" dir="ltr">1</bdi> אובייקט אחד</li>
          <li><bdi class="latn" dir="ltr">0..*</bdi> אפס או יותר</li>
        </ul>
      </figure>
      <div class="lab-actions">
        <button type="button" class="primary" data-viz="uml" data-viz-k="box">המחלקה</button>
        <button type="button" class="primary" data-viz="uml" data-viz-k="gen">ירושה</button>
        <button type="button" class="primary" data-viz="uml" data-viz-k="comp">הכלה וריבוי</button>
        <button type="button" class="primary" data-viz="uml" data-viz-k="face">ממשק</button>
      </div>
      <p class="viz-fb muted" data-viz-fb="uml">לחצו על סימון. המשולש תמיד פונה אל הכללי: הורה או ממשק.</p>`
    );
  },
  dfd() {
    return vizBox(
      "תרשים זרימת מידע (Data Flow Diagram)",
      `<figure class="dfd-draw" data-dfd>
        <svg class="draw-svg wide" viewBox="0 0 640 200" role="img" aria-label="מלבן, עיגול, חץ, וקו מקווקו של גבול אמון">
          <path class="trust-fence" d="M210 48 V184"/>
          <rect class="dfd-entity" x="24" y="68" width="132" height="56"/>
          <text class="uml-name" x="90" y="101" text-anchor="middle" direction="rtl">מכשיר</text>
          <circle class="dfd-proc" cx="330" cy="96" r="48"/>
          <text class="uml-name" x="330" y="101" text-anchor="middle" direction="rtl">אישור</text>
          <rect class="dfd-entity" x="470" y="68" width="146" height="56"/>
          <text class="uml-name" x="543" y="101" text-anchor="middle" direction="rtl">רשות תשלום</text>
          <g class="dfd-flow cross">
            <path d="M156 96 H270"/>
            <polygon points="282,96 270,90 270,102"/>
            <text class="uml-mult" x="219" y="34" text-anchor="middle" direction="rtl">פרטי תשלום</text>
          </g>
          <g class="dfd-flow inner">
            <path d="M378 96 H470"/>
            <polygon points="470,96 458,90 458,102"/>
            <text class="uml-mult" x="424" y="84" text-anchor="middle" direction="rtl">בקשה</text>
          </g>
        </svg>
        <ul class="mark-legend">
          <li><span class="swatch box" aria-hidden="true"></span> מלבן — גורם חיצוני</li>
          <li><span class="swatch round" aria-hidden="true"></span> עיגול — תהליך</li>
          <li>חץ — נתון שעובר</li>
          <li>קו מקווקו — גבול אמון</li>
        </ul>
      </figure>
      <button type="button" class="primary" data-viz="dfd" data-viz-k="cross">הקו שחוצה את הגבול</button>
      <p class="viz-fb muted" data-viz-fb="dfd">המלבן מחוץ למערכת, העיגול מעבד, החץ הוא הנתון. על חץ שחוצה את הקו המקווקו בודקים הצפנה ואימות.</p>`
    );
  },
  reactor() {
    return vizBox(
      "Reactor מול תהליך לכל לקוח",
      `<figure class="reactor-draw" data-reactor>
        <svg class="draw-svg wide" viewBox="0 0 640 180" role="img" aria-label="כמה תהליכים מול תהליך אחד שמאזין לערוצים">
          <g class="many-side">
            <g class="proc p1"><rect x="24" y="28" width="36" height="28"/><path d="M42 56 v18"/></g>
            <g class="proc p2"><rect x="72" y="28" width="36" height="28"/><path d="M90 56 v18"/></g>
            <g class="proc p3"><rect x="120" y="28" width="36" height="28"/><path d="M138 56 v18"/></g>
            <g class="proc p4"><rect x="168" y="28" width="36" height="28"/><path d="M186 56 v18"/></g>
          </g>
          <g class="one-side">
            <path class="chan c1" d="M360 36 H470"/>
            <path class="chan c2" d="M360 70 H470"/>
            <path class="chan c3" d="M360 104 H470"/>
            <path class="chan c4" d="M360 138 H470"/>
            <circle class="wake" cx="360" cy="70" r="6">
              <animate attributeName="cx" from="360" to="468" dur="1.15s" begin="indefinite" repeatCount="indefinite"/>
            </circle>
            <rect class="hub" x="470" y="20" width="120" height="132" rx="8"/>
          </g>
        </svg>
        <figcaption class="lane-cap" dir="ltr"><span dir="rtl">תהליך לכל לקוח</span><span dir="rtl">Reactor</span></figcaption>
      </figure>
      <div class="lab-actions">
        <button type="button" class="primary" data-viz="reactor" data-viz-k="many">תהליך לכל לקוח</button>
        <button type="button" class="primary" data-viz="reactor" data-viz-k="one">Reactor</button>
      </div>
      <p class="viz-fb muted" data-viz-fb="reactor">משמאל תהליך נפרד לכל קו. מימין תהליך אחד מתעורר רק על הערוץ שיש בו קלט. ביחידה 5 זה Selector.</p>`
    );
  },
};

window.vizHtml = function (key) {
  const fn = window.VIZ[key];
  return fn ? fn() : "";
};

window.UNIT_LAB_KEYS = {
  1: ["tree", "risk"],
  2: ["mem", "copy"],
  3: ["ov", "int", "uaf"],
  4: ["pyalias", "pyeval"],
  5: ["osi", "sock", "race"],
  6: ["u6web", "u6iso", "u6tru"],
  7: ["u7sql", "u7lang", "u7cln"],
};

window.SECTION_ATTACH = {
  terms: { viz: ["chain"], quizzes: ["q-bug-vuln", "q-mitigation-def"] },
  "news-terms": { quizzes: ["q-zero-day"] },
  cia: { viz: ["cia"], quizzes: ["q-cia", "q-cia-grade", "q-preview"] },
  classes: { quizzes: ["q-class"] },
  coupling: { viz: ["usecase", "uml", "layers"], quizzes: ["q-coupling", "q-cohesion-def"] },
  trust: { viz: ["trust"] },
  "threat-intro": { viz: ["threat", "dfd"] },
  systemic: { viz: ["reactor"], quizzes: ["q-systemic"] },
  audit: { labs: ["tree", "risk"], quizzes: ["q-least", "q-qa-audit", "q-api-order"] },

  pointers: { viz: ["ptr"], quizzes: ["u2-ptr"] },
  memory: { labs: ["mem"], quizzes: ["u2-stack-heap", "u2-stack-name"] },
  copy: { labs: ["copy"], quizzes: ["u2-copy"] },
  virtual: { viz: ["vtable"], quizzes: ["u2-virtual", "u2-virtual-dtor"] },
  slice: { quizzes: ["u2-slice"] },
  except: { quizzes: ["u2-except"] },
  inherit: { viz: ["isa"], quizzes: ["u2-isa"] },
  hello: { quizzes: ["u2-main"] },
  build: { quizzes: ["u2-include"] },
  "this-encap": { quizzes: ["u2-protected"] },
  functions: { quizzes: ["u2-ovl-ret"] },
  rule3: { quizzes: ["u2-rule3"] },
  control: { quizzes: ["u2-ternary"] },
  tpl: { quizzes: ["u2-vector-bound"] },

  "u3-stack": { viz: ["plates"], quizzes: ["u3-ret"] },
  "u3-bof": { viz: ["spill"], quizzes: ["u3-bof", "u3-stack-name"] },
  "u3-unsafe": { quizzes: ["u3-gets"] },
  "u3-canary": { viz: ["canary"], labs: ["ov"], quizzes: ["u3-canary"] },
  "u3-aslr-dep-cet": { viz: ["guards"], quizzes: ["u3-dep", "u3-aslr", "u3-cfi"] },
  "u3-int": { viz: ["wrap"], labs: ["int"], quizzes: ["u3-int", "u3-signed-overflow"] },
  "u3-uaf": { labs: ["uaf"], quizzes: ["u3-uaf"] },
  "u3-offone-heap": { quizzes: ["u3-off"] },
  "u3-cast-toc": { quizzes: ["u3-toc"] },
  "u3-vptr": { viz: ["vtable"], quizzes: ["u3-vptr"] },
  "u3-leak-side": { quizzes: ["u3-format"] },
  "u3-find": { quizzes: ["u3-static-dyn"] },

  "u4-why": { quizzes: ["u4-interp"] },
  "u4-indent": { quizzes: ["u4-ind"] },
  "u4-types": { quizzes: ["u4-dyn"] },
  "u4-aliasing": { labs: ["pyalias"], quizzes: ["u4-alias"] },
  "u4-join": { quizzes: ["u4-joinq"] },
  "u4-loop-seq": { quizzes: ["u4-range", "u4-tup"] },
  "u4-fn": { quizzes: ["u4-kwq"] },
  "u4-class": { quizzes: ["u4-self"] },
  "u4-classvar": { quizzes: ["u4-field"] },
  "u4-dict-oop": { quizzes: ["u4-ovl", "u4-priv"] },
  "u4-inject": { viz: ["evalv"], labs: ["pyeval"], quizzes: ["u4-eval", "u4-pkl-load", "u4-literal-limits"] },
  "u4-type3": { quizzes: ["u4-type", "u4-type-tuple"] },
  "u4-bc": { quizzes: ["u4-pvm", "u4-mod"] },
  "u4-ex": { quizzes: ["u4-with-ex"] },

  "u5-osi": { labs: ["osi"], quizzes: ["u5-osi4", "u5-p2p"] },
  "u5-tcpip": { viz: ["tcpudp"] },
  "u5-ip": { quizzes: ["u5-ipv4", "u5-tcp-framing"] },
  "u5-endian": { viz: ["endian"], quizzes: ["u5-htons"] },
  "u5-sock": { labs: ["sock"], quizzes: ["u5-sock-zero", "u5-tcpudp"] },
  "u5-server": { quizzes: ["u5-acc"] },
  "u5-pysock": { quizzes: ["u5-py-srv"] },
  "u5-gil": { viz: ["gil"], quizzes: ["u5-gilq"] },
  "u5-race": { labs: ["race"], quizzes: ["u5-raceq"] },
  "u5-sel": { viz: ["reactor"], quizzes: ["u5-selq"] },
  "u5-crypto": { viz: ["hybrid"], quizzes: ["u5-hyb"] },
  "u5-pqc": { quizzes: ["u5-pqcq"] },
  "u5-vuln": { viz: ["lane"], quizzes: ["u5-mitm", "u5-mitm-replay", "u5-ddos"] },

  "u6-http": { viz: ["http", "cookie"], quizzes: ["u6-get", "u6-cook"] },
  "u6-static": { quizzes: ["u6-stat", "u6-pathq"] },
  "u6-cgi": { quizzes: ["u6-cgiq", "u6-qs"] },
  "u6-webapp": { labs: ["u6web"], quizzes: ["u6-appq", "u6-htmlq", "u6-sop", "u6-xssq", "u6-csrf-def"] },
  "u6-saas": { quizzes: ["u6-saasq", "u6-share", "u6-faasq"] },
  "u6-deep": { quizzes: ["u6-deepq", "u6-torq"] },
  "u6-cloud": { quizzes: ["u6-cld", "u6-mt"] },
  "u6-vm": { viz: ["vmct"], quizzes: ["u6-hv", "u6-t12"] },
  "u6-osvirt": { quizzes: ["u6-kern"] },
  "u6-online": { labs: ["u6tru"], quizzes: ["u6-ol"] },
  "u6-sand": { quizzes: ["u6-sb"] },
  "u6-exec": { labs: ["u6iso"], quizzes: ["u6-execq", "u6-py-esc"] },

  "u7-db": { quizzes: ["u7-dbq"] },
  "u7-sql": { quizzes: ["u7-sqlq"] },
  "u7-sub": { labs: ["u7lang"], quizzes: ["u7-subq"] },
  "u7-dml": { quizzes: ["u7-selq"] },
  "u7-eng": { quizzes: ["u7-lite"] },
  "u7-api": { quizzes: ["u7-py", "u7-execsql", "u7-noneq"] },
  "u7-inj": { viz: ["sqlv"], labs: ["u7sql"], quizzes: ["u7-injq"] },
  "u7-param": { quizzes: ["u7-parq", "u7-fmtq", "u7-idq", "u7-tupq"] },
  "u7-trust": { quizzes: ["u7-trq"] },
  "u7-kiss": { quizzes: ["u7-kissq"] },
  "u7-dry": { quizzes: ["u7-dryq"] },
  "u7-solid": { quizzes: ["u7-solq"] },
  "u7-arrow": { labs: ["u7cln"], quizzes: ["u7-arq"] },
  "u7-wrap": { quizzes: ["u7-cmq", "u7-kernq"] },
};
