/* עוזר לטקסט מסומן. נטען אחרי app.js. */

// --- AI Assistant Feature ---
const AI_PROMPT_SETTINGS_KEY = 'aiPromptSettings';
let currentAiSettings = localStorage.getItem(AI_PROMPT_SETTINGS_KEY) || 'הסבר לי בפירוט, בגובה העיניים, עם דוגמאות במידת הצורך.';

function initAiAssistantUI() {
    if (document.getElementById('ai-tooltip')) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'ai-tooltip';
    tooltip.id = 'ai-tooltip';
    tooltip.innerHTML = `
        <button onclick="triggerAi('chatgpt')">ChatGPT</button>
        <button onclick="triggerAi('claude')">Claude</button>
        <button onclick="triggerAi('gemini')">Gemini</button>
    `;
    document.body.appendChild(tooltip);

    const modal = document.createElement('div');
    modal.className = 'ai-modal-overlay';
    modal.id = 'ai-settings-modal';
    modal.innerHTML = `
        <div class="ai-modal-content">
            <h3>הגדרות עוזר AI</h3>
            <p>הגדר כיצד תרצה שה-AI יסביר לך את החומר המסומן:</p>
            <textarea id="ai-settings-textarea" rows="4"></textarea>
            <div style="text-align:left; margin-top:15px;">
                <button onclick="closeAiSettingsModal(false)">ביטול</button>
                <button class="primary" onclick="closeAiSettingsModal(true)">שמירה</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

window.openAiSettingsModal = function() {
    document.getElementById('ai-settings-textarea').value = currentAiSettings;
    document.getElementById('ai-settings-modal').style.display = 'flex';
};

window.closeAiSettingsModal = function(save) {
    if (save) {
        currentAiSettings = document.getElementById('ai-settings-textarea').value;
        localStorage.setItem(AI_PROMPT_SETTINGS_KEY, currentAiSettings);
    }
    document.getElementById('ai-settings-modal').style.display = 'none';
};

let lastSelectedText = '';

document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    const tooltip = document.getElementById('ai-tooltip');
    if (!tooltip) return;

    if (text.length > 0 && text.length < 3000) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        lastSelectedText = text;
        tooltip.style.display = 'flex';
        tooltip.style.top = (rect.top + window.scrollY - tooltip.offsetHeight - 12) + 'px';
        tooltip.style.left = (rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
    } else {
        tooltip.style.display = 'none';
        lastSelectedText = '';
    }
});

document.addEventListener('mousedown', (e) => {
    const tooltip = document.getElementById('ai-tooltip');
    if (tooltip && tooltip.style.display === 'flex' && !tooltip.contains(e.target)) {
        setTimeout(() => {
            if (!window.getSelection().toString().trim()) {
                tooltip.style.display = 'none';
            }
        }, 100);
    }
});

window.triggerAi = function(platform) {
    if (!lastSelectedText) return;
    const prompt = `אנחנו לומדים כרגע קורס מדעי המחשב בנושא תכנות דפנסיבי ואבטחת מערכות (קורס 20937). 
ההעדפות שלי להסבר: ${currentAiSettings}

אנא הסבר לי את הטקסט הבא בהקשר של הקורס:
"${lastSelectedText}"`;

    navigator.clipboard.writeText(prompt).then(() => {
        alert('הפרומפט הועתק ללוח! הדבק אותו בשיחה עם ה-AI שתיפתח עכשיו.');
        let url = '';
        if (platform === 'chatgpt') url = 'https://chatgpt.com/';
        else if (platform === 'claude') url = 'https://claude.ai/new';
        else if (platform === 'gemini') url = 'https://gemini.google.com/';
        
        if (url) window.open(url, '_blank');
        document.getElementById('ai-tooltip').style.display = 'none';
        window.getSelection().removeAllRanges();
    });
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initAiAssistantUI, 100);
} else {
    document.addEventListener('DOMContentLoaded', initAiAssistantUI);
}
// --- End AI Assistant Feature ---
