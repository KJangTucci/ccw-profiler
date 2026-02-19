// app.js
// Adds a soft radar "map" of CCW subscale patterns on the results page.
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

      // Fix A: always compute sorted key and look up using that exact key.
      const profileKey = makeSortedKey(top3);

      const profileName =
        (window.CCW_PROFILE_NAMES && window.CCW_PROFILE_NAMES[profileKey]) ||
        (window.CCW_DEFAULT_PROFILE_NAME || "Integrative Strength Portfolio");

      // Debug logs (open DevTools console)
      console.log("CCW debug - top3:", top3);
      console.log("CCW debug - profileKey:", profileKey);
      console.log("CCW debug - has profile map:", Boolean(window.CCW_PROFILE_NAMES));
      console.log("CCW debug - profileName:", profileName);
      console.log("CCW debug - avgs:", avgs);

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

      <section class="card">
        <h3 class="h3">Strengths snapshot map</h3>
        <p class="muted">
          This map is a snapshot of where your responses are showing up across different types of community cultural wealth scale.
        </p>

        <div class="radarWrap">
          <canvas id="radarCanvas" aria-label="Community Cultural Wealth strengths snapshot map" role="img"></canvas>
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

    // Draw radar after the canvas exists in the DOM
    drawRadar(avgs);

    // Redraw on resize for responsiveness
    window.addEventListener("resize", debounce(() => drawRadar(avgs), 150), { passive: true });
  }

  function drawRadar(avgs) {
    const canvas = document.getElementById("radarCanvas");
    if (!canvas) return;

    const parent = canvas.parentElement;
    const size = Math.min(560, Math.max(320, parent ? parent.clientWidth : 420));

    // Handle high-DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const types = (window.CCW_TYPES || []).slice();
    if (!types.length) return;

    // Soft visual design (non-evaluative)
    const centerX = size / 2;
    const centerY = size / 2;
    const outerR = (size * 0.36);
    const labelR = (size * 0.44);

    const rings = 3; // gentle guide rings (no numbers)
    const startAngle = -Math.PI / 2; // top

    // Colors
    const gridStroke = "#e6e6e6";
    const axisStroke = "#eaeaea";
    const labelColor = "#333";
    const polyFill = "rgba(17, 17, 17, 0.08)";
    const polyStroke = "rgba(17, 17, 17, 0.55)";

    // Ring grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = gridStroke;
    for (let r = 1; r <= rings; r++) {
      const rr = (outerR * r) / rings;
      drawPolygon(ctx, centerX, centerY, rr, types.length, startAngle, false);
      ctx.stroke();
    }

    // Axis lines and labels
    for (let i = 0; i < types.length; i++) {
      const angle = startAngle + (2 * Math.PI * i) / types.length;
      const x = centerX + Math.cos(angle) * outerR;
      const y = centerY + Math.sin(angle) * outerR;

      // axis line
      ctx.beginPath();
      ctx.strokeStyle = axisStroke;
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // labels (small, soft)
      const label = prettyType(types[i]);
      const lx = centerX + Math.cos(angle) * labelR;
      const ly = centerY + Math.sin(angle) * labelR;

      ctx.fillStyle = labelColor;
      ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
      ctx.textBaseline = "middle";

      const align = Math.cos(angle);
      if (align > 0.35) ctx.textAlign = "left";
      else if (align < -0.35) ctx.textAlign = "right";
      else ctx.textAlign = "center";

      // Split long labels into two lines if needed
      const lines = wrapLabel(label, 16);
      if (lines.length === 1) {
        ctx.fillText(lines[0], lx, ly);
      } else {
        ctx.fillText(lines[0], lx, ly - 7);
        ctx.fillText(lines[1], lx, ly + 7);
      }
    }

    // Data polygon
    const points = [];
    for (let i = 0; i < types.length; i++) {
      const t = types[i];
      const v = Number.isFinite(avgs[t]) ? avgs[t] : 1;
      // Map 1-6 to 0-1
      const norm = clamp((v - 1) / 5, 0, 1);
      const angle = startAngle + (2 * Math.PI * i) / types.length;

      points.push({
        x: centerX + Math.cos(angle) * (outerR * norm),
        y: centerY + Math.sin(angle) * (outerR * norm)
      });
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.closePath();

    const fillGrad = ctx.createRadialGradient(
    centerX, centerY, outerR * 0.08,
    centerX, centerY, outerR
  );

    // center a bit stronger, edges fade out
    fillGrad.addColorStop(0, "rgba(183, 47, 52, 0.22)");  // #b72f34
    fillGrad.addColorStop(1, "rgba(183, 47, 52, 0.04)");

    ctx.fillStyle = fillGrad;
    ctx.fill();


    ctx.strokeStyle = polyStroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Gentle vertex dots
    ctx.fillStyle = "rgba(17, 17, 17, 0.55)";
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawPolygon(ctx, cx, cy, r, n, startAngle, beginPath = true) {
    if (beginPath) ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = startAngle + (2 * Math.PI * i) / n;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function wrapLabel(text, maxLen) {
    const t = String(text);
    if (t.length <= maxLen) return [t];
    const parts = t.split(" ");
    if (parts.length === 1) return [t.slice(0, maxLen), t.slice(maxLen)];

    const line1 = [];
    const line2 = [];
    for (const w of parts) {
      const target = (line1.join(" ").length + (line1.length ? 1 : 0) + w.length <= maxLen) ? line1 : line2;
      target.push(w);
    }
    if (!line2.length) return [line1.join(" ")];
    return [line1.join(" "), line2.join(" ")];
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function debounce(fn, ms) {
    let t = null;
    return function () {
      if (t) clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), ms);
    };
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
