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

  heroDesc: "3일차 4단원 ‘예측과 최적화’와 5단원 ‘인공지능과 수학탐구’에서 쓰는 아이스브레이킹, 4단원 실습 앱, 5단원 데이터 사이트, 분반별 활동 공유 자료를 한곳에 모았습니다.",
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
//      - 내려받을 파일(엑셀 등): downloads 폴더에 올리고 url: "./downloads/파일.xlsx",
//        download: "내려받을 때 이름.xlsx" 를 함께 쓰면 '내려받기' 버튼이 됨
//   5) (선택) 썸네일
//      - 저장소 앱은 thumbnails 폴더에 "폴더이름.png"로 올리면 자동으로 붙습니다.
//      - 외부 링크는 thumb: "./thumbnails/파일이름.png" 처럼 직접 적습니다.
// ---------------------------------------------------------

const TOOLS = [
  // 카드는 아래 순서대로 홈페이지에 표시됩니다.
  {
    title: "기지개 팡팡",
    subject: "아이스브레이킹",
    type: "활동",
    symbol: "✺",
    description: "카메라로 동작을 인식해 기지개 동작으로 점수를 겨루는 복불복 게임입니다. 카메라 권한이 필요합니다.",
    tags: ["아이스브레이킹", "스트레칭", "분위기 전환"],
    url: "https://gemini.google.com/share/5cc4e5c7faf0?skid=c0253429-e452-4673-9001-f66858c643fe",
    thumb: "./thumbnails/ice-stretch.png"
  },
  {
    title: "지오지브라 클래식",
    subject: "4단원",
    type: "사이트",
    symbol: "◎",
    description: "그래프·스프레드시트·대수 창을 함께 쓰는 지오지브라입니다. 데이터를 붙여 넣어 산점도를 그리고 추세선을 그려 볼 수 있습니다.",
    tags: ["지오지브라", "GeoGebra", "산점도", "추세선", "그래프"],
    url: "https://www.geogebra.org/classic",
    thumb: "./thumbnails/geogebra-classic.png"
  },
  {
    title: "추세선 어림하여 그려보기 (S기업 주가 데이터)",
    subject: "4단원",
    type: "데이터",
    symbol: "↗",
    description: "연도별 종가 기준 S기업 주가 데이터(10개)입니다. 복사 버튼을 누르면 숫자만 엑셀에 두 열로 붙여 넣을 수 있습니다.",
    tags: ["추세선", "주가", "데이터", "엑셀", "복사"],
    url: "./stock-data/"
  },
  {
    title: "스스로 해보기 (연도별 출산율 데이터)",
    subject: "4단원",
    type: "데이터",
    symbol: "↘",
    description: "연도별 출산율 데이터(6개)입니다. 복사 버튼을 누르면 숫자만 엑셀에 두 열로 붙여 넣을 수 있습니다.",
    tags: ["추세선", "출산율", "데이터", "엑셀", "복사"],
    url: "./birth-data/"
  },
  {
    title: "GeoGebra로 최적의 추세선 찾기 (실습 데이터)",
    subject: "4단원",
    type: "데이터",
    symbol: "⟋",
    description: "지오지브라 스프레드시트 실습용 x, y 데이터(4개)와 따라 하기 안내입니다. 복사 버튼을 누르면 숫자만 두 열로 붙여 넣을 수 있습니다.",
    tags: ["지오지브라", "추세선", "스프레드시트", "데이터", "복사"],
    url: "./geogebra-data/"
  },
  {
    title: "손실함수 분석기",
    subject: "4단원",
    type: "실습",
    symbol: "L",
    description: "자료를 입력하면 y = ax, y = ax + b 모형의 손실함수 L(a), L(a, b)를 전개 과정과 함께 구해 줍니다. y = ax는 완전제곱식까지 정리합니다.",
    tags: ["손실함수", "평균제곱오차", "완전제곱식", "y=ax", "y=ax+b"],
    url: "./loss-analyzer/"
  },
  {
    title: "경사하강법 게임",
    subject: "아이스브레이킹",
    type: "게임",
    symbol: "⛰",
    description: "연구선에서 탐사 장치를 내려 바다 밑 가장 깊은 곳의 보물을 찾으며 경사하강법의 원리를 체험하는 게임입니다. (영어)",
    tags: ["아이스브레이킹", "경사하강법", "게임"],
    url: "https://www.i-am.ai/gradient-descent.html",
    thumb: "./thumbnails/ice-gd-game.png"
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
    title: "경사하강법 시뮬레이터",
    subject: "4단원",
    type: "실습",
    symbol: "↘",
    description: "이차·사차·복합 손실함수에서 학습률과 초깃값을 바꾸며 최솟값을 찾아가는 과정을 관찰합니다. 지역 최솟값도 비교할 수 있습니다.",
    tags: ["경사하강법", "학습률", "지역 최솟값", "손실함수"],
    url: "./gd-simulator/"
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
  {
    title: "경사하강법 3D 시각화",
    subject: "4단원",
    type: "실습",
    symbol: "⛰",
    description: "3차원 손실곡면 위에서 공이 최저점을 향해 내려가는 과정을 관찰합니다. 학습률·모멘텀을 바꾸고 볼록·계곡·언덕 함수를 비교할 수 있습니다.",
    tags: ["경사하강법", "3D", "손실곡면", "모멘텀", "학습률"],
    url: "https://mathlove22.github.io/3d-decent/",
    thumb: "./thumbnails/gd-3d.png"
  },
  {
    title: "화소별 가중치로 숫자 구분하기",
    subject: "4단원",
    type: "실습",
    symbol: "▦",
    description: "3×5 숫자 그림의 칸마다 가중치를 두고, 15개 변수의 손실함수와 경사하강법으로 학습한 뒤 계단함수로 숫자 1과 8을 판정합니다.",
    tags: ["화소", "가중치", "숫자 분류", "인공신경망", "계단함수", "손실함수", "편미분", "경사하강법"],
    url: "./digit-weights/"
  },
  {
    title: "단어별 가중치로 문장 분류하기",
    subject: "4단원",
    type: "실습",
    symbol: "Aa",
    description: "단어마다 가중치를 주어 문장을 분류합니다. 1장 감성 분석(출력 노드 1개), 2장 주제 분류(출력 노드 3개)로 구성되어 있습니다.",
    tags: ["가중치", "문장 분류", "감성 분석", "텍스트 데이터", "출력 노드"],
    url: "./word-weights/"
  },
  {
    title: "경사하강법 영상 (MNIST 자료)",
    subject: "4단원",
    type: "영상",
    symbol: "▶",
    description: "3Blue1Brown 한국어 「AI가 궁금하다면 봐야할 기초영상 경사하강법 - DL2」. MNIST 손글씨 숫자 자료로 신경망이 경사하강법으로 학습하는 원리를 설명합니다. 30초부터 재생됩니다.",
    tags: ["경사하강법", "MNIST", "손글씨 숫자", "신경망", "3Blue1Brown", "영상"],
    url: "https://youtu.be/8861RzFOFs8?t=30",
    thumb: "https://i.ytimg.com/vi/8861RzFOFs8/maxresdefault.jpg"
  },
  {
    title: "5단원 실습자료 1",
    subject: "5단원",
    type: "엑셀",
    symbol: "▦",
    description: "기온과 판매량 자료(10일)로 오차, 손실함수 L(a), 경사하강법에 따른 기울기 a의 갱신을 차례로 계산하는 실습지입니다. (시트 3개)",
    tags: ["엑셀", "실습지", "손실함수", "경사하강법", "기온", "판매량"],
    url: "./downloads/u5-practice-1.xlsx",
    download: "5단원 실습자료 1.xlsx"
  },
  {
    title: "5단원 실습자료 2",
    subject: "5단원",
    type: "엑셀",
    symbol: "▦",
    description: "날짜별 최고기온과 빙수 판매량을 직접 채워 넣고 손실함수와 경사하강법으로 기울기 a를 찾아가는 실습지입니다.",
    tags: ["엑셀", "실습지", "최고기온", "빙수", "경사하강법", "학습률"],
    url: "./downloads/u5-practice-2.xlsx",
    download: "5단원 실습자료 2.xlsx"
  },
  {
    title: "인공지능 수학탐구 보고서 양식",
    subject: "5단원",
    type: "양식",
    symbol: "✎",
    description: "탐구 보고서를 작성하는 구글 문서 양식입니다. 누르면 내 구글 드라이브에 사본을 만들어 작성할 수 있습니다. (구글 로그인 필요)",
    tags: ["탐구보고서", "보고서 양식", "수학탐구", "구글 문서"],
    url: "https://docs.google.com/document/d/1Nsb2AfLPpJam8Rg2R9UmhR24ZXkvajfxO_0hJdfTyMI/copy"
  },
  {
    title: "네이버 데이터랩",
    subject: "5단원",
    type: "사이트",
    symbol: "N",
    description: "네이버 검색어의 기간별 검색량 추이를 비교하고 자료로 내려받을 수 있습니다.",
    tags: ["검색어 트렌드", "데이터", "탐구 주제"],
    url: "https://datalab.naver.com/keyword/trendSearch.naver",
    thumb: "./thumbnails/u5-naver.png"
  },
  {
    title: "구글 트렌드",
    subject: "5단원",
    type: "사이트",
    symbol: "G",
    description: "구글 검색어의 관심도 변화를 지역·기간별로 비교할 수 있습니다. (새 탐색 화면은 구글 로그인이 필요할 수 있습니다)",
    tags: ["검색어 트렌드", "데이터", "탐구 주제"],
    url: "https://trends.google.co.kr/explore?geo=KR",
    thumb: "./thumbnails/u5-gtrends.png"
  },
  {
    title: "기상자료개방포털",
    subject: "5단원",
    type: "사이트",
    symbol: "☂",
    description: "기상청이 제공하는 기온·강수량 등 기상 관측 자료를 찾아 내려받을 수 있습니다.",
    tags: ["기상청", "기온", "강수량", "공공데이터"],
    url: "https://data.kma.go.kr/cmmn/main.do",
    thumb: "./thumbnails/u5-kma.png"
  },
  {
    title: "AskMath 인공지능 수학 자료",
    subject: "참고 자료",
    type: "자료실",
    symbol: "A",
    description: "한국과학창의재단 AskMath의 인공지능 수학 교수학습 자료입니다. 인공지능 속 수학 원리 탐구 활동, 모듈형 교재 PDF와 AI웹실험실 안내 등이 있습니다.",
    tags: ["AskMath", "한국과학창의재단", "교수학습 자료", "모듈형 교재", "AI웹실험실"],
    url: "https://askmath.kosac.re.kr/board.do?menuPos=17&idx=&board_code=601LT980&skinTabPos3=1&tabPos3=1&searchValue3=&skinSearchValue2=435&skinSearchValue3=&skinSearchValue4=&skinSearchValue6=&paramKey50=&searchValue1=0&searchKeyword=%EC%9D%B8%EA%B3%B5&pageIndex=1",
    thumb: "./thumbnails/askmath-ai.png"
  },
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
  { label: "단원별", items: ["4단원", "5단원"] },
  { label: "종류별", items: ["아이스브레이킹", "활동 공유", "참고 자료"] }
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
      { time: "14:00", end: "16:50", title: "5단원 인공지능과 수학탐구", note: "5~7교시", subject: "5단원" },
      { time: "17:00", end: "17:50", title: "수업 아이디어 공유 및 토의·토론", note: "8교시", subject: "활동 공유" }
    ]
  }
];

// 일정표 아래 작은 안내 문구 (필요 없으면 "" 로 비워 두세요)
const SCHEDULE_NOTE = "※ 상기 일정은 변경될 수 있음";

// 안내 정보 (일정표 위에 표시). 비워 두면 표시되지 않습니다.
// 예: { label: "장소", value: "○○ 연수원" }
const INFO = [];

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
