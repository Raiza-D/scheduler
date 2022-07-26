import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewersList = getInterviewersForDay(state, state.day);

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    const daysURL = "/api/days";
    const apptsURL = "/api/appointments/";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(daysURL),
      axios.get(apptsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
      .catch(error => {
        console.log(error.message);
      })
  }, []);

  // axios.get(daysURL).then((response) => {
  //   console.log(response.data);
  //   // setDays(response.data);
  // });

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => {
        console.log(response);
        setState({...state, appointments});
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
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
