"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ONBOARDING_STEPS, SKIPPED } from "@/lib/onboardingSteps";
import { setStoredOnboarding } from "@/lib/frontendData";

const INTRO = "intro";
const SUMMARY = "summary";

export default function OnboardingPage() {
  const router = useRouter();

  const [phase, setPhase] = useState(INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(
    ONBOARDING_STEPS.find((s) => s.field === "stress")?.default ?? 50
  );
  const [error, setError] = useState("");

  const currentStep = ONBOARDING_STEPS[currentIndex];

  function saveAnswer(field, value) {
    setError("");
    try {
      setStoredOnboarding({ [field]: value });
    } catch (err) {
      console.error(err);
      setError("Couldn't save that answer, but you can continue.");
    }
  }

  function markComplete() {
    try {
      setStoredOnboarding({ complete: true });
    } catch (err) {
      console.error(err);
    }
  }

  function goToNextStep() {
    const isStressStep = currentStep.field === "stress";
    if (isStressStep) {
      setPhase("stats");
      return;
    }
    advancePastCurrent();
  }

  function advancePastCurrent() {
    if (currentIndex + 1 < ONBOARDING_STEPS.length) {
      setCurrentIndex(currentIndex + 1);
      setPhase("question");
    } else {
      markComplete();
      setPhase(SUMMARY);
    }
  }

  function handleChoiceSelect(value) {
    saveAnswer(currentStep.field, value);
    goToNextStep();
  }

  function handleSkip() {
    saveAnswer(currentStep.field, SKIPPED);
    goToNextStep();
  }

  function handleSliderContinue() {
    saveAnswer("stress", sliderValue);
    goToNextStep();
  }

  function handleStatsContinue() {
    advancePastCurrent();
  }

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-gradient-to-br from-violet-50 via-white to-blue-50 px-4 py-6 sm:py-10">
      <div className="soft-card-strong w-full max-w-md rounded-[30px] p-6 sm:p-10">
        <div className="flex flex-col items-center text-center mb-6">
          <Image
            src="/symbol.jpeg"
            alt="Zenvest Logo"
            width={56}
            height={56}
            className="rounded-2xl mb-2"
          />
          <h1 className="text-xl font-bold zv-gradient-text">Zenvest</h1>
        </div>

        {phase === INTRO && (
          <IntroScreen
            onStart={() => setPhase("question")}
            onSkipToDashboard={() => {
              markComplete();
              router.push("/dashboard");
            }}
          />
        )}

        {phase === "question" && currentStep.type === "choice" && (
          <ChoiceScreen
            step={currentStep}
            onSelect={handleChoiceSelect}
            onSkip={handleSkip}
            stepNumber={currentIndex + 1}
            totalSteps={ONBOARDING_STEPS.length}
          />
        )}

        {phase === "question" && currentStep.type === "slider" && (
          <SliderScreen
            step={currentStep}
            value={sliderValue}
            onChange={setSliderValue}
            onContinue={handleSliderContinue}
            onSkip={handleSkip}
            stepNumber={currentIndex + 1}
            totalSteps={ONBOARDING_STEPS.length}
          />
        )}

        {phase === "stats" && (
          <StatsScreen message={currentStep.statsMessage} onContinue={handleStatsContinue} />
        )}

        {phase === SUMMARY && (
          <SummaryScreen onContinue={() => router.push("/dashboard")} />
        )}

        {error && <p className="text-xs text-amber-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

function ProgressBar({ stepNumber, totalSteps }) {
  const percentage = Math.round((stepNumber / totalSteps) * 100);
  return (
    <div className="w-full h-1.5 bg-zv-gray-100 rounded-full mb-6 overflow-hidden">
      <div
        className="h-full zv-gradient transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

function IntroScreen({ onStart, onSkipToDashboard }) {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        To understand your personal situation, we have a few questions.
      </h2>
      <p className="text-sm text-zv-gray-400 mb-6">
        You can skip if you do not feel like answering and your answer won&apos;t
        be stored or shared.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={onStart}
          className="w-full py-3 rounded-xl zv-gradient text-white font-semibold shadow-lg shadow-violet-200 hover:-translate-y-0.5 transition"
        >
          Start
        </button>
        <button
          onClick={onSkipToDashboard}
          className="w-full py-2.5 text-sm text-zv-gray-400 hover:text-gray-600 transition"
        >
          Skip to Dashboard
        </button>
      </div>
    </div>
  );
}

function ChoiceScreen({ step, onSelect, onSkip, stepNumber, totalSteps }) {
  return (
    <div>
      <ProgressBar stepNumber={stepNumber} totalSteps={totalSteps} />
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">{step.title}</h2>
      <div className="flex flex-col gap-3">
        {step.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full py-3 px-4 rounded-xl border-2 border-zv-gray-200 text-gray-700 font-medium hover:border-zv-primary hover:text-zv-primary transition text-left"
          >
            {opt.label}
          </button>
        ))}
        <button
          onClick={onSkip}
          className="w-full py-2.5 text-sm text-zv-gray-400 hover:text-gray-600 transition"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

function SliderScreen({ step, value, onChange, onContinue, onSkip, stepNumber, totalSteps }) {
  return (
    <div>
      <ProgressBar stepNumber={stepNumber} totalSteps={totalSteps} />
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">{step.title}</h2>
      <input
        type="range"
        min={step.min}
        max={step.max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mb-4 accent-violet-500"
      />
      <p className="text-center text-sm text-gray-600 mb-6 min-h-[1.5rem]">
        {step.messageFor(value)}
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={onContinue}
          className="w-full py-3 rounded-xl zv-gradient text-white font-semibold shadow-lg shadow-violet-200 hover:-translate-y-0.5 transition"
        >
          Continue
        </button>
        <button
          onClick={onSkip}
          className="w-full py-2.5 text-sm text-zv-gray-400 hover:text-gray-600 transition"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

function StatsScreen({ message, onContinue }) {
  return (
    <div className="text-center">
      <p className="text-gray-700 mb-6 leading-relaxed">{message}</p>
      <button
        onClick={onContinue}
        className="w-full py-3 rounded-xl zv-gradient text-white font-semibold shadow-lg shadow-violet-200 hover:-translate-y-0.5 transition"
      >
        Continue
      </button>
    </div>
  );
}

function SummaryScreen({ onContinue }) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        From now on, it is clear, it will be crystal clear. ðŸŒŸ
      </h2>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        All of your spending will be analyzed and summarized. Now all your
        finances are in good hands, and we&apos;ll help you make smarter decisions.
      </p>
      <button
        onClick={onContinue}
        className="w-full py-3 rounded-xl zv-gradient text-white font-semibold shadow-lg shadow-violet-200 hover:-translate-y-0.5 transition"
      >
        Continue to Dashboard
      </button>
    </div>
  );
}
