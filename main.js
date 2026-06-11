/* =====================
   DEFAULT DATA
   ===================== */

const STORAGE_KEY = "customSimulator";

const DEFAULT_TOPICS = [
  { id: "medio_ambiente", label: "Environment", emoji: "🌱" },
  { id: "educacion", label: "Education", emoji: "📚" },
  { id: "salud", label: "Health", emoji: "🏥" }
];

const DEFAULT_PROPOSALS = [
  { id: "ma1", title: "Tax incentives for residential solar energy", topic: "medio_ambiente", status: "open" },
  { id: "ma2", title: "Gradual ban on single-use plastics", topic: "medio_ambiente", status: "open" },
  { id: "ma3", title: "National urban reforestation program", topic: "medio_ambiente", status: "open" },
  { id: "ed1", title: "Mandatory teacher training every 3 years", topic: "educacion", status: "open" },
  { id: "ed2", title: "Digital education from primary level", topic: "educacion", status: "open" },
  { id: "ed3", title: "Public funding for university research", topic: "educacion", status: "open" },
  { id: "sa1", title: "Universal primary healthcare coverage", topic: "salud", status: "open" },
  { id: "sa2", title: "Regulation of essential medication prices", topic: "salud", status: "open" },
  { id: "sa3", title: "National mental health program", topic: "salud", status: "open" }
];

const DEFAULT_CHARACTERS = {
  ana: {
    name: "Ana",
    color: "bg-pink-500",
    role: "Environmental Engineer",
    avatarType: "image",
    avatarId: "ana",
    expertIn: "medio_ambiente",
    votes: {},
    delegation: {}
  },
  bruno: {
    name: "Bruno",
    color: "bg-blue-500",
    role: "Education Specialist",
    avatarType: "image",
    avatarId: "bruno",
    expertIn: "educacion",
    votes: {},
    delegation: {}
  },
  carla: {
    name: "Carla",
    color: "bg-green-500",
    role: "Informed Citizen",
    avatarType: "image",
    avatarId: "carla",
    expertIn: null,
    votes: {},
    delegation: {}
  },
  maria: {
    name: "Maria",
    color: "bg-orange-500",
    role: "Environmental Activist",
    avatarType: "image",
    avatarId: "maria",
    expertIn: "medio_ambiente",
    votes: {},
    delegation: {}
  },
  pedro: {
    name: "Pedro",
    color: "bg-yellow-500",
    role: "Apathetic Citizen",
    avatarType: "image",
    avatarId: "pedro",
    expertIn: null,
    votes: {},
    delegation: {}
  },
  abigail: {
    name: "Abigail",
    color: "bg-purple-500",
    role: "Academic Researcher",
    avatarType: "image",
    avatarId: "abigail",
    expertIn: "educacion",
    votes: {},
    delegation: {}
  },
  sofia: {
    name: "Sofia",
    color: "bg-red-500",
    role: "Public Health Doctor",
    avatarType: "image",
    avatarId: "sofia",
    expertIn: "salud",
    votes: {},
    delegation: {}
  }
};

const AVATAR_COLORS = [
  "bg-pink-500", "bg-blue-500", "bg-green-500", "bg-orange-500",
  "bg-yellow-500", "bg-purple-500", "bg-red-500", "bg-cyan-500",
  "bg-teal-500", "bg-indigo-500", "bg-rose-500", "bg-emerald-500"
];

const IMAGE_AVATARS = ["ana", "bruno", "carla", "maria", "pedro", "abigail", "sofia"];

const DEFAULT_IMAGE_MAP = {
  ana: "ana", bruno: "bruno", carla: "carla", maria: "maria",
  pedro: "pedro", abigail: "abigail", sofia: "sofia"
};


/* =====================
   STATE
   ===================== */

let currentTopic = "";
let topics = [];
let proposals = [];
let characters = {};
let builderOpen = false;


/* =====================
   STORAGE
   ===================== */

