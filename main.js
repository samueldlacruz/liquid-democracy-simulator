let currentTopic = "medio_ambiente";

/* =====================
   DATA
===================== */

const proposals = [
  { id: "ma1", title: "Incentivos fiscales a la energía solar residencial", topic: "medio_ambiente", status: "open" },
  { id: "ma2", title: "Prohibición gradual de plásticos de un solo uso", topic: "medio_ambiente", status: "open" },
  { id: "ma3", title: "Programa nacional de reforestación urbana", topic: "medio_ambiente", status: "open" },
  { id: "ed1", title: "Capacitación docente obligatoria cada 3 años", topic: "educacion", status: "open" },
  { id: "ed2", title: "Educación digital desde el nivel primario", topic: "educacion", status: "open" },
  { id: "ed3", title: "Financiamiento público para investigación universitaria", topic: "educacion", status: "open" },
  { id: "sa1", title: "Cobertura universal de atención primaria", topic: "salud", status: "open" },
  { id: "sa2", title: "Regulación del precio de medicamentos esenciales", topic: "salud", status: "open" },
  { id: "sa3", title: "Programa nacional de salud mental", topic: "salud", status: "open" }
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

  // 👩‍⚕️ Nuevo personaje experto en salud
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
   CORE LOGIC
===================== */

function resolveFinalVoter(personId, proposal, visited = new Set()) {
  if (visited.has(personId)) return personId;
  visited.add(personId);

  const person = characters[personId];

  if (person.votes[proposal.id] !== null) return personId;

  const proposalDelegate = person.delegation[proposal.id];
  if (proposalDelegate) {
    return resolveFinalVoter(proposalDelegate, proposal, visited);
  }

  const topicDelegate = person.delegation[proposal.topic];
  if (topicDelegate) {
    return resolveFinalVoter(topicDelegate, proposal, visited);
  }

  return personId;
}

function getDelegatedVotes(targetId, proposalId) {
  const proposal = proposals.find(p => p.id === proposalId);
  let count = 0;

  for (const id in characters) {
    if (id === targetId) continue;
    if (resolveFinalVoter(id, proposal) === targetId) count++;
  }
  return count;
}

function getVoteVisual(vote, delegated) {
  if (vote === "yes") return { bg: "bg-green-500", icon: "✔", label: "A favor" };
  if (vote === "no") return { bg: "bg-red-500", icon: "✖", label: "En contra" };
  if (vote === "abstain") return { bg: "bg-gray-400", icon: "○", label: "Abstención" };
  if (delegated) return { bg: "bg-slate-400", icon: "↗", label: "Delegado" };
  return { bg: "bg-gray-200", icon: "", label: "Sin decisión" };
}

function calculateProposalResult(proposal) {
  const result = { yes: 0, no: 0, abstain: 0 };

  Object.keys(characters).forEach(id => {
    const finalVoterId = resolveFinalVoter(id, proposal);
    const vote = characters[finalVoterId].votes[proposal.id];
    if (!vote) return;

    // cada persona aporta exactamente 1 voto
    result[vote] += 1;
  });

  return result;
}

function getDelegationChain(personId, proposal) {
  const chain = [];
  let current = personId;
  const visited = new Set();

  while (!visited.has(current)) {
    visited.add(current);
    const person = characters[current];

    if (person.votes[proposal.id] !== null) break;

    const delegate =
      person.delegation[proposal.id] ||
      person.delegation[proposal.topic];

    if (!delegate) break;

    chain.push(`${person.name} → ${characters[delegate].name}`);
    current = delegate;
  }

  return chain;
}

function isProposalComplete(proposal) {
  return Object.keys(characters).every(id => {
    const finalVoterId = resolveFinalVoter(id, proposal);
    return characters[finalVoterId].votes[proposal.id] !== null;
  });
}

function updateProposalStatus(proposal) {
  if (proposal.status === "closed") return;

  if (isProposalComplete(proposal)) {
    proposal.status = "closed";
  }
}


/* =====================
   UI STATE
===================== */

function setTopic(topic) {
  currentTopic = topic;
  updateTopicUI();
  render();
}

function updateTopicUI() {
  const topics = ["medio_ambiente", "educacion", "salud"];

  topics.forEach(topic => {
    const btn = document.getElementById(
      topic === "medio_ambiente"
        ? "btn-medio"
        : topic === "educacion"
        ? "btn-edu"
        : "btn-salud"
    );

    if (!btn) return;

    btn.className =
      currentTopic === topic
        ? "px-4 py-1 rounded-full text-sm font-semibold bg-black text-white"
        : "px-4 py-1 rounded-full text-sm font-semibold text-gray-600";
  });
}

/* =====================
   RENDER
===================== */

function render() {
  const activeProposals = proposals.filter(p => p.topic === currentTopic);

  const proposalResults = {};
  activeProposals.forEach(p => {
    proposalResults[p.id] = calculateProposalResult(p);
  });

  let html = `
  <div class="overflow-x-auto">
    <table class="min-w-[900px] w-full border-collapse text-sm">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-4 text-left sticky left-0 bg-gray-100 z-10">Persona</th>
          ${activeProposals.map(p => `
            <th class="p-4 text-center">
              <div class="font-semibold">${p.title}</div>
              <div class="text-xs text-gray-500">
               Iniciativa
                ${p.status === "closed" ? `<span class="font-bold text-red-600">(CERRADA)</span>` : ``}
              </div>
              <div class="mt-2 text-xs bg-gray-50 rounded p-2">
              <div class="flex justify-between">
                <span class="text-green-600">✔ ${proposalResults[p.id].yes}</span>
                <span class="text-red-600">✖ ${proposalResults[p.id].no}</span>
                <span class="text-gray-500">○ ${proposalResults[p.id].abstain}</span>
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
      <tr class="border-t align-top">
        <td class="p-4 sticky left-0 bg-white z-10">
          <div class="flex gap-3 min-w-[220px]">
            <div class="relative">
              <img src="/img/${c.name}.png" class="w-16 h-16 rounded-full border-4 ${c.color}" />
              ${isExpert ? `<span class="absolute -bottom-1 -right-1 bg-black text-white text-[10px] px-2 py-0.5 rounded-full">Experto</span>` : ``}
            </div>
            <div>
              <div class="font-semibold capitalize">${c.name}</div>
              <div class="text-xs text-gray-600 font-medium">${c.role}</div>

            <select class="mt-2 text-xs border rounded px-2 py-1 w-full" onchange="setDelegation('${id}', this.value)">
                <option value="">Sin delegar</option>
                ${Object.keys(characters)
                  .filter((o) => o !== id)
                  .map(
                    (o) =>
                      `<option value="${o}" ${c.delegation[currentTopic] === o ? "selected" : ""}>Delegar en ${characters[o].name}</option>`,
                  )
                  .join("")}
              </select>
            </div>
          </div>
        </td>
    `;

    for (const p of activeProposals) {
      const isClosed = p.status === "closed";
      const finalVoterId = resolveFinalVoter(id, p);
      const finalVoter = characters[finalVoterId];
      const visual = getVoteVisual(finalVoter.votes[p.id], finalVoterId !== id);
      const received = getDelegatedVotes(id, p.id);
      const chain = getDelegationChain(id, p);


      html += `
        <td class="p-4 text-center">
          <div class="flex flex-col items-center gap-1 min-w-[120px]">

            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${visual.bg}">
              ${visual.icon}
            </div>

            <div class="text-[11px] text-gray-600">${visual.label}</div>

            ${received > 0 ? `<div class="text-xs font-semibold text-blue-600">+${received} delegados</div>` : ``}

            ${chain.length ? `<div class="text-[10px] text-gray-500">${chain.join("<br/>")}</div>` : ``}

            <select
                class="mt-1 text-xs border rounded px-2 py-1 ${isClosed ? "opacity-50 cursor-not-allowed" : ""}"
                ${isClosed ? "disabled" : ""}
                onchange="setVote('${id}','${p.id}',this.value)">
                <option value="">Delegar</option>
                <option value="yes" ${c.votes[p.id] === "yes" ? "selected" : ""}>Sí</option>
                <option value="no" ${c.votes[p.id] === "no" ? "selected" : ""}>No</option>
                <option value="abstain" ${c.votes[p.id] === "abstain" ? "selected" : ""}>Abs</option>
            </select>
          </div>
        </td>
      `;
    }

    html += `</tr>`;
  }

  html += `
      </tbody>
    </table>
  </div>
  `;

  document.getElementById("app").innerHTML = html;
}

/* =====================
   ACTIONS
===================== */

function setVote(id, pid, value) {
  characters[id].votes[pid] = value || null;

  const proposal = proposals.find(p => p.id === pid);
  updateProposalStatus(proposal);

  render();
}

function setDelegation(id, value) {
  if (value) {
    characters[id].delegation[currentTopic] = value;
  } else {
    delete characters[id].delegation[currentTopic];
  }

  proposals
    .filter(p => p.topic === currentTopic)
    .forEach(updateProposalStatus);

  render();
}

function resetState() {
  Object.values(characters).forEach(c => {
    Object.keys(c.votes).forEach(k => c.votes[k] = null);
    c.delegation = {};
  });

  proposals.forEach(p => {
    p.status = "open";
  });

  render();
}


updateTopicUI();
render();
