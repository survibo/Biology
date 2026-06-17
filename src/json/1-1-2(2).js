// 자체 검토 완료: PDF 9~14페이지 범위만 사용했고, prompt 내 정답 직접 노출, type/answers 개수 오류, 중복·지엽 문항을 점검해 수정함.

export const questions = [
  // 출처: PDF p.9, 방어작용 정의
  {
    id: 1,
    section: "방어작용 개요",
    prompt: "병원체의 침입을 막거나 들어온 병원체를 제거하여 몸을 방어하는 작용을 __이라고 한다.",
    answers: ["면역"],
    type: "single",
  },
  // 출처: PDF p.9, 선천적 방어의 특징
  {
    id: 2,
    section: "방어작용 개요",
    prompt: "태어나면서부터 항상 기능하며 모든 병원체에 대해 동일한 방식으로 일어나는 방어작용은 __이다.",
    answers: ["선천면역", "비특이적 방어작용"],
    type: "any",
  },
  // 출처: PDF p.9, 후천적 방어의 특징
  {
    id: 3,
    section: "방어작용 개요",
    prompt: "태어난 뒤 병원체에 노출되면서 획득되며 특정 병원체에 선택적으로 작동하는 방어작용은 __이다.",
    answers: ["후천면역", "특이적 방어작용"],
    type: "any",
  },
  // 출처: PDF p.9, 면역의 구분
  {
    id: 4,
    section: "방어작용 개요",
    prompt: "면역은 크게 __과 __으로 구분할 수 있다.",
    answers: ["선천면역", "후천면역"],
    type: "multi",
  },
  // 출처: PDF p.9, 선천적 방어의 구성
  {
    id: 5,
    section: "방어작용 개요",
    prompt: "태어날 때부터 작동하는 방어는 병원체를 물리적으로 차단하는 __과 침입 후 제거하는 __으로 나뉜다.",
    answers: ["방어벽", "내부 방어"],
    type: "multi",
  },
  // 출처: PDF p.9, 후천적 방어의 구분
  {
    id: 6,
    section: "방어작용 개요",
    prompt: "항체 생성 중심의 반응인 __과 감염 세포 제거 중심의 __은 특정 병원체에 작동하는 방어에 속한다.",
    answers: ["체액성면역", "세포성면역"],
    type: "multi",
  },
  // 출처: PDF p.9, 피부의 역할
  {
    id: 7,
    section: "외부 장벽",
    prompt: "몸을 둘러싸고 있는 가장 넓은 물리적 장벽은 __이다.",
    answers: ["피부"],
    type: "single",
  },
  // 출처: PDF p.9, 피부 구조
  {
    id: 8,
    section: "외부 장벽",
    prompt: "피부 가장 바깥쪽에서 죽은 세포로 이루어져 외부 물질의 침입을 막는 층은 __이다.",
    answers: ["각질층"],
    type: "single",
  },
  // 출처: PDF p.9, 점막의 위치
  {
    id: 9,
    section: "외부 장벽",
    prompt: "눈, 콧속, 소화기관과 호흡기관의 내벽은 각질층 대신 __으로 덮여 있다.",
    answers: ["점막"],
    type: "single",
  },
  // 출처: PDF p.9, 점막 분비물의 기능
  {
    id: 10,
    section: "외부 장벽",
    prompt: "점막에서 분비되어 미생물이나 작은 입자를 잡아 가두는 끈끈한 물질은 __이다.",
    answers: ["점액"],
    type: "single",
  },
  // 출처: PDF p.9, 숨관가지 상피세포의 작용
  {
    id: 11,
    section: "외부 장벽",
    prompt: "숨관가지 상피세포는 __를 움직여 갇힌 미생물을 밖으로 내보낸다.",
    answers: ["섬모"],
    type: "single",
  },
  // 출처: PDF p.9, 분비물에 의한 방어
  {
    id: 12,
    section: "외부 장벽",
    prompt: "미생물을 씻어 내어 세균 증식을 막는 분비물에는 __, __, __이 있다.",
    answers: ["눈물", "침", "점액 분비물"],
    type: "multi",
  },
  // 출처: PDF p.9, 라이소자임의 기능
  {
    id: 13,
    section: "외부 장벽",
    prompt: "세균의 세포벽을 분해하여 세균을 터뜨리는 물질은 __이다.",
    answers: ["라이소자임"],
    type: "single",
  },
  // 출처: PDF p.9, 위 점막의 방어
  {
    id: 14,
    section: "외부 장벽",
    prompt: "위 안쪽 점막에서 분비되어 음식물과 함께 들어온 병원체를 제거하는 강한 산성 물질은 __이다.",
    answers: ["위산"],
    type: "single",
  },
  // 출처: PDF p.9, 산성 분비물의 출처
  {
    id: 15,
    section: "외부 장벽",
    prompt: "세균 증식을 억제하는 산성 분비물은 __과 __에서 나온다.",
    answers: ["피지샘", "땀샘"],
    type: "multi",
  },
  // 출처: PDF p.10, 체내 침입 후 방어
  {
    id: 16,
    section: "내부 반응",
    prompt: "피부나 점막이 손상된 뒤 몸속으로 들어온 병원체를 제거하는 방어는 __이다.",
    answers: ["내부 방어"],
    type: "single",
  },
  // 출처: PDF p.10, 내부 방어의 과정
  {
    id: 17,
    section: "내부 반응",
    prompt: "피부나 점막 손상 후 몸속 병원체 제거에는 __과 __이 일어난다.",
    answers: ["식세포작용", "염증 반응"],
    type: "multi",
  },
  // 출처: PDF p.10, 식세포작용 정의
  {
    id: 18,
    section: "내부 반응",
    prompt: "세포가 병원체를 잡아 내부에서 분해하는 과정은 __이다.",
    answers: ["식세포작용", "식균작용"],
    type: "any",
  },
  // 출처: PDF p.10, 식세포작용의 구조
  {
    id: 19,
    section: "내부 반응",
    prompt: "병원체를 감싸 형성되는 주머니와, 그 주머니와 융합해 분해 효소를 제공하는 세포소기관은 각각 __, __이다.",
    answers: ["식포", "라이소솜"],
    type: "multi",
  },
  // 출처: PDF p.10, 식세포작용을 하는 세포
  {
    id: 20,
    section: "내부 반응",
    prompt: "병원체를 감싸 안아 분해하는 대표적 백혈구는 __와 __이다.",
    answers: ["큰포식세포", "호중구"],
    type: "multi",
  },
  // 출처: PDF p.10, 후천적 방어와의 연결
  {
    id: 21,
    section: "내부 반응",
    prompt: "분해된 병원체 정보를 세포 표면에 드러내 림프구가 인식하게 하는 과정은 __이다.",
    answers: ["항원 제시"],
    type: "single",
  },
  // 출처: PDF p.10, 자연 살해 세포 설명
  {
    id: 22,
    section: "내부 반응",
    prompt: "바이러스 감염 세포와 암세포를 공격하는 림프구의 일종은 __이다.",
    answers: ["자연 살해 세포", "NK cell", "Natural Killer cell"],
    type: "any",
  },
  // 출처: PDF p.10, 호중구의 이동과 기능
  {
    id: 23,
    section: "내부 반응",
    prompt: "혈액을 따라 이동하다가 감염 부위로 가서 병원체를 잡아먹는 백혈구는 __이다.",
    answers: ["호중구"],
    type: "single",
  },
  // 출처: PDF p.10, 장내 미생물의 방어
  {
    id: 24,
    section: "내부 반응",
    prompt: "장 속에 살고 있는 미생물은 병원체와 __하여 병원체 성장을 억제한다.",
    answers: ["경쟁"],
    type: "single",
  },
  // 출처: PDF p.10, 호흡기관 표면의 방어
  {
    id: 25,
    section: "외부 장벽",
    prompt: "콧속과 숨관가지 표면에서 호흡 중 들어오는 병원체를 붙잡거나 내보내는 요소는 __, __, __이다.",
    answers: ["털", "섬모", "점액"],
    type: "multi",
  },
  // 출처: PDF p.10~11, 염증의 정의
  {
    id: 26,
    section: "내부 반응",
    prompt: "감염 부위가 붉어지고 열이 나며 부어오르는 반응은 __이다.",
    answers: ["염증"],
    type: "single",
  },
  // 출처: PDF p.10~11, 염증 반응의 신호 물질
  {
    id: 27,
    section: "내부 반응",
    prompt: "상처 부위의 손상 세포와 면역 세포가 분비하여 염증 진행에 관여하는 주요 화학 신호 물질은 __과 __이다.",
    answers: ["사이토카인", "히스타민"],
    type: "multi",
  },
  // 출처: PDF p.10~11, 고름의 구성
  {
    id: 28,
    section: "내부 반응",
    prompt: "상처 부위에 모여 고름을 이루는 주요 성분은 __, __, __이다.",
    answers: ["백혈구", "죽은 병원체", "세포 잔해"],
    type: "multi",
  },
  // 출처: PDF p.10~11, 고름의 제거
  {
    id: 29,
    section: "내부 반응",
    prompt: "고름은 이후 __으로 흡수되어 제거된다.",
    answers: ["림프액"],
    type: "single",
  },
  // 출처: PDF p.10~11, 급성 염증
  {
    id: 30,
    section: "내부 반응",
    prompt: "부상 후 감염 예방 과정으로 며칠 동안 지속되는 짧은 반응은 __이다.",
    answers: ["급성 염증"],
    type: "single",
  },
  // 출처: PDF p.10~11, 만성 염증
  {
    id: 31,
    section: "내부 반응",
    prompt: "병원체나 독소가 계속 존재하여 몇 달 또는 몇 년 지속될 수 있는 장기 반응은 __이다.",
    answers: ["만성 염증"],
    type: "single",
  },
  // 출처: PDF p.10~11, 패혈증
  {
    id: 32,
    section: "내부 반응",
    prompt: "심각한 조직 손상이나 감염으로 전신 염증 반응을 보이는 증상은 __이다.",
    answers: ["패혈증"],
    type: "single",
  },
  // 출처: PDF p.10~11, 패혈증의 특징
  {
    id: 33,
    section: "내부 반응",
    prompt: "패혈증은 심한 __, __, __를 동반해 생명을 위협할 수 있다.",
    answers: ["고열", "저혈압", "혈액 순환 장애"],
    type: "multi",
  },
  // 출처: PDF p.11, 후천적 방어의 핵심 세포
  {
    id: 34,
    section: "면역 세포",
    prompt: "후천적 방어에서 핵심 역할을 하는 백혈구 계열의 면역 세포는 __이다.",
    answers: ["림프구"],
    type: "single",
  },
  // 출처: PDF p.11, 후천적 방어의 특성
  {
    id: 35,
    section: "면역 세포",
    prompt: "후천적 방어는 이전에 들어온 병원체를 __하고 __하는 특성이 있다.",
    answers: ["기억", "인식"],
    type: "multi",
  },
  // 출처: PDF p.11, 림프구 생성
  {
    id: 36,
    section: "면역 세포",
    prompt: "림프구는 __에서 생성된다.",
    answers: ["골수"],
    type: "single",
  },
  // 출처: PDF p.11, 림프구 성숙 장소
  {
    id: 37,
    section: "면역 세포",
    prompt: "골수에 남아 성숙하는 림프구와 가슴샘에서 성숙하는 림프구는 각각 __, __이다.",
    answers: ["B림프구", "T림프구"],
    type: "multi",
  },
  // 출처: PDF p.11, 림프구 수용체
  {
    id: 38,
    section: "면역 세포",
    prompt: "성숙한 림프구 세포막에는 병원체를 구별하게 하는 __가 있다.",
    answers: ["항원 수용체"],
    type: "single",
  },
  // 출처: PDF p.11, B계열 림프구의 분화
  {
    id: 39,
    section: "면역 세포",
    prompt: "B계열 림프구는 항체를 만드는 __와 정보를 오래 유지하는 __로 분화한다.",
    answers: ["형질세포", "기억세포"],
    type: "multi",
  },
  // 출처: PDF p.11, T계열 림프구의 분화
  {
    id: 40,
    section: "면역 세포",
    prompt: "T계열 림프구는 다른 세포의 활성화를 돕는 __와 감염 세포를 제거하는 __로 분화한다.",
    answers: ["보조 T림프구", "세포독성 T림프구"],
    type: "multi",
  },
  // 출처: PDF p.12, 항원의 정의
  {
    id: 41,
    section: "특이적 반응",
    prompt: "우리 몸에 침입하여 B계열 또는 T계열 림프구의 반응을 유발하는 물질은 __이다.",
    answers: ["항원"],
    type: "single",
  },
  // 출처: PDF p.12, 항원으로 작용할 수 있는 물질
  {
    id: 42,
    section: "특이적 반응",
    prompt: "병원체 외에도 __, __, __ 등은 면역 세포의 반응을 유발하는 물질로 작용할 수 있다.",
    answers: ["먼지", "꽃가루", "독성 물질"],
    type: "multi",
  },
  // 출처: PDF p.12, 항원 결정 부위
  {
    id: 43,
    section: "특이적 반응",
    prompt: "항체와 결합하는 항원의 특정 부위는 __이다.",
    answers: ["항원 결정 부위"],
    type: "single",
  },
  // 출처: PDF p.12, 항체의 정의
  {
    id: 44,
    section: "특이적 반응",
    prompt: "항원에 대항하여 만들어지는 단백질은 __이다.",
    answers: ["항체"],
    type: "single",
  },
  // 출처: PDF p.12, 항체의 주성분
  {
    id: 45,
    section: "특이적 반응",
    prompt: "항체의 주성분은 __이다.",
    answers: ["감마 글로불린", "γ 글로불린", "γ-글로불린"],
    type: "any",
  },
  // 출처: PDF p.12, 항체의 다른 이름
  {
    id: 46,
    section: "특이적 반응",
    prompt: "항체의 다른 이름은 __이다.",
    answers: ["면역글로불린", "Ig", "Immunoglobulin"],
    type: "any",
  },
  // 출처: PDF p.12, 항체 분비 세포 계열
  {
    id: 47,
    section: "특이적 반응",
    prompt: "활성화되면 항체를 분비하는 림프구 계열은 __이다.",
    answers: ["B림프구"],
    type: "single",
  },
  // 출처: PDF p.12, 항체와 항원의 결합
  {
    id: 48,
    section: "특이적 반응",
    prompt: "분비된 항체는 체액에 있는 __과 결합한다.",
    answers: ["항원"],
    type: "single",
  },
  // 출처: PDF p.12, 단일 B계열 림프구가 만드는 항체
  {
    id: 49,
    section: "특이적 반응",
    prompt: "단일 B계열 림프구에서 분비되는 항체는 같은 __를 인식한다.",
    answers: ["항원 결정 부위"],
    type: "single",
  },
  // 출처: PDF p.13, 후천적 방어의 시작
  {
    id: 50,
    section: "특이적 반응",
    prompt: "후천적 방어가 시작되는 첫 단계는 림프구가 __을 인식하는 것이다.",
    answers: ["항원"],
    type: "single",
  },
  // 출처: PDF p.13, 큰포식세포의 연결 역할
  {
    id: 51,
    section: "특이적 반응",
    prompt: "큰포식세포의 병원체 분해 과정은 병원체 제거와 함께 침입 병원체의 __를 제공해 후천적 방어 시작을 돕는다.",
    answers: ["정보"],
    type: "single",
  },
  // 출처: PDF p.13, 세포성면역 정의
  {
    id: 52,
    section: "특이적 반응",
    prompt: "보조 T계열 림프구의 신호로 활성화된 세포가 감염 세포·손상 세포·암세포를 직접 공격하는 반응은 __이다.",
    answers: ["세포성면역"],
    type: "single",
  },
  // 출처: PDF p.13, 세포성면역의 실행 세포
  {
    id: 53,
    section: "특이적 반응",
    prompt: "감염 세포 등을 직접 공격하는 세포는 보조 T계열 림프구의 신호로 활성화된 __이다.",
    answers: ["세포독성 T림프구"],
    type: "single",
  },
  // 출처: PDF p.13, 체액성면역 정의
  {
    id: 54,
    section: "특이적 반응",
    prompt: "형질세포에서 만들어진 항체로 항원을 제거하는 반응은 __이다.",
    answers: ["체액성면역"],
    type: "single",
  },
  // 출처: PDF p.13, 림프절에서의 항원 인식
  {
    id: 55,
    section: "특이적 반응",
    prompt: "큰포식세포가 항원을 제시한 뒤 이동하여 보조 T계열 림프구와 만나는 주요 장소는 __이다.",
    answers: ["림프절"],
    type: "single",
  },
  // 출처: PDF p.14, 항체 기능
  {
    id: 56,
    section: "특이적 반응",
    prompt: "혈장 단백질 중 병원체 세포막에 구멍을 만들어 파괴를 유도하는 것은 __이다.",
    answers: ["보체 단백질"],
    type: "single",
  },
  // 출처: PDF p.13, 보조 T계열 림프구 활성화
  {
    id: 57,
    section: "특이적 반응",
    prompt: "항원을 제시한 큰포식세포가 보조 T계열 림프구를 활성화하고 증식시키기 위해 분비하는 신호 물질은 __이다.",
    answers: ["사이토카인"],
    type: "single",
  },
  // 출처: PDF p.13, 보조 T계열 림프구의 역할
  {
    id: 58,
    section: "특이적 반응",
    prompt: "활성화된 보조 T계열 림프구는 같은 항원에 반응하는 __와 __의 활성화를 돕는다.",
    answers: ["B림프구", "세포독성 T림프구"],
    type: "multi",
  },
  // 출처: PDF p.13, 감염 세포 제거 방식
  {
    id: 59,
    section: "특이적 반응",
    prompt: "감염된 세포를 공격하는 T계열 림프구는 세포막에 구멍을 내고 __을 유도한다.",
    answers: ["세포 자살"],
    type: "single",
  },
  // 출처: PDF p.13, 형질세포의 특징
  {
    id: 60,
    section: "특이적 반응",
    prompt: "항체를 대량으로 생산·분비하여 소포체와 골지체가 발달한 세포는 __이다.",
    answers: ["형질세포"],
    type: "single",
  },
  // 출처: PDF p.13, B계열 림프구의 항원 제시
  {
    id: 61,
    section: "특이적 반응",
    prompt: "B계열 림프구의 수용체는 항원과 직접 결합할 수 있으며, 이 세포도 항원을 제시하는 __ 중 하나이다.",
    answers: ["항원 제시 세포"],
    type: "single",
  },
  // 출처: PDF p.14, 항체의 결합 특성
  {
    id: 62,
    section: "특이적 반응",
    prompt: "형질세포가 분비한 항체는 항원에 __ 결합하여 병원체를 무력화한다.",
    answers: ["특이적으로"],
    type: "single",
  },
  // 출처: PDF p.14, 기억세포의 역할
  {
    id: 63,
    section: "면역 기억",
    prompt: "기억을 담당하는 세포는 같은 항원이 다시 침입했을 때 빠르게 __로 분화하여 항체 생성을 돕는다.",
    answers: ["형질세포"],
    type: "single",
  },
  // 출처: PDF p.14, 능동면역 정의
  {
    id: 64,
    section: "면역 기억",
    prompt: "항원 노출 뒤 몸이 스스로 항체를 생산하는 면역은 __이다.",
    answers: ["능동면역"],
    type: "single",
  },
  // 출처: PDF p.14, 수동면역 정의
  {
    id: 65,
    section: "면역 기억",
    prompt: "항체를 다른 개체로부터 얻으며 기억세포를 만들지 않는 면역은 __이다.",
    answers: ["수동면역"],
    type: "single",
  },
  // 출처: PDF p.14, 능동면역의 구분
  {
    id: 66,
    section: "면역 기억",
    prompt: "질병을 겪어 생기는 것은 __ 능동면역이고, 백신으로 유도되는 것은 __ 능동면역이다.",
    answers: ["자연적", "인공적"],
    type: "multi",
  },
  // 출처: PDF p.14, 능동면역의 원인
  {
    id: 67,
    section: "면역 기억",
    prompt: "자연적 능동면역은 __에 의해, 인공적 능동면역은 __에 의해 만들어질 수 있다.",
    answers: ["질병", "백신"],
    type: "multi",
  },
  // 출처: PDF p.14, 수동면역의 예
  {
    id: 68,
    section: "면역 기억",
    prompt: "모체의 항체가 태아에게 전달되는 통로와, 뱀 독소 치료에 주사할 수 있는 항체 포함 성분은 각각 __, __이다.",
    answers: ["태반", "혈장"],
    type: "multi",
  },
  // 출처: PDF p.14, 클론 선택
  {
    id: 69,
    section: "면역 기억",
    prompt: "수용체가 서로 다른 여러 B계열 림프구 중 항원과 결합 가능한 세포만 선택되어 증식하는 과정은 __이다.",
    answers: ["클론 선택"],
    type: "single",
  },
  // 출처: PDF p.14, 항체 기능
  {
    id: 70,
    section: "면역 기억",
    prompt: "항체는 병원체를 감싸거나 응집·침전시켜 큰포식세포나 호중구의 __을 촉진한다.",
    answers: ["식세포작용", "식균작용"],
    type: "any",
  },
];