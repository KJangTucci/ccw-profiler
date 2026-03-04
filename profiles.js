// profiles.js

// =====================================================
// 1. Strength Scripts (9 Total)
// =====================================================

window.CCW_SCRIPTS = {

  familial: `
You draw strength from your family’s history, values, and lessons. Your familial capital is evident in the ways intergenerational knowledge, sacrifice, and shared aspirations shape how you approach your education. You may feel responsible for  honoring those who came before you, and that sense of connection can fuel persistence and long-term commitment to your goals. This strength often shows up as resilience, purpose, and a deep awareness that your achievements are connected to something larger than yourself.
`,

  chosen_familial: `
You cultivate kinship and belonging through your racial, ethnic, or cultural communities, even beyond biological family ties. Your chosen familial capital reflects your ability to build solidarity with others who share your identities or experiences, draw inspiration from community histories, and participate in collective spaces that affirm who you are. This strength often appears as mutual support, shared pride, and a sense of accountability to your community’s growth and well-being.
`,

  navigational: `
You know how to move through institutions, even when systems are complex or not designed with you in mind. Your navigational capital reflects the strategies you have developed to secure resources, manage competing responsibilities, and respond to challenges. This strength shows up in your problem-solving skills, adaptability, and capacity to juggle multiple demands while staying focused on your educational goals.[1.1]
`,

  aspirational: `
You sustain hope and a focus on your future goals despite barriers. Your aspirational capital reflects your ability to imagine possibilities, maintain belief in your skills, and continue striving even when obstacles arise. This strength often appears as persistence, optimism grounded in experience, and a commitment to making a meaningful difference in your own life and in society.
`,

  resistant_action: `
You actively work toward equity and justice. Your resistant action capital reflects your willingness to speak up against discrimination, challenge inequitable practices, and contribute to positive social change. This strength shows up in the courage to advocate for yourself and others,  as well as the ability to transform awareness of injustice into meaningful action.
`,

  resistant_awareness: `
You possess a critical understanding of systemic inequities. Your resistant awareness capital reflects your recognition of racism, discrimination, and structural injustice on campus, in your community, and in society more broadly. This strength appears as critical consciousness, contextual awareness, and the ability to interpret your experiences within broader social dynamics rather than internalizing barriers as personal shortcomings[2.1].
`,

  spiritual: `
You draw meaning, strength, and purpose from spirituality or faith. Your spiritual capital reflects an internal grounding that sustains you during difficulty and connects you to community. This strength often appears as inner resilience, moral clarity, and a sense of direction that guides your educational and life decisions.
`,

  linguistic_multilingual: `
You use your communication skills in multiple languages in ways that enrich your relationships and future opportunities. Your linguistic multilingual capital reflects cultural fluency, cognitive flexibility, and the ability to communicate across communities. This strength shows up as adaptability, expanded perspective, and the capacity to build bridges across linguistic and cultural contexts.
`,

  linguistic_modes_of_speech: `
You skillfully adjust your communication style depending on context and audience. Your linguistic modes of speech capital reflects your awareness of social dynamics and your ability to adapt expression across environments. This strength appears as social agility, cross-cultural communication skills, and the capacity to connect effectively with diverse groups.
`

};


// =====================================================
// 2. All 84 Profile Names (Top 3 Combinations)
// =====================================================

