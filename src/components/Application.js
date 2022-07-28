import React from "react";

/* Import styling */
import "components/Application.scss";

/* Import dependency components*/
import DayList from "./DayList";
import Appointment from "components/Appointment";

/* Import helper functions and custom hooks */
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewersList = getInterviewersForDay(state, state.day);

  const appointmentsList =
    dailyAppointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
          <Appointment
            key={appointment.id}
            {...appointment}
            interview={interview}
            interviewers={interviewersList}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
      );
    });
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}

        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
