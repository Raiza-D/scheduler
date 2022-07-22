import { React, useState } from "react";

const useVisualMode = (value) => {
  const [state, setState] = useState(state);

  const resultsObj = setState(value);

  return resultsObj;

};

export default useVisualMode;