/* G&P Use Case Galerie – Logik (ohne Abhängigkeiten) */
(function () {
  "use strict";

  var DATA = window.USECASES || [];
  var AREAS = window.AREAS || {};
  var TYPE_LABEL = { alltag: "Alltags-KI", leuchtturm: "Leuchtturmprojekt" };

  var state = { q: "", type: "all", area: "all", sort: "complexity-asc" };
  var visible = [];      // aktuell gefilterte & sortierte Liste
  var currentId = null;  // geöffneter Use Case

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function haystack(u) {
    return norm([u.title, u.teaser, u.impact, u.problem, u.solution, u.setup, u.industry,
      (AREAS[u.area] || {}).label, TYPE_LABEL[u.type], (u.tools || []).join(" ")].join(" "));
  }
  DATA.forEach(function (u) { u._hay = haystack(u); });

  /* ---------------- Embed-Modus ---------------- */
  var params = new URLSearchParams(location.search);
  var EMBED = params.get("embed") === "1";
  if (EMBED) {
    document.body.classList.add("embed");
    // Höhe an die einbettende Seite melden (für automatisch wachsende iframes)
    var postHeight = function () {
      try { parent.postMessage({ type: "gup-usecases-height", height: document.documentElement.scrollHeight }, "*"); } catch (e) {}
    };
    window.addEventListener("load", postHeight);
    if ("ResizeObserver" in window) new ResizeObserver(postHeight).observe(document.body);
  }
  // Vorfilter per URL, z. B. ?bereich=vertrieb&typ=leuchtturm
  if (params.get("bereich") && AREAS[params.get("bereich")]) state.area = params.get("bereich");
  if (params.get("typ") === "alltag" || params.get("typ") === "leuchtturm") state.type = params.get("typ");

  $$("[data-count-all]").forEach(function (el) { el.textContent = DATA.length; });

  /* ---------------- Filter ---------------- */
  function matches(u, ignoreArea) {
    if (state.type !== "all" && u.type !== state.type) return false;
    if (!ignoreArea && state.area !== "all" && u.area !== state.area) return false;
    if (state.q) {
      var terms = norm(state.q).split(/\s+/).filter(Boolean);
      for (var i = 0; i < terms.length; i++) if (u._hay.indexOf(terms[i]) === -1) return false;
    }
    return true;
  }
  var areaOrder = Object.keys(AREAS);
  function sorter(a, b) {
    switch (state.sort) {
      case "complexity-desc": return b.complexity - a.complexity || a.title.localeCompare(b.title, "de");
      case "area": return areaOrder.indexOf(a.area) - areaOrder.indexOf(b.area) || a.complexity - b.complexity;
      default: return a.complexity - b.complexity || a.title.localeCompare(b.title, "de");
    }
  }

  /* ---------------- Bereichs-Chips ---------------- */
  function renderChips() {
    var counts = {};
    var total = 0;
    DATA.forEach(function (u) { if (matches(u, true)) { counts[u.area] = (counts[u.area] || 0) + 1; total++; } });
    var html = '<button type="button" class="chip" data-area="all" aria-pressed="' + (state.area === "all") + '">Alle Bereiche<span class="n">' + total + "</span></button>";
    areaOrder.forEach(function (k) {
      var n = counts[k] || 0;
      if (!n && state.area !== k) return;
      html += '<button type="button" class="chip" data-area="' + k + '" aria-pressed="' + (state.area === k) + '">' +
        esc(AREAS[k].label) + '<span class="n">' + n + "</span></button>";
    });
    $("#area-chips").innerHTML = html;
  }

  /* ---------------- Karten ---------------- */
  function meter(c) {
    var s = '<span class="meter-bar" aria-hidden="true">';
    for (var i = 1; i <= 10; i++) s += "<i" + (i <= c ? ' class="on"' : "") + "></i>";
    return s + "</span>";
  }
  function card(u) {
    return '<button type="button" class="card is-' + u.type + '" data-id="' + u.id + '" aria-haspopup="dialog">' +
      '<span class="card-meta"><span>' + esc((AREAS[u.area] || {}).label) + '</span><span>G&amp;P-Projekt</span></span>' +
      "<h3>" + esc(u.title) + "</h3>" +
      '<span class="card-impact">' + esc(u.impact) + "</span>" +
      '<span class="card-teaser">' + esc(u.teaser) + "</span>" +
      '<span class="card-foot"><span class="meter">' + meter(u.complexity) + "<span>" + TYPE_LABEL[u.type] + " · " + u.complexity + "/10</span></span>" +
      "</span>" +
      "</button>";
  }
  function renderGrid() {
    visible = DATA.filter(function (u) { return matches(u); }).sort(sorter);
    var grid = $("#grid");
    if (!visible.length) {
      grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><strong>Kein Use Case passt zu diesen Filtern.</strong>' +
        "Versuchen Sie ein anderes Stichwort oder setzen Sie die Filter zurück." +
        '<br><button type="button" class="btn btn-ghost" id="reset">Filter zurücksetzen</button></div>';
    } else {
      grid.innerHTML = visible.map(card).join("");
    }
    $("#result-count").innerHTML = "<strong>" + visible.length + "</strong> von " + DATA.length + " Use Cases";
    renderMapDim();
  }

  /* ---------------- Landkarte ---------------- */
  function renderMap() {
    var cols = $("#map-cols");
    if (!cols) return;
    var byC = {};
    DATA.slice().sort(function (a, b) {
      return (a.type === b.type ? 0 : a.type === "leuchtturm" ? 1 : -1) || a.title.localeCompare(b.title, "de");
    }).forEach(function (u) { (byC[u.complexity] = byC[u.complexity] || []).push(u); });
    var html = "";
    for (var c = 1; c <= 10; c++) {
      html += '<div class="map-col" role="listitem">';
      (byC[c] || []).forEach(function (u) {
        html += '<button type="button" class="dot is-' + u.type + '" data-id="' + u.id + '" aria-label="' +
          esc(u.title + " – " + TYPE_LABEL[u.type] + ", Komplexität " + u.complexity + " von 10") + '"></button>';
      });
      html += "</div>";
    }
    cols.innerHTML = html;
  }
  function renderMapDim() {
    var ids = {};
    visible.forEach(function (u) { ids[u.id] = 1; });
    $$("#map-cols .dot").forEach(function (d) { d.classList.toggle("is-dim", !ids[d.dataset.id]); });
  }
  var tip = $("#map-tip");
  function showTip(dot) {
    var u = byId(dot.dataset.id);
    if (!u || !tip) return;
    var chart = $("#map-chart").getBoundingClientRect();
    var r = dot.getBoundingClientRect();
    tip.innerHTML = esc(u.title) + "<small>" + esc((AREAS[u.area] || {}).label) + " · " + esc(u.impact) + "</small>";
    var x = r.left + r.width / 2 - chart.left;
    var half = Math.min(130, chart.width / 2);
    x = Math.max(half, Math.min(chart.width - half, x));
    tip.style.left = x + "px";
    tip.style.top = (r.top - chart.top) + "px";
    tip.classList.add("is-on");
    $$("#grid .card").forEach(function (c) { c.classList.remove("is-hot"); });
  }
  function hideTip() { if (tip) tip.classList.remove("is-on"); }

  /* ---------------- Detail-Dialog ---------------- */
  var dlg = $("#detail");
  function byId(id) { for (var i = 0; i < DATA.length; i++) if (DATA[i].id === id) return DATA[i]; return null; }

  function renderDetail(u) {
    var area = (AREAS[u.area] || {}).label;
    var mailSubject = encodeURIComponent("Use Case: " + u.title);
    var mailBody = encodeURIComponent("Guten Tag,\n\nich interessiere mich für den Use Case „" + u.title + "“ (" + location.origin + location.pathname + "#" + u.id + ").\n\nUnsere Situation:\n\n");
    $("#detail-crumb").textContent = area + " · " + (visible.indexOf(u) + 1 || "–") + " von " + visible.length;
    $("#detail-body").innerHTML =
      '<span class="detail-type ' + u.type + '"><span class="swatch" aria-hidden="true"></span>' + TYPE_LABEL[u.type] + "</span>" +
      '<h2 id="detail-title">' + esc(u.title) + "</h2>" +
      '<p class="detail-impact">' + esc(u.impact) + "</p>" +
      '<dl class="facts">' +
        "<div><dt>Bereich</dt><dd>" + esc(area) + "</dd></div>" +
        "<div><dt>Branche</dt><dd>" + esc(u.industry) + "</dd></div>" +
        "<div><dt>Komplexität</dt><dd>" + u.complexity + " von 10</dd></div>" +
        "<div><dt>Projekttyp</dt><dd>" + TYPE_LABEL[u.type] + "</dd></div>" +
      "</dl>" +
      "<h3>Ausgangslage</h3><p>" + esc(u.problem) + "</p>" +
      "<h3>Lösung</h3><p>" + esc(u.solution) + "</p>" +
      '<h3>Wirkung</h3><ul class="results">' + (u.results || []).map(function (r) {
        return "<li><div><strong>" + esc(r.t) + "</strong></div><span>" + esc(r.d) + "</span></li>";
      }).join("") + "</ul>" +
      "<h3>Technisches Setup</h3><p>" + esc(u.setup) + "</p>" +
      '<div class="tools">' + (u.tools || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>" +
      '<div class="detail-cta"><p>So etwas auch für Ihr Unternehmen?</p>' +
        '<a class="btn btn-light" href="mailto:info@g-u-p.de?subject=' + mailSubject + "&body=" + mailBody + '">Use Case besprechen</a></div>' +
      '<p class="detail-source">G&amp;P-Projekt · <button type="button" class="linklike" id="copy-link" style="background:none;border:0;padding:0;color:inherit;text-decoration:underline;cursor:pointer;font-size:inherit">Link zu diesem Use Case kopieren</button> <span class="copy-ok" id="copy-ok" aria-live="polite"></span></p>';
    $("#detail-body").scrollTop = 0;
    var idx = visible.indexOf(u);
    $("#detail-prev").disabled = idx <= 0;
    $("#detail-next").disabled = idx === -1 || idx >= visible.length - 1;
  }

  function openDetail(id, opts) {
    var u = byId(id);
    if (!u) return;
    currentId = id;
    renderDetail(u);
    if (!dlg.open) {
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
      document.body.style.overflow = "hidden";
    }
    if (!(opts && opts.fromHash) && location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
  }
  function closeDetail() {
    if (dlg.open) dlg.close();
  }
  dlg.addEventListener("close", function () {
    document.body.style.overflow = "";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    var back = currentId && $('#grid .card[data-id="' + currentId + '"]');
    currentId = null;
    if (back) back.focus({ preventScroll: false });
  });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeDetail(); });
  $("#detail-close").addEventListener("click", closeDetail);
  function step(d) {
    var i = visible.findIndex(function (u) { return u.id === currentId; });
    var n = visible[i + d];
    if (n) openDetail(n.id);
  }
  $("#detail-prev").addEventListener("click", function () { step(-1); });
  $("#detail-next").addEventListener("click", function () { step(1); });
  dlg.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT") return;
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  $("#detail-body").addEventListener("click", function (e) {
    if (e.target.id !== "copy-link") return;
    var url = location.origin + location.pathname + "#" + currentId;
    var ok = $("#copy-ok");
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject())
      .then(function () { ok.textContent = "Kopiert."; })
      .catch(function () { ok.textContent = url; });
  });

  /* ---------------- Events ---------------- */
  function refresh() { renderChips(); renderGrid(); }

  var qTimer;
  $("#q").addEventListener("input", function (e) {
    clearTimeout(qTimer);
    qTimer = setTimeout(function () { state.q = e.target.value.trim(); refresh(); }, 120);
  });
  function setType(t) {
    state.type = t;
    $$(".segmented button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.type === t)); });
    refresh();
  }
  $$(".segmented button").forEach(function (b) {
    b.addEventListener("click", function () { setType(b.dataset.type); });
  });
  $("#sort").addEventListener("change", function (e) { state.sort = e.target.value; renderGrid(); });
  $("#area-chips").addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    state.area = b.dataset.area;
    refresh();
  });
  $("#grid").addEventListener("click", function (e) {
    if (e.target.id === "reset") {
      state.q = ""; state.area = "all"; $("#q").value = "";
      setType("all");
      return;
    }
    var c = e.target.closest(".card");
    if (c) openDetail(c.dataset.id);
  });
  // Hover auf Karte hebt Symbol in der Landkarte hervor
  $("#grid").addEventListener("mouseover", function (e) {
    var c = e.target.closest(".card");
    $$("#map-cols .dot.is-hot").forEach(function (d) { d.classList.remove("is-hot"); });
    if (c) { var d = $('#map-cols .dot[data-id="' + c.dataset.id + '"]'); if (d) d.classList.add("is-hot"); }
  });

  var cols = $("#map-cols");
  if (cols) {
    cols.addEventListener("click", function (e) { var d = e.target.closest(".dot"); if (d) openDetail(d.dataset.id); });
    cols.addEventListener("mouseover", function (e) { var d = e.target.closest(".dot"); if (d) showTip(d); });
    cols.addEventListener("mouseleave", hideTip);
    cols.addEventListener("focusin", function (e) { var d = e.target.closest(".dot"); if (d) showTip(d); });
    cols.addEventListener("focusout", hideTip);
  }
  $$("[data-jump-type]").forEach(function (b) {
    b.addEventListener("click", function () {
      setType(b.dataset.jumpType);
      $("#galerie").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  });

  function fromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id && byId(id)) openDetail(id, { fromHash: true });
  }
  window.addEventListener("hashchange", fromHash);

  /* ---------------- Start ---------------- */
  if (state.type !== "all") $$(".segmented button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.type === state.type)); });
  renderMap();
  refresh();
  fromHash();
})();
