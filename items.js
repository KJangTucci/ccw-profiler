// items.js
// CCW types used in this instrument (based on your item stems).
// Keep these keys consistent across items.js, app.js, and profiles.js.

window.CCW_TYPES = [
  "familial",
  "chosen_familial",
  "navigational",
  "aspirational",
  "resistant_action",
  "resistant_awareness",
  "spiritual",
  "linguistic_multilingual",
  "linguistic_modes_of_speech"
];

window.CCW_TYPE_LABELS = {
  familial: "Familial",
  chosen_familial: "Chosen Familial",
  navigational: "Navigational",
  aspirational: "Aspirational",
  resistant_action: "Resistant Action",
  resistant_awareness: "Resistant Awareness",
  spiritual: "Spiritual",
  linguistic_multilingual: "Linguistic Multilingualism",
  linguistic_modes_of_speech: "Linguistic Modes of Speech"
};

// Items: 1-5 Likert assumed in app.js.
// reverse: false for all here (set true if you later add reverse-coded items).

window.CCW_ITEMS = [
  // Familial
  {
    id: "familial1",
    type: "familial",
    text: "My family’s history inspires me to pursue my education.",
    reverse: false
  },
  {
    id: "familial2",
    type: "familial",
    text: "My family members have taught me lessons that are valuable for my education.",
    reverse: false
  },
  {
    id: "familial3",
    type: "familial",
    text: "I feel a responsibility to make my family proud.",
    reverse: false
  },

  // Navigational
  {
    id: "navigational1",
    type: "navigational",
    text: "I know how to secure essential resources for my education (e.g., tuition, books), even when there is limited opportunity and information.",
    reverse: false
  },
  {
    id: "navigational2",
    type: "navigational",
    text: "I have developed strategies to navigate difficult situations at the university.",
    reverse: false
  },
  {
    id: "navigational3",
    type: "navigational",
    text: "I know how to juggle different tasks in my life (e.g., work, college, family) that are necessary for pursuing my education.",
    reverse: false
  },

  // Resistant action
  {
    id: "resistantaction1",
    type: "resistant_action",
    text: "I am contributing to a more just or equitable society.",
    reverse: false
  },
  {
    id: "resistantaction2",
    type: "resistant_action",
    text: "I speak up when I see discrimination.",
    reverse: false
  },
  {
    id: "resistantaction3",
    type: "resistant_action",
    text: "I challenge university practices that seem inequitable.",
    reverse: false
  },

  // Linguistic - multilingual
  {
    id: "linguisticmultilingual1",
    type: "linguistic_multilingual",
    text: "I frequently speak a language other than English on campus.",
    reverse: false
  },
  {
    id: "linguisticmultilingual2",
    type: "linguistic_multilingual",
    text: "I frequently speak a language other than English with family members.",
    reverse: false
  },
  {
    id: "linguisticmultilingual3",
    type: "linguistic_multilingual",
    text: "I frequently speak a language other than English that will be useful for my future career.",
    reverse: false
  },

  // Aspirational
  {
    id: "aspirational1",
    type: "aspirational",
    text: "I have pursued my goals despite barriers to my schooling.",
    reverse: false
  },
  {
    id: "aspirational2",
    type: "aspirational",
    text: "I can maintain my hope for the future, even when confronted with barriers.",
    reverse: false
  },
  {
    id: "aspirational3",
    type: "aspirational",
    text: "I have the ability to make a difference in society.",
    reverse: false
  },

  // Resistant awareness
  {
    id: "resistantawareness1",
    type: "resistant_awareness",
    text: "I believe racism is a major factor for issues in society.",
    reverse: false
  },
  {
    id: "resistantawareness2",
    type: "resistant_awareness",
    text: "I believe there are injustices in my neighborhood or where I grew up.",
    reverse: false
  },
  {
    id: "resistantawareness3",
    type: "resistant_awareness",
    text: "I believe students who share my social identities (e.g., gender, race/ethnicity) face discrimination on my campus.",
    reverse: false
  },

  // Chosen familial
  {
    id: "chosenfamilial1",
    type: "chosen_familial",
    text: "I feel a sense of kinship with my racial/ethnic community members on campus, even if I don’t know them very well.",
    reverse: false
  },
  {
    id: "chosenfamilial2",
    type: "chosen_familial",
    text: "I attend events or participate in groups that represent my racial/ethnic background.",
    reverse: false
  },
  {
    id: "chosenfamilial3",
    type: "chosen_familial",
    text: "The history of my racial/ethnic community inspires me to work hard to achieve my goals.",
    reverse: false
  },

  // Spiritual
  {
    id: "spiritual1",
    type: "spiritual",
    text: "I have spirituality or faith that gives my life a sense of purpose.",
    reverse: false
  },
  {
    id: "spiritual2",
    type: "spiritual",
    text: "I have spirituality or faith that offers me strength in times of trouble and sorrow.",
    reverse: false
  },
  {
    id: "spiritual3",
    type: "spiritual",
    text: "I have a spirituality or faith that helps me build community with others.",
    reverse: false
  },

  // Linguistic - modes of speech
  {
    id: "linguisticmodesofspeech1",
    type: "linguistic_modes_of_speech",
    text: "I have the ability to switch communication styles based on the environment (academic and/or non-academic).",
    reverse: false
  },
  {
    id: "linguisticmodesofspeech2",
    type: "linguistic_modes_of_speech",
    text: "I am able to adjust how I am communicating depending on the audience.",
    reverse: false
  },
  {
    id: "linguisticmodesofspeech3",
    type: "linguistic_modes_of_speech",
    text: "I find it easy to talk to people from different racial/ethnic backgrounds.",
    reverse: false
  }
];
