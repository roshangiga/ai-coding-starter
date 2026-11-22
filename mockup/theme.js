// Theme switch: follows the system setting until the user picks a theme; the choice is remembered.
(function () {
  var STORAGE_KEY = "roombook-theme";
  var root = document.documentElement;
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function readChoice() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null; // Storage blocked: follow the system setting.
    }
  }

  function saveChoice(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // Storage blocked: the choice lasts for this page view only.
    }
  }

  function currentTheme() {
    return root.getAttribute("data-theme") || (darkQuery.matches ? "dark" : "light");
  }

  function updateButton(button) {
    var label = "Switch to " + (currentTheme() === "dark" ? "light" : "dark") + " theme";
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  }

  // Runs in <head>, so a saved choice applies before the first paint.
  var saved = readChoice();
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("theme-toggle");
    if (!button) return;
    updateButton(button);
    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      saveChoice(next);
      updateButton(button);
    });
    darkQuery.addEventListener("change", function () {
      updateButton(button);
    });
  });
})();
