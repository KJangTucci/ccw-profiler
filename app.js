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
      : typeKey;
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
          Respond to each statement using the scale below. When you click "View my profile", your results are calculated locally in your browser.
          Your responses are not saved or sent anywhere.
        </p>

        <div class="scale">
          ${SCALE.map(s => `
            <div class="pill">
              <strong>${s.value}</strong>
              <span>${escapeHtml(s.label)}</span>
            </div>
          `).join("")}
        </div>
      </section>
    `;

    const questions = shuffledItems.map(renderItem).join("");

    const actions = `
      <section class="card">
        <div class="actions">
          <button class="btn primary" id="btnSubmit" type="button">View my profile</button>
          <button class="btn" id="btnReset" type="button">Reset</button>
        </div>
        <div id="errorBox" class="error" role="alert" aria-live="polite" style="display:none"></div>
      </section>
    `;

    appEl.innerHTML = intro + questions + actions;

    document.getElementById("btnSubmit").addEventListener("click", () => {
      const check = getResponses();
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

      renderResults(profileKey, profileName, top3);
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
      <section class="card" id="${item.id}">
        <div class="qhead">
          <div class="qnum">${num}</div>
          <div class="qtext">
            <div class="statement">${escapeHtml(item.text)}</div>
          </div>
        </div>

        <div class="options options6" role="radiogroup" aria-label="${escapeHtml(item.text)}">
          ${options}
        </div>
      </section>
    `;
  }

  function getResponses() {
    const responses = {};
    for (const item of shuffledItems) {
      const chosen = document.querySelector(`input[name="${item.id}"]:checked`);
      if (!chosen) return { ok: false, missingId: item.id };
      let v = Number(chosen.value);
      if (item.reverse) v = reverseScore(v);
      responses[item.id] = v;
    }
    return { ok: true, responses };
  }

  function computeAverages(responses) {
    const sums = {};
    const counts = {};
    for (const t of window.CCW_TYPES) {
      sums[t] = 0;
      counts[t] = 0;
    }

    for (const item of window.CCW_ITEMS) {
      const v = responses[item.id];
      sums[item.type] += v;
      counts[item.type] += 1;
    }

    const avgs = {};
    for (const t of window.CCW_TYPES) {
      avgs[t] = counts[t] ? (sums[t] / counts[t]) : NaN;
    }
    return avgs;
  }

  function getTopKTypes(avgs, k) {
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

  function renderResults(profileKey, profileName, top3) {
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

      <section class="card">
        <h3 class="h3">Reflection prompt</h3>
        <ul class="bullets">
          <li>Where do you see these strengths showing up in your academic life right now?</li>
          <li>Which people, spaces, or practices help you draw on these strengths most?</li>
          <li>How might you intentionally leverage these strengths in a current challenge or goal?</li>
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
    box.textContent = msg;
  }

  function hideError() {
    const box = document.getElementById("errorBox");
    box.style.display = "none";
    box.textContent = "";
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Boot
  initShuffle();
  renderSurvey();
})();
