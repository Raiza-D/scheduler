# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors.

Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted.

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted.

`React` was used to build the front end of this project. Requests are sent to an API to fetch and store appointment data from a database.


## Final Product
!["Form to add a new appointment"](https://github.com/Raiza-D/scheduler/blob/master/docs/Scheduler_newappt.png?raw=true)
!["Newly added appointment for Monday"](https://github.com/Raiza-D/scheduler/blob/master/docs/Scheduler_savedappt.png?raw=true)
!["Leftside navbar showing highlight modes on hover and when there are no time slots available for a day"](https://github.com/Raiza-D/scheduler/blob/master/docs/Scheduler_navbar.png?raw=true)
!["Message confirming if user wants to proceed with deleting appointment"](https://github.com/Raiza-D/scheduler/blob/master/docs/Scheduler_delete.png?raw=true)


## Getting Started
1. Install dependencies with `npm install`

2. Open two Terminal windows
  - Run the Webpack Development Server with `npm start`
  - Run the scheduler-API server with `npm start`

3. Once the two servers are running, open Google Chrome. The app will be served at `http://localhost:8000`


## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
