import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Workout from "./components/Workout";
import Generator from "./components/Generator";
import Hero from "./components/Hero";

function App(props) {
  const [workout, setWorkout] = useState(null);
  const [muscles, setMuscles] = useState([]); // Initialize state for muscles
  const [poison, setPoison] = useState("individual"); // Initialize state for poison
  const [goal, setGoal] = useState("strength_power"); // Initialize state for goal
  // const [workout, setWorkout] = useState(null); // Initialize workout state
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator
        poison={poison}
        setPoison={setPoison}
        goal={goal}
        setGoal={setGoal}
        muscles={muscles}
        setMuscles={setMuscles}
      />
      {workout && <Workout workout={workout} />}
    </main>
  );
}

export default App;
