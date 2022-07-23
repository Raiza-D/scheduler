import { React, useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    // setMode(mode);

    // const newHistory = [...history];
    // newHistory.push(mode);
    
    if (replace) {
      // newHistory.pop();
      // newHistory.push(mode);
      setHistory(prev => [...prev.slice(0, -1), mode])
    } else {
      setHistory(prev => [...prev, mode]);
    }
  }

  function back() {
    if (history.length <= 1) {
      return;
    }

    setHistory((prev) => [...prev.slice(0, -1)]);

    // const newHistory = [...history];
    // newHistory.pop();
    // setHistory(newHistory);
    // setMode(newHistory[newHistory.length - 1]);
  }


  return { mode: history[history.length - 1], transition, back };
}

// Set React states using callbacks inside setState callbacks
