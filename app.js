// app.js
// Renders survey, shuffles items, computes subscale averages, selects top 3 strengths, and displays profile.
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

  // In-memory only - used to keep one shuffle order while the page is open.
  let shuffledItems = [];

  function reverseScore(v) {
    return 7 - v; // 1-6 reverse
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
    return (window.CCW_TYPE_LABELS && window.CCW_TYPE_LABELS[typeKey]) ? window.CCW_TYPE_LABELS[typeKey] : typeKey;
  }

  function shuffle(array) {
    // Fisher-Yates
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
          ${SCALE.map(s => `<div class="pill"><strong>${s.value}</strong><span>${escapeHtml(s.label)}</span></div>`).join("")}
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

      const profileKey = makeSortedKey(top3);
      const profileName = window.CCW_PROFILE_NAMES[profileKey] || window.CCW_DEFAULT_PROFILE_NAME;

      renderResults(profileKey, profileName, top3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("btnReset").addEventListener("click", () => {
      // New shuffle on reset
      initShuffle();
      renderSurvey();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function renderItem(item, idx) {
    const num = idx + 1;

    // Narrower option cards, arranged 6 across on wide screens.
    const options = SCALE.map(s => {
      const id = `${item.id}_${s.value}`;
      return `
        <label class="option optionCompact" for="${id}">
          <input id="${id}" type="radio" name="${item.id}" value="${s.value}" />
          <span class="badge">${s.value}</span>
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

        <div class="optionsHelp muted" aria-hidden="true">
          ${SCALE.map(s => `<span><strong>${s.value}</strong> ${escapeHtml(s.label)}</span>`).join(" · ")}
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
      // Use original items list for type assignment consistency
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
    // Sort by avg desc, then label asc for stable tie-breaking
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

  function renderResults(profileKey, profileName, top3) {
    const top3Labels = top3.map(prettyType);

    const imagePath = (window.CCW_PROFILE_IMAGES && window.CCW_PROFILE_IMAGES[profileKey]) ? window.CCW_PROFILE_IMAGES[profileKey] : null;

    // Aggregate the three scripts, but do not show "top strengths" or any calculation.
    const strengthsSections = top3.map((t) => {
      const title = prettyType(t);
      const script = window.CCW_SCRIPTS[t] || "";
      return `
        <section class="card">
          <h3 class="h3">${escapeHtml(title)}</h3>
          <p>${escapeHtml(script)}</p>
        </section>
      `;
    }).join("");

    appEl.innerHTML = `
      <section class="card">
        <h2 class="h2">Your CCW Profile</h2>
        <div class="profileName">${escapeHtml(profileName)}</div>
        <p class="muted">
          This is a strengths-based reflection tool. Your profile is based on your highest-scoring areas in this assessment.
        </p>

        ${imagePath ? `
          <div class="profileImageWrap">
            <img class="profileImage" src="${escapeHtml(imagePath)}" alt="Profile image for ${escapeHtml(profileName)}" />
          </div>
        ` : ""}

        <div class="subtleLine muted">
          Profile components: ${escapeHtml(top3Labels.join(" + "))}
        </div>

        <div class="actions">
          <button class="btn" id="btnBack" type="button">Back to questions</button>
          <button class="btn" id="btnStartOver" type="button">Start over</button>
        </div>
      </section>

      ${strengthsSections}

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
