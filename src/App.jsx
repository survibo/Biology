import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";

const questionModules = import.meta.glob(["./json/*.js", "!./json/*.wrong.js"]);
const ALL_RANDOM_VALUE = "__all_random__";

function isWrongQuestionFile(path) {
  return path.endsWith(".wrong.js");
}

function getFileLabel(path) {
  return path.split("/").pop()?.replace(".js", "") || path;
}

function prepareQuestions(questions, sourceFile) {
  return (questions || []).map((q, index) => ({
    ...q,
    originalId: q.id,
    sourceFile,
    questionKey: `${sourceFile}::${q.id}::${index}`,
  }));
}

function clampQuestionCount(count, total) {
  if (!total) return 0;
  return Math.min(Math.max(count, 1), total);
}

function normalize(text) {
  return (text || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s\-_,.·:;!?()[\]{}'"""'']/g, "");
}

function isCorrect(input, answers, type) {
  if (type === "multi") {
    const userSet = input.split(",").map(normalize).filter(Boolean).sort().join("|");
    const answerSet = answers.map(normalize).sort().join("|");
    return userSet === answerSet;
  }
  return answers.some((a) => normalize(a) === normalize(input));
}

function buildInitialAnswers(questions) {
  return Object.fromEntries((questions || []).map((q) => [q.questionKey, ""]));
}

function shuffleArray(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function BiologyFillInQuiz() {
  const fileOptions = useMemo(() => {
    return Object.keys(questionModules)
      .filter((path) => !isWrongQuestionFile(path))
      .sort()
      .map((path) => {
        return {
          value: path,
          label: getFileLabel(path),
        };
      });
  }, []);

  const [selectedFile, setSelectedFile] = useState(fileOptions[0]?.value || "");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPoolSize, setTotalPoolSize] = useState(0);
  const [allRandomCountInput, setAllRandomCountInput] = useState("20");
  const [randomDrawVersion, setRandomDrawVersion] = useState(0);

  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledQuestionIds, setShuffledQuestionIds] = useState([]);
  const isAllRandomMode = selectedFile === ALL_RANDOM_VALUE;
  const requestedRandomCount = useMemo(() => {
    const parsed = Number.parseInt(allRandomCountInput, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  }, [allRandomCountInput]);

  useEffect(() => {
    async function loadQuestions() {
      if (!selectedFile) return;

      setLoading(true);
      try {
        let loadedQuestions = [];

        if (selectedFile === ALL_RANDOM_VALUE) {
          const validPaths = Object.keys(questionModules)
            .filter((path) => !isWrongQuestionFile(path))
            .sort();
          const modules = await Promise.all(validPaths.map((path) => questionModules[path]()));
          const mergedQuestions = modules.flatMap((mod, index) =>
            prepareQuestions(mod.questions || [], getFileLabel(validPaths[index]))
          );
          const sampleCount = clampQuestionCount(requestedRandomCount, mergedQuestions.length);

          loadedQuestions = shuffleArray(mergedQuestions).slice(0, sampleCount);
          setTotalPoolSize(mergedQuestions.length);
        } else if (questionModules[selectedFile]) {
          const mod = await questionModules[selectedFile]();
          loadedQuestions = prepareQuestions(mod.questions || [], getFileLabel(selectedFile));
          setTotalPoolSize(loadedQuestions.length);
        } else {
          setTotalPoolSize(0);
        }

        setQuestions(loadedQuestions);
        setUserAnswers(buildInitialAnswers(loadedQuestions));
        setSubmitted(false);
        setShowAnswers(false);
        setCopied(false);
        setIsShuffled(false);
        setShuffledQuestionIds([]);
      } catch (err) {
        console.error("문제 파일 로드 실패:", err);
        setQuestions([]);
        setTotalPoolSize(0);
        setUserAnswers({});
        setIsShuffled(false);
        setShuffledQuestionIds([]);
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, [selectedFile, requestedRandomCount, randomDrawVersion]);

  const results = useMemo(() => {
    return questions.map((q) => ({
      ...q,
      userAnswer: userAnswers[q.questionKey] || "",
      correct: isCorrect(userAnswers[q.questionKey], q.answers, q.type),
    }));
  }, [questions, userAnswers]);

  const score = results.filter((r) => r.correct).length;
  const progress = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  const wrongQuestions = useMemo(() => {
    if (!submitted) return [];
    return results
      .filter((r) => !r.correct)
      .map(({ originalId, section, prompt, answers, type, sourceFile }) => ({
        id: originalId,
        section,
        prompt,
        answers,
        type,
        sourceFile,
      }));
  }, [results, submitted]);

  const wrongQuestionsJson = useMemo(() => {
    return `${JSON.stringify(wrongQuestions, null, 2)};`;
  }, [wrongQuestions]);

  const orderedResults = useMemo(() => {
    if (!isShuffled) return results;

    const resultMap = new Map(results.map((q) => [q.questionKey, q]));
    const shuffled = shuffledQuestionIds.map((id) => resultMap.get(id)).filter(Boolean);

    return shuffled.length === results.length ? shuffled : shuffleArray(results);
  }, [isShuffled, results, shuffledQuestionIds]);

  const grouped = useMemo(() => {
    if (isShuffled || isAllRandomMode) {
      return [["__shuffled__", orderedResults]];
    }

    const map = new Map();
    for (const q of results) {
      if (!map.has(q.section)) map.set(q.section, []);
      map.get(q.section).push(q);
    }
    return Array.from(map.entries());
  }, [isAllRandomMode, isShuffled, orderedResults, results]);

  const handleChange = (id, value) => {
    setUserAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const gradeAll = () => setSubmitted(true);

  const resetAll = () => {
    setUserAnswers(buildInitialAnswers(questions));
    setSubmitted(false);
    setShowAnswers(false);
    setCopied(false);
  };

  const fillSample = () => {
    const seeded = Object.fromEntries(
      questions.map((q, i) => [
        q.id,
        i % 7 === 0
          ? q.type === "multi"
            ? q.answers.join(", ")
            : q.answers[0]
          : "",
      ])
    );
    setUserAnswers(seeded);
    setSubmitted(false);
    setShowAnswers(false);
    setCopied(false);
  };

  const toggleShuffle = () => {
    if (isShuffled) {
      setIsShuffled(false);
      setShuffledQuestionIds([]);
      return;
    }

    setShuffledQuestionIds(shuffleArray(questions.map((q) => q.questionKey)));
    setIsShuffled(true);
  };

  const redrawAllRandomQuestions = () => {
    setRandomDrawVersion((prev) => prev + 1);
  };

  const copyWrongQuestionsJson = async () => {
    try {
      await navigator.clipboard.writeText(wrongQuestionsJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("복사 실패:", e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold tracking-tight">
                    생명과학 단답·빈칸채우기
                  </CardTitle>
                  <p className="mt-2 text-sm text-slate-600">
                    문제 파일 하나를 선택하거나, 전체 JSON에서 랜덤으로 원하는 수만큼 뽑아 풀 수 있습니다.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={gradeAll} className="rounded-xl" disabled={loading || !questions.length}>
                    전체 채점
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowAnswers((v) => !v)}
                    className="rounded-xl"
                    disabled={loading || !questions.length}
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
                    disabled={loading || !questions.length}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> 초기화
                  </Button>
                  <Button
                    variant="outline"
                    onClick={fillSample}
                    className="rounded-xl"
                    disabled={loading || !questions.length}
                  >
                    예시 입력
                  </Button>
                  <Button
                    variant="outline"
                    onClick={toggleShuffle}
                    className="rounded-xl"
                    disabled={loading || !questions.length}
                  >
                    {isShuffled ? "기본 순서" : "셔플"}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    문제 파일 선택
                  </label>
                  <select
                    value={selectedFile}
                    onChange={(e) => setSelectedFile(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none"
                  >
                    <option value={ALL_RANDOM_VALUE}>전체 랜덤 (wrong.js 제외)</option>
                    {fileOptions.map((file) => (
                      <option key={file.value} value={file.value}>
                        {file.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    랜덤 출제 수
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={allRandomCountInput}
                      onChange={(e) =>
                        setAllRandomCountInput(e.target.value.replace(/[^\d]/g, ""))
                      }
                      disabled={!isAllRandomMode}
                      className="h-10"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={redrawAllRandomQuestions}
                      disabled={!isAllRandomMode || loading}
                      className="rounded-xl"
                    >
                      다시 뽑기
                    </Button>
                  </div>
                </div>
              </div>

              {isAllRandomMode && (
                <div className="text-sm text-slate-600">
                  전체 {totalPoolSize}문제 중 {questions.length}문항을 랜덤으로 출제합니다.
                </div>
              )}

              <div className="max-w-sm">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  현재 출제 방식
                </label>
                <div className="flex h-10 items-center rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm text-slate-700">
                  {isAllRandomMode
                    ? `전체 랜덤 ${clampQuestionCount(requestedRandomCount, totalPoolSize || requestedRandomCount)}문항`
                    : getFileLabel(selectedFile)}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="text-sm text-slate-500">총 문제 수</div>
                  <div className="mt-1 text-2xl font-bold">
                    {loading ? "로딩 중..." : questions.length}
                  </div>
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

        {submitted && (
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-xl">틀린 문제 JSON 추출</CardTitle>
                <Button
                  onClick={copyWrongQuestionsJson}
                  variant="outline"
                  className="rounded-xl"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "복사됨" : "복사"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-3 text-sm text-slate-600">
                오답 {wrongQuestions.length}개만 추출했습니다.
              </div>
              <pre className="max-h-[420px] overflow-auto rounded-2xl bg-slate-900 p-4 text-sm leading-6 text-slate-100">
                <code>{wrongQuestionsJson}</code>
              </pre>
            </CardContent>
          </Card>
        )}

        {!loading &&
          grouped.map(([section, items]) => (
            <Card key={section} className="rounded-2xl shadow-sm">
              <CardContent className="space-y-4">
                {items.map((q) => (
                  <div key={q.questionKey} className="rounded-2xl border bg-white p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 text-sm font-semibold text-slate-500">
                          문항 {q.originalId}
                          {isAllRandomMode && (
                            <span className="ml-2 font-normal text-slate-400">
                              [{q.sourceFile}]
                            </span>
                          )}
                          {q.type === "multi" && (
                            <span className="ml-2 font-normal text-slate-400">
                              (쉼표로 구분)
                            </span>
                          )}
                        </div>
                        <div className="text-base leading-7">{q.prompt}</div>
                        <Input
                          value={userAnswers[q.questionKey] || ""}
                          onChange={(e) => handleChange(q.questionKey, e.target.value)}
                          onFocus={(e) =>
                            e.target.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            })
                          }
                          placeholder={
                            q.type === "multi"
                              ? `${q.answers.length}개, 쉼표로 구분`
                              : "정답 입력"
                          }
                          className="mt-3 h-9"
                        />
                        {(showAnswers || (submitted && !q.correct)) && (
                          <div className="mt-2 text-sm text-slate-600">
                            정답:{" "}
                            <span className="font-semibold">
                              {q.type === "multi"
                                ? q.answers.join(", ")
                                : q.answers[0]}
                            </span>
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
              채점합니다. 다답 문제는 쉼표로 구분하여 입력하며 순서는 무관합니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
