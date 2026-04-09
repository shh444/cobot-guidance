(function () {
  const STORAGE_KEY = "ur-manual-theme-preset";
  const DEFAULT_PRESET = "cobalt";
  const PRESETS = [
    { id: "cobalt", label: "Cobalt", hint: "차갑고 선명한 테크 블루" },
    { id: "graphite", label: "Graphite", hint: "무채색에 가까운 프리미엄 톤" },
    { id: "emerald", label: "Emerald", hint: "산업/제조 느낌의 그린 톤" },
    { id: "sunset", label: "Sunset", hint: "따뜻하고 강한 오렌지 톤" },
    { id: "orchid", label: "Orchid", hint: "브랜드 포털 같은 퍼플 톤" },
  ];

  function safeGetPreset() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (PRESETS.some((preset) => preset.id === stored)) {
        return stored;
      }
    } catch (error) {
      /* no-op */
    }
    return DEFAULT_PRESET;
  }

  function safeSetPreset(preset) {
    try {
      window.localStorage.setItem(STORAGE_KEY, preset);
    } catch (error) {
      /* no-op */
    }
  }

  function applyPreset(preset) {
    const selected = PRESETS.some((item) => item.id === preset) ? preset : DEFAULT_PRESET;
    document.documentElement.dataset.themePreset = selected;
    if (document.body) {
      document.body.dataset.themePreset = selected;
    }
    safeSetPreset(selected);
    syncButtons(selected);
  }

  function syncButtons(selected) {
    const active = PRESETS.find((item) => item.id === selected);
    document
      .querySelectorAll("[data-theme-preset-button]")
      .forEach((button) => button.classList.toggle("is-active", button.dataset.themePresetButton === selected));
    document
      .querySelectorAll("[data-theme-preset-current]")
      .forEach((node) => {
        node.textContent = active ? active.label : DEFAULT_PRESET;
      });
  }

  function buildDock() {
    if (document.querySelector(".design-dock")) {
      return;
    }

    const dock = document.createElement("div");
    dock.className = "design-dock";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "design-dock-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "디자인 바꾸기";

    const panel = document.createElement("div");
    panel.className = "design-dock-panel";
    panel.innerHTML = `
      <p class="design-dock-title">프리셋을 바로 시험해 보세요</p>
      <p class="dock-caption">저장하면 다음 페이지에서도 같은 프리셋이 유지됩니다.</p>
      <div class="preset-stack">
        ${PRESETS.map(
          (preset) => `
            <button type="button" data-theme-preset-button="${preset.id}">
              <span>
                ${preset.label}
                <small>${preset.hint}</small>
              </span>
            </button>
          `,
        ).join("")}
      </div>
    `;

    dock.appendChild(panel);
    dock.appendChild(toggle);
    document.body.appendChild(dock);

    toggle.addEventListener("click", function () {
      const isOpen = dock.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    dock.querySelectorAll("[data-theme-preset-button]").forEach((button) => {
      button.addEventListener("click", function () {
        applyPreset(button.dataset.themePresetButton);
      });
    });

    document.addEventListener("click", function (event) {
      if (!dock.contains(event.target)) {
        dock.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.documentElement.dataset.themePreset = safeGetPreset();

  document.addEventListener("DOMContentLoaded", function () {
    buildDock();

    document.querySelectorAll("[data-theme-preset-button]").forEach((button) => {
      button.addEventListener("click", function () {
        applyPreset(button.dataset.themePresetButton);
      });
    });

    applyPreset(safeGetPreset());
  });
})();
