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
  BookOpen,
  Trash2,
} from "lucide-react";
import {
  answersToReviewText,
  getAnswerLabel,
  getChoiceOptions,
  getPromptStem,
  isCorrect,
  parsePromptEdit,
  parseReviewAnswers,
  promptToReviewText,
} from "@/quizLogic";

const questionModules = import.meta.glob("./json/*.js");
const ALL_RANDOM_VALUE = "__all_random__";
const WRONG_NOTE_VALUE = "__wrong_note__";
const WRONG_NOTE_STORAGE_KEY = "biology_wrong_note_v1";

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

function nowIso() {
  return new Date().toISOString();
}

function loadWrongNoteItems() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(WRONG_NOTE_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("오답노트 로드 실패:", err);
    return [];
  }
}

function saveWrongNoteItems(items) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WRONG_NOTE_STORAGE_KEY, JSON.stringify(items));
}

function getWrongNoteId(question) {
  return `${question.sourceFile || "unknown"}::${
    question.originalId ?? question.id
  }`;
}

function toStoredQuestion(question) {
  return {
    id: question.originalId ?? question.id,
    originalId: question.originalId ?? question.id,
    section: question.section,
    prompt: question.prompt,
    answers: question.answers,
    type: question.type,
    sourceFile: question.sourceFile,
  };
}

