<div align=center>

![header](https://capsule-render.vercel.app/api?type=waving&color=0:ab6463,100:60669b&height=215&section=header&text=42Stat&fontSize=90&fontColor=f7f5f5&animation=fadeIn&fontAlignY=38&descAlignY=51&descAlign=62)

[![GitHub Stars](https://img.shields.io/github/stars/42stat/42stat?style=for-the-badge)](https://github.com/innovationacademy-kr/42cabi/stargazers) [![GitHub Stars](https://img.shields.io/github/issues/42stat/42stat?style=for-the-badge)](https://github.com/innovationacademy-kr/42cabi/issues)

</div>

</br>

## 🎤 프로젝트 소개

42서울 학습 데이터를 가공하여 통계로 제공하는 서비스

### 프로젝트 내용

- 평가, 과제 등의 데이터 중, 42 인트라 페이지에서 제공하지 않는 데이터를 자체적으로 연산하여 통계로 제공합니다.
- 각 수치별 리더보드를 통해 개인별 학습 성취도를 확인할 수 있습니다.
- 인트라 서버가 불안정 하더라도, 42Stat 서비스를 통해 학습 데이터를 확인할 수 있습니다.

</br>

## 🚧 서비스 미리보기

<div align=center>
<img width="35%" alt="Screen Shot 2023-01-27 at 11 16 16 PM" src="https://user-images.githubusercontent.com/46529663/215108710-95ea5cf1-c001-4f67-b1e1-acedfde819ce.png">
<img width="40%" alt="Screen Shot 2023-01-27 at 11 18 41 PM" src="https://user-images.githubusercontent.com/46529663/215108715-97fb70b1-3298-4012-bb84-d75341bbbf6b.png">
</div>

</br>

## 🛠 기술 스택

<div>
  
<table border="1" align="center">
  <th align="center">파트</th>
  <th align="center">기술스택</th>
  <th align="center">선정이유</th>
  <tr>
    <td rowspan="3" align="center">Common</td>
    <td><img src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png" width="15px" alt="typescript_icon" /> TypeScript</td>
    <td>컴파일 타임에 정적으로 타입을 체크하여 코드의 안정성 보장</td>
  </tr>
  <tr>
    <td><img src="https://techstack-generator.vercel.app/eslint-icon.svg" width="15px" alt="_icon" /> ESLint</td>
    <td>실수 또는 문법, 기준에 위배되는 코드를 사전에 검출하여 에러 최소화</td>
  </tr>
  <tr>
    <td><img src="https://techstack-generator.vercel.app/prettier-icon.svg" width="15px" alt="_icon" /> Prettier</td>
    <td>코드 포맷 정형화 및 자동화를 통한 일관적인 코드 스타일 유지</td>
  </tr>
  <tr>
    <td rowspan="10" align="center">Front-End</td>
    <td><img src="https://techstack-generator.vercel.app/react-icon.svg" width="15px" alt="_icon" /> React</td>
    <td>타입스크립트 지원, 컴포넌트 기반 관리와 jsx 문법을 통해 코드 가독성 향상과 유지보수성 보장</td>
  </tr>
  <tr>
    <td><img src="https://vitejs.dev/logo-with-shadow.png" width="15px" alt="_icon" /> Vite</td>
    <td>기존 번들링 방식보다 빠른 서버 구동을 통해 생산성 향상</td>
  </tr>
  <tr>
    <td><img src="https://velog.velcdn.com/images/jun_n3/post/9a22f586-a592-486d-85e1-55347c55ad81/image.svg" width="15px" alt="_icon" /> React Query</td>
    <td>client-side 상태와 server-side 상태를 분리해서 관리하고, 서비스 특성 상 캐시 전략의 필요성 증가에 따라 채택</td>
  </tr>
  <tr>
    <td><img src="https://storage.googleapis.com/candycode/jotai/jotai-mascot.png" width="15px" alt="_icon" /> Jotai</td>
    <td>client-side 상태를 최대한 간편하게 관리</td>
  </tr>
  <tr>
    <td><img src="https://res.cloudinary.com/practicaldev/image/fetch/s---xCsVK0j--/c_imagga_scale,f_auto,fl_progressive,h_1080,q_auto,w_1080/https://reacttraining.com/images/blog/reach-react-router-future.png" width="15px" alt="_icon" /> React Router Dom</td>
    <td>SPA에서 url path 관리</td>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/emotion-js/emotion/main/emotion.png" width="15px" alt="_icon" /> emotion</td>
    <td>CSS-in-JS 방식으로 component와 관계된 스타일을 같은 파일에서 관리하면서, css Props를 통해 component에 종속적이지 않도록 스타일 작성</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/46529663/215253304-b062a5a1-6d5b-478e-8672-d3c512a2ed65.png" width="15px" alt="_icon" /> Axios</td>
    <td>react-query에서 fetch API보다 사용하기 최적화된 라이브러리, custom instance와 Interceptor를 통해 네트워크 요청 로직을 효율적으로 관리</td>
  </tr>
  <tr>
    <td><img src="https://seeklogo.com/images/M/msw-mock-service-worker-logo-88A2A26653-seeklogo.com.png" width="15px" alt="_icon" /> MSW</td>
    <td>자체적인 mocking을 통해 개발 환경과 테스트 환경 구성</td>
  </tr>
  <tr>
    <td><img src="https://techstack-generator.vercel.app/testinglibrary-icon.svg" width="15px" alt="_icon" /> Testing Library</td>
    <td>실제 render 되는 방식을 테스트하여, 테스트 범위 확장</td>
  </tr>
  <tr>
    <td><img src="https://vitest.dev/logo-shadow.svg" width="15px" alt="_icon" /> Vitest</td>
    <td>vite에 최적화된 라이브러리 사용으로 테스트 용이성 보장</td>
  </tr>
  <tr>
    <td rowspan="8" align="center">Back-End</td>
    <td><img src="https://docs.nestjs.com/assets/logo-small.svg" width="15px" alt="_icon" /> NestJS</td>
    <td>고도의 테스트와 확장이 가능하고 DI, IoC 패턴을 통해 느슨하게 결합되어, 유지 보수가 쉬운 어플리케이션을 만들 수 있는 환경을 제공</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/46529663/213977435-02cfee1b-ef97-473a-9005-129966a1fe1f.png" width="18px" alt="_icon" /> PostgreSQL</td>
    <td>약 20만개 이상의 데이터를 관리하는 서비스 특성 상, 높은 수준의 동시성 제어를 통한 성능 보장</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/46529663/215252836-b329505a-9428-4df8-87bc-62effc5f0b4b.png" width="18px" alt="_icon" /> Redis</td>
    <td>Pre-calculation 데이터를 IMDB에 캐싱하여 데이터베이스 통신 오버헤드 감소</td>
  </tr>
  <tr>
    <td><img src="https://techstack-generator.vercel.app/jest-icon.svg" width="15px" alt="_icon" /> Jest</td>
    <td>쉬운 사용성과 함수 tracking 기능을 통한 테스트 용이성 </td>
  </tr>
  <tr>
    <td><img src="https://seeklogo.com/images/T/typeorm-logo-F243B34DEE-seeklogo.com.png" width="15px" alt="_icon" /> TypeORM</td>
    <td>코드 정형화로 유지보수 용이 및 ORM의 자체 최적화를 통한 쿼리 최적화 </td>
  </tr>
  <tr>
    <td><img src="https://static-00.iconduck.com/assets.00/swagger-icon-512x512-halz44im.png" width="15px" alt="_icon" /> Swagger</td>
    <td>REST API를 문서로 제공하여 커뮤니케이션 비용 개선 및 API 테스트 용이성 제공 </td>
  </tr>
  <tr>
    <td><img src="https://techstack-generator.vercel.app/webpack-icon.svg" width="15px" alt="_icon" /> Webpack</td>
    <td>정적 모듈 번들링 기능을 이용한 코드 최적화 및 성능 개선 </td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/46529663/215252562-a506910d-b351-4592-af18-8d86293c7695.png" width="15px" alt="_icon" /> Passport</td>
    <td>인증 기능의 모듈화를 통한 코드 통일성 및 유지보수성 보장</td>
  </tr>
  <tr>
    <td rowspan="5" align="center">Infra</td>
    <td><img src="https://techstack-generator.vercel.app/aws-icon.svg" width="15px" alt="_icon" /> AWS</td>
    <td>(도입 예정)</td>
  </tr>
  <tr>
    <td><img src="https://techstack-generator.vercel.app/docker-icon.svg" width="15px" alt="_icon" /> Docker</td>
      <td>컨테이너를 통해 통일된 환경을 제공하여 서비스 안정성 및 테스트 용이성 보장</td>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/44036562?s=280&v=4" width="15px" alt="_icon" /> Github Actions</td>
    <td>CI를 통한 테스트 자동화 및 이슈 관리 자동화로 효율적인 프로젝트 관리</td>
  </tr>
</table> </br>

## 🤖 멤버
<table align="center">
<tr>
<td><a href="https://github.com/Devdha">🐯 dha</a></td>
<td><a href="https://github.com/jpham005"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png" width="15px" alt="typescript_icon" /> jaham</a></td>
</tr>
</table>

