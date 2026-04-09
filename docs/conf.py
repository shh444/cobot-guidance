project = "UR 협동로봇 입문 웹 매뉴얼"
author = "사용자 맞춤 초안"

extensions = [
    "myst_parser",
    "sphinx_copybutton",
    "sphinx_design",
]

source_suffix = {
    ".md": "markdown",
}

root_doc = "index"
language = "ko"
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

templates_path = ["_templates"]
html_theme = "pydata_sphinx_theme"
html_title = project
html_logo = "_static/robot-manual-logo.svg"
html_favicon = "_static/robot-manual-logo.svg"
html_static_path = ["_static"]
html_css_files = ["theme-presets.css", "custom.css"]
html_js_files = ["theme-switcher.js"]
html_last_updated_fmt = "%Y-%m-%d"
html_theme_options = {
    "logo": {"text": project},
    "show_toc_level": 2,
    "show_nav_level": 2,
    "navigation_depth": 4,
    "collapse_navigation": False,
    "navigation_with_keys": True,
    "navbar_align": "left",
    "navbar_start": ["navbar-logo"],
    "navbar_center": ["navbar-nav"],
    "header_links_before_dropdown": 0,
    "navbar_end": ["search-button", "theme-switcher"],
    "secondary_sidebar_items": ["page-toc"],
    "footer_start": [],
    "footer_center": [],
    "footer_end": [],
}
html_sidebars = {
    "**": ["sidebar-global-toc.html"],
}

myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "attrs_block",
    "attrs_inline",
]

myst_heading_anchors = 3
copybutton_prompt_text = r">>> |\.\.\. |\$ "
copybutton_prompt_is_regexp = True
