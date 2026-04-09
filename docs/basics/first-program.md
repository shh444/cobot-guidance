# 첫 프로그램 만들기

:::{admonition} 이 장에서 배우는 것
:class: note
- 초보자용 가장 안전한 첫 실습 흐름
- Move와 Waypoint를 이용해 간단한 프로그램 만드는 법
- 첫 프로그램에서 반드시 넣어야 할 점 이름과 순서
:::

## 첫 프로그램의 목표

첫 프로그램은 간단한 픽앤플레이스 입니다.
모든 산업용 로봇의 대부분의 어플리케이션은 제품을 집고 놓는 픽앤플레이스 입니다.

1. 설치탭에서 필요한 설정을 할 수 있다.
2. 이동할 웨이포인트를 저장할 수 있다.
3. 그리퍼 등 외부 장치와 통신하여 제어 할 수 있다.

## 설치 탭(TCP) 설정 예시

아래 화면은 PolyScope `Installation > TCP` 메뉴에서 툴 중심점(TCP)의 위치와 자세를 정의하는 예시입니다.

```{figure} ../_static/first-program-tcp-installation.png
:alt: PolyScope Installation 탭의 TCP 설정 화면
:width: 100%

첫 프로그램 시작 전에 TCP Position/Orientation을 설정하고, 3D 시각화로 방향을 검증하는 단계.
```

## 설치 탭(Payload/CoG) 측정 예시

아래 화면의 **빨간 박스 `Measure` 버튼**은 `Payload`(질량)와 `Center of Gravity`(무게중심, CoG)를 추정할 때 사용하는 기능입니다.  
툴과 작업물의 값을 정확히 모르는 경우, 폴리스코프의 페이로드 위자드에서 **서로 다른 4개 웨이포인트를 저장하면** 질량과 무게중심을 계산해줍니다.

```{figure} ../_static/first-program-payload-cog-measure.png
:alt: PolyScope Installation 탭의 Payload/CoG Measure 화면
:width: 100%

`Measure` 결과로 얻은 Payload/CoG 값은 로봇의 이동 안정성과 정지 성능에 직접 영향을 주므로, 초기 셋업에서 반드시 확인합니다.
```

## 프로그램 트리 예시: 5개 포인트 + 그리퍼 동작 + 1초 대기

아래 예시는 PolyScope 프로그램 트리에서 `MoveL` 하위에 연속 웨이포인트를 구성하고,
공정 시점에 그리퍼 명령과 `Wait 1.0s`를 넣는 기본 사이클 패턴입니다.

```{figure} ../_static/first-program-5points-gripper-wait.png
:alt: PolyScope 프로그램 트리의 6개 웨이포인트 이동과 그리퍼 명령, 1초 대기 예시
:width: 100%

`Waypoint_1`부터 `Waypoint_5`까지 이동한 뒤 `Set gripper_on=On`을 실행하고, 1초 기다린 후 다시 올라온 예시 화면.
```

```text
MoveL
  Waypoint_1
  Waypoint_2
  Waypoint_3
  Waypoint_4
  Waypoint_5
  Set gripper_on = On
  Wait 1.0s
  Waypoint_4
```


## 실제 작업 순서

### 1. 로봇 초기화

- 전원 상태 및 비상정지/안전 상태를 확인합니다.
- 로봇 암 파워 온 및 브레이크 릴리즈를 수행합니다.
- Move 화면에서 현재 자세와 기준 좌표를 점검합니다.

### 2. 툴, 마운팅, 네트워크(아이피) 등 설치값 설정

- `TCP`, `Payload/CoG`를 포함한 툴 정보를 설정합니다.
- 마운팅 방향과 중력 방향을 실제 설치 상태와 일치시킵니다.
- 제어기 IP와 통신 기본값을 설정하고 저장합니다.

### 3. 프로그래밍

- 새 Program/Installation을 생성하고 버전 규칙에 맞춰 저장합니다.
- `Move` 노드와 웨이포인트를 구성해 기본 동작 흐름을 만듭니다.
- 저속 공회전으로 경로와 자세를 검증한 뒤 작업 속도를 조정합니다.

### 4. PLC, Vision, Gripper 등 부가장치 연동

- I/O 또는 통신 방식(Modbus/TCP, 필드버스 등)을 확정합니다.
- 그리퍼, 비전, PLC 신호를 프로그램 시퀀스에 연결합니다.
- 인터락과 에러 처리(타임아웃, 비정상 신호 대응)를 함께 검증합니다.

## 다음에 읽을 장

다음 장에서는 **Waypoint와 Move 명령어를 좀 더 체계적으로** 정리합니다.
