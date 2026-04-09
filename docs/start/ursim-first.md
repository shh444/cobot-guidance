# 유니버설로봇 학습 방법

:::{admonition} 이 장에서 배우는 것
:class: note
- 초보자가 유니버설로봇을 배우는 방법
- URSim 이란?
- URSim으로 연습하기 좋은 항목과 좋지 않은 항목
:::

## 가장 빠르고 쉬운 시작: 무료 온라인 교육

가장 진입장벽이 낮은 방법은 [Universal Robots Academy](https://academy.universal-robots.com/)의 무료 온라인 교육입니다.

- 웹 기반으로 바로 학습 가능
- 플래시 기반(인터랙티브) 실습처럼 실제 로봇 조작 흐름을 단계별로 체험 가능
- 초보자가 용어, 조작 순서, 기본 개념을 빠르게 익히기 좋음

## 공식 교육센터(지사/파트너사) 활용

유니버설로봇 지사 및 파트너사의 인증 교육센터에서는 더 깊이 있는 실습 교육을 받을 수 있습니다.

대표적으로 아래 과정이 많이 운영됩니다.

- 코어(Core): UR 기본 조작, 안전, 티칭, 기본 프로그램 작성까지 입문 역량을 다집니다.
- 어드밴스드(Advanced): 고급 프로그램 구조, 포스 기능, 좌표계 등 실무 응용 중심으로 심화합니다.
- 산업용 통신: PLC/상위설비와의 필드버스 및 신호 연동 구성을 다룹니다.
- 인터페이스: PC 원격 제어, API/스크립트 기반 연동 방법을 익힙니다.
- 서비스(Service): 유지보수, 점검, 고장 진단, 복구 절차 등 서비스 실무를 학습합니다.

온라인 교육으로 기초를 익힌 뒤, 인증 교육센터에서 실습 중심으로 심화하는 방식이 가장 효율적입니다.

## 유니버설로봇 문서 활용

유니버설로봇은 다양한 문서를 제공하고 있습니다.

| 분류 | 링크 | 언제 보면 좋은가 |
| --- | --- | --- |
| 데이터/사양 | [데이터 시트 및 사양서](https://www.universal-robots.com/manuals/EN/HTML/MainLanding/Content/Landingpages/LandingSheets.htm) | 모델 비교, 하드웨어 스펙 확인 |
| 매뉴얼 모음 | [메뉴얼 다운로드 링크 정리](https://www.universal-robots.com/manuals/EN/HTML/MainLanding/Content/Landingpages/external_links.htm) | PDF/HTML 매뉴얼을 한 번에 찾을 때 |
| 문서 허브 | [문서 정리](https://docs.universal-robots.com/) | 튜토리얼, 가이드, 개발 문서 탐색 시작점 |
| 지원/다운로드 | [UR SUPPORT & DOWNLOAD(도면,업데이트)](https://www.universal-robots.com/support/) | 업데이트 파일, 도면, 지원 자료 확인 |
| PolyScope 문서 | [폴리스코프 웹 메뉴얼](https://www.universal-robots.com/manuals/EN/HTML/SW5_22/Content/Landingpages/Web/SWHandbook.htm) | 팬던트 화면/기능을 바로 찾을 때 |
| 개발자 자료 | [SDK 정리](https://www.universal-robots.com/manuals/EN/HTML/MainLanding/Content/Landingpages/SDK.htm) | SDK 관련 공식 자료 접근 |
| 개발자 포털 | [UR DEVELOPER SUIT](https://www.universal-robots.com/developer/) | 개발 도구, API, 연동 자료 확인 |


## URSim 이란?

`URSim`은 PC에서 PolyScope 환경을 가상으로 연습할 수 있는 시뮬레이터입니다.  
즉, 실제 장비 없이도 화면 조작과 프로그램 구조를 먼저 익힐 수 있습니다.
URSim은 실제 로봇의 프로그램과 100% 동일하며 작성한 프로그램을 그대로 쓸 수 있습니다.

시뮬레이터 설치 방법 : 
설치는 다양한 프로그램을 이용할 수 있습니다. Vmware, Virtual Box, Docker는 상용 프로그램이기 때문에 각 기업에 맞는 소프트웨어를 사용하시면 됩니다.

이미지 파일 기반

1. [VMWARE 설치 메뉴얼](https://slime-conifer-fd5.notion.site/UR-URSIM-VMWARE-ROBODK-325bbf6a90898029aa82db2d22099453?source=copy_link)
2. [VIRTUALBOX 설치 메뉴얼](https://slime-conifer-fd5.notion.site/UR-URSIM-VIRTUAL-BOX-ROBODK-b64df988fe544e9280c44ab91deaa3ef?source=copy_link)

도커 기반

3. [DOCKER 설치 메뉴얼](https://slime-conifer-fd5.notion.site/URSIM-DOCKER-1-271bbf6a90898094a440dd17a87fbd7d?source=copy_link)

## URSim으로 연습하기 좋은 항목

- PolyScope 화면 구조 익히기
- Program / Installation 개념 익히기
- Move 노드와 Waypoint 추가 연습
- 변수, Script, 통신 구조를 이해하기
- 문서 캡처용 스크린샷 만들기

## URSim Vs 실제 로봇과의 차이

URSim은 실제 로봇 암이 연결되지 않으므로 아래 항목은 실기에서 반드시 다시 검증해야 합니다.

- 실제 그리퍼 및 비전 그리고 I/O 배선과 외부 장치 연동 없음
- 힘/토크 기반 센싱 내용

:::{warning}
URSim에서 정상 동작해도 실제 장비에서는 외부 구조물이나 변수가 있기 때문에 최초 프로그램 동작 시 반드시 저속, e-stop 준비, 충분한 이격거리 확인 후 구동.
:::

## 추천 학습 순서

1. 무료 온라인 교육(UR Academy)으로 기본 개념 익히기
2. 인증 교육센터 과정(Core/Advanced 등)으로 실습 심화
3. URSim으로 반복 연습
4. 실제 장비에서 검증

## 다음에 읽을 장

다음 장에서는 실제 장비를 다루기 위해 **하드웨어 구성과 기본 조작**을 정리합니다.
