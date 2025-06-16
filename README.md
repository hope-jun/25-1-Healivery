# Healivery

**Healivery**는 건강한 식단 정보를 기반으로 메뉴를 추천하고, 사용자가 영양소를 비교하여 배달 음식을 주문할 수 있는 웹 애플리케이션입니다.  
이 프로젝트는 **연세대학교 컴퓨터과학과 2025-1학기 _SW AI 비즈니스 응용설계_ 수업의 개인 프로젝트 결과물**로 개발되었습니다.

<br/>

## 프로젝트 정보

- **과목명**: SW AI 비즈니스 응용설계 (2025-1, 연세대학교 컴퓨터과학과)  
- **개발자**: 전희망 (2020163053)  
- **문의**: jhmharry@yonsei.ac.kr

<br/>

## 사용 기술

- **Frontend**: React.js (CRA 기반)
- **State Management**: Context API
- **UI**: HTML5, CSS3, Inline Styling (Custom Design)
- **배포**: [Netlify](https://www.netlify.com/)  

<br/>

## 주요 기능

- 식단별 필터 기능 제공
- 메뉴별 영양정보 시각화  
- 장바구니에서 한 끼 기준 영양 섭취 균형 Radar Chart 및 상세 도움말 (오각형 Nutrition Chart)
- 마이페이지에서 개인 맞춤 영양 기준 및 식단 템플릿 제공 : 사용자 기준 1끼 권장량 기반 건강한 식단 판별
- Google Gemini API 기반 LLM 챗봇으로 영양 관련 정보 제공  
- 장바구니 및 실시간 주문 정보 입력 기능 / Google Spreadsheet 연동 주문 기록 저장(미완성)

<br/>

## 앱개발 환경 설정

### 요구사항
- Node.js ≥ 18
- npm 또는 yarn

### 설치 및 실행
```bash
git clone https://github.com/hope-jun/25-1-Healivery.git
cd 25-1-Healivery

# 패키지 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm start
# 또는
yarn start
```

브라우저에서 접속: [http://localhost:3000](http://localhost:3000)

### 배포된 Web URL
👉 Healivery 소개 홈페이지: [https://healivery-main.netlify.app/](https://healivery-main.netlify.app/)
👉 Healivery 배달앱(신촌서비스 ver): [https://healivery.netlify.app/](https://healivery.netlify.app/)

---

## 주요 기능별 실행 설명

### 1. 식단별 필터 기능
- **동작**: 비건/ 저탄고지 등 각각의 식단 선택에 따라 메뉴 리스트 필터링 및 렌더링
- **실행 절차**:
  1. 필터 버튼 클릭
  2. 상태 업데이트 후 `MenuCard` 자동 렌더링

---

### 2. 메뉴별 영양정보 시각화(표 혀애)
- **동작**: 단백질/탄수화물/지방/나트륨/칼로리 정보를 메뉴별로 표 형태로 표시함. 더불어서 적정 영양수치 기준을 각각 초록, 노란, 빨간색으로 시각화하여 표현하는 동작을 함.
---

### 3. 장바구니 – 레이더 차트 및 도움말
- **파일**:
- **라이브러리**: Recharts (`RadarChart` 등)
- **동작**: 단백질/탄수화물/지방/나트륨/칼로리 기준의 레이더 차트 시각화(사용자의 한끼 기준 섭취 영양정보를 기준으로 적정, 초과 여부를 기준으로 함.)
  1. 메뉴 추가 시, 영양소 합산 계산
  2. 레이더 차트 시각화 (`Recharts`)

---

### 4. 마이페이지 – 맞춤형 영양 기준 및 템플릿
- **동작**:
  1. 사용자 개인별 맞춤 한끼 기준 권장 영양소 기준을 입력할 수 있도록 제공
  2. 헬스/비건 식단에 대한 한끼 기준 권장 영양소 기준을 입력할 수 있도록 사전 템플릿을 제공

---

### 5. Google Gemini 기반 LLM 챗봇
- **동작**:
  1. 사용자가 질문 입력
  2. Gemini API 호출 후 응답 출력
- **실행 팁**:
  - `.env.local`에 `REACT_APP_OPENAI_API_KEY=your_key` 설정 필요

---

## 실행 요약

1. `npm start` 실행 후
2. `http://localhost:3000` 접속
3. 다음 기능별 페이지 탐색
   - **홈 화면**: 필터 기능 + 메뉴 리스트
   - **장바구니**: 섭취 영양소 레이더 차트 + 도움말
   - **마이페이지**: 맞춤 영양 기준 + LLM 챗봇

---
