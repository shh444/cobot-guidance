# PolyScope 개요

:::{admonition} 이 장에서 배우는 것
:class: note
- PolyScope를 처음 봤을 때 어디부터 보면 되는지
- Installation / Program / Run / Move / I/O / Log의 역할
- 메뉴가 많아도 길을 잃지 않는 기본 원리
:::

## PolyScope를 한 문장으로 설명하면

PolyScope는 **로봇을 설정하고, 움직임을 프로그래밍하고, 실행하고, 상태를 확인하는 작업 화면**입니다.

- **Installation은 로봇의 설정을 하는 곳**
- **Program은 로봇의 프로그래밍을 하는 곳**

## 화면을 기능으로 나눠 보기

| 영역 | 초보자용 해석 | 대표 작업 |
| --- | --- | --- |
| Installation | 로봇의 기본 설정 | TCP, Payload, Feature, I/O, 네트워크 |
| Program | 작업 순서 만들기 | Move, Waypoint, If, Loop, Script |
| Run | 실행과 모니터링 | 재생, 일시정지, 정지, 상태 확인 |
| Move | 수동 이동 | 각도/위치 이동, 좌표값 확인, Freedrive |
| I/O | 신호 확인 | 센서 입력, 출력 상태 확인 |
| Log / 메시지 | 문제 파악 | 경고, 에러, 보호정지 원인 확인 |

## 가장 중요한 구분: Installation vs Program

### Installation

Installation은 프로그램 여러 개가 공통으로 쓰는 **환경 설정**입니다.

예를 들면:

- TCP
- Payload
- Feature
- I/O 이름
- 통신 설정
- 일부 안전 관련 설정

### Program

Program은 실제 작업 순서입니다. 위에서 부터 아래까지 순차적으로 동작 됩니다.

예를 들면:

- 시작 위치로 이동
- 그리퍼 닫기
- MoveL로 삽입
- 센서 확인
- 배출 위치로 이동

:::{important}
처음 하는 분이 헷갈리는 부분은 "왜 다른 프로그램에서도 같은 TCP가 보이지?" 입니다. 이유는 TCP가 보통 Installation에 속하기 때문입니다.
:::

## Program Tree를 보는 법

Program Tree는 "로봇이 어떤 순서로 무엇을 할지"를 보여 줍니다.

보통은 아래처럼 읽으면 됩니다.

1. Before Start에서 시작
2. Move 명령어로 로봇은 움직입니다
3. Set, Gripper 같은 명령어에서 그리퍼가 제어가 됩니다.

예시:

```text
Robot Program
  BeforeStart
  MoveJ
    home_safe
  MoveL
    approach_pick
    pick
  Set
    gripper_close
```

## Move 화면을 어떻게 써야 하나

Move 화면에서 **좌표를 확인하고 실제로 로봇을 움직일 수 ** 있습니다.

여기서 보게 되는 핵심은 다음과 같습니다.

- 현재 TCP 위치
- 기준 좌표(Base / Tool / Feature)
- 좌표계 이동
- 각 조인트 관절 이동
- Freedrive
- 미세 위치 조정

## Run 화면에서 봐야 할 것

Run 화면은 작업자 전용 화면 입니다.

- 프로그램이 실제로 어디까지 진행됐는가
- 속도 스케일이 얼마인가
- 현재 멈춤/일시정지/실행 상태가 무엇인가
- 알람이나 경고가 떴는가
- 변수의 현재값

## I/O 화면의 역할

I/O 화면은 **외부 장치의 실시간 값을 확인하고 직접 제어할 수 있는** 화면 입니다.

예를 들어 아래를 빠르게 확인할 수 있습니다.

- PLC 에서 신호가 정말 들어오는가
- 그리퍼 출력이 실제로 켜졌는가
- 센서가 예상한 타이밍에 변하는가

## PolyScope 5 VS Polyscope X 차이

유니버설로봇은 최신 소프트웨어인 Polyscope X 와 Polyscope 5 가 있습니다.
최신 기술 스택 및 ROS2, AI 등을 활용 그리고 더 높은 보안/안전 수준을 위해서는 Polyscope X 가 적합하며 실제로 컴퓨팅 파워도 더 높습니다.

PolyScope X에서는 화면 구성과 아이콘 위치가 다를 수 있습니다. 하지만 여전히 핵심은 같습니다.

- 설정할 것: Installation 성격
- 순서 만들 것: Program 성격
- 실행 확인: Run 성격
- 좌표 teaching: Move 성격

## 다음에 읽을 장

다음 장에서는 **정말로 첫 프로그램**을 만들어 봅니다.
