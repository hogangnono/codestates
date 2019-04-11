# 여기호재

### **_`Hogangnono`_** 팀과 협업해 진행한 부동산 호재 정보를 시각화된 자료로 제공해주는 서비스입니다.

### 🌏 [여기호재 서비스 이용하기](https://bit.ly/Hogangnono)

<br>

## 기본 환경 설치

- node@latest
- yarn@latest

<br>

## 패키지 설치 및 실행

```
$ cd CODESTATES/packages/client
$ npm install or yarn
$ npm start or yarn start
```

<br>

## Package Dependencies

- [D3](https://d3js.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [Prop-types](https://www.npmjs.com/package/prop-types)
- [React-icons](https://www.npmjs.com/package/react-icons)
- [Less](http://lesscss.org/)
- [Sequelize](https://www.npmjs.com/package/sequelize)

_Note:_  
Ejected [create-react-app](https://github.com/facebook/create-react-app) and brought in server-side rendering from Less

<br>

## 설명

- Naver 지도 API에서 제공하는 CustomOverlayView 클래스를 이용하여 D3로 SVG 도형 그리기 기능 구현.
- 현재 지도의 'Viewport’ bound data (lat, lng, center point)에 따라 도형이 나타남.

  <br>

  <!-- <p>
  <iframe width="640" height="360" src="https://www.youtube.com/embed/elRI1DB4520?rel=0&amp;showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </p> -->

  ![gif](https://media.giphy.com/media/H6KAgO6pyZfXuZI44J/giphy.gif)

  사용자가 해당 호재를 선택시 viewport 안 한눈에 볼 수 있도록 구현. [`해당 영상`](https://www.youtube.com/watch?v=elRI1DB4520)

    <!-- <p>
    <iframe width="640" height="360" src="https://www.youtube.com/embed/pNZ7LkcditI?rel=0&amp;showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </p> -->

  ![gif](https://media.giphy.com/media/MY10D0ZPCrvYEQ19IP/giphy.gif)

  사용자가 직접 그린 데이터만 나타내도록 구현. [`해당 영상`](https://www.youtube.com/watch?v=pNZ7LkcditI)

    <!-- <p>
    <iframe width="640" height="360" src="https://www.youtube.com/embed/w9ilvJ1FzYA?rel=0&amp;showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </p> -->

  ![gif](https://media.giphy.com/media/ZXfWW9lUzRSYnCrhae/giphy.gif)

  사용자가 직접 도형별로 그릴 수 있게 구현. [`해당 영상`](https://www.youtube.com/watch?v=w9ilvJ1FzYA)

## Flow chart

![여기호재 flowchart-2](https://user-images.githubusercontent.com/29101760/55859334-cfc7ef80-5bac-11e9-93ed-dcc820e57ce6.png)

## DB Schema

![DB](https://user-images.githubusercontent.com/29101760/55855246-f3d20380-5ba1-11e9-9a47-8a4addf65b66.png)
