# 페이로드와 CoG

:::{admonition} 이 장에서 배우는 것
:class: note
- Payload와 CoG가 왜 움직임 품질에 직접 영향을 주는지
- pick / place 과정에서 payload를 어떻게 바꿔 생각해야 하는지
- Payload Estimation Wizard와 Script 갱신의 기본 개념
:::

## 왜 중요한가

좌표와 프로그램이 맞아도 로봇이 아래처럼 보이면 Payload를 의심해야 합니다.

- 움직임이 어색하다
- Freedrive 감각이 이상하다
- 보호정지가 자주 뜬다
- pick 후와 pick 전 움직임이 다르게 느껴진다

로봇은 현재 툴과 부하의 질량/무게중심을 바탕으로 내부적으로 움직임을 계산합니다. 그래서 이 정보가 틀리면 프로그램도 불안정해 보일 수 있습니다.

## 초보자용 정의

### Payload
로봇이 **현재 들고 있다고 가정하는 질량 정보**입니다.

### CoG (Center of Gravity)
그 질량이 **어디 쪽으로 치우쳐 있는지**를 나타내는 무게중심 정보입니다.

초보자는 "무게만 맞추면 되지 않나?"라고 생각하기 쉽지만, 실제로는 **무게중심 위치**도 매우 중요합니다. 긴 공구, 편심 그리퍼, 한쪽으로 치우친 작업물에서 특히 그렇습니다.

## 언제 payload를 다시 봐야 하나

- 툴을 교체했을 때
- 그리퍼 손가락을 바꿨을 때
- 작업물을 집었을 때
- 작업물을 내려놓았을 때
- 듀얼 그리퍼에서 한쪽만 잡는 경우

## 입문자가 이해하기 쉬운 예시

| 상태 | active payload 생각 |
| --- | --- |
| 빈 그리퍼 | 툴만 포함한 상태 |
| 작업물 파지 후 | 툴 + 작업물 상태 |
| 배출 후 | 다시 빈 그리퍼 상태 |

즉, pick & place에서는 보통 **최소 두 개의 payload 상태**가 생깁니다.

## Payload Estimation Wizard를 언제 쓰나

툴이나 작업물의 질량/CoG를 정확히 계산하기 어려울 때 도움이 됩니다.

실무에서는 아래 경우에 특히 유용합니다.

- 커스텀 그리퍼라 데이터시트가 애매한 경우
- 실제 체결 후 무게중심이 예상과 다른 경우
- 빠르게 기준값을 잡고 이후 미세 조정하려는 경우

## 실무 권장 흐름

1. 툴 자체 질량과 중심을 먼저 파악한다.
2. 작업물 유무에 따라 payload 상태를 분리한다.
3. Installation에 이름 있는 payload를 준비한다.
4. Program에서 pick / place 시점에 payload를 바꾼다.
5. 저속 테스트로 움직임과 정지 상황을 확인한다.

## 이름 규칙 예시

- `payload_empty_gripper`
- `payload_with_part`
- `payload_toolA_empty`
- `payload_toolA_partB`

이름만 봐도 상태가 보여야 합니다.

## Program에서 payload를 바꾸는 구조

초보자에게는 먼저 GUI의 **Set Payload** 개념으로 설명하는 것이 가장 쉽습니다.

예시 흐름:

```text
MoveJ -> pick_approach
MoveL -> pick
DO -> gripper_close
Set Payload -> payload_with_part
MoveL -> pick_retreat
...
MoveL -> place
DO -> gripper_open
Set Payload -> payload_empty_gripper
```

## Script로 바꿀 때 알아둘 점

구버전 예제나 인터넷 자료에는 `set_payload(...)` 예제가 많습니다. 하지만 최신 소프트웨어 기준 문서에서는 `set_target_payload(...)` 쪽을 우선적으로 보는 편이 좋습니다. 사내 매뉴얼에는 이 차이를 짧게라도 적어 두는 것을 권장합니다.

:::{tip}
초보자 문서에는 먼저 GUI 방식으로 설명하고, Script 방식은 심화 박스로 분리하세요. 그래야 학습 난이도가 확 올라가지 않습니다.
:::

## Payload가 잘못됐을 때 보이는 증상

### pick 후에만 움직임이 달라짐
작업물 포함 상태로 payload 전환이 안 됐을 가능성

### 긴 툴에서 자세가 불안해 보임
CoG가 실제보다 flange 쪽에 가깝게 잡혔을 가능성

### Freedrive가 지나치게 무겁거나 가볍게 느낌
Payload 설정이 현실과 다를 가능성

## 초보자가 자주 하는 실수

### 툴 무게만 넣고 작업물 무게는 고려 안 함
pick & place에서 가장 흔합니다.

### 빈 상태와 파지 상태를 같은 payload로 씀
상태 전환 개념이 빠져서 프로그램이 일관되지 않게 됩니다.

### 이름 없는 숫자 메모만 남김
나중에 왜 1.35 kg인지, 그 값이 어떤 상태인지 아무도 모르게 됩니다.

## 체크리스트

- [ ] Payload와 CoG 차이를 설명할 수 있다
- [ ] 빈 그리퍼 / 파지 후 상태를 분리해서 생각할 수 있다
- [ ] Program에서 payload 전환 위치를 설계할 수 있다
- [ ] 실제 움직임 이상이 좌표 문제인지 payload 문제인지 구분해 볼 수 있다

## 다음에 읽을 장

다음 장에서는 **특이점(Singularity)** 을 다룹니다. 좌표는 맞는데 경로가 불안해지는 또 다른 대표 원인입니다.