function saveToStorage() {
  const data = { topics, proposals, characters };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function resetToDefault() {
  localStorage.removeItem(STORAGE_KEY);
  topics = JSON.parse(JSON.stringify(DEFAULT_TOPICS));
  proposals = JSON.parse(JSON.stringify(DEFAULT_PROPOSALS));
  characters = JSON.parse(JSON.stringify(DEFAULT_CHARACTERS));
  initVotes();
  currentTopic = topics[0]?.id || "";
  state.setCurrentTopic(currentTopic);
  renderTopicButtons();
  render();
  toggleBuilder(false);
}

function loadData() {
  const isCustom = new URLSearchParams(window.location.search).get("custom") === "true";
  if (isCustom) {
    const saved = loadFromStorage();
    if (saved && saved.topics && saved.proposals && saved.characters) {
      topics = saved.topics;
      proposals = saved.proposals;
      characters = saved.characters;
      initVotes();
      return;
    }
  }
  topics = JSON.parse(JSON.stringify(DEFAULT_TOPICS));
  proposals = JSON.parse(JSON.stringify(DEFAULT_PROPOSALS));
  characters = JSON.parse(JSON.stringify(DEFAULT_CHARACTERS));
  initVotes();
}


/* =====================
   INIT
   ===================== */

function initVotes() {
  Object.values(characters).forEach(c => {
    proposals.forEach(p => {
      if (!c.votes) c.votes = {};
      c.votes[p.id] = null;
    });
    if (!c.delegation) c.delegation = {};
  });
}


/* =====================
   CORE INIT
   ===================== */

const core = getCore();
const state = core.init(proposals, characters);
loadData();
currentTopic = topics[0]?.id || "";
state.setCurrentTopic(currentTopic);
core.proposals = proposals;
core.characters = characters;


/* =====================
   TOPIC BUTTONS
   ===================== */

function renderTopicButtons() {
  const container = document.getElementById("topic-buttons");
  if (!container) return;
  container.innerHTML = topics.map(t =>
    `<button id="btn-${t.id}" onclick="setTopic('${t.id}')" class="topic-btn px-4 py-1 rounded-full text-sm font-semibold text-slate-400">${t.emoji} ${t.label}</button>`
  ).join("");
  updateTopicUI();
}

function setTopic(topic) {
  currentTopic = topic;
  state.setCurrentTopic(topic);
  updateTopicUI();
  render();
}

function updateTopicUI() {
  topics.forEach(t => {
    const btn = document.getElementById(`btn-${t.id}`);
    if (!btn) return;
    btn.className = currentTopic === t.id
      ? "topic-btn px-4 py-1 rounded-full text-sm font-semibold active"
      : "topic-btn px-4 py-1 rounded-full text-sm font-semibold text-slate-400";
  });
}


/* =====================
   RENDER
   ===================== */

function render() {
  // Sync core data
  core.proposals = proposals;
  core.characters = characters;

  const activeProposals = proposals.filter(p => p.topic === currentTopic);

  let html = `
  <div class="overflow-x-auto">
    <table class="min-w-[900px] w-full text-sm">
      <thead>
        <tr>
          <th class="p-4 text-left sticky left-0 glass z-10 rounded-tl-xl">${t("table_person")}</th>
          ${activeProposals.map(p => `
            <th class="p-4 text-center">
              <div class="font-semibold text-slate-200">${p.title}</div>
              <div class="text-xs text-slate-500">
                ${t("table_initiative")}
                ${p.status === "closed" ? `<span class="font-bold text-red-400">(${t("table_closed")})</span>` : ``}
              </div>
              <div class="mt-2 text-xs glass-light rounded-lg p-2">
                <div class="flex justify-between">
                  <span class="text-green-400">✔ ${core.calculateProposalResult(p).yes}</span>
                  <span class="text-red-400">✖ ${core.calculateProposalResult(p).no}</span>
                  <span class="text-slate-400">○ ${core.calculateProposalResult(p).abstain}</span>
                  ${core.calculateProposalResult(p).pending > 0 ? `<span class="text-amber-400">⏳ ${core.calculateProposalResult(p).pending}</span>` : ``}
                </div>
              </div>
            </th>
          `).join("")}
        </tr>
      </thead>
      <tbody>
  `;

  for (const id in characters) {
    const c = characters[id];
    const isExpert = c.expertIn === currentTopic;

    html += `
      <tr class="border-t border-white/5 align-top hover:bg-white/[0.02] transition-colors">
        <td class="p-4 sticky left-0 glass z-10">
          <div class="flex gap-3 min-w-[220px]">
            <div class="relative flex-shrink-0">
              ${renderAvatar(c, "w-14 h-14 rounded-full border-2 shadow-lg")}
              ${isExpert ? `<span class="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-glow-blue">⭐</span>` : ``}
            </div>
            <div>
              <div class="font-semibold capitalize text-slate-200">${c.name}</div>
              <div class="text-xs text-slate-500">${c.role}</div>
              <select class="mt-2 w-full" onchange="setDelegation('${id}', this.value)">
                <option value="">${t("table_select_placeholder")}</option>
                ${getAvailableDelegates(id).map(
                  (o) => `<option value="${o}" ${c.delegation[currentTopic] === o ? "selected" : ""}>${t("table_delegate_to")} ${characters[o].name}</option>`
                ).join("")}
              </select>
            </div>
          </div>
        </td>
    `;

    for (const p of activeProposals) {
      const isClosed = p.status === "closed";
      const finalVoterId = core.resolveFinalVoter(id, p);
      const finalVoter = characters[finalVoterId];
      const visual = core.getVoteVisual(finalVoter.votes[p.id], finalVoterId !== id);
      const received = core.getDelegatedVotes(id, p.id);
      const chain = core.getDelegationChain(id, p);

      html += `
        <td class="p-4 text-center">
          <div class="flex flex-col items-center gap-1 min-w-[120px]">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${visual.bg} shadow-lg text-sm">
              ${visual.icon}
            </div>
            <div class="text-[11px] text-slate-400">${visual.label}</div>
            ${received > 0 ? `<div class="text-xs font-semibold text-blue-400">+${received} ${t("table_delegated")}</div>` : ``}
            ${chain.length ? `<div class="text-[10px] text-slate-500">${chain.join("<br/>")}</div>` : ``}
            <select class="mt-1 ${isClosed ? "opacity-50 cursor-not-allowed" : ""}" ${isClosed ? "disabled" : ""} onchange="setVote('${id}','${p.id}',this.value)">
              <option value="">${t("table_vote_placeholder")}</option>
              <option value="yes" ${characters[id].votes[p.id] === "yes" ? "selected" : ""}>${t("table_vote_yes")}</option>
              <option value="no" ${characters[id].votes[p.id] === "no" ? "selected" : ""}>${t("table_vote_no")}</option>
              <option value="abstain" ${characters[id].votes[p.id] === "abstain" ? "selected" : ""}>${t("table_vote_abs")}</option>
            </select>
          </div>
        </td>
      `;
    }

    html += `</tr>`;
  }

  html += `</tbody></table></div>`;

  if (activeProposals.length === 0) {
    html = `<div class="text-center py-12 text-slate-500">${t("sim_no_proposals")}</div>`;
  }

  document.getElementById("app").innerHTML = html;
}


/* =====================
   AVATAR RENDER
   ===================== */

function renderAvatar(c, classes) {
  if (c.avatarType === "image" && c.avatarId) {
    return `<img src="/img/${c.avatarId}.png" class="${classes} ${c.color}" alt="${c.name}" />`;
  }
  const initials = c.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
  return `<div class="${classes} ${c.color} flex items-center justify-center text-white font-bold text-sm">${initials}</div>`;
}


/* =====================
   DELEGATION LOGIC
   ===================== */

function getAvailableDelegates(personId) {
  return Object.keys(characters).filter(o => o !== personId);
}


/* =====================
   ACTIONS
   ===================== */

function setVote(id, pid, value) {
  characters[id].votes[pid] = value || null;
  const proposal = proposals.find(p => p.id === pid);
  if (proposal) core.updateProposalStatus(proposal);
  render();
}

function setDelegation(id, value) {
  if (value) {
    characters[id].delegation[currentTopic] = value;
  } else {
    delete characters[id].delegation[currentTopic];
  }
  proposals.filter(p => p.topic === currentTopic).forEach(p => core.updateProposalStatus(p));
  render();
}

function resetState() {
  Object.keys(characters).forEach(id => {
    characters[id].votes = {};
    proposals.forEach(p => { characters[id].votes[p.id] = null; });
    characters[id].delegation = {};
  });
  proposals.forEach(p => { p.status = "open"; });
  render();
}


/* =====================
   BUILDER UI
   ===================== */

function toggleBuilder(open) {
  builderOpen = open !== undefined ? open : !builderOpen;
  const modal = document.getElementById("builder-modal");
  if (modal) {
    modal.classList.toggle("open", builderOpen);
    document.body.style.overflow = builderOpen ? "hidden" : "";
  }
  if (builderOpen) renderBuilder();
}

function renderBuilder() {
  renderBuilderTopics();
  renderBuilderProposals();
  renderBuilderCharacters();
  updateBuilderDropdowns();
}

function updateBuilderDropdowns() {
  const expertSelect = document.getElementById("new-char-expert");
  const filterSelect = document.getElementById("proposal-filter-topic");
  const options = topics.map(t => `<option value="${t.id}">${t.emoji} ${t.label}</option>`).join("");
  if (expertSelect) expertSelect.innerHTML = `<option value="">${t("builder_no_expertise") || "No expertise"}</option>` + options;
  if (filterSelect) {
    const currentVal = filterSelect.value;
    filterSelect.innerHTML = `<option value="">All topics</option>` + options;
    filterSelect.value = currentVal;
  }
}

/* --- Topics --- */

function renderBuilderTopics() {
  const el = document.getElementById("builder-topics-list");
  if (!el) return;
  el.innerHTML = topics.map((topic, i) => `
    <div class="flex items-center justify-between glass-light rounded-lg px-3 py-2">
      <span class="text-sm">${topic.emoji} ${topic.label} <span class="text-slate-500 text-xs">(${topic.id})</span></span>
      <button onclick="removeTopic(${i})" class="text-red-400 hover:text-red-300 text-sm px-2">✕</button>
    </div>
  `).join("");
}

function addTopic() {
  const label = document.getElementById("new-topic-label").value.trim();
  const emoji = document.getElementById("new-topic-emoji").value.trim() || "📋";
  if (!label) return;
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/(^_|_$)/g, "") + "_" + Date.now();
  topics.push({ id, label, emoji });
  document.getElementById("new-topic-label").value = "";
  document.getElementById("new-topic-emoji").value = "";
  renderBuilderTopics();
  updateBuilderDropdowns();
}

