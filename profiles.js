// profiles.js

// =====================================================
// 1. Strength Scripts (9 Total)
// =====================================================

window.CCW_SCRIPTS = {

  familial: `
You draw strength from your family’s history, values, and lessons. Your familial capital reflects the ways intergenerational knowledge, sacrifice, and shared aspirations shape how you approach your education. You may feel a responsibility to honor those who came before you, and that sense of connection can fuel persistence and long-term commitment. This strength often shows up as resilience, purpose, and a deep awareness that your achievements are connected to something larger than yourself.
`,

  chosen_familial: `
You cultivate kinship and belonging through your racial, ethnic, or cultural communities, even beyond biological family ties. Your chosen familial capital reflects your ability to build solidarity, draw inspiration from community histories, and participate in collective spaces that affirm who you are. This strength often appears as mutual support, shared pride, and a sense of accountability to your community’s growth and well-being.
`,

  navigational: `
You know how to move through institutions, even when systems are complex or not designed with you in mind. Your navigational capital reflects the strategies you have developed to secure resources, manage competing responsibilities, and respond to challenges. This strength shows up in your problem-solving skills, adaptability, and capacity to juggle multiple demands while staying focused on your educational goals.
`,

  aspirational: `
You sustain hope and future orientation despite barriers. Your aspirational capital reflects your ability to imagine possibilities, maintain belief in your goals, and continue striving even when obstacles arise. This strength often appears as persistence, optimism grounded in experience, and a commitment to making a meaningful difference in your life and in society.
`,

  resistant_action: `
You actively work toward equity and justice. Your resistant action capital reflects your willingness to speak up against discrimination, challenge inequitable practices, and contribute to positive social change. This strength shows up in courage, advocacy, and the ability to transform awareness of injustice into meaningful action.
`,

  resistant_awareness: `
You possess a critical understanding of systemic inequities. Your resistant awareness capital reflects your recognition of racism, discrimination, and structural injustice in society and on campus. This strength appears as critical consciousness, contextual awareness, and the ability to interpret your experiences within broader social dynamics rather than internalizing barriers as personal shortcomings.
`,

  spiritual: `
You draw meaning, strength, and purpose from spirituality or faith. Your spiritual capital reflects an internal grounding that sustains you during difficulty and connects you to community. This strength often appears as inner resilience, moral clarity, and a sense of direction that guides your educational and life decisions.
`,

  linguistic_multilingual: `
You navigate multiple languages in ways that enrich your relationships and future opportunities. Your linguistic multilingual capital reflects cultural fluency, cognitive flexibility, and the ability to communicate across communities. This strength shows up as adaptability, expanded perspective, and the capacity to build bridges across linguistic and cultural contexts.
`,

  linguistic_modes_of_speech: `
You skillfully adjust your communication style depending on context and audience. Your linguistic modes of speech capital reflects your awareness of social dynamics and your ability to adapt expression across environments. This strength appears as social agility, cross-cultural communication skill, and the capacity to connect effectively with diverse groups.
`
};


// =====================================================
// 2. All 84 Profile Names (Top 3 Combinations)
// =====================================================

