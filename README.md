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
  
  ### `전체 화면`
  <img src="./packages/client/src/Components/imgs/fullScreen.png" alt="fullScreen.png" /><br />
  > 전체 화면의 모습입니다. `주변호재` `My` `필터` `그리기` 메뉴로 나뉘여 있습니다.<br />
  <br />

  ### `주변호재`
  <img src="./packages/client/src/Components/imgs/searchingNearbyList.gif" alt="searchingNearbyList.gif" /><br />
  > 화면 좌측 상단에 유저가 보는 화면(Viewport)의 중심점이 변경될 경우 주변의 부동산호재 정보를 계속해서 서버로부터 불러와 화면에 보여줍니다.<br />

  ### `My`
  <img src="./packages/client/src/Components/imgs/my.png" alt="my.png" /><br />
  <img src="./packages/client/src/Components/imgs/myDrawingList.png" alt="myDrawingList.png" /><br />
  > 화면 우측 상단에 있는 `My` 버튼을 누르면 이름을 입력하여 로그인을 할 수 있고, 로그인 후에는 내가 그린 도형(부동산 호재)의 리스트를 볼 수 있습니다.<br />

  ### `필터`
  <img src="./packages/client/src/Components/imgs/filter.png" alt="filter.png" /><br />
  > 화면 좌측 상단에 유저가 보는 화면(Viewport)의 중심점이 변경될 경우 주변의 부동산호재 정보를 계속해서 서버로부터 불러와 화면에 보여줍니다.<br />

  ### `그리기`
  <img src="./packages/client/src/Components/imgs/drawingLists.gif" alt="drawingList.gif" /><br />
  > - 점, 사각형, 원 : 마우스 왼쪽 클릭으로 시작 -> 마우스 왼쪽 클릭으로 도형그리기 종료
  > - 화살표, 다각형: 마우스 왼쪽 클릭으로 시작 -> 마우스 오른쪽 클릭으로 도형그리기 종료

  ![gif](https://media.giphy.com/media/H6KAgO6pyZfXuZI44J/giphy.gif)

  사용자가 해당 호재를 선택시 viewport 안 한눈에 볼 수 있도록 구현. [`해당 영상`](https://www.youtube.com/watch?v=elRI1DB4520)


  ![gif](https://media.giphy.com/media/MY10D0ZPCrvYEQ19IP/giphy.gif)

  사용자가 직접 그린 데이터만 나타내도록 구현. [`해당 영상`](https://www.youtube.com/watch?v=pNZ7LkcditI)


  ![gif](https://media.giphy.com/media/ZXfWW9lUzRSYnCrhae/giphy.gif)
  사용자가 직접 도형별로 그릴 수 있게 구현. [`해당 영상`](https://www.youtube.com/watch?v=w9ilvJ1FzYA)
   

## Flow chart

![여기호재 flowchart-2](https://user-images.githubusercontent.com/29101760/55859334-cfc7ef80-5bac-11e9-93ed-dcc820e57ce6.png)

## DB Schema

![DB](https://user-images.githubusercontent.com/29101760/55855246-f3d20380-5ba1-11e9-9a47-8a4addf65b66.png)

