// A mapping from (topType|secondType) -> profileId
// You will define this mapping to yield about 16 profiles.
window.CCW_PROFILE_MAP = {
  "aspirational|familial": "anchored_dreamer",
  "familial|social": "community_anchor",
  "navigational|aspirational": "strategic_pathfinder",
  "resistant|social": "change_maker"
  // ... add mappings until you cover the combinations you expect
};

// Default profile if a pair is not in the map
window.CCW_DEFAULT_PROFILE_ID = "balanced_builder";

window.CCW_PROFILES = {
  anchored_dreamer: {
    title: "Anchored Dreamer",
    baseDescription:
      "You draw strongly on aspirational and familial forms of community cultural wealth. Your goals are supported by sustaining relationships and a sense of purpose.",
    suggestions: [
      "Identify one near-term goal and one longer-term goal, then note the people who help you persist.",
      "Consider how you can translate encouragement into concrete next steps (office hours, advising, mentoring)."
    ]
  },

  community_anchor: {
    title: "Community Anchor",
    baseDescription:
      "You draw strongly on familial and social forms of community cultural wealth. You build support through relationships and shared commitments.",
    suggestions: [
      "Use your connections to exchange resources and opportunities, not only emotional support.",
      "Try one new campus space that connects to your interests or identity."
    ]
  },

  strategic_pathfinder: {
    title: "Strategic Pathfinder",
    baseDescription:
      "You draw strongly on navigational and aspirational forms of community cultural wealth. You orient toward goals and know how to move through systems to reach them.",
    suggestions: [
      "Write down the next two institutional steps for your current goal, then identify who can confirm them.",
      "Build redundancy: keep more than one source of support for critical steps."
    ]
  },

  change_maker: {
    title: "Change Maker",
    baseDescription:
      "You draw strongly on resistant and social forms of community cultural wealth. You notice inequities and mobilize relationships to advocate for yourself and others.",
    suggestions: [
      "Pick one issue and one realistic action step this month.",
      "Identify support people who can help you sustain this work without burnout."
    ]
  },

  balanced_builder: {
    title: "Balanced Builder",
    baseDescription:
      "Your profile reflects a more balanced mix of strengths across CCW types. You may draw on different forms of capital depending on the context.",
    suggestions: [
      "Look for one area you want to strengthen and choose a small, concrete practice for it.",
      "Notice which supports help with information, and which supports help with belonging."
    ]
  }
};

