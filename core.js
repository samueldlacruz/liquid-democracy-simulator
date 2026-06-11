class Core {
  constructor() {
    this.proposals = [];
    this.characters = {};
    this.currentTopic = "";
  }

  init(proposals, characters) {
    Object.values(characters).forEach(c => {
      proposals.forEach(p => c.votes[p.id] = null);
    });

    this.proposals = [...proposals];
    this.characters = { ...characters };
    this.currentTopic = "";

    return {
      proposals: this.proposals,
      characters: this.characters,
      currentTopic: this.currentTopic,
      resolveFinalVoter: (...args) => this.resolveFinalVoter(...args),
      resolveDelegationChain: (...args) => this.resolveDelegationChain(...args),
      getAvailableDelegates: (...args) => this.getAvailableDelegates(...args),
      getVoteVisual: (...args) => this.getVoteVisual(...args),
      calculateProposalResult: (...args) => this.calculateProposalResult(...args),
      getDelegatedVotes: (...args) => this.getDelegatedVotes(...args),
      getDelegationChain: (...args) => this.getDelegationChain(...args),
      updateProposalStatus: (...args) => this.updateProposalStatus(...args),
      isProposalComplete: (...args) => this.isProposalComplete(...args),
      getProposalsByTopic: (...args) => this.getProposalsByTopic(...args),
      getCharactersByExpertise: (...args) => this.getCharactersByExpertise(...args),
      getAllCharacters: (...args) => this.getAllCharacters(...args),
      getActiveProposals: (...args) => this.getActiveProposals(...args),
      reset: () => this.reset(),
      getCurrentTopic: () => this.currentTopic,
      setCurrentTopic: (topic) => { this.currentTopic = topic; return this; }
    };
  }

  /* =====================
     CORE VOTING LOGIC
     ===================== */
  // FIX: Added visited.add(personId) to prevent infinite recursion on circular delegations

  resolveFinalVoter(personId, proposal) {
    const visited = new Set();
    return this.resolveDelegationChain(personId, proposal, visited);
  }

  resolveDelegationChain(personId, proposal, visited) {
    if (visited.has(personId)) return personId;
    visited.add(personId);

    const person = this.characters[personId];
    if (!person) return personId;

    if (person.votes[proposal.id] !== null) {
      return personId;
    }

    // FIX: Consistent delegation lookup - currentTopic first, then proposal.id
    const delegationToCheck =
      person.delegation[this.currentTopic] ||
      person.delegation[proposal.id];

    if (!delegationToCheck) {
      return personId;
    }

    return this.resolveDelegationChain(delegationToCheck, proposal, visited);
  }

  /* =====================
     DELEGATION MANAGEMENT
     ===================== */
  // FIX: Removed artificial limitation - multiple people CAN delegate to the same person

  getAvailableDelegates(personId) {
    return Object.keys(this.characters).filter(o => o !== personId);
  }

  /* =====================
     VOTE DISPLAY
     ===================== */

  getVoteVisual(vote, delegated) {
    if (vote === "yes") return { bg: "bg-green-500", icon: "✔", label: t("vote_yes") };
    if (vote === "no") return { bg: "bg-red-500", icon: "✖", label: t("vote_no") };
    if (vote === "abstain") return { bg: "bg-gray-500", icon: "○", label: t("vote_abstain") };
    if (delegated) return { bg: "bg-purple-500", icon: "↗", label: t("vote_delegated") };
    return { bg: "bg-slate-600", icon: "—", label: t("vote_none") };
  }

  // FIX: calculateProposalResult now counts total participants and pending votes
  calculateProposalResult(proposal) {
    const result = { yes: 0, no: 0, abstain: 0, pending: 0, total: 0 };

    Object.keys(this.characters).forEach(id => {
      result.total++;
      const finalVoterId = this.resolveFinalVoter(id, proposal);
      const vote = this.characters[finalVoterId].votes[proposal.id];
      if (vote === null) {
        result.pending++;
        return;
      }
      result[vote] += 1;
    });

    return result;
  }

  getDelegatedVotes(targetId, proposalId) {
    const proposal = this.proposals.find(p => p.id === proposalId);
    let count = 0;

    for (const id in this.characters) {
      if (id === targetId) continue;
      if (this.resolveFinalVoter(id, proposal) === targetId) count++;
    }
    return count;
  }

  // FIX: Consistent delegation lookup order - currentTopic first, then proposal.id
  getDelegationChain(personId, proposal) {
    const chain = [];
    let current = personId;
    const visited = new Set();

    while (!visited.has(current)) {
      visited.add(current);
      const person = this.characters[current];
      if (!person) break;

      if (person.votes[proposal.id] !== null) break;

      const delegate =
        person.delegation[this.currentTopic] ||
        person.delegation[proposal.id];

      if (!delegate) break;

      chain.push(`${person.name} → ${this.characters[delegate].name}`);
      current = delegate;
    }

    return chain;
  }

  /* =====================
     PROPOSAL STATUS
     ===================== */

  updateProposalStatus(proposal) {
    if (proposal.status === "closed") return;

    let isComplete = true;
    for (const id in this.characters) {
      const finalVoterId = this.resolveFinalVoter(id, proposal);
      if (this.characters[finalVoterId].votes[proposal.id] === null) {
        isComplete = false;
        break;
      }
    }

    if (isComplete) proposal.status = "closed";
  }

  isProposalComplete(proposal) {
    for (const id in this.characters) {
      const finalVoterId = this.resolveFinalVoter(id, proposal);
      if (this.characters[finalVoterId].votes[proposal.id] === null) {
        return false;
      }
    }
    return true;
  }

  /* =====================
     STATE MANAGEMENT
     ===================== */
  // FIX: Reset delegation to empty object instead of deleting it

  reset() {
    Object.keys(this.characters).forEach(id => {
      this.characters[id].votes = {};
      Object.values(this.proposals).forEach(p => {
        this.characters[id].votes[p.id] = null;
      });
      this.characters[id].delegation = {};
    });

    this.proposals.forEach(p => {
      p.status = "open";
    });

    return this;
  }

  /* =====================
     FILTERS
     ===================== */

  getProposalsByTopic(topic) {
    return this.proposals.filter(p => p.topic === topic);
  }

  getCharactersByExpertise(topic) {
    return Object.values(this.characters).filter(c => c.expertIn === topic);
  }

  getAllCharacters() {
    return Object.values(this.characters);
  }

  getActiveProposals() {
    return this.proposals.filter(p => p.topic === this.currentTopic);
  }
}

let coreInstance = null;

function getCore() {
  if (!coreInstance) {
    coreInstance = new Core();
  }
  return coreInstance;
}

function init(proposals, characters) {
  const core = getCore();
  return core.init(proposals, characters);
}
