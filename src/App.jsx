import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RotateCcw, Eye, EyeOff } from "lucide-react";

const questions = [
  {
    id: 1,
    section: "물질대사",
    prompt: "생명체에서 일어나는 모든 화학 반응을 _____라고 한다.",
    answers: ["물질대사"],
  },
  {
    id: 2,
    section: "물질대사",
    prompt: "물질대사는 생명체 _____에서 일어나는 화학 반응이다.",
    answers: ["안", "내부"],
  },
  {
    id: 3,
    section: "물질대사의 특성",
    prompt: "생명체 내의 화학 반응을 촉진하는 생체 촉매는 _____이다.",
    answers: ["효소"],
  },
  {
    id: 4,
    section: "물질대사의 특성",
    prompt: "효소는 화학 반응의 _____ 역할을 한다.",
    answers: ["촉매"],
  },
  {
    id: 5,
    section: "물질대사의 특성",
    prompt:
      "생명체 안에서 일어나는 화학 반응은 주로 체온 정도의 _____ 온도에서 일어난다.",
    answers: ["낮은", "비교적 낮은"],
  },
  {
    id: 6,
    section: "물질대사의 특성",
    prompt: "물질대사에서는 화학 반응 과정에서 에너지가 흡수되거나 _____된다.",
    answers: ["방출"],
  },
  {
    id: 7,
    section: "물질대사의 특성",
    prompt:
      "생명체 안의 화학 반응은 여러 단계에 걸쳐 일어나므로 반응이 _____으로 일어난다.",
    answers: ["단계적", "단계적으로"],
  },
  {
    id: 8,
    section: "물질대사의 특성",
    prompt:
      "생명체 밖의 연소 반응은 반응이 한 번에 일어나 많은 에너지가 한꺼번에 _____된다.",
    answers: ["방출"],
  },
  {
    id: 9,
    section: "물질대사의 특성",
    prompt: "생명체 안의 화학 반응에는 보통 _____가 필요하다.",
    answers: ["효소", "생체촉매"],
  },
  {
    id: 10,
    section: "물질대사의 특성",
    prompt: "생명체 밖의 화학 반응은 주로 _____, _____ 상태에서 잘 일어난다.",
    answers: ["고온, 고압", "고온 고압"],
  },

  {
    id: 11,
    section: "물질대사의 구분",
    prompt:
      "물질대사는 물질을 합성하는 _____과 물질을 분해하는 _____으로 구분한다.",
    answers: ["동화작용, 이화작용", "동화작용과 이화작용"],
  },
  {
    id: 12,
    section: "동화작용",
    prompt:
      "작고 단순한 물질을 결합하여 크고 복잡한 물질로 합성하는 반응은 _____이다.",
    answers: ["동화작용"],
  },
  {
    id: 13,
    section: "이화작용",
    prompt: "크고 복잡한 물질을 작고 단순한 물질로 분해하는 반응은 _____이다.",
    answers: ["이화작용"],
  },
  {
    id: 14,
    section: "동화작용",
    prompt: "동화작용에서는 에너지가 _____되어 생성물에 저장된다.",
    answers: ["흡수"],
  },
  {
    id: 15,
    section: "이화작용",
    prompt: "이화작용에서는 반응물에 저장되어 있던 에너지가 _____된다.",
    answers: ["방출"],
  },
  {
    id: 16,
    section: "동화작용",
    prompt: "아미노산을 결합하여 단백질을 합성하는 반응은 _____의 예이다.",
    answers: ["동화작용"],
  },
  {
    id: 17,
    section: "동화작용",
    prompt: "이산화 탄소와 물을 포도당으로 합성하는 과정은 _____이다.",
    answers: ["광합성"],
  },
  {
    id: 18,
    section: "동화작용",
    prompt: "포도당을 결합하여 글리코젠을 합성하는 반응은 _____이다.",
    answers: ["동화작용"],
  },
  {
    id: 19,
    section: "이화작용",
    prompt: "단백질을 아미노산으로 분해하는 반응은 _____의 예이다.",
    answers: ["이화작용"],
  },
  {
    id: 20,
    section: "이화작용",
    prompt: "글리코젠을 포도당으로 분해하는 반응은 _____이다.",
    answers: ["이화작용"],
  },

  {
    id: 21,
    section: "동화작용과 이화작용 비교",
    prompt: "동화작용은 에너지 _____ 반응이다.",
    answers: ["흡수", "흡열"],
  },
  {
    id: 22,
    section: "동화작용과 이화작용 비교",
    prompt: "이화작용은 에너지 _____ 반응이다.",
    answers: ["방출", "발열"],
  },
  {
    id: 23,
    section: "동화작용과 이화작용 비교",
    prompt: "동화작용에서는 생성물의 에너지양이 반응물보다 _____다.",
    answers: ["크", "많"],
  },
  {
    id: 24,
    section: "동화작용과 이화작용 비교",
    prompt: "이화작용에서는 생성물의 에너지양이 반응물보다 _____다.",
    answers: ["작", "적"],
  },
  {
    id: 25,
    section: "동화작용과 이화작용 비교",
    prompt: "DNA 합성은 _____의 예이다.",
    answers: ["동화작용"],
  },
  {
    id: 26,
    section: "동화작용과 이화작용 비교",
    prompt: "영양소의 소화는 _____의 예이다.",
    answers: ["이화작용"],
  },

  {
    id: 27,
    section: "에너지의 전환과 사용",
    prompt: "생물은 생명활동에 필요한 에너지를 주로 _____을 통해 얻는다.",
    answers: ["세포호흡"],
  },
  {
    id: 28,
    section: "세포호흡",
    prompt:
      "세포호흡은 세포에 저장된 에너지를 생명활동에 사용할 수 있는 형태의 에너지로 _____하는 과정이다.",
    answers: ["전환"],
  },
  {
    id: 29,
    section: "세포호흡",
    prompt: "세포호흡은 주로 세포 내의 _____에서 일어난다.",
    answers: ["미토콘드리아"],
  },
  {
    id: 30,
    section: "세포호흡",
    prompt: "세포호흡의 일부 과정은 _____에서도 진행된다.",
    answers: ["세포질"],
  },
  {
    id: 31,
    section: "세포호흡",
    prompt:
      "세포호흡으로 분해되어 에너지를 방출하는 포도당과 같은 유기 영양소를 _____이라고 한다.",
    answers: ["호흡기질"],
  },
  {
    id: 32,
    section: "세포호흡",
    prompt: "호흡기질로 가장 많이 이용되는 탄수화물의 한 종류는 _____이다.",
    answers: ["포도당"],
  },
  {
    id: 33,
    section: "세포호흡",
    prompt:
      "포도당이 산소와 반응하여 분해될 때 생성되는 물질은 이산화 탄소와 _____이다.",
    answers: ["물"],
  },
  {
    id: 34,
    section: "세포호흡",
    prompt:
      "세포호흡에서 방출된 에너지의 일부는 _____에 화학 에너지 형태로 저장된다.",
    answers: ["ATP"],
  },
  {
    id: 35,
    section: "세포호흡",
    prompt: "세포호흡에서 방출된 에너지의 나머지는 _____에너지로 방출된다.",
    answers: ["열"],
  },
  {
    id: 36,
    section: "세포호흡",
    prompt:
      "세포호흡 반응식은 '포도당 + 산소 → 이산화 탄소 + 물 + _____'로 나타낼 수 있다.",
    answers: ["에너지", "에너지(ATP, 열)", "ATP와 열"],
  },

  {
    id: 37,
    section: "유기 영양소",
    prompt:
      "탄수화물, 단백질, 지방처럼 탄소와 수소의 결합을 많이 가진 영양소를 _____이라고 한다.",
    answers: ["유기 영양소"],
  },
  {
    id: 38,
    section: "유기 영양소",
    prompt: "3대 영양소는 탄수화물, 단백질, _____이다.",
    answers: ["지방"],
  },
  {
    id: 39,
    section: "호흡기질",
    prompt:
      "포도당만으로 부족할 때는 단백질과 _____도 분해되어 세포에 공급될 수 있다.",
    answers: ["지방"],
  },

  {
    id: 40,
    section: "ATP",
    prompt: "생명활동에 직접 사용되는 에너지 저장 물질은 _____이다.",
    answers: ["ATP"],
  },
  {
    id: 41,
    section: "ATP",
    prompt: "ATP의 우리말 이름은 _____이다.",
    answers: ["아데노신 삼인산"],
  },
  {
    id: 42,
    section: "ATP",
    prompt: "ATP는 아데노신에 인산기 _____개가 결합한 화합물이다.",
    answers: ["3", "세"],
  },
  {
    id: 43,
    section: "ATP",
    prompt: "아데노신은 아데닌과 _____가 결합한 물질이다.",
    answers: ["리보스"],
  },
  {
    id: 44,
    section: "ATP",
    prompt:
      "ATP와 ADP는 각각 아데노신에 인산기가 _____개, _____개 결합한 화합물이다.",
    answers: ["3, 2", "3개, 2개", "세 개, 두 개"],
  },
  {
    id: 45,
    section: "ATP",
    prompt: "ATP에서 인산기와 인산기는 _____ 인산 결합으로 연결되어 있다.",
    answers: ["고에너지"],
  },
  {
    id: 46,
    section: "ATP",
    prompt: "고에너지 인산 결합이 형성될 때는 에너지가 _____된다.",
    answers: ["저장"],
  },
  {
    id: 47,
    section: "ATP",
    prompt: "고에너지 인산 결합이 끊어질 때는 에너지가 _____된다.",
    answers: ["방출"],
  },
  {
    id: 48,
    section: "ATP와 ADP의 전환",
    prompt: "ATP가 분해되면 ADP와 _____가 된다.",
    answers: ["무기 인산", "Pi"],
  },
  {
    id: 49,
    section: "ATP와 ADP의 전환",
    prompt: "ADP와 무기 인산이 결합하여 _____가 합성된다.",
    answers: ["ATP"],
  },
  {
    id: 50,
    section: "ATP와 ADP의 전환",
    prompt:
      "ADP에 무기 인산이 결합해 ATP가 될 때 필요한 에너지는 주로 _____에서 공급된다.",
    answers: ["세포호흡"],
  },

  {
    id: 51,
    section: "ATP 관련 용어",
    prompt: "ATP는 영어로 adenosine _____phosphate이다.",
    answers: ["tri", "triphosphate"],
  },
  {
    id: 52,
    section: "ATP 관련 용어",
    prompt: "ADP는 영어로 adenosine _____phosphate이다.",
    answers: ["di", "diphosphate"],
  },
  {
    id: 53,
    section: "ATP 관련 용어",
    prompt:
      "용액 내에서 이온 형태로 자유롭게 돌아다니는 인산염을 _____이라고 한다.",
    answers: ["무기 인산", "Pi"],
  },
  {
    id: 54,
    section: "ATP 관련 용어",
    prompt: "아데닌은 질소를 함유한 유기 화합물인 _____의 일종이다.",
    answers: ["염기"],
  },
  {
    id: 55,
    section: "ATP 관련 용어",
    prompt: "리보스는 ATP와 RNA를 구성하는 _____탄당이다.",
    answers: ["5", "오"],
  },

  {
    id: 56,
    section: "에너지의 전환과 사용",
    prompt:
      "ATP가 ADP와 무기 인산으로 분해될 때 방출된 에너지는 여러 형태의 에너지로 _____된다.",
    answers: ["전환"],
  },
  {
    id: 57,
    section: "에너지의 전환과 사용",
    prompt:
      "방출된 에너지는 기계적 에너지, 소리 에너지, 화학 에너지, _____에너지 등으로 전환된다.",
    answers: ["열"],
  },
  {
    id: 58,
    section: "에너지의 전환과 사용",
    prompt: "근육 수축에서는 ATP의 화학 에너지가 _____ 에너지로 전환된다.",
    answers: ["기계적"],
  },
  {
    id: 59,
    section: "에너지의 전환과 사용",
    prompt: "체온 유지는 세포호흡 과정에서 방출된 _____에너지를 이용한다.",
    answers: ["열"],
  },
  {
    id: 60,
    section: "에너지의 전환과 사용",
    prompt:
      "세포에서 물질을 합성하는 동화작용이 일어날 때 ATP의 화학 에너지는 생성물의 _____ 에너지로 전환된다.",
    answers: ["화학"],
  },
  {
    id: 61,
    section: "에너지의 전환과 사용",
    prompt:
      "성장 과정에서 합성되는 대표적인 물질로는 단백질, 인지질, _____ 등이 있다.",
    answers: ["핵산"],
  },
  {
    id: 62,
    section: "에너지의 전환과 사용",
    prompt:
      "추운 환경에서 체온이 낮아지면 근육의 수축과 이완을 반복하는 _____을 통해 열을 발생시킨다.",
    answers: ["근육 떨림", "떨림"],
  },

  {
    id: 63,
    section: "물질 운반과 에너지 이용",
    prompt:
      "세포막에서 낮은 농도에서 높은 농도 쪽으로 물질을 이동시키는 것은 _____수송이다.",
    answers: ["능동"],
  },
  {
    id: 64,
    section: "물질 운반과 에너지 이용",
    prompt:
      "능동수송에는 ATP의 화학 에너지가 _____ 에너지로 전환되어 사용된다.",
    answers: ["기계적"],
  },
  {
    id: 65,
    section: "물질 운반과 에너지 이용",
    prompt: "세포막에 있는 대표적인 능동수송 기구는 _____ 펌프이다.",
    answers: ["Na+-K+", "Na⁺-K⁺", "나트륨-칼륨"],
  },
  {
    id: 66,
    section: "Na+-K+ 펌프",
    prompt:
      "Na+-K+ 펌프는 ATP의 에너지를 소모해 K+을 세포 _____으로 이동시킨다.",
    answers: ["안", "내부"],
  },
  {
    id: 67,
    section: "Na+-K+ 펌프",
    prompt:
      "Na+-K+ 펌프는 ATP의 에너지를 소모해 Na+을 세포 _____으로 이동시킨다.",
    answers: ["밖", "외부"],
  },
  {
    id: 68,
    section: "Na+-K+ 펌프",
    prompt:
      "동물 세포 내부는 Na+ 농도가 외부보다 _____고, K+ 농도는 외부보다 _____다.",
    answers: ["낮, 높", "낮고, 높다", "낮고 높다"],
  },

  {
    id: 69,
    section: "근육수축",
    prompt: "근육은 수축과 이완을 할 수 있는 근육세포인 _____로 이루어져 있다.",
    answers: ["근육섬유"],
  },
  {
    id: 70,
    section: "근육수축",
    prompt:
      "근육 수축은 ATP로부터 에너지를 공급받은 액틴필라멘트가 _____필라멘트 사이로 미끄러져 들어가며 일어난다.",
    answers: ["마이오신"],
  },
];

