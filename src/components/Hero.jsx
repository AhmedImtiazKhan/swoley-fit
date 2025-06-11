import React from "react";
import Button from "./Button";
import { Brain, Zap, Target } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="text-blue-400" size={32} />
          <p className="text-blue-400 font-medium">AI-POWERED FITNESS</p>
        </div>
        <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Swole<span className="text-blue-400">normous</span>
        </h1>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <Zap className="text-yellow-400" size={20} />
            <span className="text-sm text-yellow-400">Smart Workouts</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="text-green-400" size={20} />
            <span className="text-sm text-green-400">AI Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="text-purple-400" size={20} />
            <span className="text-sm text-purple-400">Personal Trainer</span>
          </div>
        </div>
      </div>
      <p className="text-sm md:text-base font-light">
        I hereby acknowledge that I may become{" "}
        <span className="text-blue-400 font-medium">
          unbelievably swolenormous
        </span>{" "}
        with the help of cutting-edge AI technology, and accept all risks of becoming the local{" "}
        <span className="text-blue-400 font-medium">mass monstrosity</span>,
        afflicted with severe body dysmorphia, unable to fit through doors, 
        <span className="text-green-400 font-medium"> but with scientifically optimized gains</span>.
      </p>
      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-4">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">🤖 AI Features</h3>
        <ul className="text-sm space-y-1 text-slate-300">
          <li>✨ Intelligent workout generation</li>
          <li>🧠 Real-time form analysis & tips</li>
          <li>💬 24/7 AI personal trainer chat</li>
          <li>📊 Smart progress insights</li>
        </ul>
      </div>
      <Button
        func={() => {
          window.location.href = "#generate";
        }}
        text={"Accept & Begin AI Training"}
      ></Button>
    </div>
  );
}
