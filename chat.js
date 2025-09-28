(function() {
  // -------------------------------
  // DOM Elements
  // -------------------------------
  const chatWindow = document.querySelector(".chat-window");
  const chatForm = document.querySelector(".chat-input");
  const chatInput = document.querySelector("#chatInput");
  const contactList = document.querySelector(".contact-list");
  const suggestionsPanel = document.querySelector(".suggestion-list");

  let activeContact = null;

  // -------------------------------
  // Sample Contacts & Data
  // -------------------------------
  // -------------------------------
// Sample Contacts & Data
// -------------------------------
const contacts = [
  { name: "AI Assistant", avatar: "🤖", online: true },
  { name: "Electronics", avatar: "E", online: true },
  { name: "Textile", avatar: "T", online: false },
  { name: "Medicine", avatar: "M", online: true },
  { name: "Fertilizers", avatar: "F", online: true },
  { name: "Logistics", avatar: "L", online: false },
  { name: "Wholesale", avatar: "W", online: true },
  { name: "Retail Chains", avatar: "R", online: true },
  { name: "Agro Products", avatar: "A", online: false }
];

const suggestions = [
  { icon: "📦", title: "Supplier ratings", desc: "Electronics suppliers trending at 4.9⭐ this week." },
  { icon: "📊", title: "Market trend", desc: "Textile export demand increased by 18% this month." },
  { icon: "💊", title: "Medicine update", desc: "Generic drugs supply chain is stable this week." },
  { icon: "🌱", title: "Fertilizer demand", desc: "High demand expected for agro-fertilizers in Q4." },
  { icon: "🚚", title: "Logistics insight", desc: "Delivery times reduced by 12% with new routes." }
];


  // -------------------------------
  // Utilities
  // -------------------------------
  function createAvatarLetter(name) {
    return name[0].toUpperCase();
  }

  function formatTime(date) {
    let h = date.getHours();
    let m = date.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m < 10 ? "0" + m : m} ${ampm}`;
  }

  // -------------------------------
  // Render Contacts
  // -------------------------------
  function renderContacts() {
    contactList.innerHTML = "";
    contacts.forEach((c, idx) => {
      const li = document.createElement("li");
      li.className = "contact";
      li.dataset.index = idx;
      li.innerHTML = `
        <div class="avatar">${c.avatar}</div>
        <div class="contact-name">${c.name}</div>
      `;
      li.addEventListener("click", () => switchContact(idx));
      contactList.appendChild(li);
    });
  }

  function switchContact(idx) {
    activeContact = contacts[idx];
    document.querySelectorAll(".contact").forEach(c => c.classList.remove("active"));
    document.querySelector(`.contact[data-index="${idx}"]`).classList.add("active");
    clearChat();
    addMsg(`👋 Hello! You are now chatting with <strong>${activeContact.name}</strong>.`, "bot");
    renderSuggestions();
  }

  // -------------------------------
  // Clear Chat
  // -------------------------------
  function clearChat() {
    chatWindow.innerHTML = "";
  }

  // -------------------------------
  // Add Message
  // -------------------------------
  function addMsg(text, who = "bot", meta = null) {
    const msg = document.createElement("div");
    msg.className = `msg ${who}`;
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = text;
    msg.appendChild(bubble);

    if (meta) {
      const metaDiv = document.createElement("div");
      metaDiv.className = "msg-meta";
      metaDiv.innerHTML = meta;
      msg.appendChild(metaDiv);
    }

    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // -------------------------------
  // Simulate Bot Reply
  // -------------------------------
  function botReply(userText) {
    addTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();

      // simple logic: echo + suggestion
      let reply = "";
      if (userText.toLowerCase().includes("supplier")) {
        reply = "🤖 I found some trending suppliers based on your preferences.";
      } else if (userText.toLowerCase().includes("inventory")) {
        reply = "📦 Inventory is running low on some items. Consider reordering.";
      } else if (userText.toLowerCase().includes("trend")) {
        reply = "📊 Market data shows increasing demand for electronics this week.";
      } else {
        reply = `🤖 Thanks for your message: "<strong>${escapeHtml(userText)}</strong>"`;
      }

      addMsg(reply, "bot", formatTime(new Date()));
    }, 1000 + Math.random() * 1000);
  }

  function addTypingIndicator() {
    const typing = document.createElement("div");
    typing.className = "msg bot typing";
    typing.innerHTML = `<div class="bubble">🤖 Typing...</div>`;
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = chatWindow.querySelector(".typing");
    if (typing) typing.remove();
  }

  function escapeHtml(text) {
    return text.replace(/[<>&]/g, s => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[s]));
  }

  // -------------------------------
  // Handle Form Submission
  // -------------------------------
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text || !activeContact) return;
    addMsg(text, "user", formatTime(new Date()));
    chatInput.value = "";
    botReply(text);
  });

  // -------------------------------
  // Render Suggestions
  // -------------------------------
  function renderSuggestions() {
    suggestionsPanel.innerHTML = "";
    suggestions.forEach(s => {
      const li = document.createElement("li");
      li.className = "suggestion";
      li.innerHTML = `
        <div class="suggestion-icon">${s.icon}</div>
        <div class="suggestion-content">
          <strong>${s.title}</strong>
          <p>${s.desc}</p>
          <div class="suggestion-meter">
            <div class="meter-bar" style="width:${Math.floor(Math.random()*100)}%"></div>
          </div>
        </div>
      `;
      li.addEventListener("click", () => {
        chatInput.value = s.title;
        chatInput.focus();
      });
      suggestionsPanel.appendChild(li);
    });
  }

  // -------------------------------
  // Init
  // -------------------------------
  renderContacts();
  switchContact(0); // start with first contact

  // -------------------------------
  // Optional: Emoji support & shortcuts
  // -------------------------------
  chatInput.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") {
      chatInput.value = "Hello 👋";
    }
  });

  // -------------------------------
  // Scroll Enhancement
  // -------------------------------
  chatWindow.addEventListener("DOMNodeInserted", e => {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });

  // -------------------------------
  // Placeholder analytics (hackathon demo)
  // -------------------------------
  function showAnalytics() {
    const meta = document.createElement("div");
    meta.className = "analytics";
    meta.innerHTML = `
      <strong>📊 Active Contact:</strong> ${activeContact.name} |
      <strong>Messages Sent:</strong> ${chatWindow.querySelectorAll(".msg.user").length} |
      <strong>Bot Replies:</strong> ${chatWindow.querySelectorAll(".msg.bot").length}
    `;
    chatWindow.appendChild(meta);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  setInterval(showAnalytics, 15000); // refresh analytics every 15s

})();
