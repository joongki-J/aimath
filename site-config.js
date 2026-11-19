// =========================================================
//  ✏️ 선생님이 고치는 파일은 이것 하나입니다.
//  1) SITE      : 홈페이지 이름과 소개 문구
//  2) TOOLS     : 연수 자료 링크 목록 (링크를 추가할 때마다 한 덩어리씩 추가)
//  3) SUBJECT_GROUPS : 자료 분류 버튼 (단원별·종류별)
//  4) SCHEDULE  : 연수 일정표
//  5) INFO      : 장소·문의 등 안내
//  6) WIFI      : Wi-Fi 안내
//
//  ⚠️ 고칠 때 주의
//  - 따옴표(" ")와 쉼표(,)를 지우지 마세요. 가장 흔한 오류 원인입니다.
//  - 저장한 뒤 홈페이지가 하얗게 나오면 마지막으로 고친 곳의 쉼표·따옴표를 확인하세요.
// =========================================================

const SITE = {
  name: "인공지능 수학 연수",                 // 홈페이지 이름 (상단·탭 제목·푸터에 표시)
  englishName: "AI MATHEMATICS WORKSHOP",     // 이름 아래 작은 영문 글씨
  eyebrow: "2026. 11. 22.(일) · 연수 3일차",  // 큰 제목 위의 작은 안내 문구

  // 큰 제목: 첫 줄 / 형광펜 강조 단어 / 강조 뒤 문구
  heroLine1: "인공지능을",
  heroHighlight: "수학으로",
  heroLine2: "읽다",

  heroDesc: "3일차 4단원 ‘예측과 최적화’와 5단원 ‘인공지능과 수학탐구’에서 쓰는 아이스브레이킹, 경사하강법 실습 앱, 분반별 활동 공유 자료를 한곳에 모았습니다.",
  searchPlaceholder: "예: 경사하강법, 아이스브레이킹, 1분반"
};

// ---------------------------------------------------------
//  자료 링크 목록
//  링크를 추가하는 법
//   1) 아래 { ... } 덩어리 하나를 복사해 붙이고 내용을 바꿉니다.
//   2) subject는 아래 SUBJECT_GROUPS에 있는 이름(4단원, 5단원, 공통 안내 …)과 글자까지 똑같이 씁니다.
//   3) type은 카드 위쪽에 보이는 자료 종류입니다. (예: 발표자료, 실습, 영상, 설문, 사이트)
//   4) url
//      - 외부 링크(구글 드라이브, 패들렛, 슬라이드 등): 전체 주소 "https://..." → 새 탭으로 열림
//      - 이 저장소에 올린 앱: "./폴더이름/"
//      - 아직 링크가 없으면 "" (빈칸) → '링크 준비 중'으로 표시됨
//   5) (선택) 썸네일
//      - 저장소 앱은 thumbnails 폴더에 "폴더이름.png"로 올리면 자동으로 붙습니다.
//      - 외부 링크는 thumb: "./thumbnails/파일이름.png" 처럼 직접 적습니다.
// ---------------------------------------------------------

