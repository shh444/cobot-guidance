# 용어집

이 페이지는 초보자가 자주 헷갈리는 용어를 빠르게 다시 찾기 위한 **현장용 치트시트**입니다.

| 용어 | 쉬운 설명 |
| --- | --- |
| 협동로봇(Cobot) | 사람 가까이에서 쓰기 쉬운 형태로 설계된 로봇. 하지만 안전성은 공정과 위험성 평가에 따라 달라진다. |
| Robot Arm | 실제로 움직이는 로봇 팔 본체 |
| Control Box | 전원, 제어, I/O, 통신이 모이는 제어 박스 |
| Teach Pendant | 화면 조작과 teaching에 쓰는 조작기 |
| Installation | 로봇의 기본 설정. TCP, Payload, Feature, I/O 등이 여기에 들어간다. |
| Program | 로봇이 실제로 무엇을 할지 정의하는 순서 |
| Freedrive | 브레이크가 풀린 상태에서 손으로 로봇을 움직여 teaching하는 기능 |
| Waypoint | 로봇이 가야 할 목표 위치/자세 |
| Fixed Waypoint | 손으로 teaching한 고정 위치 |
| Relative Waypoint | 직전 기준에서 상대적으로 이동하는 waypoint |
| Variable Waypoint | pose 변수로 결정되는 waypoint |
| MoveJ | 관절 중심 이동 명령 |
| MoveL | TCP가 직선으로 움직이도록 하는 이동 명령 |
| MoveP | 연속적이고 부드러운 공정 경로에 적합한 이동 명령 |
| TCP | 로봇이 공구 끝이라고 생각하는 기준점 |
| Feature | 작업물/테이블/지그 기준 좌표계 |
| Base | 로봇 베이스 기준 좌표 |
| Tool | 현재 TCP 기준 좌표 |
| Plane Feature | 평면과 방향을 기반으로 잡는 작업 기준 좌표계 |
| Payload | 로봇이 현재 들고 있다고 계산하는 질량 정보 |
| CoG | 무게중심 위치 정보 |
| Singularity | 로봇이 자연스럽게 움직이기 어려워지는 자세/영역 |
| URScript | UR 동작을 코드로 표현하는 언어 |
| Dashboard Server | 프로그램 실행/정지/로드 등 간단한 원격 명령용 인터페이스 |
| Socket 통신 | 로봇과 외부 장치가 자유 형식 메시지를 주고받는 방식 |
| RTDE | 구조화된 주기적 데이터 교환 인터페이스 |
| Primary / Secondary | URScript 전송 및 상태 데이터 관련 인터페이스 계열 |

:::{tip}
사내 문서에는 이 표에 "우리 회사 표현"을 추가해 두면 교육 속도가 빨라집니다. 예: `home_safe = 셀 기본 대기 위치`
:::
