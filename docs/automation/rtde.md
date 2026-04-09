# RTDE

:::{admonition} 이 장에서 배우는 것
:class: note
- RTDE가 어떤 용도인지
- Dashboard / Socket과 무엇이 다른지
- 초보자가 RTDE를 도입할 때의 최소 개념
:::

## RTDE를 한 문장으로 설명하면

RTDE(Real-Time Data Exchange)는 **로봇 상태와 일부 입력/출력 데이터를 구조화된 방식으로 주기적으로 주고받는 인터페이스**입니다.

초보자 관점에서는 이렇게 이해하면 좋습니다.

- Dashboard: 간단한 제어 명령
- Socket: 자유로운 커스텀 메시지
- RTDE: 구조가 정해진 주기적 데이터 교환

## 언제 RTDE가 좋은가

- 현재 TCP pose를 계속 읽고 싶을 때
- 디지털 입력/출력 상태를 PC에서 모니터링하고 싶을 때
- 로봇 상태를 주기적으로 기록하고 싶을 때
- 상위 프로그램이 안정적으로 상태를 받아야 할 때

## RTDE의 핵심 개념 4가지

### 1. Recipe
어떤 데이터를 주고받을지 목록을 정하는 개념입니다.

### 2. Output
로봇에서 PC로 보내는 데이터입니다.
예: TCP pose, robot mode, digital input 상태

### 3. Input
PC에서 로봇으로 보내는 데이터입니다.
예: 일반 목적 레지스터, 일부 출력 상태

### 4. Sync cycle
정해진 주기 안에서 데이터를 주고받는 구조라고 생각하면 됩니다.

## 초보자 추천 첫 활용 예

### 예 1. 상태 모니터링

- actual TCP pose 읽기
- digital input 읽기
- robot mode 읽기

### 예 2. 간단한 로깅

- 생산 중 TCP 궤적 기록
- I/O 변화 시점 기록

## 개념 예제(파이썬 의사코드)

```python
# 개념 예제: 실제 실행에는 RTDE 관련 라이브러리와 설정 파일이 필요함
import rtde.rtde as rtde
import rtde.rtde_config as rtde_config

ROBOT_IP = "192.168.0.10"
ROBOT_PORT = 30004

conf = rtde_config.ConfigFile("record_configuration.xml")
output_names, output_types = conf.get_recipe("out")

con = rtde.RTDE(ROBOT_IP, ROBOT_PORT)
con.connect()
con.get_controller_version()
con.send_output_setup(output_names, output_types)
con.send_start()

state = con.receive()
print(state.actual_TCP_pose)

con.send_pause()
con.disconnect()
```

위 코드는 구조를 이해하기 위한 예시입니다. 핵심은 "어떤 신호를 읽을지 recipe로 정하고, 연결 후 주기적으로 상태를 받는다"는 점입니다.

## RTDE가 좋은 이유

- 데이터 항목이 구조화되어 있음
- 상태 수집용으로 일관성이 좋음
- 장기적으로 모니터링/로그 시스템에 연결하기 좋음

## Socket보다 RTDE를 먼저 고려해야 하는 경우

- 문자열 파싱보다 구조화된 상태값이 중요할 때
- 주기적으로 동일 항목을 안정적으로 읽고 싶을 때
- 상위 소프트웨어가 상태 기반 제어를 하려 할 때

## 초보자가 자주 하는 실수

### RTDE로 모든 것을 하려 함
간단한 play/stop은 Dashboard가 더 쉬울 수 있습니다. 목적별로 나누세요.

### 필요한 데이터 목록을 먼저 안 정함
무엇을 읽고 싶은지 정리되지 않으면 recipe 설계가 꼬입니다.

### 좌표를 읽기만 하고 기준 좌표를 설명 못 함
actual TCP pose를 읽어도 Base 기준인지, 어떤 TCP인지 해석을 함께 해야 의미가 있습니다.

## 도입 순서 추천

1. 읽을 데이터 3개만 먼저 정한다
2. PC에서 수신 로그를 확인한다
3. 실제 프로그램과 연동한다
4. 알람/대시보드/DB 적재로 확장한다

## 체크리스트

- [ ] RTDE가 구조화된 주기적 데이터 교환이라는 점을 이해했다
- [ ] Dashboard / Socket / RTDE의 역할 차이를 설명할 수 있다
- [ ] 먼저 읽을 데이터 항목을 정해야 한다는 점을 안다
- [ ] 상태값 해석에는 좌표계와 active TCP 이해가 필요하다는 점을 이해했다

## 다음에 읽을 장

다음부터는 부록을 참고하면서 **용어, 포트, 트러블슈팅**을 함께 정리하면 좋습니다.