function toWrongNoteQuestion(item, index) {
  return {
    ...item.question,
    originalId: item.question.originalId ?? item.question.id,
    questionKey: `wrong-note::${item.id}::${index}`,
    wrongNoteId: item.id,
    wrongCount: item.wrongCount || 1,
    lastUserAnswer: item.lastUserAnswer || "",
    note: item.note || "",
  };
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

function maybeDrawRandomQuestions(items, enabled, count) {
  if (!enabled) return items;
  return shuffleArray(items).slice(0, clampQuestionCount(count, items.length));
}

export default function BiologyFillInQuiz() {
  const fileOptions = useMemo(() => {
    return Object.keys(questionModules)
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
  const [isRandomSubset, setIsRandomSubset] = useState(false);

  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledQuestionIds, setShuffledQuestionIds] = useState([]);
  const [reviewEdits, setReviewEdits] = useState({});
  const [manualGrades, setManualGrades] = useState({});
  const [openReviewIds, setOpenReviewIds] = useState({});
  const [singleGradedIds, setSingleGradedIds] = useState({});
  const [openQuestionMenuId, setOpenQuestionMenuId] = useState("");
  const [wrongNoteItems, setWrongNoteItems] = useState(loadWrongNoteItems);
  const [showWrongNoteManager, setShowWrongNoteManager] = useState(false);
  const [wrongNoteFilter, setWrongNoteFilter] = useState("active");
  const [wrongNoteSearch, setWrongNoteSearch] = useState("");
  const [pendingWrongNoteResults, setPendingWrongNoteResults] = useState([]);
  const [showWrongNoteSaveModal, setShowWrongNoteSaveModal] = useState(false);
  const isAllRandomMode = selectedFile === ALL_RANDOM_VALUE;
  const isWrongNoteMode = selectedFile === WRONG_NOTE_VALUE;
  const isRandomDrawEnabled = isAllRandomMode || isRandomSubset;
  const activeWrongNoteItems = useMemo(
    () => wrongNoteItems.filter((item) => !item.mastered),
    [wrongNoteItems]
  );
  const masteredWrongNoteCount =
    wrongNoteItems.length - activeWrongNoteItems.length;
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

        if (selectedFile === WRONG_NOTE_VALUE) {
          const storedActiveItems = loadWrongNoteItems().filter(
            (item) => !item.mastered
          );
          const noteQuestions = storedActiveItems.map(toWrongNoteQuestion);
          loadedQuestions = maybeDrawRandomQuestions(
            noteQuestions,
            isRandomSubset,
            requestedRandomCount
          );
          setTotalPoolSize(storedActiveItems.length);
        } else if (selectedFile === ALL_RANDOM_VALUE) {
          const validPaths = Object.keys(questionModules)
            .filter((path) => !isWrongQuestionFile(path))
            .sort();
          const modules = await Promise.all(
            validPaths.map((path) => questionModules[path]())
          );
          const mergedQuestions = modules.flatMap((mod, index) =>
            prepareQuestions(
              mod.questions || [],
              getFileLabel(validPaths[index])
            )
          );
          loadedQuestions = maybeDrawRandomQuestions(
            mergedQuestions,
            true,
            requestedRandomCount
          );
          setTotalPoolSize(mergedQuestions.length);
        } else if (questionModules[selectedFile]) {
          const mod = await questionModules[selectedFile]();
          const fileQuestions = prepareQuestions(
            mod.questions || [],
            getFileLabel(selectedFile)
          );
          loadedQuestions = maybeDrawRandomQuestions(
            fileQuestions,
            isRandomSubset,
            requestedRandomCount
          );
          setTotalPoolSize(fileQuestions.length);
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
        setReviewEdits({});
        setManualGrades({});
        setOpenReviewIds({});
        setSingleGradedIds({});
        setOpenQuestionMenuId("");
        setPendingWrongNoteResults([]);
        setShowWrongNoteSaveModal(false);
      } catch (err) {
        console.error("문제 파일 로드 실패:", err);
        setQuestions([]);
        setTotalPoolSize(0);
        setUserAnswers({});
        setIsShuffled(false);
        setShuffledQuestionIds([]);
        setReviewEdits({});
        setManualGrades({});
        setOpenReviewIds({});
        setSingleGradedIds({});
        setOpenQuestionMenuId("");
        setPendingWrongNoteResults([]);
        setShowWrongNoteSaveModal(false);
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, [isRandomSubset, selectedFile, requestedRandomCount, randomDrawVersion]);

  const results = useMemo(() => {
    return questions.map((q) => {
      const edit = reviewEdits[q.questionKey] || {};
      const answers =
        edit.answersText !== undefined
          ? parseReviewAnswers(edit.answersText, q.type)
          : q.answers;
      const prompt = edit.prompt ?? q.prompt;
      const userAnswer = userAnswers[q.questionKey] || "";
      const autoCorrect = isCorrect(userAnswer, answers, q.type);
      const manualGrade = manualGrades[q.questionKey];
      const correct =
        manualGrade === "correct"
          ? true
          : manualGrade === "wrong"
          ? false
          : autoCorrect;

      return {
        ...q,
        prompt,
        answers,
        userAnswer,
        autoCorrect,
        correct,
        manualGrade,
      };
    });
  }, [manualGrades, questions, reviewEdits, userAnswers]);

  const score = results.filter((r) => r.correct).length;
  const progress = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;
  const autoWrongCount = results.filter((r) => !r.autoCorrect).length;
  const manualGradeCount = Object.keys(manualGrades).length;

  const wrongQuestions = useMemo(() => {
    if (!submitted) return [];
    return results
      .filter((r) => !r.correct)
      .map(({ section, prompt, answers, type, sourceFile }, index) => ({
        id: index + 1,
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

  const filteredWrongNoteItems = useMemo(() => {
    const keyword = wrongNoteSearch.trim().toLowerCase();
    return wrongNoteItems.filter((item) => {
      if (wrongNoteFilter === "active" && item.mastered) return false;
      if (wrongNoteFilter === "mastered" && !item.mastered) return false;
      if (!keyword) return true;

      const haystack = [
        item.question?.section,
        getPromptStem(item.question?.prompt),
        item.note,
        item.question?.sourceFile,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(keyword);
    });
  }, [wrongNoteFilter, wrongNoteItems, wrongNoteSearch]);

  const orderedResults = useMemo(() => {
    if (!isShuffled) return results;

    const resultMap = new Map(results.map((q) => [q.questionKey, q]));
    const shuffled = shuffledQuestionIds
      .map((id) => resultMap.get(id))
      .filter(Boolean);

    return shuffled.length === results.length
      ? shuffled
      : shuffleArray(results);
  }, [isShuffled, results, shuffledQuestionIds]);

  const grouped = useMemo(() => {
    if (isShuffled || isAllRandomMode || isWrongNoteMode) {
      return [["__shuffled__", orderedResults]];
    }

    const map = new Map();
    for (const q of results) {
      if (!map.has(q.section)) map.set(q.section, []);
      map.get(q.section).push(q);
    }
    return Array.from(map.entries());
  }, [isAllRandomMode, isShuffled, isWrongNoteMode, orderedResults, results]);

  const handleChange = (id, value) => {
    setUserAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const persistWrongNoteItems = (updater) => {
    setWrongNoteItems((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveWrongNoteItems(next);
      return next;
    });
  };

  const saveWrongResultsToNote = (wrongResults) => {
    if (!wrongResults.length) return;

    const savedAt = nowIso();
    persistWrongNoteItems((prev) => {
      const map = new Map(prev.map((item) => [item.id, item]));

      for (const question of wrongResults) {
        const id = question.wrongNoteId || getWrongNoteId(question);
        const previous = map.get(id);
        map.set(id, {
          id,
          question: toStoredQuestion(question),
          note: previous?.note || "",
          mastered: false,
          wrongCount: (previous?.wrongCount || 0) + 1,
          lastUserAnswer: question.userAnswer || "",
          createdAt: previous?.createdAt || savedAt,
          updatedAt: savedAt,
          lastWrongAt: savedAt,
        });
      }

      return Array.from(map.values()).sort((a, b) =>
        (b.lastWrongAt || b.updatedAt || "").localeCompare(
          a.lastWrongAt || a.updatedAt || ""
        )
      );
    });
  };

  const gradeAll = () => {
    const wrongResults = results.filter((r) => !r.correct);
    setSubmitted(true);
    setPendingWrongNoteResults(wrongResults);
    setShowWrongNoteSaveModal(wrongResults.length > 0);
  };

  const savePendingWrongNoteResults = () => {
    saveWrongResultsToNote(pendingWrongNoteResults);
    setShowWrongNoteSaveModal(false);
    setPendingWrongNoteResults([]);
  };

  const dismissWrongNoteSaveModal = () => {
    setShowWrongNoteSaveModal(false);
    setPendingWrongNoteResults([]);
  };

  const saveCurrentWrongResultsToNote = () => {
    const wrongResults = results.filter((r) => !r.correct);
    saveWrongResultsToNote(wrongResults);
  };

  const toggleReview = (id) => {
    setOpenReviewIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleQuestionMenu = (id) => {
    setOpenQuestionMenuId((prev) => (prev === id ? "" : id));
  };

  const gradeSingleQuestion = (id) => {
    setSingleGradedIds((prev) => ({
      ...prev,
      [id]: true,
    }));
    setOpenQuestionMenuId("");
  };

  const addSingleQuestionToWrongNote = (question) => {
    saveWrongResultsToNote([question]);
    setOpenQuestionMenuId("");
  };

  const updateReviewEdit = (id, patch) => {
    setReviewEdits((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...patch,
      },
    }));
    setCopied(false);
  };

  const updateManualGrade = (id, grade) => {
    setManualGrades((prev) => {
      const next = { ...prev };
      if (grade === "auto") {
        delete next[id];
      } else {
        next[id] = grade;
      }
      return next;
    });
    setCopied(false);
  };

  const updateWrongNoteItem = (id, updater) => {
    persistWrongNoteItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next =
          typeof updater === "function"
            ? updater(item)
            : { ...item, ...updater };
        return {
          ...next,
          updatedAt: nowIso(),
        };
      })
    );
  };

  const updateWrongNoteQuestion = (id, patch) => {
    updateWrongNoteItem(id, (item) => ({
      ...item,
      question: {
        ...item.question,
        ...patch,
      },
    }));
  };

  const updateWrongNoteChoiceStem = (id, stem) => {
    updateWrongNoteItem(id, (item) => {
      const options = getChoiceOptions(item.question.prompt);
      return {
        ...item,
        question: {
          ...item.question,
          prompt: [stem, ...options],
        },
      };
    });
  };

  const updateWrongNoteChoiceOption = (id, optionIndex, value) => {
    updateWrongNoteItem(id, (item) => {
      const stem = getPromptStem(item.question.prompt);
      const options = getChoiceOptions(item.question.prompt);
      const nextOptions = [...options];
      nextOptions[optionIndex] = value;
      return {
        ...item,
        question: {
          ...item.question,
          prompt: [stem, ...nextOptions],
        },
      };
    });
  };

  const deleteWrongNoteItem = (id) => {
    persistWrongNoteItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearMasteredWrongNotes = () => {
    persistWrongNoteItems((prev) => prev.filter((item) => !item.mastered));
  };

  const startWrongNoteMode = () => {
    setSelectedFile(WRONG_NOTE_VALUE);
    setRandomDrawVersion((prev) => prev + 1);
    setShowWrongNoteManager(false);
  };

  const resetAll = () => {
    setUserAnswers(buildInitialAnswers(questions));
    setSubmitted(false);
    setShowAnswers(false);
    setCopied(false);
    setReviewEdits({});
    setManualGrades({});
    setOpenReviewIds({});
    setSingleGradedIds({});
    setOpenQuestionMenuId("");
    setPendingWrongNoteResults([]);
    setShowWrongNoteSaveModal(false);
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
                    생명과학 단답·빈칸·객관식
                  </CardTitle>
                  <p className="mt-2 text-sm text-slate-600">
                    문제 파일 하나를 선택하거나, 전체 JSON에서 랜덤으로 원하는
                    수만큼 뽑아 풀 수 있습니다.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                      오답노트 {activeWrongNoteItems.length}개
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                      정복 {masteredWrongNoteCount}개
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={gradeAll}
                    className="rounded-xl"
                    disabled={loading || !questions.length}
                  >
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
                    onClick={toggleShuffle}
                    className="rounded-xl"
                    disabled={loading || !questions.length}
                  >
                    {isShuffled ? "기본 순서" : "셔플"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowWrongNoteManager((v) => !v)}
                    className="rounded-xl"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    오답노트 관리
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_170px_220px]">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    문제 파일 선택
                  </label>
                  <select
                    value={selectedFile}
                    onChange={(e) => setSelectedFile(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none"
                  >
                    <option value={ALL_RANDOM_VALUE}>전체 랜덤</option>
                    <option value={WRONG_NOTE_VALUE}>오답노트</option>
                    {fileOptions.map((file) => (
                      <option key={file.value} value={file.value}>
                        {file.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    파일 랜덤
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsRandomSubset((v) => !v)}
                    disabled={isAllRandomMode}
                    className={`flex h-10 w-full items-center justify-center rounded-xl border px-3 text-sm transition ${
                      isRandomDrawEnabled
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                    } disabled:cursor-not-allowed disabled:opacity-70`}
                  >
                    {isAllRandomMode
                      ? "항상 랜덤"
                      : isRandomSubset
                      ? "랜덤 켜짐"
                      : "전체 출제"}
                  </button>
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
                        setAllRandomCountInput(
                          e.target.value.replace(/[^\d]/g, "")
                        )
                      }
                      disabled={!isRandomDrawEnabled}
                      className="h-10"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={redrawAllRandomQuestions}
                      disabled={!isRandomDrawEnabled || loading}
                      className="rounded-xl"
                    >
                      다시 뽑기
                    </Button>
                  </div>
                </div>
              </div>

              {isAllRandomMode && (
                <div className="text-sm text-slate-600">
                  전체 {totalPoolSize}문제 중 {questions.length}문항을 랜덤으로
                  출제합니다.
                </div>
              )}
              {isWrongNoteMode && (
                <div className="text-sm text-slate-600">
                  {isRandomSubset
                    ? `오답노트의 미정복 문제 ${totalPoolSize}개 중 ${questions.length}문항을 랜덤으로 출제합니다.`
                    : `오답노트의 미정복 문제 ${totalPoolSize}개를 출제합니다.`}
                </div>
              )}
              {!isAllRandomMode && !isWrongNoteMode && isRandomSubset && (
                <div className="text-sm text-slate-600">
                  선택한 파일의 {totalPoolSize}문제 중 {questions.length}문항을
                  랜덤으로 출제합니다.
                </div>
              )}

              <div className="max-w-sm">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  현재 출제 방식
                </label>
                <div className="flex h-10 items-center rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm text-slate-700">
                  {isAllRandomMode
                    ? `전체 랜덤 ${clampQuestionCount(
                        requestedRandomCount,
                        totalPoolSize || requestedRandomCount
                      )}문항`
                    : isWrongNoteMode
                    ? isRandomSubset
                      ? `오답노트 랜덤 ${questions.length}/${totalPoolSize}문항`
                      : `오답노트 ${totalPoolSize}문항`
                    : isRandomSubset
                    ? `${getFileLabel(selectedFile)} 랜덤 ${
                        questions.length
                      }/${totalPoolSize}문항`
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
                  <div className="text-sm text-slate-500">
                    리뷰 기준 정답 수
                  </div>
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
                자동 오답 {autoWrongCount}개에서 수동 판정 {manualGradeCount}
                개와 리뷰 편집 내용을 반영해 오답 {wrongQuestions.length}개만
                1번부터 다시 번호를 매겨 추출했습니다.
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={saveCurrentWrongResultsToNote}
                  className="rounded-xl"
                  disabled={!wrongQuestions.length}
                >
                  현재 오답노트 등록
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={startWrongNoteMode}
                  className="rounded-xl"
                  disabled={!activeWrongNoteItems.length}
                >
                  오답노트만 풀기
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowWrongNoteManager(true)}
                  className="rounded-xl"
                >
                  오답노트 관리
                </Button>
              </div>
              <pre className="max-h-[420px] overflow-auto rounded-2xl bg-slate-900 p-4 text-sm leading-6 text-slate-100">
                <code>{wrongQuestionsJson}</code>
              </pre>
            </CardContent>
          </Card>
        )}

        {showWrongNoteSaveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-700">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-lg font-semibold text-slate-950">
                    오답노트에 등록할까요?
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    이번 채점에서 틀린 문제 {pendingWrongNoteResults.length}개를
                    저장합니다. 이미 저장된 문제는 중복 추가하지 않고 틀린
                    횟수와 마지막 답변만 갱신됩니다.
                  </p>
                </div>
              </div>

              <div className="mt-4 max-h-56 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="space-y-2">
                  {pendingWrongNoteResults.slice(0, 8).map((question) => (
                    <div
                      key={question.questionKey}
                      className="rounded-lg bg-white px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200"
                    >
                      <div className="text-xs font-semibold text-slate-500">
                        {question.sourceFile} · 문항 {question.originalId}
                      </div>
                      <div className="mt-1 line-clamp-2">
                        {getPromptStem(question.prompt)}
                      </div>
                    </div>
                  ))}
                  {pendingWrongNoteResults.length > 8 && (
                    <div className="px-1 text-xs text-slate-500">
                      외 {pendingWrongNoteResults.length - 8}개 더 있음
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={dismissWrongNoteSaveModal}
                  className="rounded-xl"
                >
                  이번에는 저장 안 함
                </Button>
                <Button
                  type="button"
                  onClick={savePendingWrongNoteResults}
                  className="rounded-xl"
                >
                  오답노트 등록
                </Button>
              </div>
            </div>
          </div>
        )}

        {showWrongNoteManager && (
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-xl">오답노트 관리</CardTitle>
                  <p className="mt-1 text-sm text-slate-600">
                    저장된 오답을 앱 안에서 직접 수정하고, 다시 풀 문제와 정복한
                    문제를 나눠 관리합니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={startWrongNoteMode}
                    disabled={!activeWrongNoteItems.length}
                    className="rounded-xl"
                  >
                    미정복 오답 풀기
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearMasteredWrongNotes}
                    disabled={!masteredWrongNoteCount}
                    className="rounded-xl"
                  >
                    정복 항목 삭제
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
                <select
                  value={wrongNoteFilter}
                  onChange={(e) => setWrongNoteFilter(e.target.value)}
                  className="h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none"
                >
                  <option value="active">미정복만</option>
                  <option value="mastered">정복만</option>
                  <option value="all">전체</option>
                </select>
                <Input
                  value={wrongNoteSearch}
                  onChange={(e) => setWrongNoteSearch(e.target.value)}
                  placeholder="섹션, 문제, 메모, 파일명 검색"
                  className="h-10"
                />
              </div>

              {!wrongNoteItems.length && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
                  아직 저장된 오답이 없습니다. 문제를 채점하면 틀린 문제가
                  자동으로 저장됩니다.
                </div>
              )}

              {wrongNoteItems.length > 0 && !filteredWrongNoteItems.length && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
                  현재 필터에 맞는 오답이 없습니다.
                </div>
              )}

              {filteredWrongNoteItems.map((item) => {
                const question = item.question;
                const choiceOptions = getChoiceOptions(question.prompt);

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="rounded-full bg-slate-100 px-2 py-1">
                            {question.sourceFile || "출처 없음"}
                          </span>
                          <span className="rounded-full bg-slate-100 px-2 py-1">
                            {question.type}
                          </span>
                          <span className="rounded-full bg-rose-50 px-2 py-1 text-rose-700">
                            오답 {item.wrongCount || 1}회
                          </span>
                          {item.mastered && (
                            <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
                              정복
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant={item.mastered ? "secondary" : "outline"}
                          onClick={() =>
                            updateWrongNoteItem(item.id, {
                              mastered: !item.mastered,
                            })
                          }
                          className="rounded-xl"
                        >
                          {item.mastered ? "오답으로 되돌리기" : "정복 처리"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteWrongNoteItem(item.id)}
                          className="rounded-xl"
                        >
                          <Trash2 className="mr-1 h-3.5 w-3.5" />
                          삭제
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600">
                          섹션
                        </label>
                        <Input
                          value={question.section || ""}
                          onChange={(e) =>
                            updateWrongNoteQuestion(item.id, {
                              section: e.target.value,
                            })
                          }
                          className="h-9"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600">
                          개인 메모
                        </label>
                        <Input
                          value={item.note || ""}
                          onChange={(e) =>
                            updateWrongNoteItem(item.id, {
                              note: e.target.value,
                            })
                          }
                          placeholder="헷갈린 이유, 다시 볼 포인트"
                          className="h-9"
                        />
                      </div>
                    </div>

                    {question.type === "choice" ? (
                      <div className="mt-4 space-y-3">
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-slate-600">
                            문제 문장
                          </label>
                          <textarea
                            value={getPromptStem(question.prompt)}
                            onChange={(e) =>
                              updateWrongNoteChoiceStem(item.id, e.target.value)
                            }
                            className="min-h-16 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-slate-500"
                          />
                        </div>
                        <div className="grid gap-2">
                          {choiceOptions.map((option, optionIndex) => (
                            <label
                              key={`${item.id}-option-${optionIndex}`}
                              className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-[auto_minmax(0,1fr)] md:items-center"
                            >
                              <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <input
                                  type="radio"
                                  name={`wrong-note-answer-${item.id}`}
                                  checked={
                                    Number(question.answers?.[0]) ===
                                    optionIndex
                                  }
                                  onChange={() =>
                                    updateWrongNoteQuestion(item.id, {
                                      answers: [optionIndex],
                                    })
                                  }
                                />
                                {optionIndex + 1}
                              </span>
                              <Input
                                value={option}
                                onChange={(e) =>
                                  updateWrongNoteChoiceOption(
                                    item.id,
                                    optionIndex,
                                    e.target.value
                                  )
                                }
                                className="h-9 bg-white"
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-slate-600">
                            문제 문장
                          </label>
                          <textarea
                            value={promptToReviewText(question.prompt)}
                            onChange={(e) =>
                              updateWrongNoteQuestion(item.id, {
                                prompt: parsePromptEdit(
                                  e.target.value,
                                  question.type
                                ),
                              })
                            }
                            className="min-h-24 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-slate-500"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-slate-600">
                            답안 목록
                          </label>
                          <textarea
                            value={answersToReviewText(question.answers)}
                            onChange={(e) =>
                              updateWrongNoteQuestion(item.id, {
                                answers: parseReviewAnswers(
                                  e.target.value,
                                  question.type
                                ),
                              })
                            }
                            className="min-h-24 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-slate-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {!loading &&
          grouped.map(([section, items]) => (
            <Card key={section} className="rounded-2xl shadow-sm">
              <CardContent className="space-y-4">
                {items.map((q) => {
                  const questionGraded =
                    submitted || Boolean(singleGradedIds[q.questionKey]);

                  return (
                    <div
                      key={q.questionKey}
                      className="relative rounded-2xl border bg-white p-4"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-start justify-between gap-3">
                            <div className="min-w-0 text-sm font-semibold text-slate-500">
                              문항 {q.originalId}
                              {(isAllRandomMode || isWrongNoteMode) && (
                                <span className="ml-2 font-normal text-slate-400">
                                  [{q.sourceFile}]
                                </span>
                              )}
                              {q.type === "multi" && (
                                <span className="ml-2 font-normal text-slate-400">
                                  (쉼표로 구분)
                                </span>
                              )}
                              {q.type === "choice" && (
                                <span className="ml-2 font-normal text-slate-400">
                                  (객관식)
                                </span>
                              )}
                            </div>
                            <div className="relative shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleQuestionMenu(q.questionKey)}
                                className="flex h-9 min-w-9 items-center justify-center rounded-full border border-slate-300 bg-slate-100 px-2 text-lg font-bold leading-none text-slate-900 shadow-sm transition hover:border-slate-500 hover:bg-slate-200"
                                aria-label="문제 메뉴"
                                tabIndex={-1}
                              >
                                ...
                              </button>
                              {openQuestionMenuId === q.questionKey && (
                                <div className="absolute right-0 top-full z-30 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-lg">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      gradeSingleQuestion(q.questionKey)
                                    }
                                    className="block w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50"
                                  >
                                    단일 채점
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => addSingleQuestionToWrongNote(q)}
                                    className="block w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50"
                                  >
                                    오답노트에 추가
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-base leading-7">
                            {getPromptStem(q.prompt)}
                          </div>
                          {q.type === "choice" ? (
                            <div className="mt-3 grid gap-2 md:grid-cols-2">
                              {getChoiceOptions(q.prompt).map(
                                (option, optionIndex) => {
                                  const selected =
                                    userAnswers[q.questionKey] ===
                                    optionIndex.toString();

                                  return (
                                    <button
                                      key={`${q.questionKey}-${optionIndex}`}
                                      type="button"
                                      onClick={() =>
                                        handleChange(
                                          q.questionKey,
                                          optionIndex.toString()
                                        )
                                      }
                                      className={`flex min-h-10 items-start gap-2 rounded-xl border px-3 py-2 text-left text-sm leading-6 transition ${
                                        selected
                                          ? "border-slate-900 bg-slate-900 text-white"
                                          : "border-slate-200 bg-white text-slate-800 hover:border-slate-400"
                                      }`}
                                    >
                                      <span className="shrink-0 font-semibold">
                                        {optionIndex + 1}.
                                      </span>
                                      <span>{option}</span>
                                    </button>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <Input
                              value={userAnswers[q.questionKey] || ""}
                              onChange={(e) =>
                                handleChange(q.questionKey, e.target.value)
                              }
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
                          )}
                          {(showAnswers || (questionGraded && !q.correct)) && (
                            <div className="mt-2 text-sm text-slate-600">
                              정답:{" "}
                              <span className="font-semibold">
                                {getAnswerLabel(q)}
                              </span>
                            </div>
                          )}
                          {questionGraded && openReviewIds[q.questionKey] && (
                            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                <div>
                                  <div className="text-sm font-semibold text-slate-800">
                                    문제 리뷰
                                  </div>
                                  <div className="mt-1 text-xs text-slate-500">
                                    자동 판정: {q.autoCorrect ? "정답" : "오답"}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant={
                                      !q.manualGrade ? "secondary" : "outline"
                                    }
                                    onClick={() =>
                                      updateManualGrade(q.questionKey, "auto")
                                    }
                                    className="rounded-xl"
                                  >
                                    자동
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant={
                                      q.manualGrade === "correct"
                                        ? "secondary"
                                        : "outline"
                                    }
                                    onClick={() =>
                                      updateManualGrade(
                                        q.questionKey,
                                        "correct"
                                      )
                                    }
                                    className="rounded-xl"
                                  >
                                    정답 고정
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant={
                                      q.manualGrade === "wrong"
                                        ? "destructive"
                                        : "outline"
                                    }
                                    onClick={() =>
                                      updateManualGrade(q.questionKey, "wrong")
                                    }
                                    className="rounded-xl"
                                  >
                                    오답 고정
                                  </Button>
                                </div>
                              </div>

                              <label className="mt-3 block text-xs font-semibold text-slate-600">
                                {q.type === "choice"
                                  ? "문제/선택지 목록"
                                  : "문제 문장"}
                              </label>
                              <textarea
                                value={
                                  reviewEdits[q.questionKey]?.prompt !==
                                  undefined
                                    ? promptToReviewText(
                                        reviewEdits[q.questionKey].prompt
                                      )
                                    : promptToReviewText(q.prompt)
                                }
                                onChange={(e) =>
                                  updateReviewEdit(q.questionKey, {
                                    prompt: parsePromptEdit(
                                      e.target.value,
                                      q.type
                                    ),
                                  })
                                }
                                className="mt-1 min-h-20 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-slate-500"
                              />

                              <label className="mt-3 block text-xs font-semibold text-slate-600">
                                답안 목록
                              </label>
                              <textarea
                                value={
                                  reviewEdits[q.questionKey]?.answersText ??
                                  answersToReviewText(q.answers)
                                }
                                onChange={(e) =>
                                  updateReviewEdit(q.questionKey, {
                                    answersText: e.target.value,
                                  })
                                }
                                className="mt-1 min-h-20 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-slate-500"
                              />
                              <div className="mt-1 text-xs text-slate-500">
                                {q.type === "choice"
                                  ? "객관식 답안은 정답 선택지의 0부터 시작하는 index를 입력합니다."
                                  : "답안은 한 줄에 하나씩 입력합니다."}
                              </div>
                            </div>
                          )}
                        </div>
                        {questionGraded && (
                          <div className="flex flex-col items-start gap-2 md:items-end md:pl-4">
                            {q.correct ? (
                              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-emerald-700">
                                <CheckCircle2 className="h-4 w-4" />
                                {q.manualGrade === "correct"
                                  ? "정답 고정"
                                  : "정답"}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-rose-700">
                                <XCircle className="h-4 w-4" />
                                {q.manualGrade === "wrong"
                                  ? "오답 고정"
                                  : "오답"}
                              </div>
                            )}
                            <Button
                              type="button"
                              size="sm"
                              variant={
                                openReviewIds[q.questionKey]
                                  ? "secondary"
                                  : "outline"
                              }
                              onClick={() => toggleReview(q.questionKey)}
                              className="rounded-xl"
                            >
                              {openReviewIds[q.questionKey]
                                ? "리뷰 닫기"
                                : "문제 리뷰"}
                            </Button>
                            {(q.manualGrade || reviewEdits[q.questionKey]) && (
                              <div className="text-xs text-slate-500">
                                리뷰 반영됨
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 text-sm leading-7 text-slate-600">
            <div className="font-semibold text-slate-800">채점 기준</div>
            <p className="mt-2">
              띄어쓰기, 하이픈, 일부 문장부호, 영문 대소문자는 무시하고
              채점합니다. 다답 문제는 쉼표로 구분하여 입력하며 순서는
              무관합니다. 객관식 문제는 선택지 번호로 고르고, 데이터의
              answers에는 정답 선택지의 0부터 시작하는 index를 둡니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
