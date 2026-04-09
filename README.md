# UR 협동로봇 입문 Sphinx 웹 매뉴얼 · Theme Lab Edition

Universal Robots(UR) 협동로봇을 처음 쓰는 작업자와 엔지니어를 위한 **모던 스타일 Sphinx 웹 매뉴얼 템플릿**입니다.

이번 버전은 특히 **디자인을 직접 돌려보는 것**에 초점을 맞췄습니다.

- **학습형 문서 구조**: `start -> basics -> motion -> stability -> automation -> appendix`
- **실제 웹사이트 같은 UI**: `pydata-sphinx-theme` + 디자인 토큰 기반 CSS
- **라이브 디자인 테스트**: 오른쪽 아래 `🎨 테마` 버튼으로 5가지 프리셋 즉시 전환
- **쉬운 커스터마이징**: 색상 토큰과 레이아웃 파일을 분리해서 수정 부담 감소
- **확장 가능한 구조**: 용어집, 포트 표, 트러블슈팅, 편집 가이드, 디자인 실험실 포함

## 폴더 구조

```text
ur_cobot_sphinx_manual_theme_lab/
  README.md
  requirements.txt
  Makefile
  make.bat
  docs/
    conf.py
    index.md
    start/
    basics/
    motion/
    stability/
    automation/
    appendix/
      design-lab.md
      editing-guide.md
    _static/
      theme-presets.css
      custom.css
      theme-switcher.js
      robot-manual-logo.svg
```

## 빠르게 실행하기

### Windows PowerShell

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
.\make.bat html
```

빌드가 끝나면 아래 파일을 브라우저로 열면 됩니다.

```text
docs\_build\html\index.html
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
make html
```

빌드가 끝나면 아래 파일을 브라우저로 열면 됩니다.

```text
docs/_build/html/index.html
```

## 저장할 때마다 자동 미리보기

디자인을 계속 바꿔가며 보려면 이게 가장 편합니다.

```bash
sphinx-autobuild docs docs/_build/html --port 3000
```

그 다음 브라우저에서:

```text
http://127.0.0.1:3000
```

포트는 자유롭게 바꿀 수 있습니다.

```bash
sphinx-autobuild docs docs/_build/html --port 8080
sphinx-autobuild docs docs/_build/html --port 9000
```

## 디자인은 어디서 바꾸나?

가장 자주 만지는 파일은 아래 세 개입니다.

| 목적 | 파일 |
| --- | --- |
| 프리셋 색상 | `docs/_static/theme-presets.css` |
| 카드 / 버튼 / 레이아웃 / 배경 | `docs/_static/custom.css` |
| 프리셋 토글 동작 | `docs/_static/theme-switcher.js` |

그리고 내용 수정은 그냥 Markdown 파일을 고치면 됩니다.

| 목적 | 파일 |
| --- | --- |
| 첫 화면 문구 / 카드 / 메뉴 | `docs/index.md` |
| 각 장 본문 | `docs/**/*.md` |
| 테마 설정 | `docs/conf.py` |

## 포함된 디자인 기능

- 5가지 프리셋: `Indigo`, `Emerald`, `Graphite`, `Orchid`, `Mono`
- 라이트 / 다크 모드 대응
- 히어로 랜딩, 카드형 홈 화면, 부드러운 그림자와 둥근 모서리
- 카드 / 표 / 코드 블록 / admonition 스타일 통일
- 오른쪽 아래 플로팅 테마 버튼
- `appendix/design-lab.md`에서 디자인 실험 가능

## 추천 편집 흐름

1. `sphinx-autobuild`로 로컬 서버 실행
2. 브라우저에서 프리셋을 눌러 방향 결정
3. `theme-presets.css`에서 색상만 미세 조정
4. 필요하면 `custom.css`에서 카드 라운드, 그림자, 여백 조정
5. 마지막으로 `index.md` 홈 카드와 문구 다듬기

## 새 프리셋 추가도 가능

1. `theme-presets.css`에 새 `html[data-brand-preset="..."]` 블록 추가
2. `theme-switcher.js`의 `PRESETS`에 이름/설명/색 추가
3. `appendix/design-lab.md`에 버튼 하나 추가

## 문서 수정 가이드

자세한 설명은 아래 페이지에 정리되어 있습니다.

```text
docs/appendix/editing-guide.md
```

디자인만 집중해서 보고 싶다면 아래 페이지를 보세요.

```text
docs/appendix/design-lab.md
```
