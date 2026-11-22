// Theme: follows prefers-color-scheme until the user picks one; the choice is remembered.
(function () {
  var PREF_NAME = "roombook-theme";
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(PREF_NAME); } catch (e) { return null; }
  }
  function store(value) {
    try { localStorage.setItem(PREF_NAME, value); } catch (e) { /* storage unavailable: choice lasts for this page only */ }
  }
  function systemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function current() {
    return root.getAttribute("data-theme") || (systemDark() ? "dark" : "light");
  }
  function syncButton() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var next = current() === "dark" ? "light" : "dark";
    var label = "Switch to " + next + " theme";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }

  var saved = stored();
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    syncButton();
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store(next);
      syncButton();
    });
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncButton);
    }
  });
})();
