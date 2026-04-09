# 위치변수이동

:::{admonition} 이 장에서 배우는 것
:class: note
- Variable Waypoint와 pose 변수의 기본 개념
- `pose_trans`로 오프셋을 만드는 사고방식
- 비전/작업물 크기 변경/반복 패턴에 대응하는 기본 구조
:::

## 위치변수이동이 필요한 이유

고정 waypoint만으로도 많은 작업을 할 수 있지만, 실제 현장에서는 목표 위치가 자주 달라집니다.

예를 들어:

- 카메라가 검출한 위치로 이동
- 작업물 폭에 따라 pick 위치가 달라짐
- 트레이 칸마다 위치가 달라짐
- 사용자가 입력한 오프셋만큼 이동

이럴 때 필요한 것이 **pose 변수 기반 이동**입니다.

## Variable Waypoint의 핵심 개념

Variable Waypoint는 로봇이 갈 위치를 **변수**로부터 받아옵니다. 그 변수는 보통 아래 형태의 pose 입니다.

```text
var_pose = p[x, y, z, rx, ry, rz]
```

- 앞의 3개: 위치
- 뒤의 3개: 방향(회전 벡터)

## 초보자가 꼭 기억해야 할 두 가지

### 1. pose는 숫자 6개가 아니라 "기준 좌표 안의 자세"다
같은 값이라도 Base 기준인지 Feature 기준인지에 따라 의미가 달라집니다.

### 2. Script에서는 길이 단위가 보통 m, 각도는 rad로 생각해야 한다
GUI에서 mm 감각으로 teaching하다가 Script에서 그대로 50을 넣으면 큰 사고가 날 수 있습니다.

:::{warning}
사용자 입력이 mm라면 Script 계산 전에 m로 변환하는 습관을 들이세요. 예: `offset_x_m = offset_x_mm / 1000.0`
:::

## 가장 많이 쓰는 패턴: 기준 pose + 오프셋

초보자가 변수 이동을 가장 쉽게 이해하는 방식은 아래입니다.

1. 기준이 되는 `start_pose` 하나를 만든다
2. 오프셋 pose를 만든다
3. `pose_trans(start_pose, offset_pose)` 로 최종 위치를 만든다

예시:

```python
start_pose = p[0.400, -0.200, 0.250, 3.1416, 0.0, 0.0]
offset_pose = p[0.050, 0.000, 0.000, 0.0, 0.0, 0.0]
target_pose = pose_trans(start_pose, offset_pose)
movel(target_pose, a=1.2, v=0.25)
```

위 예시는 시작 위치에서 X 방향으로 50 mm 이동한 위치를 계산하는 개념입니다.

## GUI에서 Variable Waypoint를 쓰는 흐름

1. Move 노드를 추가한다
2. Waypoint를 선택한다
3. Fixed position을 Variable position으로 바꾼다
4. pose 변수를 선택한다
5. 프로그램 앞단에서 그 변수 값을 계산/할당한다

## 실습: 2 x 2 패턴 찍기

### 목표
기준 위치 하나로 네 개의 작업점을 계산해서 이동

### 예시 개념

```python
base_pick = p[0.300, -0.200, 0.200, 3.1416, 0.0, 0.0]
step_x = 0.040
step_y = 0.030

pick_00 = base_pick
pick_10 = pose_trans(base_pick, p[step_x, 0.0, 0.0, 0.0, 0.0, 0.0])
pick_01 = pose_trans(base_pick, p[0.0, step_y, 0.0, 0.0, 0.0, 0.0])
pick_11 = pose_trans(base_pick, p[step_x, step_y, 0.0, 0.0, 0.0, 0.0])
```

이 패턴은 트레이, 팔레트, 반복 검사 위치에서 매우 자주 등장합니다.

## 비전이나 외부 데이터와 연결할 때의 사고방식

외부 장치가 좌표를 줄 때는 다음 순서로 해석하세요.

1. 그 좌표가 **어느 좌표계 기준인지** 확인
2. 단위가 mm인지 m인지 확인
3. 회전 표현 방식이 무엇인지 확인
4. 로봇 쪽 Feature와 어떻게 연결할지 결정

초보자는 이 단계를 빼먹고 숫자만 넣다가 많이 헷갈립니다.

## 언제 Variable Waypoint를 쓰지 말아야 하나

- 항상 같은 위치를 반복적으로 가는 단순 작업
- 작업자가 직접 손으로 점을 다시 잡는 편이 더 빠른 경우
- 기준 Feature와 단위를 아직 팀 전체가 통일하지 못한 경우

이때는 먼저 Fixed Waypoint로 안정화하는 편이 낫습니다.

## 자주 하는 실수

### 변수는 만들었는데 초기값이 없음
프로그램 시작 시 pose가 비어 있거나 예상치 못한 값이면 위험합니다.

### Base 기준인지 Feature 기준인지 모름
숫자만 맞춰도 실제 움직임은 다르게 나옵니다.

### mm를 m로 바꾸지 않음
가장 자주 나오는 단위 실수입니다.

### 접근점 없이 변수 작업점으로 바로 들어감
고정점과 마찬가지로 접근/이탈 구조를 반드시 두는 것이 좋습니다.

## 초보자용 추천 구조

```text
calculated_approach = pose_trans(base_pose, approach_offset)
calculated_work = pose_trans(base_pose, work_offset)
MoveL -> calculated_approach
MoveL -> calculated_work
MoveL -> calculated_approach
```

즉, 변수 위치에도 **접근점과 복귀점**을 만들어 두는 것이 좋습니다.

## 체크리스트

- [ ] Variable Waypoint가 pose 변수를 사용한다는 점을 이해했다
- [ ] `pose_trans`로 오프셋 계산 개념을 설명할 수 있다
- [ ] mm / m 단위 변환 실수를 경계하고 있다
- [ ] 변수 기반 이동에도 접근점/이탈점이 필요하다는 점을 이해했다

## 다음에 읽을 장

다음 장에서는 **Payload와 CoG** 를 다룹니다. 좌표가 맞아도 로봇이 불안정하게 느껴질 때 꼭 확인해야 하는 항목입니다.
