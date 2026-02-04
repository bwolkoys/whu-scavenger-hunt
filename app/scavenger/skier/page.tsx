"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Item = { id: string; text: string };

const ITEMS: Item[] = [
  { id: "q1", text: "Group photo spelling WHU" },
  { id: "q2", text: "Ski patrol shack or sign" },
  { id: "q3", text: "Fake action shot (jump pose without jumping)" },
  { id: "q4", text: "Snow angel in ski boots" },
  { id: "q5", text: "Best ski goggle reflection shot" },
  { id: "q6", text: "A dramatic “end of run” victory pose" },
  { id: "q7", text: "A wipeout aftermath (bonus if laughing)" },
  { id: "q8", text: "Photo from behind showing everyone skiing away" },
  { id: "q9", text: "Après-ski drink cheers (bonus 🍻)" },
];

const CHECKED_KEY = "skier_scavenger_checked_v1";
const TEAM_KEY = "skier_scavenger_team_v1";
const MIN_TO_SUBMIT = 2;

export default function SkierChecklistPage() {
  const [teamName, setTeamName] = useState("");
  const [teamInput, setTeamInput] = useState("");

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  // Load persisted state
  useEffect(() => {
    const savedTeam = localStorage.getItem(TEAM_KEY) || "";
    setTeamName(savedTeam);
    setTeamInput(savedTeam);

    try {
      const raw = localStorage.getItem(CHECKED_KEY);
      if (raw) setChecked(JSON.parse(raw));
      else setChecked(Object.fromEntries(ITEMS.map((i) => [i.id, false])));
    } catch {
      setChecked(Object.fromEntries(ITEMS.map((i) => [i.id, false])));
    }
  }, []);

  // Persist checklist
  useEffect(() => {
    if (!Object.keys(checked).length) return;
    localStorage.setItem(CHECKED_KEY, JSON.stringify(checked));
  }, [checked]);

  const checkedCount = useMemo(
    () => ITEMS.filter((i) => checked[i.id]).length,
    [checked]
  );

  const canSubmit = checkedCount >= MIN_TO_SUBMIT;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function saveTeam() {
    setError(null);
    const trimmed = teamInput.trim();
    setTeamName(trimmed);
    localStorage.setItem(TEAM_KEY, trimmed);
  }

  function resetTeam() {
    setError(null);
    setTeamName("");
    setTeamInput("");
    localStorage.removeItem(TEAM_KEY);
  }

  function handleSubmitClick(e: React.MouseEvent) {
    setError(null);

    if (!teamName) {
      e.preventDefault();
      setError("Please enter your team name before submitting.");
      return;
    }

    if (!canSubmit) {
      e.preventDefault();
      setError(`Check off at least ${MIN_TO_SUBMIT} photos to submit.`);
      return;
    }

    // ✅ allowed — will navigate to Airtable embed page
  }

  return (
    <div className="min-h-screen bg-[#1BB1E7]">
      <div className="p-4 flex flex-wrap justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-black/40 px-4 py-2 text-sm font-semibold text-white hover:bg-black/60 transition"
        >
          ← Back
        </Link>
      </div>

      <div className="mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Skiers Scavenger List
          </h1>
          <p className="mt-2 text-white/90">
            Check items off as you complete them. Once you’re ready, submit your
            photos via the form. Winners will be decided tonight at the Burger
            Bash!
          </p>

          {/* Team name */}
          <div className="mt-5 rounded-2xl bg-white/10 border border-white/25 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-white">
                <div className="text-sm font-semibold">Team Name</div>
                {teamName ? (
                  <div className="text-lg font-bold">{teamName}</div>
                ) : (
                  <div className="text-sm text-white/80"></div>
                )}
              </div>

              {/* Input + buttons */}
              <div className="flex flex-row items-center gap-2">
                <input
                  value={teamInput}
                  onChange={(e) => setTeamInput(e.target.value)}
                  placeholder="Enter team name"
                  className="w-full sm:w-64 rounded-xl px-3 py-2 text-sm text-black"
                />
                <button
                  type="button"
                  onClick={saveTeam}
                  className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white whitespace-nowrap"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={resetTeam}
                  className="rounded-xl border border-white/40 px-4 py-2 text-sm font-semibold text-white whitespace-nowrap"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-white font-semibold">
            Progress: {checkedCount}/{ITEMS.length} (need {MIN_TO_SUBMIT}+ to
            submit)
          </p>
        </div>

        {/* Checklist */}
        <ul className="space-y-3 rounded-2xl bg-white/10 border border-white/25 p-6">
          {ITEMS.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={Boolean(checked[item.id])}
                onChange={() => toggle(item.id)}
                className="mt-1 h-5 w-5"
              />
              <span
                className={`text-white ${
                  checked[item.id] ? "line-through opacity-80" : ""
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        {error ? <p className="mt-4 text-sm text-red-200">{error}</p> : null}

        {/* Submit */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href="/scavenger/submit"
            onClick={handleSubmitClick}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${
              canSubmit && teamName
                ? "bg-green-600"
                : "bg-black/40 cursor-not-allowed"
            }`}
          >
            Submit Photos
          </Link>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-4 text-white">
          <div className="text-sm rounded-xl border border-white/30 p-4 mb-6">
            <p className="mb-3">
              <span className="font-semibold">5 point photos:</span>
            </p>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Fresh tracks in untouched snow</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Snowmaking guns in action</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Trees frosted with snow</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span> Most trail signs in one shot.</span>
              </li>
            </ul>
          </div>

          <div className="text-sm rounded-xl border border-white/30 p-4">
            <p className="mb-3">
              <span className="font-semibold pt-6">
                Lodge shots (sign must be visible):
              </span>
            </p>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Sun Lodge</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Red Pine Lodge</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Tomstone BBQ</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span> Lookout Cabin</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span> Cloud Dine</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
