# Dashboard Server

:::{admonition} 이 장에서 배우는 것
:class: note
- Dashboard Server가 어떤 용도인지
- 가장 먼저 시험해 볼 명령 5개
- Python으로 간단히 테스트하는 방법
:::

## Dashboard Server란

Dashboard Server는 상위 PC가 **로봇 GUI 쪽에 간단한 원격 명령**을 보낼 때 쓰는 인터페이스입니다.

초보자 입장에서는 이렇게 생각하면 됩니다.

- 프로그램을 로드하고 싶다
- 재생/정지/일시정지를 하고 싶다
- 로봇 상태를 간단히 읽고 싶다

이런 요구에는 Dashboard가 가장 먼저 떠오릅니다.

## 언제 좋나

- PC 버튼 하나로 프로그램 실행
- 셀 컨트롤 소프트웨어에서 start/stop 제어
- 운전 상태 점검

## 시작 전에 기억할 것

- 일반적으로 TCP 소켓 기반으로 접근
- 명령마다 줄바꿈(`\n`)이 필요하다고 생각하면 편함
- 운전 모드나 권한 상태에 따라 일부 명령은 거부될 수 있음

:::{tip}
처음 테스트할 때는 `robotmode`, `programState`, `play`, `stop`, `load` 같은 기본 명령부터 확인하세요.
:::

## 자주 쓰는 기본 명령 예시

| 명령 | 의미 |
| --- | --- |
| `robotmode` | 현재 로봇 상태 확인 |
| `programState` | 현재 프로그램 상태 확인 |
| `load my_program.urp` | 프로그램 로드 |
| `play` | 프로그램 실행 |
| `stop` | 프로그램 정지 |
| `pause` | 일시정지 |
| `unlock protective stop` | 보호정지 해제 시도 |

## Python 테스트 예제

```python
import socket

ROBOT_IP = "192.168.0.10"
PORT = 29999

def send_cmd(sock, cmd):
    sock.sendall((cmd + "\n").encode())
    return sock.recv(4096).decode(errors="ignore")

with socket.create_connection((ROBOT_IP, PORT), timeout=3) as sock:
    print(send_cmd(sock, "robotmode"))
    print(send_cmd(sock, "programState"))
    print(send_cmd(sock, "load demo.urp"))
    print(send_cmd(sock, "play"))
```

위 코드는 개념 예제입니다. 실제로는 파일명, 권한, 원격 제어 가능 상태를 먼저 확인해야 합니다.

## 디버깅 순서

1. 로봇 IP ping 확인
2. 포트 접속 가능 여부 확인
3. `robotmode` 응답 확인
4. `programState` 확인
5. `load` / `play` 시도

## 자주 만나는 문제

### 연결은 되는데 명령이 안 먹음
원격 제어 허용 상태, 운전 모드, 권한, 안전 상태를 확인해야 합니다.

### `play`는 되는데 기대한 프로그램이 아님
현재 로드된 프로그램과 installation 연결 상태를 확인하세요.

### 보호정지 해제가 반복적으로 필요함
통신 문제가 아니라 실제 기계/좌표/payload 문제일 수 있습니다. 원인을 먼저 해결해야 합니다.

## PolyScope X 메모

PolyScope X 계열에서는 Dashboard 개념 대신 Robot API 쪽을 함께 확인해야 할 수 있습니다. 사내 문서에는 "대상 버전"을 장 상단에 꼭 표시해 두세요.

## 체크리스트

- [ ] Dashboard가 GUI 원격 명령용 인터페이스라는 점을 이해했다
- [ ] `robotmode`, `programState`, `load`, `play`, `stop` 역할을 안다
- [ ] Python으로 기본 접속 테스트를 시도할 수 있다
- [ ] 명령 거부 시 권한/안전 상태를 함께 봐야 한다는 점을 이해했다

## 다음에 읽을 장

다음 장에서는 **URScript Socket 통신**을 다룹니다.