const TOOLS = [

  // ===== 아이스브레이킹 =====
  {
    title: "기지개 팡팡",
    subject: "아이스브레이킹",
    type: "활동",
    symbol: "✺",
    description: "활동 전에 몸과 마음을 푸는 아이스브레이킹 활동입니다.",
    tags: ["아이스브레이킹", "스트레칭", "분위기 전환"],
    url: "https://gemini.google.com/share/5cc4e5c7faf0?skid=c0253429-e452-4673-9001-f66858c643fe"
  },
  {
    title: "경사하강법 게임",
    subject: "아이스브레이킹",
    type: "게임",
    symbol: "⛰",
    description: "경사하강법의 원리를 간단한 게임으로 체험해 보는 활동입니다.",
    tags: ["아이스브레이킹", "경사하강법", "게임"],
    url: "https://www.i-am.ai/gradient-descent.html"
  },

  // ===== 4단원 · 예측과 최적화 (3일차 1~4교시) · 실습 앱 =====

  {
    title: "경사하강법 시뮬레이터",
    subject: "4단원",
    type: "실습",
    symbol: "↘",
    description: "이차·사차·복합 손실함수에서 학습률과 초깃값을 바꾸며 최솟값을 찾아가는 과정을 관찰합니다. 지역 최솟값도 비교할 수 있습니다.",
    tags: ["경사하강법", "학습률", "지역 최솟값", "손실함수"],
    url: "./gd-simulator/"
  },
  {
    title: "경사하강법 y = ax",
    subject: "4단원",
    type: "실습",
    symbol: "∕",
    description: "산점도 자료로 y = ax의 기울기 a를 경사하강법으로 찾고, 손실함수 L(a) 위의 이동 경로를 함께 봅니다.",
    tags: ["경사하강법", "y=ax", "평균제곱오차", "추세선"],
    url: "./gd-yax/"
  },
  {
    title: "경사하강법 y = ax + b",
    subject: "4단원",
    type: "실습",
    symbol: "⟋",
    description: "a, b를 동시에 학습하며 3차원 손실곡면 위에서 경사하강 경로를 관찰합니다.",
    tags: ["경사하강법", "y=ax+b", "편미분", "손실곡면"],
    url: "./gd-yaxb/"
  },

  // ===== 활동 공유 (분반별 구글 슬라이드) =====
  {
    title: "1분반 활동 공유",
    subject: "활동 공유",
    type: "슬라이드",
    symbol: "1",
    description: "1분반 모둠 활동 결과를 함께 정리하고 나누는 구글 슬라이드입니다.",
    tags: ["활동 공유", "1분반", "구글 슬라이드", "수업 아이디어"],
    url: "https://docs.google.com/presentation/d/1bg3iUnQ9AWYUwj1-NN90b6KxEUb0Pzjd1N4ISQqp5QQ/edit?slide=id.h219c9dc27e0b0a3c_0_0#slide=id.h219c9dc27e0b0a3c_0_0"
  },
  {
    title: "2분반 활동 공유",
    subject: "활동 공유",
    type: "슬라이드",
    symbol: "2",
    description: "2분반 모둠 활동 결과를 함께 정리하고 나누는 구글 슬라이드입니다.",
    tags: ["활동 공유", "2분반", "구글 슬라이드", "수업 아이디어"],
    url: "https://docs.google.com/presentation/d/1Pv69NxUHVeSDN3Ns-bAe3tDzDpib5lWelJF56aOymyk/edit"
  },
  {
    title: "3분반 활동 공유",
    subject: "활동 공유",
    type: "슬라이드",
    symbol: "3",
    description: "3분반 모둠 활동 결과를 함께 정리하고 나누는 구글 슬라이드입니다.",
    tags: ["활동 공유", "3분반", "구글 슬라이드", "수업 아이디어"],
    url: "https://docs.google.com/presentation/d/1ZmhUZ_GvbxG2tOTZMogvGso7VmiTQnsogNJuW9llmhI/edit"
  }

  // ↓ 새 링크는 위 } 뒤에 쉼표(,)를 찍고 아래처럼 이어 붙이세요.
  // ,{
  //   title: "자료 제목",
  //   subject: "4단원",
  //   type: "발표자료",
  //   symbol: "★",
  //   description: "자료를 한두 문장으로 소개합니다.",
  //   tags: ["태그1", "태그2"],
  //   url: "https://..."
  // }
];

// 자료 분류 (버튼 줄). 이름을 바꾸면 위 TOOLS의 subject도 똑같이 바꿔 주세요.
const SUBJECT_GROUPS = [
  { label: "단원별", items: ["4단원"] },
  { label: "종류별", items: ["아이스브레이킹", "활동 공유"] }
];

