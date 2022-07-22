import { React, useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode) {
    // setMode(mode);

    const newHistory = [...history];
    newHistory.push(mode);
    setHistory(newHistory);
  }

  function back() {
    if (history.length === 1) {
      return;
    }

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    // setMode(newHistory[newHistory.length - 1]);
  }

  const mode = history[history.length - 1];

  return { mode, transition, back };
}
