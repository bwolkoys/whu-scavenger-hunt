"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Question = {
  id: string;
  prompt: string;
};

type Answer = {
  questionId: string;
  photo: File;
  previewUrl: string;
};

const QUESTIONS: Question[] = [
  { id: "q1", prompt: "Take a photo of the event entrance sign." },
  { id: "q2", prompt: "Take a photo with your group in front of the fire pit." },
  { id: "q3", prompt: "Take a photo of your favorite moment tonight." },
];

export default function WalkerPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const current = QUESTIONS[step];
  const isDone = step >= QUESTIONS.length;

  const progressText = useMemo(() => {
    if (isDone) return `Completed ${QUESTIONS.length}/${QUESTIONS.length}`;
    return `Question ${step + 1} of ${QUESTIONS.length}`;
  }, [step, isDone]);

  function onPickFile(file: File | null) {
    setError(null);

    // Clean up old preview URL
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setSelectedFile(file);
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  async function handleSubmit() {
    setError(null);

    if (!current) return;
    if (!selectedFile || !previewUrl) {
      setError("Please upload a photo to continue.");
      return;
    }

    // Save locally (front-end). If you want server upload, see note below.
    setAnswers((prev) => [
      ...prev,
      { questionId: current.id, photo: selectedFile, previewUrl },
    ]);

    // Reset picker for next question
    setSelectedFile(null);
    setPreviewUrl(null);

    setStep((s) => s + 1);
  }

  function handleRestart() {
    // Cleanup all created object URLs
    answers.forEach((a) => URL.revokeObjectURL(a.previewUrl));
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setStep(0);
    setAnswers([]);
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Photo Questions</h1>
          <span className="text-sm text-gray-500">{progressText}</span>
        </div>

        {/* Progress bar */}
        <div className="mb-8 h-2 w-full rounded bg-gray-200">
          <div
            className="h-2 rounded bg-black transition-all"
            style={{
              width: `${Math.min((step / QUESTIONS.length) * 100, 100)}%`,
            }}
          />
        </div>

        {!isDone ? (
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="mb-4 text-sm text-gray-500">{progressText}</p>

            <h2 className="mb-6 text-lg font-medium">{current.prompt}</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Upload photo (required)
              </label>

              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm"
              />

              {previewUrl ? (
                <div className="mt-4">
                  <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={previewUrl}
                      alt="Selected preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => onPickFile(null)}
                    className="mt-3 text-sm text-gray-600 underline"
                  >
                    Remove photo
                  </button>
                </div>
              ) : null}
            </div>

            {error ? (
              <p className="mb-4 text-sm text-red-600">{error}</p>
            ) : null}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
              >
                Submit & Next
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">All done 🎉</h2>
            <p className="mb-6 text-sm text-gray-600">
              You submitted {answers.length} photo{answers.length === 1 ? "" : "s"}.
            </p>

            <div className="space-y-6">
              {answers.map((a, idx) => {
                const q = QUESTIONS.find((q) => q.id === a.questionId);
                return (
                  <div key={a.questionId} className="rounded-xl bg-gray-50 p-4">
                    <p className="mb-3 text-sm font-medium">
                      {idx + 1}. {q?.prompt ?? a.questionId}
                    </p>
                    <div className="relative h-52 w-full overflow-hidden rounded-lg bg-white">
                      <Image
                        src={a.previewUrl}
                        alt={`Answer ${idx + 1}`}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleRestart}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium"
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}