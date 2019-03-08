# Codestates X Hogangnono
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![react](https://img.shields.io/badge/maintained%20with-react-green.svg)](https://reactjs.org/)
[![d3](https://img.shields.io/badge/maintained%20with-d3-orange.svg)](https://d3js.org/)

호갱노노 x Codestates Project: 여기호재

## 기본 환경 설치

<ul>
<li>node@latest</li>
<li>yarn@latest</li>
<li>eslint-hogangnono</li>
</ul>

## 패키지 설치
1. `root`(CODESTATES), 클라이언트, 서버 폴더 별로 `npm install` or `yarn`으로 설치합니다.
```shell
$ npm install
$ cd packages/client/
$ npm install
$ cd ../server ( 또는 `root`(CODESTATES)에서 cd packages/server/ )
$ npm install
```
2. `root`에서 `npm run start` 실행하시면 됩니다. 자동으로 브라우저(`localhost:3000`)에서 뜹니다.   

### yarn 설치

```javascript
$ sudo npm install -g yarn

```
### 프로젝트 패키지 설치

```javascript
$ yarn

or 

$ npm install
```

### Package Dependencies

These are installed when running `yarn` or `npm install`

- [D3](https://d3js.org/)
- [axios](https://www.npmjs.com/package/axios)
- [prop-types](https://www.npmjs.com/package/prop-types)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [Less](http://lesscss.org/)
- [Express](https://www.npmjs.com/package/express)
  
_Note:_   
Ejected [create-react-app](https://github.com/facebook/create-react-app) and brought in server-side rendering from Less

## Project Description

- Naver 지도 API에서 제공하는 CustomOverlayView 클래스를 이용하여 D3로 SVG 도형 그리기 기능 구현
- 여러 도형을 Custom Overlay로 하나씩 생성 
- Naver 지도 API 이벤트 시스템에서 제공하는 addListener와 react event listener를 연결하여 원하는 위치에 도형을 그릴 수 있는 기능 구현
- 현재 지도의 'Viewport’ bound data (lat, long, center point)에 따라 도형이 나타남.
  - 드래깅에 따라서 지도에 뜨는 도형 업데이트

### Client Interface


![picture](https://i.imgur.com/AtPF74t.png)
> 호재 버튼을 누르면 필터와 그리기 탭이 있는 인터페이스가 뜹니다.

<br />
  
![picture](https://i.imgur.com/PSNMnxe.png)
> My Button을 누르면 로그인 팝업창이 뜹니다. 

<br />

![picture](https://i.imgur.com/VxSq9w9.png)
> 기본적으로 주변에 있는 호재 정보와 유저가 저장한 정보를 볼 수 있는 인터페이스가 뜹니다.
