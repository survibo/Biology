export function normalize(text) {
  return (text || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s\-_,.·:;!?()[\]{}'"""'']/g, "");
}

export function getPromptStem(prompt) {
  return Array.isArray(prompt) ? prompt[0] || "" : prompt || "";
}

export function getChoiceOptions(prompt) {
  return Array.isArray(prompt) ? prompt.slice(1) : [];
}

function normalizeChoiceIndex(value) {
  const parsed =
    typeof value === "number" ? value : Number.parseInt(value?.toString() || "", 10);

  return Number.isInteger(parsed) ? parsed : null;
}

export function isCorrect(input, answers, type) {
  if (type === "choice") {
    return normalizeChoiceIndex(input) === normalizeChoiceIndex(answers?.[0]);
  }

  if (type === "multi") {
    const userSet = input.split(",").map(normalize).filter(Boolean).sort().join("|");
    const answerSet = answers.map(normalize).sort().join("|");
    return userSet === answerSet;
  }

  return answers.some((a) => normalize(a) === normalize(input));
}

export function answersToReviewText(answers) {
  return (answers || []).join("\n");
}

export function parseReviewAnswers(text, type) {
  const answers = (text || "")
    .split(/\r?\n/)
    .map((answer) => answer.trim())
    .filter(Boolean);

  if (type === "choice") {
    return answers.map((answer) => {
      const index = normalizeChoiceIndex(answer);
      return index === null ? answer : index;
    });
  }

  return answers;
}

export function promptToReviewText(prompt) {
  return Array.isArray(prompt) ? prompt.join("\n") : prompt || "";
}

export function parsePromptEdit(text, type) {
  if (type !== "choice") {
    return text;
  }

  return (text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function getAnswerLabel(question) {
  if (question.type === "choice") {
    return getChoiceAnswerLabel(question);
  }

  return question.type === "multi" ? question.answers.join(", ") : question.answers[0];
}

export function getChoiceAnswerLabel(question) {
  const answerIndex = normalizeChoiceIndex(question.answers?.[0]);
  const option = answerIndex === null ? "" : getChoiceOptions(question.prompt)[answerIndex];

  if (answerIndex === null) {
    return "";
  }

  return option ? `${answerIndex + 1}. ${option}` : `${answerIndex + 1}번`;
}

export function getSampleAnswer(question) {
  if (question.type === "choice") {
    const index = normalizeChoiceIndex(question.answers?.[0]);
    return index === null ? "" : index.toString();
  }

  return question.type === "multi" ? question.answers.join(", ") : question.answers[0];
}