window.CCW_PROFILE_NAMES = {

  window.CCW_PROFILE_NAMES = {
  // Familial + Chosen Familial combinations
  "familial|chosen_familial|navigational": "Community-Minded Navigator",
  "familial|chosen_familial|aspirational": "Community-Minded Dreamer",
  "familial|chosen_familial|resistant_action": "Community-Minded Advocate",
  "familial|chosen_familial|resistant_awareness": "Community-Minded Observer” ,
  "familial|chosen_familial|spiritual": "Community-Minded Seeker",
  "familial|chosen_familial|linguistic_multilingual": "Community-Minded Translator ",
  "familial|chosen_familial|linguistic_modes_of_speech": "Community-MindedCommunicator",

  // Familial + Navigational combinations
  "familial|navigational|aspirational": "Purpose-Driven Pathfinder",
  "familial|navigational|resistant_action": "Strategic Family-Oriented Advocate",
  "familial|navigational|resistant_awareness": "Justice-OrientedNavigator",
  "familial|navigational|spiritual": "Spiritual Navigator” 
  "familial|navigational|linguistic_multilingual": "Multilingual Navigator",
  "familial|navigational|linguistic_modes_of_speech": "Pathfinding Communicator”

  // Familial + Aspirational combinations
  "familial|aspirational|resistant_action": "”Hopeful Advocate”,
  "familial|aspirational|resistant_awareness": "Justice-Oriented Dreamer” r",
  "familial|aspirational|spiritual": "Spiritually Rooted Dreamer",
  "familial|aspirational|linguistic_multilingual": "Multilingual  Dreamer",
  "familial|aspirational|linguistic_modes_of_speech": "Goal-Driven Communicator",

  // Familial + Resistant combinations
  "familial|resistant_action|resistant_awareness": "Conscientious Advocate",
  "familial|resistant_action|spiritual": "Spiritually Rooted Advocate”,
  "familial|resistant_action|linguistic_multilingual": "Multilingual Advocate” ,
  "familial|resistant_action|linguistic_modes_of_speech": “"Justice-Oriented Communicator”"  "familial|resistant_awareness|spiritual": "Spiritually Rooted Observer” ,
  "familial|resistant_awareness|linguistic_multilingual": "Justice-Oriented Translator”  Equity Builder",
  "familial|resistant_awareness|linguistic_modes_of_speech": "Justice-Oriented Communicator",
  "familial|spiritual|linguistic_multilingual": "Spiritually Rooted Translator r",
  "familial|spiritual|linguistic_modes_of_speech": "Spiritually Rooted Communicator",
  "familial|linguistic_multilingual|linguistic_modes_of_speech": "Community Builder",


  // Chosen Familial combinations
  "chosen_familial|navigational|aspirational": "Collective Pathway Architect",
  "chosen_familial|navigational|resistant_action": "Community  Advocate",
  "chosen_familial|navigational|resistant_awareness": "Community Navigator",
  "chosen_familial|navigational|spiritual": "Spiritually Rooted Community Advocate",
  "chosen_familial|navigational|linguistic_multilingual": "Justice Communicator",

  "chosen_familial|navigational|linguistic_modes_of_speech": "Community Liaison",

  "chosen_familial|aspirational|resistant_action": "Community Builder",
  "chosen_familial|aspirational|resistant_awareness": "Community- Visionary",
  "chosen_familial|aspirational|spiritual": "Spiritually Rooted Community Visionary",
  "chosen_familial|aspirational|linguistic_multilingual": "Community Interpreter",
  "chosen_familial|aspirational|linguistic_modes_of_speech": "Community Connector",


  "chosen_familial|resistant_action|resistant_awareness": "Community Justice Mobilizer",
  "chosen_familial|resistant_action|spiritual": "Faith-Driven Community Advocate",
  "chosen_familial|resistant_action|linguistic_multilingual": "Culturally Engaged Change Agent",
  "chosen_familial|resistant_action|linguistic_modes_of_speech": "Community Voice for Equity",
  "chosen_familial|resistant_awareness|spiritual": "Spiritually Rooted Community Builder",

  "chosen_familial|resistant_awareness|linguistic_multilingual": "Culturally Responsive Justice Advocate",
  "chosen_familial|resistant_awareness|linguistic_modes_of_speech": "Community Justice Advocate",
  "chosen_familial|spiritual|linguistic_multilingual": "Faith Based Community Builder",
  "chosen_familial|spiritual|linguistic_modes_of_speech": "Faith-Based Mentor",

  "chosen_familial|linguistic_multilingual|linguistic_modes_of_speech": "Culturally Responsive Community Builder",

  // Navigational-centered
  "navigational|aspirational|resistant_action": "Justice Advocate",
  "navigational|aspirational|resistant_awareness": "Equity-Aware Systems Architect",
  "navigational|aspirational|spiritual": "Faith Based ",
  "navigational|aspirational|linguistic_multilingual": "Globally Strategic Navigator",
  "navigational|aspirational|linguistic_modes_of_speech": "Adaptive Pathway Designer",
  "navigational|resistant_action|resistant_awareness": "Institutional Change Strategist",
  "navigational|resistant_action|spiritual": "Guided Systems Advocate",
  "navigational|resistant_action|linguistic_multilingual": "Culturally Skilled Change Navigator",
  "navigational|resistant_action|linguistic_modes_of_speech": "Strategic Equity Communicator",
  "navigational|resistant_awareness|spiritual": "Justice-Conscious and Spiritually-Guided Pathfinder",
  "navigational|resistant_awareness|linguistic_multilingual": "Equity-Oriented Multilingual Pathfinder ",
  "navigational|resistant_awareness|linguistic_modes_of_speech": "Equity-Oriented Communicative Strategist",
  "navigational|spiritual|linguistic_multilingual": "Spiritually-Guided Cultural Pathfinder",
  "navigational|spiritual|linguistic_modes_of_speech": "Spiritually-Guided Adaptive Strategist",
  "navigational|linguistic_multilingual|linguistic_modes_of_speech": "Globally Fluent Pathfinder",

  // Aspirational-centered
  "aspirational|resistant_action|resistant_awareness": "Visionary Justice Leader",
  "aspirational|resistant_action|spiritual": "Spiritually Grounded Visionary",
  "aspirational|resistant_action|linguistic_multilingual": "Globally Empowered Change Maker",
  "aspirational|resistant_action|linguistic_modes_of_speech": "Visionary Advocate Communicator",
  "aspirational|resistant_awareness|spiritual": "Spiritually Grounded Hope Builder",
  "aspirational|resistant_awareness|linguistic_multilingual": "Multilingual Dream Builder",
  "aspirational|resistant_awareness|linguistic_modes_of_speech": "Adaptive Visionary for Social Justice",
  "aspirational|spiritual|linguistic_multilingual": "Spiritually Grounded Global Dreamer",
  "aspirational|spiritual|linguistic_modes_of_speech": "Purposefully Adaptive Visionary",
  "aspirational|linguistic_multilingual|linguistic_modes_of_speech": "Adaptive and Fluent Future Architect",

  // Resistant-centered
  "resistant_action|resistant_awareness|spiritual": "Spiritually Grounded Justice Mobilizer",
  "resistant_action|resistant_awareness|linguistic_multilingual": "MultilingualJustice Advocate",
  "resistant_action|resistant_awareness|linguistic_modes_of_speech": "Adaptive Change Maker",
  "resistant_action|spiritual|linguistic_multilingual": "Spiritually Grounded Cultural Activator",
  "resistant_action|spiritual|linguistic_modes_of_speech": "Spiritually Grounded Equity Communicator",
  "resistant_action|linguistic_multilingual|linguistic_modes_of_speech": "Globally Fluent Justice Builder",
  "resistant_awareness|spiritual|linguistic_multilingual": "Spiritually Grounded Multilingual Visionary",
  "resistant_awareness|spiritual|linguistic_modes_of_speech": "Spiritually-GroundedEquity Communicator",
  "resistant_awareness|linguistic_multilingual|linguistic_modes_of_speech": "Culturally Insightful Visionary",

  // Final remaining combination
  "spiritual|linguistic_multilingual|linguistic_modes_of_speech": "Spiritually Anchored Global Communicator"
};

// Optional: map profile key to an image filename you will add later.
// Put images in a folder like /assets/profiles/ and reference them here.
// If an entry is missing, the app will simply not show an image.
//window.CCW_PROFILE_IMAGES = {
  // Example:
  // "familial|chosen_familial|navigational": "assets/profiles/community-grounded-navigator.png"
//};
window.CCW_DEFAULT_PROFILE_NAME = "Integrative Strength Portfolio";
// Ensure profile keys match app.js (sorted lookup)
(function normalizeProfileKeys() {
  const src = window.CCW_PROFILE_NAMES || {};
  const out = {};
  for (const [key, name] of Object.entries(src)) {
    const sorted = key.split("|").sort().join("|");
    out[sorted] = name;
  }
  window.CCW_PROFILE_NAMES = out;
})();

