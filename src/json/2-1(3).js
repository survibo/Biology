// 기준 자료: 업로드 PDF 「기말최종_compressed(7).pdf」 PDF p.30~34, 교재 p.10~14
// 자체 검토 반영: 기존 70문항과 중복 최소화, 정답 노출·type·answers 개수 점검

export const questions = [
  // 출처: PDF p.30(교재 p.10)
  {
    id: 71,
    section: "용어의 유래",
    prompt: "염색체라는 명칭은 그리스어에서 색을 뜻하는 __와 몸체를 뜻하는 __가 합쳐진 말에서 유래했다.",
    answers: ["chroma", "soma"],
    type: "multi",
  },

  // 출처: PDF p.30(교재 p.10)
  {
    id: 72,
    section: "관찰 특징",
    prompt: "특정 염색액에 의해 __되어 현미경으로 뚜렷하게 보이는 구조에 염색체라는 이름이 붙었다.",
    answers: ["염색"],
    type: "single",
  },

  // 출처: PDF p.30(교재 p.10)
  {
    id: 73,
    section: "세포 구조",
    prompt: "막으로 둘러싸인 유전정보 보관 구조와 세포 내 막성 구조물을 가진 세포는 __세포이며, 대표 구조는 __와 __이다.",
    answers: ["진핵", "핵", "세포소기관"],
    type: "multi",
  },

  // 출처: PDF p.30(교재 p.10)
  {
    id: 74,
    section: "생물 분류",
    prompt: "교재가 제시한 진핵생물의 예시는 __, __, __, __ 등이다.",
    answers: ["동물", "식물", "곰팡이", "원생생물"],
    type: "multi",
  },

  // 출처: PDF p.30(교재 p.10)
  {
    id: 75,
    section: "구조 변화",
    prompt: "세포가 분열하지 않을 때 염색체가 풀어져 있으면 여러 세포 기구가 DNA에 접근하여 __를 읽기 쉽다.",
    answers: ["유전정보"],
    type: "single",
  },

  // 출처: PDF p.30(교재 p.10)
  {
    id: 76,
    section: "구조 변화",
    prompt: "세포분열 때 염색체가 더 응축되는 것은 유전정보가 딸세포로 안정적으로 __되고 __되는 데 유리하다.",
    answers: ["분리", "이동"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 77,
    section: "핵산 구성",
    prompt: "DNA와 RNA를 이루는 기본 단위체는 __이다.",
    answers: ["뉴클레오타이드", "뉴클레오티드"],
    type: "any",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 78,
    section: "핵산 구성",
    prompt: "뉴클레오타이드에서 인산, 당, 염기는 __의 비율로 결합한다.",
    answers: ["1:1:1"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 79,
    section: "핵산 가닥",
    prompt: "폴리뉴클레오타이드 가닥은 한 단위체의 당과 다음 단위체의 __이 반복 연결되어 만들어진다.",
    answers: ["인산"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 80,
    section: "정보 저장",
    prompt: "DNA 이중나선 안쪽의 염기서열은 곧 생물이 저장한 __이다.",
    answers: ["유전정보"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 81,
    section: "형질 정보",
    prompt: "유전자는 형질 결정 정보가 저장된 특정 부위이며, 이 부위가 속한 물질은 __이다.",
    answers: ["DNA"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 82,
    section: "전체 정보",
    prompt: "단백질을 암호화하지 않더라도 기능이 아직 알려지지 않은 __도 유전체에 포함될 수 있다.",
    answers: ["염기서열"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 83,
    section: "전체 정보",
    prompt: "유전체에는 단백질 암호화 영역 외에도 __을 조절하는 영역이 포함된다.",
    answers: ["유전자발현"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 84,
    section: "핵산 구성",
    prompt: "뉴클레오타이드의 종류는 구성 성분 중 두 요소에 따라 달라지는데, 그 두 요소는 __와 __이다.",
    answers: ["당", "염기"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 85,
    section: "염기의 종류",
    prompt: "DNA에서 A, G, C, T는 각각 __, __, __, __의 약자이다.",
    answers: ["아데닌", "구아닌", "사이토신", "타이민"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 86,
    section: "염기의 종류",
    prompt: "RNA에서 A, G, C, U는 각각 __, __, __, __의 약자이다.",
    answers: ["아데닌", "구아닌", "사이토신", "유라실"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 87,
    section: "핵산 구성",
    prompt: "뉴클레오타이드의 당은 탄소 5개로 이루어진 __이다.",
    answers: ["단당류"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 88,
    section: "핵산 종류",
    prompt: "뉴클레오타이드가 반복 연결되어 만들어지는 대표적 핵산 두 종류는 __와 __이다.",
    answers: ["DNA", "RNA"],
    type: "multi",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 89,
    section: "입체 구조",
    prompt: "이중나선 바깥쪽에서 공유결합으로 이어진 구조는 __이다.",
    answers: ["당-인산 뼈대"],
    type: "single",
  },

  // 출처: PDF p.31(교재 p.11)
  {
    id: 90,
    section: "입체 구조",
    prompt: "두 가닥의 염기가 서로 맞아떨어지는 결합 관계는 __ 관계이다.",
    answers: ["상보적"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12)
  {
    id: 91,
    section: "종 비교",
    prompt: "사람 체세포 염색체 수는 유인원보다 __개 적다.",
    answers: ["2"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12)
  {
    id: 92,
    section: "종 비교",
    prompt: "교재에서 체세포 염색체 수가 48개인 유인원 예시로 든 세 동물은 __, __, __이다.",
    answers: ["침팬지", "고릴라", "오랑우탄"],
    type: "multi",
  },

  // 출처: PDF p.32(교재 p.12)
  {
    id: 93,
    section: "분석 기준",
    prompt: "핵형을 판단할 때 비교하는 염색체의 대표적인 외형적 요소 세 가지는 __, __, __이다.",
    answers: ["수", "크기", "모양"],
    type: "multi",
  },

  // 출처: PDF p.32(교재 p.12)
  {
    id: 94,
    section: "분석 기준",
    prompt: "같은 종이어도 이것이 다르면 핵형이 달라질 수 있다. 빈칸에 들어갈 요인은 __이다.",
    answers: ["성별"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12)
  {
    id: 95,
    section: "핵형 비교",
    prompt: "여성과 남성의 핵형 사진에서 상염색체는 같고 차이가 나는 염색체 종류는 __이다.",
    answers: ["성염색체"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12)
  {
    id: 96,
    section: "배열 기준",
    prompt: "핵형 배열에서 서로 짝지을 염색체를 고를 때 우선 비교하는 외형 기준은 __와 __이다.",
    answers: ["크기", "모양"],
    type: "multi",
  },

  // 출처: PDF p.32(교재 p.12)
  {
    id: 97,
    section: "염색체 수",
    prompt: "체세포 1개당 염색체 수가 8개인 생물로 제시된 것은 __이다.",
    answers: ["초파리"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12)
  {
    id: 98,
    section: "염색체 수",
    prompt: "체세포 1개당 염색체 수가 14개인 생물로 제시된 것은 __이다.",
    answers: ["완두"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12)
  {
    id: 99,
    section: "염색체 수",
    prompt: "체세포 1개당 염색체 수가 20개인 생물로 제시된 것은 __이다.",
    answers: ["옥수수"],
    type: "single",
  },

  // 출처: PDF p.32(교재 p.12)
  {
    id: 100,
    section: "염색체 수",
    prompt: "사람의 체세포 1개당 염색체 수는 __개이다.",
    answers: ["46"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 101,
    section: "염색체 짝",
    prompt: "상동염색체로 짝지으려면 두 염색체의 외형상 __와 __가 같아야 한다.",
    answers: ["모양", "크기"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 102,
    section: "염색체 짝",
    prompt: "사람 체세포에서 상동염색체는 같은 외형의 염색체가 __개씩 짝지어진 형태이다.",
    answers: ["2"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 103,
    section: "염색체 종류",
    prompt: "상염색체는 암수 모두가 __으로 가지는 염색체이다.",
    answers: ["공통"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 104,
    section: "염색체 종류",
    prompt: "성염색체에는 개체의 __에 관여하는 유전자가 위치한다.",
    answers: ["성결정"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 105,
    section: "염색체 종류",
    prompt: "사람의 X와 Y는 서로 다른 상동염색체로, 외형상 __와 __가 다르다.",
    answers: ["모양", "크기"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 106,
    section: "핵상",
    prompt: "부모에게서 받은 염색체가 쌍을 이루는 사람 체세포의 핵상 표기는 __이다.",
    answers: ["2n"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 107,
    section: "핵상",
    prompt: "교재 예시에서 (가)의 핵상은 2n=__, (나)의 핵상은 n=__으로 해석된다.",
    answers: ["6", "3"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 108,
    section: "핵상",
    prompt: "상동염색체 쌍을 이루지 않고 한 세트만 있는 세포의 핵상 표기는 __이다.",
    answers: ["n"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 109,
    section: "핵상",
    prompt: "사람의 체세포는 수정란과 같은 핵상을 가지므로 __ 세포에 해당한다.",
    answers: ["2배체"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 110,
    section: "핵상",
    prompt: "2배체 세포에서는 모든 염색체가 __을 이룬다.",
    answers: ["상동염색체 쌍"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 111,
    section: "성 결정 방식",
    prompt: "조류나 일부 어류와 곤충의 경우 암컷과 수컷의 성염색체 구성은 각각 __와 __이다.",
    answers: ["ZW", "ZZ"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 112,
    section: "성 결정 방식",
    prompt: "ZW 방식에서 W 염색체를 가진 개체는 보통 __이 된다.",
    answers: ["암컷"],
    type: "single",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 113,
    section: "성 결정 방식",
    prompt: "개미와 벌에서 수정된 알은 __, 수정되지 않은 알은 __으로 발생한다.",
    answers: ["암컷", "수컷"],
    type: "multi",
  },

  // 출처: PDF p.33(교재 p.13)
  {
    id: 114,
    section: "성 결정 방식",
    prompt: "일부 파충류나 어류에서 알 속 배아의 성별을 결정할 수 있는 환경 요인은 __이다.",
    answers: ["온도"],
    type: "single",
  },

  // 출처: PDF p.34(교재 p.14)
  {
    id: 115,
    section: "유전자 관계",
    prompt: "대립유전자는 상동염색체의 같은 __에 존재한다.",
    answers: ["위치"],
    type: "single",
  },

  // 출처: PDF p.34(교재 p.14)
  {
    id: 116,
    section: "유전자 관계",
    prompt: "자료의 예에서 혀 말기 가능 여부를 결정하는 한 쌍의 대립유전자 표기는 __와 __이다.",
    answers: ["A", "a"],
    type: "multi",
  },

  // 출처: PDF p.34(교재 p.14)
  {
    id: 117,
    section: "유전자 관계",
    prompt: "서로 다른 대립유전자가 함께 있는 이형접합성의 표기 예는 __이다.",
    answers: ["Aa"],
    type: "single",
  },

  // 출처: PDF p.34(교재 p.14)
  {
    id: 118,
    section: "세포분열 구조",
    prompt: "한 염색체를 이루는 두 염색분체는 염기서열이 같으므로 서로 같은 __를 가진다.",
    answers: ["유전정보"],
    type: "single",
  },

  // 출처: PDF p.34(교재 p.14)
  {
    id: 119,
    section: "세포분열 구조",
    prompt: "중심절은 염색분체를 연결하는 __ 부위이고, 동원체는 방추사가 결합하는 __ 복합체이다.",
    answers: ["DNA", "단백질"],
    type: "multi",
  },

  // 출처: PDF p.34(교재 p.14)
  {
    id: 120,
    section: "세포분열 구조",
    prompt: "세포분열 때 방추사가 직접 결합하는 중심절 부근의 구조는 __이다.",
    answers: ["동원체"],
    type: "single",
  },
];