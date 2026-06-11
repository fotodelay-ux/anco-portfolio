# anco. — Portfolio

Jiyeon Kim · Visual Designer 의 단일 페이지 포트폴리오입니다.

## 실행 방법

이 사이트는 React + Tailwind 를 브라우저에서 직접 변환(Babel)하는 방식이라,
`index.html` 파일을 더블클릭해 여는 것(`file://`)보다 **로컬 서버로 띄우는 것**을 권장합니다.

가장 쉬운 방법 — VS Code 확장 **Live Server**:
1. VS Code 에서 이 폴더(`anco-portfolio`)를 엽니다.
2. 확장 탭에서 **Live Server** (Ritwick Dey) 설치.
3. `index.html` 우클릭 → **Open with Live Server**.

또는 터미널에서:
```bash
# Python 3
python -m http.server 5500
# 그 후 브라우저에서 http://localhost:5500 접속
```

## 파일 구조

```
anco-portfolio/
├─ index.html         # 진입점 — Tailwind 설정, 폰트 로드, 스크립트 마운트
├─ site.css           # 팔레트(잉크/페이퍼), 폰트, 인터랙션 스타일
├─ site-app.jsx       # 앱 본체 — 사이드바, 5개 섹션, 프로젝트 상세 오버레이
├─ site-data.jsx      # anco. 로고/심볼 컴포넌트 + 네비게이션 (건드릴 일 거의 없음)
├─ content/           # ★ 내용은 여기서 수정합니다 (코드 X)
│  ├─ projects.json   #   프로젝트 목록 + 상세 내용
│  ├─ services.json   #   서비스 목록
│  └─ blog.json       #   블로그(저널) 글
├─ grain.png          # 리쏘 질감 텍스처
├─ fonts/             # Founders Grotesk (Light~Bold)
└─ site-img/
   ├─ anco.svg        # 공식 워드마크 벡터
   └─ profileImage.png
```

## ✏️ 내용(텍스트) 수정 — `content/` 폴더만 고치면 됩니다

코드를 열 필요 없이 **`content/` 폴더의 JSON 파일**만 편집하면 사이트에 반영됩니다.
저장 후 브라우저를 새로고침하면 바뀐 내용이 보입니다.

### 프로젝트 추가/수정 — `content/projects.json`
각 프로젝트는 아래 형태의 `{ }` 한 덩어리입니다. 새 프로젝트는 이 덩어리를
통째로 복사해 `,` 로 구분하여 붙여넣고 내용만 바꾸면 됩니다.

```json
{
  "id": "my-project",        // 영문/숫자 고유값 (겹치면 안 됨)
  "num": "07",               // 화면에 보이는 번호
  "title": "프로젝트 한글 제목",
  "titleEn": "Project Title",
  "year": "2026",
  "meta": "Branding",          // 썸네일 아래 작은 분류 텍스트
  "tags": ["branding", "motion"],   // 필터 태그 (소문자)
  "color": "#8a5a44",          // 썸네일 배경색 (hover 시 나타나는 색)
  "role": "Brand Identity · Art Direction",
  "summary": "한 줄 요약입니다.",
  "context": "① 배경 및 제약 — 어떤 상황이었는지.",
  "strategy": "② 나의 전략적 판단 — 어떻게 풀었는지.",
  "outcome": "③ 결과물 — 무엇을 만들었고 어떤 성과가 있었는지.",
  "gallery": ["이미지1", "이미지2", "이미지3", "이미지4"]
}
```

### 블로그 글 — `content/blog.json`
```json
{
  "date": "2026.06.01",
  "cat": "관찰",                // 카테고리
  "color": "#8a5a44",          // 오른쪽 썸네일 색
  "title": "글 제목",
  "excerpt": "목록에 보이는 짧은 소개 문장입니다."
}
```

### 서비스 — `content/services.json`
```json
{
  "num": "05",
  "name": "Photography",
  "nameKr": "사진",
  "related": "pilgrims",        // 클릭 시 이동할 프로젝트의 id
  "desc": "서비스 설명 한 문장."
}
```

