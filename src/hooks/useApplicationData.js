import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const daysURL = "/api/days";
    const apptsURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(daysURL),
      axios.get(apptsURL),
      axios.get(interviewersURL),
    ])
      .then((all) => {
        console.log(all);
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days: updateSpots(state, appointments) });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(state, appointments),
      });
    });
  }

  function updateSpots(state, appointments) {
    return state.days.map((elem) => {
      if (elem.name === state.day) {
        return {
          ...elem,
          spots: elem.appointments
            .map((appointment) => appointments[appointment])
            .filter(({ interview }) => !interview).length
        };
      }

      return elem;
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
