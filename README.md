# Component Lab

Component Lab는 PrimeVue, Vue Router, Vue I18n을 기반으로 만든 개인용 컴포넌트 플레이그라운드입니다. GitHub Pages에 자동 배포되며, 각 컴포넌트를 Props와 함께 실시간으로 실험하고 다국어/다크 모드를 동시에 검증할 수 있습니다.

## 주요 기능

- 📦 **컴포넌트 레지스트리**: `src/lab/componentsRegistry.js`에 메타데이터와 기본 Props를 정의하면 자동으로 플레이그라운드와 홈 카드가 생성됩니다.
- 🌓 **다크 모드 토글**: PrimeVue Aura 테마를 기반으로 브라우저 전체에 다크 모드 클래스를 적용합니다.
- 🌐 **다국어 지원**: Vue I18n과 JSON 번역 파일(`src/i18n/locales`)을 통해 한국어/영어 번역을 즉시 전환할 수 있습니다.
- ⚡ **PrimeVue UI**: Dropdown, Dialog, Button 등 PrimeVue 컴포넌트를 활용해 UI 일관성과 생산성을 확보했습니다.
- 🚀 **GitHub Actions 배포**: `main` 브랜치에 푸시되면 자동으로 Pages에 빌드·배포됩니다.

## 개발 환경

```bash
npm install
npm run dev
```

로컬 서버는 `http://localhost:5173`에서 실행됩니다. 다크 모드, 언어 토글, 컴포넌트 조절이 실시간 반영됩니다.

프로덕션 번들은 다음 명령으로 생성합니다.

```bash
npm run build
```

## 구조 개요

```text
src/
├─ assets/styles      # 글로벌 스타일과 디자인 토큰
├─ components/
│  ├─ deeplink        # DeeplinkExperience 컴포넌트
│  └─ playground      # 공용 Props 에디터 등
├─ i18n               # 다국어 리소스와 초기화 로직
├─ lab                # 컴포넌트 레지스트리 정의
├─ router             # Vue Router 구성
├─ views              # Home / Playground 뷰
└─ main.js            # PrimeVue, I18n, Router 초기화
```

## 컴포넌트 추가 가이드

1. `src/components`에 Vue 컴포넌트를 추가합니다.
2. `src/lab/componentsRegistry.js`에 새 항목을 등록하고 기본 Props, 컨트롤 메타데이터, i18n 키를 연결합니다.
3. `src/i18n/locales/*` 파일에 이름, 설명, Props 설명 번역을 추가합니다.
4. 필요 시 `HomeView`나 기타 문구를 업데이트하면 자동으로 카드 및 플레이그라운드가 생성됩니다.

## 첫 번째 컴포넌트 – Deeplink Experience

- 트리거 메서드를 통해 다른 컴포넌트에서 호출할 수 있습니다.
- 모바일 환경에서는 딥링크 실행 및 로딩 스피너, 실패 시 설치 안내 다이얼로그를 표시합니다.
- 데스크톱 환경에서는 QR 코드와 아이콘 오버레이, 모바일 전용 안내 다이얼로그를 제공합니다.

## 라이선스

이 저장소는 개인 포트폴리오 목적의 샘플 프로젝트입니다.
