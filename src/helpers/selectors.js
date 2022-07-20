// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//     },
//   ],
//   appointments: {
//     1: { id: 1, time: "12pm", interview: null },
//     2: { id: 2, time: "1pm", interview: null },
//     3: {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 },
//     },
//     4: { id: 4, time: "3pm", interview: null },
//     5: {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 },
//     },
//   },
// };


// Reminder: add 'export' to export function

export function getAppointmentsForDay(state, day) {
  let appts = [];

  state.days.forEach((elem) => {
    if (elem.name === day) {
      appts = elem.appointments;
    } 
  })

  const allAppts = [];

  for (const appt of appts) {
    if (state.appointments[appt]) {
      allAppts.push(state.appointments[appt])
    }
  }
  return allAppts;

  // const daysArr = state.days;
  // const apptsObj = state.appointments;

  // for (const elem of daysArr) {
  //   if (elem === day) {
  //     for (const appt in apptsObj) {
  //       return appt === apptsObj
  //     }
  //   }
  // }
};

// console.log(getAppointmentsForDay(state, "Wednesday"))
