import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = [];

  const setDay = day => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    axios.get(daysURL).then((response) => {
      console.log(response.data);
      setDays(response.data);
    });
  }, []);
  
  const appointmentsList =
    Object.values(dailyAppointments).map((appointment) => {
      return (
          <Appointment
            key={appointment.id}
            {...appointment}
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
