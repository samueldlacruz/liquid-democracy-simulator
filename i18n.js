/* =====================
   i18n: Spanish + English
   ===================== */

const translations = {
  es: {
    // Hero
    hero_badge: "🎓 Simulación educativa",
    hero_title_line1: "Democracia",
    hero_title_line2: "Líquida",
    hero_title_line3: "en Acción",
    hero_description: "Explora cómo funciona la democracia líquida: voto directo, delegación flexible, expertos por tópico y resultados colectivos visibles en tiempo real.",
    hero_cta_simulator: "Probar simulador",
    hero_cta_learn: "¿Qué es esto?",
    hero_cta_create: "⚙ Crear Simulador",
    hero_stat_participants: "Participantes",
    hero_stat_initiatives: "Iniciativas",
    hero_stat_topics: "Tópicos",

    // What is
    what_title: "¿Qué es la Democracia Líquida?",
    what_desc1: "La democracia líquida es un modelo de participación que combina lo mejor de dos mundos:",
    what_li1: "Voto directo en cada iniciativa",
    what_li2: "Delegación flexible del voto",
    what_li3: "Delegación por tópicos específicos",
    what_li4: "Revocabilidad en cualquier momento",
    what_desc2: "En lugar de elegir representantes fijos, cada persona decide:",
    what_li5: "Cuándo votar directamente",
    what_li6: "En qué temas delegar",
    what_li7: "A quién confiar su voto",
    what_footer: "El poder fluye dinámicamente según la confianza y el conocimiento.",

    // Example
    what_example_title: "Ejemplo Práctico",
    what_example_direct: "Voto Directo",
    what_example_delegation: "Cadena de Delegación",
    what_example_ana_role: "Ingeniera ambiental",
    what_example_pedro_role: "Ciudadano apático",
    what_example_bruno_role: "Especialista en educación",
    what_example_vote_env: "Vota SÍ a los<br/>Incentivos Solares",
    what_example_delegation_desc: "Pedro confía en Bruno para Educación → Bruno vota SÍ a Educación Digital",

    // Simulator
    sim_topic: "Tópico:",
    topic_environment: "Medio Ambiente",
    topic_education: "Educación",
    topic_health: "Salud",
    sim_reset: "Reiniciar simulación",

    // Table
    table_person: "Persona",
    table_initiative: "Iniciativa",
    table_closed: "CERRADA",
    table_vote_yes: "Sí",
    table_vote_no: "No",
    table_vote_abs: "Abs",
    table_delegated: "Delegados",
    table_select_placeholder: "Sin delegar",
    table_delegate_to: "Delegar en",
    table_vote_placeholder: "Votar",

    // Vote states
    vote_yes: "A favor",
    vote_no: "En contra",
    vote_abstain: "Abstención",
    vote_delegated: "Delegado",
    vote_none: "Sin decisión",

    // Proposals
    prop_ma1: "Incentivos fiscales a la energía solar residencial",
    prop_ma2: "Prohibición gradual de plásticos de un solo uso",
    prop_ma3: "Programa nacional de reforestación urbana",
    prop_ed1: "Capacitación docente obligatoria cada 3 años",
    prop_ed2: "Educación digital desde el nivel primario",
    prop_ed3: "Financiamiento público para investigación universitaria",
    prop_sa1: "Cobertura universal de atención primaria",
    prop_sa2: "Regulación del precio de medicamentos esenciales",
    prop_sa3: "Programa nacional de salud mental",

    // Disclaimer
    disclaimer_title: "📋 Nota pedagógica:",
    disclaimer_p1: "Este simulador es una herramienta educativa. No representa un sistema electoral real ni un modelo normativo definitivo de democracia líquida.",
    disclaimer_p2: "Las decisiones de diseño buscan facilitar la comprensión del modelo: voto directo, delegación por tópicos, cadenas de delegación y resultados colectivos visibles.",

    // Footer
    footer: "Proyecto open-source · Simulación educativa · Democracia líquida",

    // Nav
    nav_back_default: "← Volver al Default",

    // Builder
    sim_create: "⚙ Crear Simulador",
    sim_no_proposals: "No hay iniciativas para este tópico",
    builder_title: "⚙ Crea tu Simulador",
    builder_save: "💾 Guardar Simulador",
    builder_save_run: "▶ Guardar y Ejecutar",
    builder_reset_default: "↺ Restaurar Predeterminado",
    builder_topics: "📋 Tópicos",
    builder_proposals: "📌 Iniciativas",
    builder_characters: "👥 Personajes",
    builder_add: "+ Agregar",
    builder_topic_name_ph: "Nombre del tópico",
    builder_proposal_title_ph: "Título de la iniciativa",
    builder_char_name_ph: "Nombre",
    builder_char_role_ph: "Rol",
    builder_confirm_delete_topic: "¿Eliminar tópico",
    builder_confirm_delete_proposal: "¿Eliminar iniciativa",
    builder_confirm_delete_character: "¿Eliminar personaje",
    builder_saved: "Simulador guardado correctamente",
  },

  en: {
    // Hero
    hero_badge: "🎓 Educational Simulation",
    hero_title_line1: "Liquid",
    hero_title_line2: "Democracy",
    hero_title_line3: "in Action",
    hero_description: "Explore how liquid democracy works: direct voting, flexible delegation, topic-specific experts, and collective results visible in real time.",
    hero_cta_simulator: "Try Simulator",
    hero_cta_learn: "What is this?",
    hero_cta_create: "Create Simulator",
    hero_stat_participants: "Participants",
    hero_stat_initiatives: "Initiatives",
    hero_stat_topics: "Topics",

    // What is
    what_title: "What is Liquid Democracy?",
    what_desc1: "Liquid democracy is a participation model that combines the best of two worlds:",
    what_li1: "Direct voting on each initiative",
    what_li2: "Flexible vote delegation",
    what_li3: "Delegation by specific topics",
    what_li4: "Revocability at any time",
    what_desc2: "Instead of choosing fixed representatives, each person decides:",
    what_li5: "When to vote directly",
    what_li6: "Which topics to delegate",
    what_li7: "Who to trust with their vote",
    what_footer: "Power flows dynamically based on trust and knowledge.",

    // Example
    what_example_title: "Practical Example",
    what_example_direct: "Direct Vote",
    what_example_delegation: "Delegation Chain",
    what_example_ana_role: "Environmental Engineer",
    what_example_pedro_role: "Apathetic Citizen",
    what_example_bruno_role: "Education Specialist",
    what_example_vote_env: "Votes YES on<br/>Solar Incentives",
    what_example_delegation_desc: "Pedro trusts Bruno on Education → Bruno votes YES on Digital Education",

    // Simulator
    sim_topic: "Topic:",
    topic_environment: "Environment",
    topic_education: "Education",
    topic_health: "Health",
    sim_reset: "Reset Simulation",

    // Table
    table_person: "Person",
    table_initiative: "Initiative",
    table_closed: "CLOSED",
    table_vote_yes: "Yes",
    table_vote_no: "No",
    table_vote_abs: "Abs",
    table_delegated: "delegated",
    table_select_placeholder: "No delegation",
    table_delegate_to: "Delegate to",
    table_vote_placeholder: "Vote",

    // Vote states
    vote_yes: "In favor",
    vote_no: "Against",
    vote_abstain: "Abstention",
    vote_delegated: "Delegated",
    vote_none: "No decision",

    // Proposals
    prop_ma1: "Tax incentives for residential solar energy",
    prop_ma2: "Gradual ban on single-use plastics",
    prop_ma3: "National urban reforestation program",
    prop_ed1: "Mandatory teacher training every 3 years",
    prop_ed2: "Digital education from primary level",
    prop_ed3: "Public funding for university research",
    prop_sa1: "Universal primary healthcare coverage",
    prop_sa2: "Regulation of essential medication prices",
    prop_sa3: "National mental health program",

    // Disclaimer
    disclaimer_title: "📋 Pedagogical Note:",
    disclaimer_p1: "This simulator is an educational tool. It does not represent a real electoral system or a definitive normative model of liquid democracy.",
    disclaimer_p2: "Design decisions aim to facilitate understanding of the model: direct voting, topic delegation, delegation chains, and visible collective results.",

    // Footer
    footer: "Open-source project · Educational simulation · Liquid democracy",

    // Nav
    nav_back_default: "← Back to Default",

    // Builder
    sim_create: "Create Simulator",
    sim_no_proposals: "No initiatives for this topic",
    builder_title: "⚙ Create Your Simulator",
    builder_save: "💾 Save Simulator",
    builder_save_run: "▶ Save & Run",
    builder_reset_default: "↺ Reset Default",
    builder_topics: "📋 Topics",
    builder_proposals: "📌 Initiatives",
    builder_characters: "👥 Characters",
    builder_add: "+ Add",
    builder_topic_name_ph: "Topic name",
    builder_proposal_title_ph: "Initiative title",
    builder_char_name_ph: "Name",
    builder_char_role_ph: "Role",
    builder_confirm_delete_topic: "Delete topic",
    builder_confirm_delete_proposal: "Delete initiative",
    builder_confirm_delete_character: "Delete character",
    builder_saved: "Simulator saved successfully",
  }
};

let currentLang = localStorage.getItem("lang") || "en";

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || translations["es"][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  applyTranslations();
  const btn = document.getElementById("lang-toggle");
  if (btn) btn.textContent = lang === "es" ? "EN" : "ES";
}

function toggleLang() {
  setLang(currentLang === "es" ? "en" : "es");
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translated = t(key);
    if (translated) el.innerHTML = translated;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const translated = t(key);
    if (translated) el.placeholder = translated;
  });
}

// Apply on load
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  const btn = document.getElementById("lang-toggle");
  if (btn) btn.textContent = currentLang === "es" ? "EN" : "ES";
});
