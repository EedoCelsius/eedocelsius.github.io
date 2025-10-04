# Experiential Component Library

PrimeVue, Vue Router, 그리고 vue-i18n을 사용해서 구성한 실험적인 컴포넌트 라이브러리입니다. GitHub Pages에 배포되도록 구성되어 있으며, 라우트 기반 플레이그라운드를 통해 각 컴포넌트를 프리뷰하고 props를 실시간으로 조정할 수 있습니다.

## 개발 환경

```bash
npm install
npm run dev
```

## 빌드 및 미리보기

```bash
npm run build
npm run preview
```

## 컴포넌트 추가 방법

1. `src/components/library`에 새로운 컴포넌트를 생성합니다.
2. `src/data/components.js`에 메타데이터와 기본 props, 컨트롤 구성을 추가합니다.
3. 필요하다면 뷰, 라우트, 또는 locale 파일에 문구를 보강합니다.

새로 등록된 컴포넌트는 `/preview/<component-key>` 라우트에서 자동으로 노출되며, Playground UI에서 props를 조정하고 노출된 메서드를 테스트할 수 있습니다.

## 첫 번째 컴포넌트: Deeplink Experience

- 모바일/데스크탑 환경을 자동으로 감지합니다.
- 모바일에서 트리거하면 앱 딥링크를 호출하고 로딩 오버레이를 표시합니다.
- 지정한 시간 내 앱이 실행되지 않으면 설치 안내 다이얼로그를 제공합니다.
- 데스크탑에서는 QR 코드와 안내 다이얼로그를 통해 모바일 전용임을 강조합니다.
- QR 코드 중앙에 앱 아이콘을 표시하며, 필요 시 설치 CTA 이벤트(`install`)를 상위 컴포넌트로 전달합니다.

## 배포

GitHub Actions가 `main` 브랜치에 push될 때마다 자동으로 빌드하고 GitHub Pages에 배포하도록 설정되어 있습니다. 워크플로우는 `.github/workflows/deploy.yml`을 참고하세요.
