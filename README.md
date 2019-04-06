# 여기호재

### **_`Hogangnono`_** 팀과 협업해 진행한 부동산 호재 정보를 시각화된 자료로 제공해주는 서비스입니다.

<br>

- ## 기본 환경 설치

  - node@latest
  - yarn@latest

<br>

- ## 패키지 설치 및 실행

  ```
  $ cd CODESTATES/packages/client
  $ npm install or yarn
  $ npm start or yarn start
  ```

<br>

- ## 설명

  - Naver 지도 API에서 제공하는 CustomOverlayView 클래스를 이용하여 D3로 SVG 도형 그리기 기능 구현.
  - 현재 지도의 'Viewport’ bound data (lat, long, center point)에 따라 도형이 나타남.

    <br>

    <p>
    <iframe width="640" height="360" src="https://www.youtube.com/embed/elRI1DB4520?rel=0&amp;showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </p>
    - 사용자가 해당 호재를 선택시 viewport 안 한눈에 볼 수 있도록 구현.
    <p>
    <iframe width="640" height="360" src="https://www.youtube.com/embed/pNZ7LkcditI?rel=0&amp;showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </p>
    - 사용자가 직접 그린 데이터만 나타내도록 구현.</center>
    <p>
    <iframe width="640" height="360" src="https://www.youtube.com/embed/w9ilvJ1FzYA?rel=0&amp;showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </p>
    - 사용자가 직접 도형별로 그릴 수 있게 구현.