function removeTopic(index) {
  const topic = topics[index];
  if (!confirm(t("builder_confirm_delete_topic") + ` "${topic.label}"?`)) return;
  topics.splice(index, 1);
  proposals = proposals.filter(p => p.topic !== topic.id);
  Object.values(characters).forEach(c => {
    delete c.delegation[topic.id];
    if (c.expertIn === topic.id) c.expertIn = null;
  });
  renderBuilderTopics();
  renderBuilderProposals();
  renderBuilderCharacters();
  updateBuilderDropdowns();
}

/* --- Proposals --- */

function renderBuilderProposals() {
  const el = document.getElementById("builder-proposals-list");
  if (!el) return;
  const topicSelect = document.getElementById("proposal-topic-select");
  if (topicSelect) {
    topicSelect.innerHTML = topics.map(t => `<option value="${t.id}">${t.emoji} ${t.label}</option>`).join("");
  }
  const filterTopic = document.getElementById("proposal-filter-topic")?.value || "";
  const filtered = filterTopic ? proposals.filter(p => p.topic === filterTopic) : proposals;
  el.innerHTML = filtered.map((p, i) => {
    const realIndex = proposals.indexOf(p);
    const topic = topics.find(t => t.id === p.topic);
    return `
      <div class="flex items-center justify-between glass-light rounded-lg px-3 py-2">
        <span class="text-sm">${topic?.emoji || "📋"} ${p.title}</span>
        <button onclick="removeProposal(${realIndex})" class="text-red-400 hover:text-red-300 text-sm px-2">✕</button>
      </div>
    `;
  }).join("");
}

