# 문서 홈

UR 협동로봇 입문 문서의 시작 페이지입니다.  
아래 학습 카드에서 원하는 경로를 선택해 바로 시작할 수 있습니다.

<div class="hero-actions">
  <a class="button-link primary" href="start/cobot-overview.html">문서 시작하기</a>
  <a class="button-link secondary" href="appendix/glossary.html">용어 먼저 보기</a>
</div>

## 핵심 학습 경로

<div class="card-grid">
  <a class="doc-card" href="start/cobot-overview.html">
    <span class="card-kicker">Step 01</span>
    <h3>시작하기</h3>
    <p>협동로봇 개념, 버전 구분, URSim 기반 입문 경로를 정리합니다.</p>
    <span class="card-meta">협동로봇 · PolyScope 5 / X · URSim</span>
  </a>
  <a class="doc-card" href="basics/hardware.html">
    <span class="card-kicker">Step 02</span>
    <h3>기본 조작</h3>
    <p>하드웨어 구성과 PolyScope 화면을 이해하고 첫 프로그램을 만듭니다.</p>
    <span class="card-meta">하드웨어 · 펜던트 · Program Tree</span>
  </a>
  <a class="doc-card" href="motion/waypoints-and-moves.html">
    <span class="card-kicker">Step 03</span>
    <h3>모션과 좌표</h3>
    <p>Waypoint, MoveJ/MoveL, TCP, Feature, 위치변수이동을 연결해 학습합니다.</p>
    <span class="card-meta">Waypoint · TCP · Feature · Pose</span>
  </a>
  <a class="doc-card" href="automation/urscript-basics.html">
    <span class="card-kicker">Step 04</span>
    <h3>자동화 확장</h3>
    <p>URScript와 통신 기초를 익히고 외부 장비 연동 흐름으로 확장합니다.</p>
    <span class="card-meta">URScript · Socket · RTDE</span>
  </a>
</div>

## 추가 자료

- [안정 운전](stability/payload-and-cog.md)
- [트러블슈팅](appendix/troubleshooting.md)
- [공식 자료 링크](appendix/official-resources.md)

:::{note}
이 문서는 입문 및 내부 교육용입니다. 실제 설비 적용 전에는 공식 문서와 현장 안전 기준을 함께 확인하세요.
:::

```{toctree}
:hidden:
:maxdepth: 2
:caption: 시작하기

start/cobot-overview
start/version-and-learning-path
start/ursim-first
```

```{toctree}
:hidden:
:maxdepth: 2
:caption: 기본 조작

basics/hardware
basics/polyscope-overview
basics/first-program
```

```{toctree}
:hidden:
:maxdepth: 2
:caption: 모션과 좌표

motion/waypoints-and-moves
motion/tcp
motion/frames-and-features
motion/variable-position-moves
```

```{toctree}
:hidden:
:maxdepth: 2
:caption: 안정 운전

stability/payload-and-cog
stability/singularity
```

```{toctree}
:hidden:
:maxdepth: 2
:caption: 자동화 확장

automation/urscript-basics
automation/communication-overview
automation/dashboard-server
automation/socket-communication
automation/rtde
```

```{toctree}
:hidden:
:maxdepth: 2
:caption: 부록

appendix/glossary
appendix/ports-and-interfaces
appendix/troubleshooting
appendix/official-resources
```
