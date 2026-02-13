
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

  // Cut points for Low / Mid / High using average score (1-5).
  // Swap these for your norms-based thresholds later if you want.
  function levelFromAvg(avg) {
    if (avg >= 4.0) return "High";
    if (avg <= 2.5) return "Low";
    return "Mid";
  }

  function reverseScore(v) {
    // For 1-5 scale: 1<->5, 2<->4, 3 stays.
    return 6 - v;
  }

  function getResponses() {
    const responses = {};
    for (const item of window.CCW_ITEMS) {
      const selected = document.querySelector(`input[name="${item.id}"]:checked`);
      if (!selected) return { ok: false, missingId: item.id };
      let val = Number(selected.value);
      if (item.reverse) val = reverseScore(val);
      responses[item.id] = val;
    }
    return { ok: true, responses };
  }

  function computeSubscaleAverages(responses) {
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
      avgs[t] = counts[t] ? sums[t] / counts[t] : NaN;
    }
    return avgs;
  }

  function topTwoTypes(avgs) {
    const pairs = Object.entries(avgs)
      .filter(([, v]) => Number.isFinite(v))
      .sort((a, b) => b[1] - a[1]);

    const top = pairs[0]?.[0] ?? null;
    const second = pairs[1]?.[0] ?? null;
    return { top, second };
  }

  function chooseProfileId(avgs) {
    const { top, second } = topTwoTypes(avgs);
    if (!top || !second) return window.CCW_DEFAULT_PROFILE_ID;

    const key = `${top}|${second}`;
    const swappedKey = `${second}|${top}`;

    return (
      window.CCW_PROFILE_MAP[key] ||
      window.CCW_PROFILE_MAP[swappedKey] ||
      window.CCW_DEFAULT_PROFILE_ID
    );
  }

  function prettyType(t) {
    // Make labels nicer for display
    return t
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function renderSurvey() {
    const html = `
      <div class="card">
        <p class="small">
          Answer all items. When you click "View my profile", your results are calculated locally and shown immediately.
        </p>
      </div>

      ${window.CCW_ITEMS.map(renderItem).join("")}

      <div class="actions">
        <button class="primary" id="submitBtn">View my profile</button>
        <button id="resetBtn" type="button">Reset</button>
      </div>

      <div id="error" class="card" style="display:none"></div>
    `;

    appEl.innerHTML = html;

    document.getElementById("submitBtn").addEventListener("click", () => {
      const check = getResponses();
      if (!check.ok) {
        showError(`Please answer all questions. Missing: ${check.missingId.toUpperCase()}`);
        return;
      }
      hideError();
      const avgs = computeSubscaleAverages(check.responses);
      const levels = {};
      for (const [t, avg] of Object.entries(avgs)) {
        levels[t] = levelFromAvg(avg);
      }

      const profileId = chooseProfileId(avgs);
      renderResults(profileId, avgs, levels);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
      renderSurvey();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function renderItem(item) {
    const options = SCALE.map(
      (o) => `
        <label>
          <input type="radio" name="${item.id}" value="${o.value}" />
          <span>${o.value}</span>
        </label>
      `
    ).join("");

    return `
      <div class="card" id="${item.id}">
        <p class="question">${item.text}</p>
        <div class="options" role="radiogroup" aria-label="${item.text}">
          ${options}
        </div>
        <p class="small">CCW type: ${prettyType(item.type)}</p>
      </div>
    `;
  }

  function renderResults(profileId, avgs, levels) {
    const p = window.CCW_PROFILES[profileId] || window.CCW_PROFILES[window.CCW_DEFAULT_PROFILE_ID];

    const sorted = Object.entries(avgs)
      .filter(([, v]) => Number.isFinite(v))
      .sort((a, b) => b[1] - a[1]);

    appEl.innerHTML = `
      <div class="card">
        <h2>Your CCW Profile: ${p.title}</h2>
        <p>${p.baseDescription}</p>
      </div>

      <div class="card">
        <h3>Your CCW pattern</h3>
        <div class="grid2">
          ${sorted
            .map(([t, avg]) => {
              const lvl = levels[t];
              return `
                <div class="card">
                  <strong>${prettyType(t)}</strong><br />
                  Average: ${avg.toFixed(2)}<br />
                  Level: ${lvl}
                </div>
              `;
            })
            .join("")}
        </div>
      </div>

      <div class="card">
        <h3>Suggestions</h3>
        <ul>
          ${p.suggestions.map((s) => `<li>${s}</li>`).join("")}
        </ul>
      </div>

      <div class="actions">
        <button id="backBtn">Back to questions</button>
      </div>
    `;

    document.getElementById("backBtn").addEventListener("click", () => {
      renderSurvey();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function showError(msg) {
    const el = document.getElementById("error");
    el.style.display = "block";
    el.textContent = msg;
    const missing = msg.match(/Missing:\s(\w+)/i);
    if (missing?.[1]) {
      const anchor = document.getElementById(missing[1].toLowerCase());
      if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function hideError() {
    const el = document.getElementById("error");
    el.style.display = "none";
    el.textContent = "";
  }

  renderSurvey();
})();