function addProposal() {
  const title = document.getElementById("new-proposal-title").value.trim();
  const topicId = document.getElementById("proposal-topic-select").value;
  if (!title || !topicId) return;
  proposals.push({
    id: "custom_" + Date.now(),
    title,
    topic: topicId,
    status: "open"
  });
  Object.values(characters).forEach(c => {
    proposals.forEach(p => { if (!(p.id in c.votes)) c.votes[p.id] = null; });
  });
  document.getElementById("new-proposal-title").value = "";
  renderBuilderProposals();
}

function removeProposal(index) {
  const proposal = proposals[index];
  if (!confirm(t("builder_confirm_delete_proposal") + ` "${proposal.title}"?`)) return;
  proposals.splice(index, 1);
  Object.values(characters).forEach(c => { delete c.votes[proposal.id]; });
  renderBuilderProposals();
}

/* --- Characters --- */

function renderBuilderCharacters() {
  const el = document.getElementById("builder-characters-list");
  if (!el) return;
  el.innerHTML = Object.entries(characters).map(([id, c]) => {
    const topic = topics.find(t => t.id === c.expertIn);
    return `
      <div class="flex items-center justify-between glass-light rounded-lg px-3 py-2">
        <div class="flex items-center gap-2">
          ${renderAvatar(c, "w-8 h-8 rounded-full border " + c.color)}
          <div>
            <span class="text-sm font-semibold">${c.name}</span>
            <span class="text-xs text-slate-500 ml-2">${c.role}</span>
            ${topic ? `<span class="text-xs text-blue-400 ml-2">${topic.emoji} ${topic.label}</span>` : ""}
          </div>
        </div>
        <button onclick="removeCharacter('${id}')" class="text-red-400 hover:text-red-300 text-sm px-2">✕</button>
      </div>
    `;
  }).join("");
}