> ⚠️ **JSON 편집 3대 규칙** (안 지키면 사이트가 안 뜹니다)
> 1. 모든 글자값은 큰따옴표 `" "` 로 감쌉니다. (작은따옴표 ✗)
> 2. 항목 사이에는 쉼표 `,` — 단, **마지막 항목 뒤에는 쉼표를 넣지 않습니다.**
> 3. 편집 후 [jsonlint.com](https://jsonlint.com) 에 붙여넣어 `Valid JSON` 인지 확인하면 안전합니다.
>
> 화면이 "콘텐츠를 불러오지 못했습니다" 로 나오면 대개 JSON 문법 실수입니다.
> F12 → Console 탭에서 어떤 파일이 문제인지 확인할 수 있습니다.

## 🎨 레이아웃·디자인 수정

- **색상**: `site.css` 의 `:root` 변수(`--ink` 글자색, `--paper` 배경색) 와
  `index.html` 안의 Tailwind `colors` 를 **같은 값으로** 함께 수정하세요.
- **폰트 / 간격 / 크기**: 각 섹션의 모양은 `site-app.jsx` 의 컴포넌트
  (`About`, `Work`, `Service`, `Blog`, `Contact`, `Sidebar`) 안 `className` 에서 조정합니다.
  - 예: 여백 `px-10`(좌우) · `pt-10`(위) 숫자를 키우거나 줄이면 간격이 바뀝니다.
  - 글자 크기는 `text-lg`, `text-[90px]` 같은 부분을 바꿉니다.
- **네비게이션 항목 이름**: `site-data.jsx` 의 `NAV` 배열.

> Tailwind 클래스 의미가 궁금하면 [tailwindcss.com/docs](https://tailwindcss.com/docs) 에서
> 클래스 이름을 검색하면 바로 설명이 나옵니다.

> 참고: 본문 폰트(Inter)와 한글 폰트(Pretendard)는 `index.html` 에서 CDN 으로 불러옵니다.
> 오프라인 환경이라면 해당 폰트도 로컬로 받아 `@font-face` 로 교체하세요.

## GitHub 에 올리기

### 0. 준비물 (한 번만)
- [Git](https://git-scm.com/downloads) 설치
- [GitHub](https://github.com) 계정
- (선택) VS Code

### 1. 로컬 폴더 준비
다운로드한 `anco-portfolio` 폴더를 원하는 위치에 둡니다.
VS Code 에서 **File → Open Folder** 로 이 폴더를 엽니다.

### 2. GitHub 에서 빈 저장소 만들기
1. GitHub → 우상단 **+** → **New repository**
2. Repository name: `anco-portfolio`
3. **Public** 선택 (GitHub Pages 무료 호스팅을 쓰려면 Public)
4. README/.gitignore 는 **추가하지 않음** (이미 README 있음)
5. **Create repository**

### 3. 터미널에서 업로드
VS Code 에서 **Terminal → New Terminal** 을 열고, 폴더 안에서:

```bash
git init
git add .
git commit -m "anco. portfolio 첫 커밋"
git branch -M main
# 아래 URL 은 2번에서 만든 본인 저장소 주소로 교체
git remote add origin https://github.com/<본인아이디>/anco-portfolio.git
git push -u origin main
```

처음 push 시 GitHub 로그인(브라우저 인증)이 뜨면 따라서 승인하면 됩니다.

### 4. (선택) 웹사이트로 배포 — GitHub Pages
1. 저장소 → **Settings → Pages**
2. **Source: Deploy from a branch**
3. Branch: **main / (root)** 선택 → **Save**
4. 1~2분 뒤 `https://<본인아이디>.github.io/anco-portfolio/` 주소로 사이트가 열립니다.

> Pages 는 정적 호스팅이라 이 사이트 구조(브라우저에서 JSX 변환) 그대로 잘 동작합니다.

### 이후 수정사항 반영
파일을 고친 뒤 같은 터미널에서:
```bash
git add .
git commit -m "수정 내용 설명"
git push
```