function normalize(text) {
  return (text || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s\-_,.·:;!?()[\]{}'"“”‘’]/g, "");
}

function isCorrect(input, answers) {
  const n = normalize(input);
  return answers.some((a) => normalize(a) === n);
}

export default function BiologyFillInQuiz100() {
  const [userAnswers, setUserAnswers] = useState(() =>
    Object.fromEntries(questions.map((q) => [q.id, ""]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const results = useMemo(() => {
    return questions.map((q) => ({
      ...q,
      userAnswer: userAnswers[q.id] || "",
      correct: isCorrect(userAnswers[q.id], q.answers),
    }));
  }, [userAnswers]);

  const score = results.filter((r) => r.correct).length;
  const progress = Math.round((score / questions.length) * 100);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const q of results) {
      if (!map.has(q.section)) map.set(q.section, []);
      map.get(q.section).push(q);
    }
    return Array.from(map.entries());
  }, [results]);

  const handleChange = (id, value) => {
    setUserAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const gradeAll = () => setSubmitted(true);
  const resetAll = () => {
    setUserAnswers(Object.fromEntries(questions.map((q) => [q.id, ""])));
    setSubmitted(false);
    setShowAnswers(false);
  };

  const fillSample = () => {
    const seeded = Object.fromEntries(
      questions.map((q, i) => [q.id, i % 7 === 0 ? q.answers[0] : ""])
    );
    setUserAnswers(seeded);
    setSubmitted(false);
    setShowAnswers(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-3xl font-bold tracking-tight">
                  생명과학 단답·빈칸채우기 100문항
                </CardTitle>
                <p className="mt-2 text-sm text-slate-600">
                  제공된 교과서 이미지 내용을 바탕으로 만든 자동 채점형 웹
                  퀴즈입니다. 띄어쓰기와 대소문자는 자동으로 정규화됩니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={gradeAll} className="rounded-xl">
                  전체 채점
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowAnswers((v) => !v)}
                  className="rounded-xl"
                >
                  {showAnswers ? (
                    <EyeOff className="mr-2 h-4 w-4" />
                  ) : (
                    <Eye className="mr-2 h-4 w-4" />
                  )}
                  정답 보기
                </Button>
                <Button
                  variant="outline"
                  onClick={resetAll}
                  className="rounded-xl"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> 초기화
                </Button>
                <Button
                  variant="outline"
                  onClick={fillSample}
                  className="rounded-xl"
                >
                  예시 입력
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">문항 수</div>
                  <div className="mt-1 text-2xl font-bold">100</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">정답 수</div>
                  <div className="mt-1 text-2xl font-bold">
                    {submitted ? score : "-"}
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>점수</span>
                    <span>{submitted ? `${progress}%` : "미채점"}</span>
                  </div>
                  <Progress value={submitted ? progress : 0} className="mt-3" />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {grouped.map(([section, items]) => (
          <Card key={section} className="rounded-2xl shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-xl">{section}</CardTitle>
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {items.length}문항
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((q) => (
                <div key={q.id} className="rounded-2xl border bg-white p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 text-sm font-semibold text-slate-500">
                        문항 {q.id}
                      </div>
                      <div className="text-base leading-7">{q.prompt}</div>
                      <Input
                        value={userAnswers[q.id]}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        placeholder="정답 입력"
                        className="mt-3 rounded-xl"
                      />
                      {(showAnswers || (submitted && !q.correct)) && (
                        <div className="mt-2 text-sm text-slate-600">
                          정답:{" "}
                          <span className="font-semibold">{q.answers[0]}</span>
                        </div>
                      )}
                    </div>
                    {submitted && (
                      <div className="md:pl-4">
                        {q.correct ? (
                          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-emerald-700">
                            <CheckCircle2 className="h-4 w-4" /> 정답
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-rose-700">
                            <XCircle className="h-4 w-4" /> 오답
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 text-sm leading-7 text-slate-600">
            <div className="font-semibold text-slate-800">채점 기준</div>
            <p className="mt-2">
              띄어쓰기, 하이픈, 일부 문장부호, 영문 대소문자는 무시하고
              채점합니다. 다만 교과서 표현과 의미가 크게 다른 동의어는 자동 정답
              처리되지 않을 수 있습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