function addCharacter() {
  const name = document.getElementById("new-char-name").value.trim();
  const role = document.getElementById("new-char-role").value.trim() || "Citizen";
  const color = document.getElementById("new-char-color").value;
  const avatarType = document.getElementById("new-char-avatar-type").value;
  const avatarId = document.getElementById("new-char-avatar-id").value || null;
  const expertIn = document.getElementById("new-char-expert").value || null;
  if (!name) return;
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "_") + "_" + Date.now();
  characters[id] = {
    name,
    color,
    role,
    avatarType,
    avatarId: avatarType === "image" ? avatarId : null,
    expertIn,
    votes: {},
    delegation: {}
  };
  proposals.forEach(p => { characters[id].votes[p.id] = null; });
  document.getElementById("new-char-name").value = "";
  document.getElementById("new-char-role").value = "";
  renderBuilderCharacters();
}

function removeCharacter(id) {
  const c = characters[id];
  if (!confirm(t("builder_confirm_delete_character") + ` "${c.name}"?`)) return;
  delete characters[id];
  renderBuilderCharacters();
}

function toggleAvatarIdField() {
  const type = document.getElementById("new-char-avatar-type").value;
  const field = document.getElementById("avatar-id-field");
  if (field) field.classList.toggle("hidden", type !== "image");
}

/* --- Save --- */

function saveSimulator() {
  saveToStorage();
  window.open("index.html?custom=true", "_blank");
  toggleBuilder(false);
  showToast(t("builder_saved"));
}

function showToast(msg) {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();
  const div = document.createElement("div");
  div.id = "toast";
  div.className = "fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold text-sm animate-fade-in";
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 2500);
}


/* =====================
   INIT ON LOAD
   ===================== */

function applyCustomMode() {
  const isCustom = new URLSearchParams(window.location.search).get("custom") === "true";
  if (isCustom) {
    document.getElementById("hero-section")?.classList.add("hidden");
    document.getElementById("what-section")?.classList.add("hidden");
    document.getElementById("btn-back-default")?.classList.remove("hidden");
  }
}

applyCustomMode();
renderTopicButtons();
render();
