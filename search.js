/* MC7026 — header search: find a piece by its project, its file name/label,
   or a word that appears in its own onchain source code (SOURCE_CODE, from
   sources.js). Selecting a result jumps straight to that piece's fullscreen
   view via project.html's existing ?open=<file> deep link. */

(function () {
  const toggleBtn = document.querySelector(".search-toggle-btn");
  const panel = document.querySelector(".search-panel");
  const input = document.querySelector(".search-input");
  const resultsBox = document.querySelector(".search-results");
  if (!toggleBtn || !panel || !input || !resultsBox) return;

  const index = [];
  PROJECTS.forEach((project) => {
    project.pieces.forEach((piece) => {
      index.push({ project, piece });
    });
  });

  function sourceTextFor(project, piece) {
    if (typeof SOURCE_CODE === "undefined") return "";
    return SOURCE_CODE[project.folder + piece.file] || "";
  }

  function search(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter(({ project, piece }) => {
      const haystack = `${project.title} ${piece.label} ${piece.file} ${sourceTextFor(project, piece)}`.toLowerCase();
      return haystack.includes(q);
    }).slice(0, 20);
  }

  function renderResults(matches) {
    if (!matches.length) {
      resultsBox.innerHTML = `<div class="search-empty">No matches</div>`;
    } else {
      resultsBox.innerHTML = matches.map(({ project, piece }) => `
        <a class="search-result" href="project.html?p=${project.slug}&open=${encodeURIComponent(piece.file)}">
          <span class="search-result-project">${project.title}</span>
          <span class="search-result-piece">${piece.label}</span>
        </a>
      `).join("");
    }
    resultsBox.hidden = false;
  }

  let debounceTimer = null;
  function runSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim();
      if (!q) { resultsBox.hidden = true; return; }
      renderResults(search(q));
    }, 120);
  }

  function openPanel() {
    panel.hidden = false;
    toggleBtn.classList.add("is-active");
    input.focus();
  }
  function closePanel() {
    panel.hidden = true;
    resultsBox.hidden = true;
  }

  toggleBtn.addEventListener("click", () => {
    if (panel.hidden) openPanel();
    else { closePanel(); toggleBtn.classList.remove("is-active"); }
  });

  input.addEventListener("input", runSearch);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSearch();
    if (e.key === "Escape") { closePanel(); toggleBtn.classList.remove("is-active"); }
  });

  document.addEventListener("click", (e) => {
    if (!panel.hidden && !toggleBtn.contains(e.target) && !panel.contains(e.target)) {
      closePanel();
      toggleBtn.classList.remove("is-active");
    }
  });
})();
