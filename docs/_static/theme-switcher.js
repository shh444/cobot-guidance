(() => {
  const PRESETS = {
    indigo: {
      label: "Indigo Flow",
      desc: "기본 추천",
      swatches: ["#4338ca", "#6366f1", "#0ea5e9"],
    },
    emerald: {
      label: "Emerald Field",
      desc: "차분한 생산라인",
      swatches: ["#047857", "#10b981", "#06b6d4"],
    },
    graphite: {
      label: "Graphite Amber",
      desc: "산업 장비 느낌",
      swatches: ["#78350f", "#d97706", "#f59e0b"],
    },
    orchid: {
      label: "Orchid Pulse",
      desc: "조금 더 화려하게",
      swatches: ["#9333ea", "#c084fc", "#ec4899"],
    },
    mono: {
      label: "Mono Slate",
      desc: "절제된 흑백",
      swatches: ["#111827", "#374151", "#9ca3af"],
    },
  };

  const STORAGE_KEY = "ur-manual-brand-preset";
  const DEFAULT_PRESET = "mono";
  const html = document.documentElement;

  function getPreset() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && PRESETS[stored]) return stored;
    return DEFAULT_PRESET;
  }

  function setPreset(name) {
    if (!PRESETS[name]) return;
    html.setAttribute("data-brand-preset", name);
    window.localStorage.setItem(STORAGE_KEY, name);
    updateActiveButtons();
  }

  function buildSwatches(swatches) {
    return swatches
      .map((color) => `<span style="background:${color}"></span>`)
      .join("");
  }

  function buildFloatingSwitcher() {
    if (document.querySelector(".theme-fab")) return;

    const fab = document.createElement("div");
    fab.className = "theme-fab";
    fab.innerHTML = `
      <button class="theme-fab__button" type="button" aria-expanded="false" aria-controls="theme-panel">
        <span aria-hidden="true">🎨</span>
        <span>테마</span>
      </button>
    `;

    const panel = document.createElement("div");
    panel.className = "theme-panel";
    panel.id = "theme-panel";
    panel.innerHTML = `
      <p class="theme-panel__title">디자인 프리셋</p>
      <p class="theme-panel__subtitle">색감이 마음에 들 때까지 바로 바꿔보세요. 선택값은 이 브라우저에 저장됩니다.</p>
      <div class="theme-panel__grid">
        ${Object.entries(PRESETS)
          .map(
            ([key, preset]) => `
            <button class="preset-button" type="button" data-preset="${key}">
              <span class="preset-button__swatches">${buildSwatches(preset.swatches)}</span>
              <span class="preset-button__name">${preset.label}</span>
              <span class="preset-button__desc">${preset.desc}</span>
            </button>`
          )
          .join("")}
      </div>
    `;

    document.body.appendChild(panel);
    document.body.appendChild(fab);

    const toggleButton = fab.querySelector(".theme-fab__button");
    toggleButton.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("is-open");
      toggleButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      const clickInside = panel.contains(event.target) || fab.contains(event.target);
      if (!clickInside && panel.classList.contains("is-open")) {
        panel.classList.remove("is-open");
        toggleButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  function updateActiveButtons() {
    const current = html.getAttribute("data-brand-preset") || DEFAULT_PRESET;
    document.querySelectorAll("[data-preset]").forEach((button) => {
      const active = button.getAttribute("data-preset") === current;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    document.querySelectorAll("[data-current-preset-label]").forEach((node) => {
      node.textContent = PRESETS[current]?.label || current;
    });
  }

  function attachPresetClicks() {
    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-preset]");
      if (!target) return;
      setPreset(target.getAttribute("data-preset"));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildFloatingSwitcher();
    attachPresetClicks();
    setPreset(getPreset());
  });
})();
