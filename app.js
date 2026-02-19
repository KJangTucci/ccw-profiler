// app.js
// Fix A: keep your existing CCW_PROFILE_NAMES as-is, but ensure lookup uses the
// same sorted key that the profile map expects, and log debug info to help you
// see why a fallback name is used.
// No data is stored or transmitted.

(function () {
  const appEl = document.getElementById("app");

  const SCALE = [
    { value: 1, label: "Not at all like me" },
    { value: 2, label: "Very slightly like me" },
    { value: 3, label: "Slightly like me" },
    { value: 4, label: "Moderately like me" },
    { value: 5, label: "Very much like me" },
    { value: 6, label: "Exactly like me" }
  ];

  let shuffledItems = [];

  function reverseScore(v) {
    return 7 - v;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function prettyType(typeKey) {
    return (window.CCW_TYPE_LABELS && window.CCW_TYPE_LABELS[typeKey])
      ? window.CCW_TYPE_LABELS[typeKey]
      : typeKey.replaceAll("_", " ").replace(/\b\w/g, c => c.toUpperCase());
  }

  function shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function initShuffle() {
    shuffledItems = shuffle(window.CCW_ITEMS);
  }

  function renderSurvey() {
    if (!shuffledItems.length) initShuffle();

    const intro = `
      <section class="card">
        <h2 class="h2">Instructions</h2>
        <p class="muted">
          This is a reflection tool assessing your cultural strengths. The following questions ask about yourself and your life experiences in general. On a scale from 1 (Not at all like me) to 6 (Exactly like me), please indicate how well each of the following statements describes you. Click "View my profile" once you complete the survey. Your responses are processed locally in your browser and are not saved or sent anywhere.
        </p>

@@ -90,51 +90,51 @@
      if (!check.ok) {
        showError(`Please answer all items. Missing: ${check.missingId}`);
        scrollToId(check.missingId);
        return;
      }
      hideError();

      const avgs = computeAverages(check.responses);
      const top3 = getTopKTypes(avgs, 3);

      // Fix A: always compute a sorted key, and look up using that exact key.
      const profileKey = makeSortedKey(top3);

      const profileName =
        (window.CCW_PROFILE_NAMES && window.CCW_PROFILE_NAMES[profileKey]) ||
        (window.CCW_DEFAULT_PROFILE_NAME || "Integrative Strength Portfolio");

      // Debug logs: open DevTools console to inspect key mismatches.
      // If profileName falls back to default, compare "Profile key" to your
      // keys in CCW_PROFILE_NAMES in profiles.js.
      console.log("CCW debug - top3:", top3);
      console.log("CCW debug - profileKey:", profileKey);
      console.log("CCW debug - has profile map:", Boolean(window.CCW_PROFILE_NAMES));
      console.log("CCW debug - profileName:", profileName);

      renderResults(profileKey, profileName, top3, avgs);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("btnReset").addEventListener("click", () => {
      initShuffle();
      renderSurvey();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function renderItem(item, idx) {
    const num = idx + 1;

    const options = SCALE.map(s => {
      const id = `${item.id}_${s.value}`;
      return `
        <label class="option optionWide" for="${id}">
          <input id="${id}" type="radio" name="${item.id}" value="${s.value}" />
          <span class="badge">${s.value}</span>
          <span class="optText">${escapeHtml(s.label)}</span>
        </label>
      `;
    }).join("");

    return `
@@ -190,86 +190,119 @@
    const entries = Object.entries(avgs)
      .filter(([, v]) => Number.isFinite(v))
      .sort((a, b) => {
        const dv = b[1] - a[1];
        if (Math.abs(dv) > 1e-9) return dv;
        const la = prettyType(a[0]).toLowerCase();
        const lb = prettyType(b[0]).toLowerCase();
        return la.localeCompare(lb);
      });

    return entries.slice(0, k).map(([t]) => t);
  }

  function makeSortedKey(types) {
    return [...types].sort().join("|");
  }

  function joinAsOneParagraph(typeKeys) {
    const parts = typeKeys
      .map(k => (window.CCW_SCRIPTS && window.CCW_SCRIPTS[k] ? String(window.CCW_SCRIPTS[k]).trim() : ""))
      .filter(Boolean);

    return parts.join(" ").replace(/\s+/g, " ").trim();
  }

  function renderScoreBars(avgs) {
    const MAX_SCALE_SCORE = 6;

    const rows = Object.entries(avgs)
      .filter(([, avg]) => Number.isFinite(avg))
      .sort((a, b) => b[1] - a[1])
      .map(([type, avg]) => {
        const pct = Math.max(0, Math.min(100, (avg / MAX_SCALE_SCORE) * 100));
        return `
          <div class="scoreRow">
            <div class="scoreLabel">${escapeHtml(prettyType(type))}</div>
            <div class="scoreTrack" aria-hidden="true">
              <div class="scoreFill" style="width:${pct.toFixed(2)}%"></div>
            </div>
            <div class="scoreValue">${avg.toFixed(2)}</div>
          </div>
        `;
      })
      .join("");

    return `
      <section class="card">
        <h3 class="h3">Your average score by CCW scale</h3>
        <p class="muted">Scale range: 1 (lowest) to 6 (highest).</p>
        <div class="scoreChart" role="img" aria-label="Bar chart of your average score by Community Cultural Wealth scales">
          ${rows}
        </div>
      </section>
    `;
  }

  function renderResults(profileKey, profileName, top3, avgs) {
    const imagePath =
      (window.CCW_PROFILE_IMAGES && window.CCW_PROFILE_IMAGES[profileKey])
        ? window.CCW_PROFILE_IMAGES[profileKey]
        : null;

    const topStrengthsLine = top3.map(prettyType).join(" + ");
    const mergedDescription = joinAsOneParagraph(top3);

    appEl.innerHTML = `
      <section class="card">
        <h2 class="h2">Your CCW Profile</h2>

        <div class="profileLead">
          You are a <span class="profileName">${escapeHtml(profileName)}</span>.
        </div>

        ${imagePath ? `
          <div class="profileImageWrap">
            <img class="profileImage" src="${escapeHtml(imagePath)}" alt="Profile image for ${escapeHtml(profileName)}" />
          </div>
        ` : ""}

        <div class="strengthsLine">
          <span class="tag">Top strengths</span>
          <span class="strengthsText">${escapeHtml(topStrengthsLine)}</span>
        </div>

        <p class="desc">${escapeHtml(mergedDescription)}</p>

        <div class="actions">
          <button class="btn" id="btnBack" type="button">Back to questions</button>
          <button class="btn" id="btnStartOver" type="button">Start over</button>
        </div>
      </section>

      ${renderScoreBars(avgs)}

      <section class="card">
        <h3 class="h3">Reflection prompt</h3>
        <ul class="bullets">
          <li>Which people, spaces, or practices help you draw on these strengths most?</li>
          <li>Where do you see these strengths showing up in your academic life right now?</li>
          <li>In what ways can you leverage these assets to make positive changes in your community and in society more broadly?</li>
        </ul>
      </section>
    `;

    document.getElementById("btnBack").addEventListener("click", () => {
      renderSurvey();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("btnStartOver").addEventListener("click", () => {
      initShuffle();
      renderSurvey();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function showError(msg) {
    const box = document.getElementById("errorBox");
    box.style.display = "block";
index.html
index.html
+30
-0

@@ -91,69 +91,99 @@
        color: #b72f34;
        padding: 10px 12px;
        border-radius: 12px;
        cursor: pointer;
        font-weight: 650;
      }
      .btn.primary { background: #b72f34; color: #fff; }

      .error {
        margin-top: 12px;
        padding: 10px 12px;
        border-radius: 12px;
        background: #fff2f2;
        border: 1px solid #ffd0d0;
        color: #8a0000;
      }

      .profileLead { font-size: 1.15rem; font-weight: 650; margin-top: 6px; }
      .profileName { font-weight: 900; }

      .strengthsLine { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
      .tag { font-size: 0.9rem; border: 1px solid #e6e6e6; padding: 6px 10px; border-radius: 999px; color: #444; }
      .strengthsText { font-weight: 750; }
      .desc { margin-top: 12px; color: #222; }


      .scoreChart { margin-top: 12px; display: grid; gap: 10px; }
      .scoreRow {
        display: grid;
        grid-template-columns: minmax(150px, 2fr) minmax(180px, 5fr) auto;
        gap: 10px;
        align-items: center;
      }
      .scoreLabel { font-weight: 600; color: #222; }
      .scoreTrack {
        width: 100%;
        height: 14px;
        border-radius: 999px;
        background: #f0e8dd;
        border: 1px solid #e5d6bf;
        overflow: hidden;
      }
      .scoreFill {
        height: 100%;
        background: linear-gradient(90deg, #d3a86a, #b72f34);
      }
      .scoreValue {
        font-weight: 700;
        color: #3e2325;
        min-width: 42px;
        text-align: right;
      }

      .profileImageWrap { margin-top: 14px; }
      .profileImage {
        width: 100%;
        max-height: 320px;
        object-fit: contain;
        border-radius: 12px;
        border: 1px solid #eee;
        background: #fafafa;
      }

      .bullets { margin: 8px 0 0 18px; color: #333; }
      footer { padding: 10px 0 20px 0; color: #666; font-size: 0.95rem; }

      @media (max-width: 860px) {
        .scale { grid-template-columns: 1fr; }
        .options6 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .option { min-height: 62px; }
        .badge { width: 30px; height: 30px; }
        .optText { font-size: 0.9rem; }
        .scoreRow { grid-template-columns: 1fr; gap: 6px; }
        .scoreValue { text-align: left; }
      }
    </style>
  </head>

  <body>
    <main class="container">
      <header class="hero">
        <div class="logoWrap">
          <img 
            src="https://ncaproject.dcs.wisc.edu/wp-content/uploads/sites/156/2025/12/NCA-logo-1536x495.png" 
            alt="Networks and Cultural Assets Project Logo"
            class="siteLogo"
            width="350"
          />
        </div>
        <h1>Community Cultural Wealth Profile</h1>
        <p>
        Developed by the Networks and Cultural Assets Project | Shared under a CC BY-NC-SA 4.0
        </p>
      </header>

      <section id="app"></section>

      <footer>
        This Community Cultural Wealth Profile tool was developed by the Networks and Cultural Assets Project (NCA Project). The assessment is designed as a strengths-based reflection activity to help participants recognize and build upon their forms of community cultural wealth.
