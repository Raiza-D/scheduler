import React from "react";

import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../src/hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  
  return (
    <article className="appointment">
      <Header id={props.id} time={props.time}/>
      {props.interview ? <Show id={props.id} time={props.time} student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty id={props.id} time={props.time} />}
    </article>
  );
}