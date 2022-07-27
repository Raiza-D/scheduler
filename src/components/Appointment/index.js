import React from "react";

import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const DELETING = "DELETING";
const CONFIRM = "Are you sure you would like to delete?";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then((response) => {
        transition(SHOW);
      })
  }

  function deleteAppt() {
    transition(DELETING);

    props.cancelInterview(props.id)
      .then((response) => {
        transition(EMPTY);
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => console.log("Clicked onEdit")}
        onDelete={() => transition(CONFIRM)}
        />
        )}

      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />)}

      {mode === SAVING && (<Status message={SAVING}/>)}

      {mode === CONFIRM && (<Confirm message={CONFIRM} onCancel={() => back()} onConfirm={deleteAppt}/>)}

      {mode === DELETING && (<Status message={DELETING}/>)}

    </article>
  );
}