window.CCW_PROFILE_NAMES = {

  // Familial + Chosen Familial combinations
  "familial|chosen_familial|navigational": "Community-Grounded Navigator",
  "familial|chosen_familial|aspirational": "Heritage-Driven Visionary",
  "familial|chosen_familial|resistant_action": "Collective Advocate",
  "familial|chosen_familial|resistant_awareness": "Justice-Conscious Community Anchor",
  "familial|chosen_familial|spiritual": "Spiritually Rooted Kin Leader",
  "familial|chosen_familial|linguistic_multilingual": "Culturally Anchored Multilingual Connector",
  "familial|chosen_familial|linguistic_modes_of_speech": "Community-Responsive Communicator",

  // Familial + Navigational combinations
  "familial|navigational|aspirational": "Purpose-Driven Pathfinder",
  "familial|navigational|resistant_action": "Strategic Family Advocate",
  "familial|navigational|resistant_awareness": "Equity-Aware System Navigator",
  "familial|navigational|spiritual": "Grounded and Guided Strategist",
  "familial|navigational|linguistic_multilingual": "Culturally Fluent Navigator",
  "familial|navigational|linguistic_modes_of_speech": "Adaptive System Connector",

  // Familial + Aspirational combinations
  "familial|aspirational|resistant_action": "Resilient Justice Visionary",
  "familial|aspirational|resistant_awareness": "Hopeful Equity Builder",
  "familial|aspirational|spiritual": "Faith-Fueled Dream Builder",
  "familial|aspirational|linguistic_multilingual": "Globally Oriented Dreamer",
  "familial|aspirational|linguistic_modes_of_speech": "Visionary Bridge Communicator",

  // Familial + Resistant combinations
  "familial|resistant_action|resistant_awareness": "Community Justice Advocate",
  "familial|resistant_action|spiritual": "Spirit-Led Change Agent",
  "familial|resistant_action|linguistic_multilingual": "Culturally Empowered Activator",
  "familial|resistant_action|linguistic_modes_of_speech": "Voice-for-Equity Connector",
  "familial|resistant_awareness|spiritual": "Faith-Grounded Equity Witness",
  "familial|resistant_awareness|linguistic_multilingual": "Culturally Conscious Equity Builder",
  "familial|resistant_awareness|linguistic_modes_of_speech": "Justice-Oriented Communicator",
  "familial|spiritual|linguistic_multilingual": "Spiritually Anchored Cultural Connector",
  "familial|spiritual|linguistic_modes_of_speech": "Faith-Guided Adaptive Leader",
  "familial|linguistic_multilingual|linguistic_modes_of_speech": "Culturally Fluent Community Bridge",

  // Chosen Familial combinations
  "chosen_familial|navigational|aspirational": "Collective Pathway Architect",
  "chosen_familial|navigational|resistant_action": "Community Strategy Advocate",
  "chosen_familial|navigational|resistant_awareness": "Equity-Minded Community Navigator",
  "chosen_familial|navigational|spiritual": "Community-Guided System Builder",
  "chosen_familial|navigational|linguistic_multilingual": "Cultural Systems Connector",
  "chosen_familial|navigational|linguistic_modes_of_speech": "Community-Based Communicator",

  "chosen_familial|aspirational|resistant_action": "Collective Visionary for Justice",
  "chosen_familial|aspirational|resistant_awareness": "Community-Conscious Dream Builder",
  "chosen_familial|aspirational|spiritual": "Spirit-Led Community Visionary",
  "chosen_familial|aspirational|linguistic_multilingual": "Globally Connected Visionary",
  "chosen_familial|aspirational|linguistic_modes_of_speech": "Community Bridge Dreamer",

  "chosen_familial|resistant_action|resistant_awareness": "Collective Justice Mobilizer",
  "chosen_familial|resistant_action|spiritual": "Faith-Driven Community Advocate",
  "chosen_familial|resistant_action|linguistic_multilingual": "Culturally Engaged Change Agent",
  "chosen_familial|resistant_action|linguistic_modes_of_speech": "Community Voice for Equity",
  "chosen_familial|resistant_awareness|spiritual": "Spiritually Conscious Equity Builder",
  "chosen_familial|resistant_awareness|linguistic_multilingual": "Culturally Rooted Justice Builder",
  "chosen_familial|resistant_awareness|linguistic_modes_of_speech": "Community Equity Communicator",
  "chosen_familial|spiritual|linguistic_multilingual": "Spiritually Connected Cultural Bridge",
  "chosen_familial|spiritual|linguistic_modes_of_speech": "Faith-Centered Adaptive Leader",
  "chosen_familial|linguistic_multilingual|linguistic_modes_of_speech": "Culturally Agile Community Connector",

  // Navigational-centered
  "navigational|aspirational|resistant_action": "Strategic Justice Pathfinder",
  "navigational|aspirational|resistant_awareness": "Equity-Aware Systems Architect",
  "navigational|aspirational|spiritual": "Purposeful Systems Builder",
  "navigational|aspirational|linguistic_multilingual": "Globally Strategic Navigator",
  "navigational|aspirational|linguistic_modes_of_speech": "Adaptive Pathway Designer",

  "navigational|resistant_action|resistant_awareness": "Institutional Change Strategist",
  "navigational|resistant_action|spiritual": "Guided Systems Advocate",
  "navigational|resistant_action|linguistic_multilingual": "Culturally Skilled Change Navigator",
  "navigational|resistant_action|linguistic_modes_of_speech": "Strategic Equity Communicator",
  "navigational|resistant_awareness|spiritual": "Justice-Conscious Systems Builder",
  "navigational|resistant_awareness|linguistic_multilingual": "Culturally Attuned Navigator",
  "navigational|resistant_awareness|linguistic_modes_of_speech": "Equity-Oriented Communicative Strategist",
  "navigational|spiritual|linguistic_multilingual": "Spiritually Guided Cultural Navigator",
  "navigational|spiritual|linguistic_modes_of_speech": "Faith-Informed Adaptive Strategist",
  "navigational|linguistic_multilingual|linguistic_modes_of_speech": "Globally Fluent Systems Connector",

  // Aspirational-centered
  "aspirational|resistant_action|resistant_awareness": "Hope-Driven Justice Leader",
  "aspirational|resistant_action|spiritual": "Faith-Activated Visionary",
  "aspirational|resistant_action|linguistic_multilingual": "Globally Empowered Change Visionary",
  "aspirational|resistant_action|linguistic_modes_of_speech": "Visionary Advocate Communicator",
  "aspirational|resistant_awareness|spiritual": "Spiritually Anchored Hope Builder",
  "aspirational|resistant_awareness|linguistic_multilingual": "Globally Conscious Dream Builder",
  "aspirational|resistant_awareness|linguistic_modes_of_speech": "Equity-Oriented Vision Communicator",
  "aspirational|spiritual|linguistic_multilingual": "Faith-Guided Global Dreamer",
  "aspirational|spiritual|linguistic_modes_of_speech": "Purposeful Adaptive Visionary",
  "aspirational|linguistic_multilingual|linguistic_modes_of_speech": "Globally Fluent Future Architect",

  // Resistant-centered
  "resistant_action|resistant_awareness|spiritual": "Faith-Grounded Justice Mobilizer",
  "resistant_action|resistant_awareness|linguistic_multilingual": "Culturally Engaged Justice Advocate",
  "resistant_action|resistant_awareness|linguistic_modes_of_speech": "Equity Voice Leader",
  "resistant_action|spiritual|linguistic_multilingual": "Spirit-Led Cultural Activator",
  "resistant_action|spiritual|linguistic_modes_of_speech": "Faith-Based Equity Communicator",
  "resistant_action|linguistic_multilingual|linguistic_modes_of_speech": "Culturally Fluent Justice Builder",
  "resistant_awareness|spiritual|linguistic_multilingual": "Spiritually Conscious Cultural Critic",
  "resistant_awareness|spiritual|linguistic_modes_of_speech": "Faith-Informed Equity Communicator",
  "resistant_awareness|linguistic_multilingual|linguistic_modes_of_speech": "Culturally Insightful Justice Connector",

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
