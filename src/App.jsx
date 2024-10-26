import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Workout from "./components/Workout";
import Generator from "./components/Generator";
import Hero from "./components/Hero";

function App() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator />
      <Workout />
    </main>
  );
}

export default App;