// ---------------------------------------------------------
//  연수 일정표
//  - date는 "YYYY-MM-DD" 형식으로 씁니다. 연수 당일에는 해당 날짜에 TODAY 표시가 붙습니다.
//  - 세션: time(시작), end(끝, 선택), title(제목), note(교시·강사 등, 선택)
//  - 세션에 subject(예: "4단원")를 쓰면 제목을 눌렀을 때 그 단원 자료만 걸러 보여 줍니다.
// ---------------------------------------------------------

const SCHEDULE = [
  {
    day: "1일차",
    date: "2026-11-20",
    label: "11. 20.(금)",
    sessions: [
      { time: "14:00", end: "14:30", title: "등록", note: "5교시" },
      { time: "14:30", end: "14:50", title: "개회식 및 오리엔테이션", note: "5교시" },
      { time: "15:00", end: "15:50", title: "(공통강의) 인공지능 윤리", note: "6교시" },
      { time: "16:00", end: "18:50", title: "인공지능과 빅데이터", note: "7~9교시" }
    ]
  },
  {
    day: "2일차",
    date: "2026-11-21",
    label: "11. 21.(토)",
    sessions: [
      { time: "09:00", end: "12:50", title: "텍스트 데이터 처리", note: "1~4교시" },
      { time: "13:00", end: "14:00", title: "점심시간" },
      { time: "14:00", end: "18:50", title: "이미지 데이터 처리", note: "5~9교시" }
    ]
  },
  {
    day: "3일차",
    date: "2026-11-22",
    label: "11. 22.(일)",
    sessions: [
      { time: "09:00", end: "12:50", title: "4단원 예측과 최적화", note: "1~4교시", subject: "4단원" },
      { time: "13:00", end: "14:00", title: "점심시간" },
      { time: "14:00", end: "16:50", title: "5단원 인공지능과 수학탐구", note: "5~7교시" },
      { time: "17:00", end: "17:50", title: "수업 아이디어 공유 및 토의·토론", note: "8교시", subject: "활동 공유" }
    ]
  }
];

// 일정표 아래 작은 안내 문구 (필요 없으면 "" 로 비워 두세요)
const SCHEDULE_NOTE = "※ 상기 일정은 변경될 수 있음";

// 안내 정보 (일정표 위에 표시). 필요 없는 줄은 지워도 됩니다.
const INFO = [
  { label: "장소", value: "○○ 연수원 (주소 입력)" },
  { label: "준비물", value: "노트북, 충전기" },
  { label: "문의", value: "연수 담당자 이름 · 연락처" }
];

// ---------------------------------------------------------
//  Wi-Fi 안내
//  - rows: 이름(label)과 값(value) 한 줄씩. 값이 여러 개면 ["값1", "값2"]처럼 쓰면 줄을 나눠 보여 줍니다.
//  - desc: 위쪽 설명, foot: 아래쪽 예시·주의 문구 (선택)
// ---------------------------------------------------------

const WIFI = [
  {
    title: "공통강의실 Wi-Fi",
    place: "컨벤션 A홀",
    rows: [
      { label: "ID", value: ["Baruemi_2.4G, 5G", "Baruemi1 2.4G, 5G, 6G"] },
      { label: "PW", value: "없음" }
    ]
  },
  {
    title: "분반강의실 Wi-Fi",
    place: "모둠별",
    desc: "본인이 속한 모둠의 Wi-Fi에 접속해 주세요.",
    rows: [
      { label: "ID", value: "keris + 분반 두 자리 + 모둠 두 자리" },
      { label: "PW", value: "ID와 동일" }
    ],
    foot: "예시: 1분반 3모둠 → ID keris0103 / PW keris0103"
  },
  {
    title: "분반 공통 Wi-Fi",
    place: "분반별",
    rows: [
      { label: "1분반", value: "kerisap1" },
      { label: "2분반", value: "kerisap2" },
      { label: "3분반", value: "kerisap3" }
    ],
    foot: "※ 비밀번호는 각 ID와 동일합니다."
  }
];
