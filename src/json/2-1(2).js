// 기준 자료: 업로드 PDF 「기말최종_compressed(7).pdf」 PDF p.30~34, 교재 p.10~14
// 자체 검토 반영: 정답 노출 최소화, type/answers 개수 점검, 중복·지엽 문항 제거

export const questions = [
  // 출처: PDF p.30(교재 p.10), 염색체의 정의
  {
    id: 1,
    section: "유전 정보의 전달 구조",
    prompt: "생물의 유전정보를 담아 자손에게 전달하는 세포 내 구조는 __이다.",
    answers: ["염색체"],
    type: "single",
  },

  // 출처: PDF p.30(교재 p.10), 염색체의 구성
  {
    id: 2,
    section: "기본 응축 구조",
    prompt: "염색체는 단백질인 __과(와) __로 구성된다.",
    answers: ["히스톤", "DNA"],
    type: "multi",
  },

  // 출처: PDF p.30(교재 p.10), 뉴클레오솜
  {
    id: 3,
    section: "기본 응축 구조",
    prompt: "진핵세포에서 DNA가 히스톤을 휘감아 형성되는 기본 응축 구조는 __이다.",
    answers: ["뉴클레오솜"],
    type: "single",
  },

  // 출처: PDF p.30(교재 p.10), 히스톤의 역할
  {
    id: 4,
    section: "단백질과 응축 조절",
    prompt: "히스톤은 DNA 구조를 __하고, 염색체의 __ 및 유전자발현 __에 관여한다.",
    answers: ["안정화", "응축", "조절"],
    type: "multi",
  },

  // 출처: PDF p.30(교재 p.10), 뉴클레오솜 사이 연결
  {
    id: 5,
    section: "기본 응축 구조",
    prompt: "뉴클레오솜과 뉴클레오솜 사이는 __로 연결되어 실에 꿰인 구슬 형태를 띤다.",
    answers: ["DNA", "디엔에이"],
    type: "any",
  },

  // 출처: PDF p.30(교재 p.10), 염색체와 뉴클레오솜
  {
    id: 6,
    section: "기본 응축 구조",
    prompt: "한 염색체는 수많은 __으로 이루어져 있다.",
    answers: ["뉴클레오솜"],
    type: "single",
  },

  // 출처: PDF p.30(교재 p.10), 응축과 막대 모양 구조
  {
    id: 7,
    section: "응축 구조 형성",
    prompt: "뉴클레오솜 가닥이 규칙적으로 꼬이고 더 응축되면 두꺼운 막대 모양의 __가 만들어진다.",
    answers: ["염색체"],
    type: "single",
  },

  // 출처: PDF p.30(교재 p.10), 분열하지 않을 때 염색체 상태
  {
    id: 8,
    section: "세포주기별 구조 변화",
    prompt: "세포가 분열하지 않을 때 염색체는 핵 속에서 __ 모양으로 풀어져 있다.",
    answers: ["실"],
    type: "single",
  },

  // 출처: PDF p.30(교재 p.10), 분열할 때 염색체 상태
  {
    id: 9,
    section: "세포주기별 구조 변화",
    prompt: "세포가 분열할 때 염색체는 더 __하여 짧고 두꺼운 막대 형태가 된다.",
    answers: ["응축"],
    type: "single",
  },

  // 출처: PDF p.30(교재 p.10), 염색체 구조 변화 과정
  {
    id: 10,
    section: "세포주기별 구조 변화",
    prompt: "염색체는 __, __, __ 같은 과정에서 응축하거나 풀어지며 구조가 변한다.",
    answers: ["DNA 복제", "세포분열", "전사"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11), DNA의 구성
  {
    id: 11,
    section: "핵산의 구성",
    prompt: "DNA는 생물의 유전정보를 저장하는 물질로, __의 중합체이다.",
    answers: ["뉴클레오타이드", "뉴클레오티드"],
    type: "any",
  },

  // 출처: PDF p.31(교재 p.11), 뉴클레오타이드 구성 요소
  {
    id: 12,
    section: "핵산의 구성",
    prompt: "뉴클레오타이드는 __, __, __가 1:1:1로 결합한 구조이다.",
    answers: ["인산", "당", "염기"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11), 폴리뉴클레오타이드 형성
  {
    id: 13,
    section: "핵산 가닥 형성",
    prompt: "뉴클레오타이드의 당과 다른 뉴클레오타이드의 인산이 반복 연결되어 형성되는 가닥은 __이다.",
    answers: ["폴리뉴클레오타이드", "폴리뉴클레오티드"],
    type: "any",
  },

  // 출처: PDF p.31(교재 p.11), DNA 이중나선
  {
    id: 14,
    section: "핵산 입체 구조",
    prompt: "폴리뉴클레오타이드 두 가닥의 염기가 상보적으로 결합해 꼬인 구조는 DNA __이다.",
    answers: ["이중나선"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11), DNA의 정보 저장 방식
  {
    id: 15,
    section: "핵산 정보 저장",
    prompt: "DNA 이중나선 안쪽에서 유전정보에 해당하는 것은 __이다.",
    answers: ["염기서열"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11), 유전자의 정의
  {
    id: 16,
    section: "형질 정보의 위치",
    prompt: "형질 결정에 필요한 정보가 저장된 DNA의 특정 부위는 __이다.",
    answers: ["유전자"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11), 하나의 DNA와 유전자 수
  {
    id: 17,
    section: "형질 정보의 위치",
    prompt: "하나의 DNA에는 __의 유전자가 있을 수 있다.",
    answers: ["수많은"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11), 유전자의 기능
  {
    id: 18,
    section: "형질 정보의 기능",
    prompt: "유전자는 __에 필요한 정보 등을 담고 있다.",
    answers: ["단백질합성"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11), 유전자의 조절 역할
  {
    id: 19,
    section: "형질 정보의 기능",
    prompt: "유전자는 세포의 __와 __을 조절하는 데 중요한 역할을 한다.",
    answers: ["구조", "기능"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11), 유전체
  {
    id: 20,
    section: "전체 유전 정보",
    prompt: "한 생물이 가진 모든 유전정보는 __이다.",
    answers: ["유전체", "게놈", "genome"],
    type: "any",
  },

  // 출처: PDF p.31(교재 p.11), 유전체에 포함되는 염기서열
  {
    id: 21,
    section: "전체 유전 정보",
    prompt: "유전체에는 단백질 암호화 유전자뿐 아니라 유전자발현을 __하거나 기능이 아직 알려지지 않은 염기서열도 포함된다.",
    answers: ["조절"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11), DNA와 RNA의 당
  {
    id: 22,
    section: "핵산의 구성",
    prompt: "DNA의 당은 __이고, RNA의 당은 __이다.",
    answers: ["디옥시라이보스", "라이보스"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11), DNA 염기
  {
    id: 23,
    section: "핵산의 구성",
    prompt: "DNA의 염기를 약자로 쓰면 __, __, __, __이다.",
    answers: ["A", "G", "C", "T"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11), RNA 염기
  {
    id: 24,
    section: "핵산의 구성",
    prompt: "RNA에서는 타이민 대신 __이 있다.",
    answers: ["유라실", "U"],
    type: "any",
  },

  // 출처: PDF p.31(교재 p.11), DNA 이중나선의 바깥쪽 구조
  {
    id: 25,
    section: "핵산 입체 구조",
    prompt: "DNA 이중나선의 바깥쪽 뼈대는 __과 __이 공유결합으로 연결되어 형성된다.",
    answers: ["당", "인산"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11), DNA 이중나선의 안쪽 결합
  {
    id: 26,
    section: "핵산 입체 구조",
    prompt: "DNA 이중나선 안쪽의 염기 사이는 __으로 연결되어 있다.",
    answers: ["수소결합"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11), DNA 이중나선의 구조적 이점
  {
    id: 27,
    section: "핵산 입체 구조",
    prompt: "DNA 이중나선은 유전정보의 안전한 __과 정확한 __에 적합한 형태이다.",
    answers: ["저장", "복제"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11), 단일 가닥 DNA
  {
    id: 28,
    section: "핵산 입체 구조",
    prompt: "일부 __에서는 단일 가닥 DNA가 발견되기도 한다.",
    answers: ["바이러스"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12), 사람과 유인원의 염색체 수
  {
    id: 29,
    section: "사람과 유인원 비교",
    prompt: "사람과 유인원의 체세포 염색체 수는 각각 __개와 __개이다.",
    answers: ["46", "48"],
    type: "multi",
  },

  // 출처: PDF p.32(교재 p.12), 사람 2번 염색체
  {
    id: 30,
    section: "사람과 유인원 비교",
    prompt: "두 개의 유인원 염색체가 머리를 맞대듯 융합한 형태로 해석되는 사람의 염색체는 __이다.",
    answers: ["2번 염색체"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12), 공통조상
  {
    id: 31,
    section: "사람과 유인원 비교",
    prompt: "사람의 특정 염색체 융합 형태는 사람과 유인원이 __으로부터 진화했음을 뒷받침하는 자료이다.",
    answers: ["공통조상"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12), 핵형의 정의
  {
    id: 32,
    section: "사람의 염색체 분석",
    prompt: "한 세포에 들어 있는 염색체의 수, 크기, 모양 등의 외형적 특징은 __이다.",
    answers: ["핵형"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12), 핵형의 종 특이성
  {
    id: 33,
    section: "사람의 염색체 분석",
    prompt: "핵형은 __의 고유한 특징이므로 종에 따라 다르게 나타난다.",
    answers: ["생물종"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12), 같은 종과 핵형
  {
    id: 34,
    section: "사람의 염색체 분석",
    prompt: "같은 종의 생물에서는 __이 같으면 핵형도 같다.",
    answers: ["성별"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12), 한 개체의 핵형
  {
    id: 35,
    section: "사람의 염색체 분석",
    prompt: "한 개체에서 __를 제외한 모든 체세포는 핵형이 같다.",
    answers: ["생식세포"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12), 핵형분석에 쓰는 염색체
  {
    id: 36,
    section: "사람의 염색체 분석",
    prompt: "핵형분석은 염색체가 가장 뚜렷하게 관찰되는 __의 __ 염색체 현미경 사진을 이용한다.",
    answers: ["체세포분열", "중기"],
    type: "multi",
  },

  // 출처: PDF p.32(교재 p.12), 핵형분석의 활용
  {
    id: 37,
    section: "사람의 염색체 분석",
    prompt: "핵형분석으로 __을 판별하고 __을 진단·연구할 수 있다.",
    answers: ["성별", "염색체 수나 구조의 이상"],
    type: "multi",
  },

  // 출처: PDF p.32(교재 p.12), 사람 핵형 표기
  {
    id: 38,
    section: "사람의 염색체 분석",
    prompt: "사람의 핵형은 여성에서 __, 남성에서 __로 나타낸다.",
    answers: ["44+XX", "44+XY"],
    type: "multi",
  },

  // 출처: PDF p.32(교재 p.12), 염색체 번호와 배열
  {
    id: 39,
    section: "사람의 염색체 배열",
    prompt: "핵형 배열에서는 모양이 같은 염색체를 짝짓고 __가 큰 것부터 배열하며, __는 맨 끝에 둔다.",
    answers: ["크기", "성염색체"],
    type: "multi",
  },

  // 출처: PDF p.32(교재 p.12), 염색체 수 해석
  {
    id: 40,
    section: "종 구분과 염색체",
    prompt: "염색체 수가 같아도 염색체의 모양과 크기가 달라 __이 다르면 다른 종이다.",
    answers: ["핵형"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12), 염색체 수와 생물 특징
  {
    id: 41,
    section: "종 구분과 염색체",
    prompt: "염색체 수는 생물의 __이나 복잡한 기관의 __와 관련이 없다.",
    answers: ["몸집", "발달 정도"],
    type: "multi",
  },

  // 출처: PDF p.32(교재 p.12), 염색체 수 예시
  {
    id: 42,
    section: "종 구분과 염색체",
    prompt: "감자와 침팬지는 체세포 염색체 수가 모두 __개이지만, 같은 종이라는 뜻은 아니다.",
    answers: ["48"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12), 염색체 수 예시
  {
    id: 43,
    section: "종 구분과 염색체",
    prompt: "닭과 개는 체세포 염색체 수가 모두 __개이므로, 염색체 수만으로 종을 판단할 수 없다.",
    answers: ["78"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13), 상동염색체
  {
    id: 44,
    section: "사람의 염색체 구성",
    prompt: "사람의 체세포에서 모양과 크기가 같은 염색체가 2개씩 짝지어진 것은 __이다.",
    answers: ["상동염색체"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13), 상동염색체의 유래
  {
    id: 45,
    section: "사람의 염색체 구성",
    prompt: "상동염색체 한 쌍 중 하나는 __로부터, 다른 하나는 __로부터 물려받는다.",
    answers: ["아버지", "어머니"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13), 부모에게서 받는 염색체 수
  {
    id: 46,
    section: "사람의 염색체 구성",
    prompt: "사람은 부모에게서 염색체를 각각 __개씩 물려받는다.",
    answers: ["23"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13), 사람 체세포 염색체 수
  {
    id: 47,
    section: "사람의 염색체 구성",
    prompt: "사람의 체세포에는 염색체가 __개, 즉 __쌍 있다.",
    answers: ["46", "23"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13), 상염색체
  {
    id: 48,
    section: "사람의 염색체 구성",
    prompt: "암수가 공통으로 가지고 있으며 성결정과 관련이 없는 염색체는 __이다.",
    answers: ["상염색체"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13), 사람의 상염색체 수
  {
    id: 49,
    section: "사람의 염색체 구성",
    prompt: "사람의 체세포에는 상염색체가 __개, 즉 __쌍 있다.",
    answers: ["44", "22"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13), 성결정 관련 염색체
  {
    id: 50,
    section: "성결정 관련 구조",
    prompt: "성별에 따라 구성이 다르고 성결정에 관여하는 유전자가 위치한 염색체는 __이다.",
    answers: ["성염색체"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13), 사람의 성염색체 수
  {
    id: 51,
    section: "성결정 관련 구조",
    prompt: "사람의 체세포에는 성염색체가 __개, 즉 __쌍 있다.",
    answers: ["2", "1"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13), 사람 성염색체의 종류
  {
    id: 52,
    section: "성결정 관련 구조",
    prompt: "사람의 성염색체는 __와 __ 두 종류이다.",
    answers: ["X염색체", "Y염색체"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13), 성염색체 구성
  {
    id: 53,
    section: "성결정 관련 구조",
    prompt: "사람에서 여자의 성염색체 구성은 __, 남자의 성염색체 구성은 __이다.",
    answers: ["XX", "XY"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13), X와 Y의 상동염색체 간주 이유
  {
    id: 54,
    section: "성결정 관련 구조",
    prompt: "X염색체와 Y염색체는 모양과 크기가 다르지만 __에서 쌍을 이루어 접합하므로 상동염색체로 간주한다.",
    answers: ["생식세포 형성 과정"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13), 핵상
  {
    id: 55,
    section: "염색체 상대 수",
    prompt: "한 세포에 들어 있는 염색체의 구성을 __이라고 한다.",
    answers: ["핵상"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13), 핵상의 표시 기준
  {
    id: 56,
    section: "염색체 상대 수",
    prompt: "핵상은 염색체의 __로 나타낸다.",
    answers: ["상대적인 수"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13), 2n과 n
  {
    id: 57,
    section: "염색체 상대 수",
    prompt: "모든 염색체가 상동염색체 쌍을 이루면 __, 상동염색체 중 하나만 있으면 __으로 표시한다.",
    answers: ["2n", "n"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13), 2배체와 홑배수체
  {
    id: 58,
    section: "염색체 상대 수",
    prompt: "핵상이 2n인 세포를 __ 세포, 핵상이 n인 세포를 __ 세포라고 한다.",
    answers: ["2배체", "홑배수체"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13), 사람 생식세포
  {
    id: 59,
    section: "염색체 상대 수",
    prompt: "사람의 정자와 난자는 각각 __개의 염색체를 가진 __ 세포이다.",
    answers: ["23", "홑배수체"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13), 수정 후 핵상
  {
    id: 60,
    section: "염색체 상대 수",
    prompt: "사람의 정자와 난자는 수정 시 __가 된다.",
    answers: ["2배체"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13), 상동염색체 분리 결과
  {
    id: 61,
    section: "분리와 유전자 구성",
    prompt: "상동염색체가 분리되어 형성된 두 딸세포의 유전자 구성은 서로 __.",
    answers: ["다르다"],
    type: "single",
  },

  // 출처: PDF p.34(교재 p.14), 대립유전자
  {
    id: 62,
    section: "형질 결정 유전자",
    prompt: "상동염색체의 같은 위치에 있으면서 하나의 형질을 결정하는 유전자는 __이다.",
    answers: ["대립유전자"],
    type: "single",
  },

  // 출처: PDF p.34(교재 p.14), 대립유전자의 관계
  {
    id: 63,
    section: "형질 결정 유전자",
    prompt: "한 쌍의 상동염색체에서 같은 위치의 형질 결정 유전자는 서로 __ 수도 있고 __ 수도 있다.",
    answers: ["같을", "다를"],
    type: "multi",
  },

  // 출처: PDF p.34(교재 p.14), 동형접합성과 이형접합성
  {
    id: 64,
    section: "형질 결정 유전자",
    prompt: "쌍을 이루는 대립유전자가 서로 같으면 __, 서로 다르면 __이라고 한다.",
    answers: ["동형접합성", "이형접합성"],
    type: "multi",
  },

  // 출처: PDF p.34(교재 p.14), 염색분체
  {
    id: 65,
    section: "분열 전 구조",
    prompt: "세포분열 초기에 보이는 염색체의 두 가닥 각각은 __이다.",
    answers: ["염색분체"],
    type: "single",
  },

  // 출처: PDF p.34(교재 p.14), 중심절
  {
    id: 66,
    section: "분열 전 구조",
    prompt: "두 염색분체는 염색체의 잘록한 DNA 부위인 __에서 서로 연결되어 있다.",
    answers: ["중심절"],
    type: "single",
  },

  // 출처: PDF p.34(교재 p.14), 동원체
  {
    id: 67,
    section: "분열 전 구조",
    prompt: "세포분열 때 중심절에 붙고 방추사가 결합하는 단백질 복합체는 __이다.",
    answers: ["동원체", "kinetochore", "키네토코어"],
    type: "any",
  },

  // 출처: PDF p.34(교재 p.14), 염색분체 형성
  {
    id: 68,
    section: "분열 전 구조",
    prompt: "두 염색분체는 세포분열 전에 핵 속에서 __가 __되어 만들어진다.",
    answers: ["DNA", "복제"],
    type: "multi",
  },

  // 출처: PDF p.34(교재 p.14), 복제된 DNA와 응축
  {
    id: 69,
    section: "분열 전 구조",
    prompt: "복제된 DNA는 __과 결합한 뒤 __되어 염색분체로 나타난다.",
    answers: ["히스톤", "응축"],
    type: "multi",
  },

  // 출처: PDF p.34(교재 p.14), 염색분체 분리 결과
  {
    id: 70,
    section: "분열 전 구조",
    prompt: "염색분체는 세포분열 과정에서 분리되어 서로 다른 딸세포로 들어가며, 그 결과 두 딸세포의 유전정보는 서로 __.",
    answers: ["같다"],
    type: "single",
  },
];