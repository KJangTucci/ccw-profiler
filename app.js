// app.js
// Renders survey, computes subscale averages, selects top 3 strengths, and displays profile.
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

  function reverseScore(v) {
    // For 1-6 scale: 1<->6, 2<->5, 3<->4
    return 7 - v;
  }

  function prettyType(typeKey) {
    return (window.CCW_TYPE_LABELS && window.CCW_TYPE_LABELS[typeKey]) ? window.CCW_TYPE_LABELS[typeKey] : typeKey;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderSurvey() {
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

    const questions = window.CCW_ITEMS.map(renderItem).join("");

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

      renderResults(profileName, top3, avgs);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("btnReset").addEventListener("click", () => {
      renderSurvey();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function renderItem(item, idx) {
    const num = idx + 1;
    const options = SCALE.map(s => {
      const id = `${item.id}_${s.value}`;
      return `
        <label class="option" for="${id}">
          <input id="${id}" type="radio" name="${item.id}" value="${s.value}" />
          <span class="badge">${s.value}</span>
          <span class="optlabel">${escapeHtml(s.label)}</span>
        </label>
      `;
    }).join("");

    return `
      <section class="card" id="${item.id}">
        <div class="qhead">
          <div class="qnum">${num}</div>
          <div class="qtext">
            <div class="statement">${escapeHtml(item.text)}</div>
            <div class="type">${escapeHtml(prettyType(item.type))}</div>
          </div>
        </div>
        <div class="options" role="radiogroup" aria-label="${escapeHtml(item.text)}">
          ${options}
        </div>
      </section>
    `;
  }

  function getResponses() {
    const responses = {};
    for (const item of window.CCW_ITEMS) {
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
    // Sort by: avg desc, then label asc for stable tie-breaking.
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

  function renderResults(profileName, top3, avgs) {
    const top3Labels = top3.map(prettyType);

    const strengthsList = top3.map((t) => {
      const title = prettyType(t);
      const script = window.CCW_SCRIPTS[t] || "";
      return `
        <section class="card">
          <h3 class="h3">${escapeHtml(title)}</h3>
          <p>${escapeHtml(script)}</p>
        </section>
      `;
    }).join("");

    const scoreCards = top3
      .map((t) => {
        const avg = avgs[t];
        return `
          <div class="scorecard">
            <div class="scoretitle">${escapeHtml(prettyType(t))}</div>
            <div class="scorevalue">${Number.isFinite(avg) ? avg.toFixed(2) : "NA"}</div>
            <div class="scoresub">Average (1 to 6)</div>
          </div>
        `;
      })
      .join("");

    appEl.innerHTML = `
      <section class="card">
        <h2 class="h2">Your CCW Profile</h2>
        <div class="profileName">${escapeHtml(profileName)}</div>
        <p class="muted">
          Your profile is based on your three highest CCW dimensions in this assessment.
          This tool is strengths-focused and is intended for reflection and learning.
        </p>

        <div class="topline">
          <div class="tag">Top strengths</div>
          <div class="topstrengths">${escapeHtml(top3Labels.join(" + "))}</div>
        </div>

        <div class="scoregrid">
          ${scoreCards}
        </div>

        <div class="actions">
          <button class="btn" id="btnBack" type="button">Back to questions</button>
          <button class="btn" id="btnStartOver" type="button">Start over</button>
        </div>
      </section>

      ${strengthsList}

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
  renderSurvey();
})();
