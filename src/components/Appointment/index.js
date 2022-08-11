import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "Are you sure you would like to delete?";
const EDIT = "EDIT";
const ERROR_SAVE = "Could not save appointment";
const ERROR_DELETE = "Could not delete appointment";


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
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      })
  }

  function deleteAppt() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message={SAVING} />}

      {mode === CONFIRM && (
        <Confirm
          message={CONFIRM}
          onCancel={() => back()}
          onConfirm={deleteAppt}
        />
      )}

      {mode === DELETING && <Status message={DELETING} />}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (<Error message={ERROR_SAVE} onClose={back}/>)}

      {mode === ERROR_DELETE && (<Error message={ERROR_DELETE} onClose={back}/>)}

    </article>
  );
}