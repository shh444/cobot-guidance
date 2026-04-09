# URScript Socket 통신

:::{admonition} 이 장에서 배우는 것
:class: note
- 로봇이 외부 서버와 어떻게 메시지를 주고받는지
- 간단한 pose 데이터를 받아 로봇 이동으로 연결하는 흐름
- Socket 통신에서 가장 흔한 단위/형식 실수
:::

## Socket 통신을 언제 쓰나

다음 상황이면 Socket 통신이 잘 맞습니다.

- 카메라 PC가 위치를 보내 줄 때
- 커스텀 검사 프로그램이 OK/NG와 좌표를 전달할 때
- 외부 장치와 문자열/숫자 메시지를 직접 주고받을 때

초보자에게는 "로봇이 PC와 직접 대화한다"는 감각을 익히기에 아주 좋은 주제입니다.

## 역할부터 먼저 정하기

이 예제에서는 아래처럼 정합니다.

- **PC = Server**
- **UR Robot = Client**

문서에 이 역할을 먼저 적어 두면 헷갈림이 크게 줄어듭니다.

## 가장 쉬운 개념 예제

### 시나리오

1. PC 서버가 pose 1개를 보낸다
2. 로봇이 그 pose를 받는다
3. 로봇이 받은 좌표로 MoveJ 또는 MoveL 한다

## URScript 예제

```python
def socket_pose_example():
  open_ok = socket_open("192.168.0.20", 5000)

  while open_ok == False:
    sleep(0.3)
    open_ok = socket_open("192.168.0.20", 5000)
  end

  values = socket_read_ascii_float(6)

  if values[0] == 6:
    target_pose = p[values[1], values[2], values[3], values[4], values[5], values[6]]
    movej(target_pose, a=1.2, v=0.25)
  end

  socket_close()
end
```

## PC Python 서버 예제

```python
import socket

HOST = "0.0.0.0"
PORT = 5000
MESSAGE = "(0.400,-0.100,0.250,3.1416,0.0,0.0)\n"

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((HOST, PORT))
    s.listen(1)
    conn, addr = s.accept()
    with conn:
        print("connected:", addr)
        conn.sendall(MESSAGE.encode())
```

## 왜 메시지 형식이 중요한가

`socket_read_ascii_float(6)` 류의 함수는 데이터 형식이 맞아야 제대로 읽습니다. 초보자는 여기서 가장 많이 막힙니다.

기본적으로 아래를 확인하세요.

- 괄호로 둘러싸였는가
- 쉼표로 구분되는가
- 끝에 줄바꿈이 있는가
- 값 개수가 맞는가

## 단위와 좌표계

외부 PC가 보내는 좌표를 바로 쓰기 전에 반드시 확인하세요.

- mm인지 m인지
- 각도가 degree인지 rad인지
- Base 기준인지 Feature 기준인지

:::{warning}
통신 자체는 성공했는데 로봇이 이상한 곳으로 가는 경우, 원인은 대부분 "메시지 형식보다 단위/좌표계"입니다.
:::

## 추천 확장 순서

### 1단계. pose 1개 받기
형식과 연결만 확인

### 2단계. OK/NG 문자열 추가
좌표 외에 판단값 같이 주고받기

### 3단계. 접근점 / 작업점 분리
받은 좌표 하나만 바로 쓰지 말고, 접근 오프셋을 계산해서 사용

### 4단계. Feature 변환 도입
비전 좌표와 작업물 기준 좌표 연결

## 초보자가 자주 하는 실수

### 연결 재시도를 안 넣음
시작 타이밍에 따라 서버가 아직 안 열렸을 수 있습니다.

### 받은 좌표를 바로 작업점으로 사용
접근점 없이 들어가면 위험합니다.

### 메시지 로그를 안 남김
문자열 그대로 출력/저장하면 디버깅이 훨씬 쉬워집니다.

### PC와 로봇 역할을 헷갈림
문서 상단에 반드시 "누가 서버, 누가 클라이언트"인지 적어 두세요.

## 체크리스트

- [ ] Socket 통신에서 서버/클라이언트 역할을 구분할 수 있다
- [ ] pose 문자열 형식의 중요성을 이해했다
- [ ] 단위와 좌표계를 통신 명세에 같이 적어야 한다는 점을 안다
- [ ] 받은 좌표를 접근점과 작업점으로 분리해 쓸 수 있다

## 다음에 읽을 장

다음 장에서는 **RTDE** 를 다룹니다.
