// Each item belongs to one CCW type key.
// Use 1-5 Likert scoring. You can invert an item later with reverse: true.

window.CCW_TYPES = [
  "aspirational",
  "familial",
  "navigational",
  "resistant",
  "linguistic",
  "social",
  "spiritual",
  "community",
  "institutional"
];

window.CCW_ITEMS = [
  {
    id: "q1",
    type: "aspirational",
    text: "I can imagine multiple pathways toward my future goals.",
    reverse: false
  },
  {
    id: "q2",
    type: "familial",
    text: "My family or chosen family provides encouragement when I face challenges.",
    reverse: false
  },
  {
    id: "q3",
    type: "navigational",
    text: "I know how to find the right person or office when I need help at school.",
    reverse: false
  }
  // ... add the rest up to ~30
];

