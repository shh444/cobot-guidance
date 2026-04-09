# URScript 기초

:::{admonition} 이 장에서 배우는 것
:class: note
- URScript가 어디에서 쓰이는지
- 변수, pose, 조건문, 반복문, 함수의 기본 형태
- GUI 프로그램과 Script를 어떻게 섞어 쓰면 좋은지
:::

## URScript를 초보자용으로 설명하면

URScript는 UR 로봇 동작을 **코드 형태로 표현하는 언어**입니다.

초보자는 먼저 이렇게 이해하면 충분합니다.

- GUI는 "보이게 만드는 방법"
- URScript는 "계산과 확장을 더 유연하게 만드는 방법"

즉, 둘 중 하나만 쓰는 것이 아니라 **GUI로 큰 흐름을 만들고, Script로 계산/반복/외부연동을 보강**하는 방식이 가장 실무적입니다.

## 어디에 쓰이나

- Variable Waypoint 계산
- 외부 장치와 소켓 통신
- 복잡한 조건문 / 반복문
- payload/TCP 전환 자동화
- GUI로 만들기 불편한 수식 계산

## 가장 먼저 익힐 기본 문법

### 1. 변수

```python
count = 0
part_width = 0.120
base_pose = p[0.400, -0.100, 0.250, 3.1416, 0.0, 0.0]
```

### 2. 함수

```python
def go_home():
  movej([0.0, -1.57, 1.57, 0.0, 1.57, 0.0], a=1.2, v=0.5)
end
```

### 3. 조건문

```python
if count > 10:
  popup("검사 수량 초과")
end
```

### 4. 반복문

```python
index = 0
while index < 4:
  index = index + 1
end
```

## pose와 list를 구분하기

초보자가 자주 헷갈리는 부분입니다.

- `p[x, y, z, rx, ry, rz]` 는 **pose**
- `[a, b, c]` 는 일반 **list**
- `[j1, j2, j3, j4, j5, j6]` 는 관절값 목록으로도 자주 사용

## 가장 먼저 해볼 만한 예제

### 예제 1. 기준점에서 50 mm 옆으로 이동

```python
def move_offset_example():
  start_pose = p[0.400, -0.100, 0.250, 3.1416, 0.0, 0.0]
  offset_pose = p[0.050, 0.000, 0.000, 0.0, 0.0, 0.0]
  target_pose = pose_trans(start_pose, offset_pose)
  movel(target_pose, a=1.2, v=0.25)
end
```

### 예제 2. 조건에 따라 분기

```python
def branch_example(has_part):
  if has_part:
    popup("작업물을 잡은 상태")
  else:
    popup("빈 그리퍼 상태")
  end
end
```

## GUI와 Script를 어떻게 섞을까

초보자에게는 아래 원칙을 권장합니다.

### GUI가 좋은 것

- Move / Waypoint 구성
- 간단한 Set / Wait / I/O 제어
- 작업 순서 시각화

### Script가 좋은 것

- pose 계산
- 외부 데이터 처리
- 재사용 함수 만들기
- 반복 패턴 생성

즉, **처음엔 GUI 80%, Script 20%** 정도 감각이 가장 무난합니다.

## Script를 쓸 때의 실수 방지 원칙

### 원칙 1. 숫자에 이름을 붙이기
`0.05`보다 `step_x = 0.05`가 훨씬 좋습니다.

### 원칙 2. 단위를 변수명에 드러내기
`offset_x_mm`, `offset_x_m`처럼 표기하면 단위 실수를 줄일 수 있습니다.

### 원칙 3. 계산과 이동을 분리하기
바로 `movel(pose_trans(...))`보다 중간 변수 `target_pose`를 두는 편이 디버깅에 좋습니다.

### 원칙 4. popup / textmsg로 상태를 남기기
처음 디버깅할 때는 화면에 현재 상태를 보여 주는 것이 큰 도움이 됩니다.

## 초보자가 자주 하는 실수

### GUI에서 되는 것을 너무 빨리 전부 Script로 바꾸려 함
가독성과 유지보수가 급격히 나빠질 수 있습니다.

### pose와 joint list를 혼동함
문법은 비슷해 보여도 의미가 다릅니다.

### 단위를 생각하지 않음
특히 위치는 m, 회전은 rad 감각을 잃지 않아야 합니다.

### 함수로 묶지 않고 복붙만 늘림
같은 작업이 반복되면 함수화하는 습관이 좋습니다.

## 학습 과제

- `home_safe`로 가는 함수 만들기
- 기준 pose에서 X/Y 오프셋을 계산하는 함수 만들기
- count가 4가 될 때까지 반복하는 간단한 루프 만들기

## 체크리스트

- [ ] 변수, 함수, if, while 기본 형태를 읽을 수 있다
- [ ] pose와 list를 구분할 수 있다
- [ ] GUI와 Script의 역할 차이를 이해했다
- [ ] 단위와 변수명 관리가 중요하다는 점을 이해했다

## 다음에 읽을 장

다음 장에서는 **통신 전체 그림**을 먼저 잡습니다.
