# 컴포넌트 실험실 (Component Lab)

Vue 3, PrimeVue, Vue Router, 그리고 vue-i18n으로 구성한 개인용 컴포넌트 실험실입니다. GitHub Pages로 배포되며, 각 컴포넌트를 라우트로 탐색하고 실시간으로 프롭을 수정하면서 동작을 확인할 수 있습니다.

## 주요 특징

- 🔌 **PrimeVue 기반 UI**: PrimeVue 컴포넌트와 테마를 활용해 빠르게 실험할 수 있습니다.
- 🌐 **다국어 지원**: 한국어와 영어를 지원하며, 언어 선택은 로컬 스토리지에 저장됩니다.
- 🌓 **다크 모드 고려**: 시스템 설정을 인식해 라이트/다크 테마를 전환하고, 사용자가 직접 토글할 수 있습니다.
- 🧭 **Vue Router 플레이그라운드**: 컴포넌트별 전용 라우트와 prop 컨트롤 패널을 제공해 쉽게 테스트할 수 있습니다.
- 🚀 **GitHub Actions 배포 자동화**: main 브랜치에 푸시되면 정적 파일을 빌드하고 `gh-pages` 브랜치로 배포합니다.

## 개발 환경

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 타입 검사
npm run type-check

# 프로덕션 번들
npm run build
```

## 컴포넌트 추가 방법

1. `src/components` 폴더에 새 컴포넌트를 추가하고 `defineExpose` 등을 활용해 데모에 필요한 메서드를 노출합니다.
2. `src/router/componentRegistry.ts`에 메타데이터와 기본 프롭, 컨트롤 구성을 등록합니다.
3. 필요하다면 `src/locales/en.json`과 `src/locales/ko.json`에 번역 키를 추가합니다.
4. `npm run dev`로 새 라우트를 확인하고 동작을 검증합니다.

## 배포

GitHub Actions 워크플로(`.github/workflows/deploy.yml`)가 main 브랜치에 푸시될 때마다 Vite 번들을 생성하고 GitHub Pages (`gh-pages` 브랜치)로 배포합니다. 리포지토리 설정에서 GitHub Pages의 소스를 `gh-pages` 브랜치로 지정하세요.
