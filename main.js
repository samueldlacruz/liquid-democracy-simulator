/* =====================
   DATA
   ===================== */

let currentTopic = "medio_ambiente";

const proposals = [
  { id: "ma1", titleKey: "prop_ma1", topic: "medio_ambiente", status: "open" },
  { id: "ma2", titleKey: "prop_ma2", topic: "medio_ambiente", status: "open" },
  { id: "ma3", titleKey: "prop_ma3", topic: "medio_ambiente", status: "open" },
  { id: "ed1", titleKey: "prop_ed1", topic: "educacion", status: "open" },
  { id: "ed2", titleKey: "prop_ed2", topic: "educacion", status: "open" },
  { id: "ed3", titleKey: "prop_ed3", topic: "educacion", status: "open" },
  { id: "sa1", titleKey: "prop_sa1", topic: "salud", status: "open" },
  { id: "sa2", titleKey: "prop_sa2", topic: "salud", status: "open" },
  { id: "sa3", titleKey: "prop_sa3", topic: "salud", status: "open" }
];

const characters = {
  ana: {
    name: "ana",
    color: "bg-pink-500",
    role: "Ingeniera ambiental",
    expertIn: "medio_ambiente",
    votes: {},
    delegation: {}
  },
  bruno: {
    name: "bruno",
    color: "bg-blue-500",
    role: "Especialista en educación",
    expertIn: "educacion",
    votes: {},
    delegation: {}
  },
  carla: {
    name: "carla",
    color: "bg-green-500",
    role: "Ciudadana informada",
    expertIn: null,
    votes: {},
    delegation: {}
  },
  maria: {
    name: "maria",
    color: "bg-orange-500",
    role: "Activista ambiental",
    expertIn: "medio_ambiente",
    votes: {},
    delegation: {}
  },
  pedro: {
    name: "pedro",
    color: "bg-yellow-500",
    role: "Ciudadano apático",
    expertIn: null,
    votes: {},
    delegation: {}
  },
  abigail: {
    name: "abigail",
    color: "bg-purple-500",
    role: "Investigadora académica",
    expertIn: "educacion",
    votes: {},
    delegation: {}
  },
  sofia: {
    name: "sofia",
    color: "bg-red-500",
    role: "Médica de salud pública",
    expertIn: "salud",
    votes: {},
    delegation: {}
  }
};

Object.values(characters).forEach(c => {
  proposals.forEach(p => c.votes[p.id] = null);
});


/* =====================
   INITIALIZATION
   ===================== */

const core = getCore();
const state = core.init(proposals, characters);
currentTopic = "medio_ambiente";
state.setCurrentTopic("medio_ambiente");


/* =====================
   UI STATE
   ===================== */

function setTopic(topic) {
  currentTopic = topic;
  state.setCurrentTopic(topic);
  updateTopicUI();
  render();
}

function updateTopicUI() {
  const topics = ["medio_ambiente", "educacion", "salud"];
  const ids = { medio_ambiente: "btn-medio", educacion: "btn-edu", salud: "btn-salud" };

  topics.forEach(topic => {
    const btn = document.getElementById(ids[topic]);
    if (!btn) return;
    btn.className = currentTopic === topic
      ? "topic-btn px-4 py-1 rounded-full text-sm font-semibold active"
      : "topic-btn px-4 py-1 rounded-full text-sm font-semibold text-slate-400";
  });
}


/* =====================
   RENDER
   ===================== */

function render() {
  const activeProposals = state.getActiveProposals();

  let html = `
  <div class="overflow-x-auto">
    <table class="min-w-[900px] w-full text-sm">
      <thead>
        <tr>
          <th class="p-4 text-left sticky left-0 glass z-10 rounded-tl-xl">${t("table_person")}</th>
          ${activeProposals.map(p => `
            <th class="p-4 text-center">
              <div class="font-semibold text-slate-200">${t(p.titleKey)}</div>
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

  for (const id in state.characters) {
    const c = state.characters[id];
    const isExpert = c.expertIn === currentTopic;

    html += `
      <tr class="border-t border-white/5 align-top hover:bg-white/[0.02] transition-colors">
        <td class="p-4 sticky left-0 glass z-10">
          <div class="flex gap-3 min-w-[220px]">
            <div class="relative flex-shrink-0">
              <img src="/img/${c.name}.png" class="w-14 h-14 rounded-full border-2 ${c.color} shadow-lg" />
              ${isExpert ? `<span class="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-glow-blue">⭐</span>` : ``}
            </div>
            <div>
              <div class="font-semibold capitalize text-slate-200">${c.name}</div>
              <div class="text-xs text-slate-500">${c.role}</div>
              <select class="mt-2 w-full" onchange="setDelegation('${id}', this.value)">
                <option value="">${t("table_select_placeholder")}</option>
                ${core.getAvailableDelegates(id).map(
                  (o) => `<option value="${o}" ${c.delegation[currentTopic] === o ? "selected" : ""}>${t("table_delegate_to")} ${state.characters[o].name}</option>`
                ).join("")}
              </select>
            </div>
          </div>
        </td>
    `;

    for (const p of activeProposals) {
      const isClosed = p.status === "closed";
      const finalVoterId = core.resolveFinalVoter(id, p);
      const finalVoter = state.characters[finalVoterId];
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
              <option value="yes" ${state.characters[id].votes[p.id] === "yes" ? "selected" : ""}>${t("table_vote_yes")}</option>
              <option value="no" ${state.characters[id].votes[p.id] === "no" ? "selected" : ""}>${t("table_vote_no")}</option>
              <option value="abstain" ${state.characters[id].votes[p.id] === "abstain" ? "selected" : ""}>${t("table_vote_abs")}</option>
            </select>
          </div>
        </td>
      `;
    }

    html += `</tr>`;
  }

  html += `</tbody></table></div>`;
  document.getElementById("app").innerHTML = html;
}


/* =====================
   ACTIONS
   ===================== */

function setVote(id, pid, value) {
  state.characters[id].votes[pid] = value || null;
  const proposal = proposals.find(p => p.id === pid);
  if (proposal) core.updateProposalStatus(proposal);
  render();
}

function setDelegation(id, value) {
  if (value) {
    state.characters[id].delegation[currentTopic] = value;
  } else {
    delete state.characters[id].delegation[currentTopic];
  }

  const topicProposals = proposals.filter(p => p.topic === currentTopic);
  topicProposals.forEach(proposal => core.updateProposalStatus(proposal));
  render();
}

function resetState() {
  core.reset();
  render();
}


/* =====================
   INIT
   ===================== */

updateTopicUI();
render();
