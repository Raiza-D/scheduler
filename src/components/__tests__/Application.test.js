import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // Checks that Monday's spots remaining has been reduced by 1
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });


  it(
    "loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    // Check that DayListItem with the text "Monday" also has the text "2 spots remaining" (that spots remaining increased by 1).
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));
    
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    fireEvent.change(
        getByPlaceholderText(appointment, /Enter student name/i),
        {
          target: { value: "Alice Wonderland" },
        }
      );

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Edit"));

    // Check that DayListItem with the text "Monday" still has the text "2 spots remaining" (that spots remaining remains unchanged).
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  // Checks that Save error appears when appt failed to save
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

//   Render the Application.
     const { container } = render(<Application />);

     //wait till data loads before setting appointment variable
     await waitForElement(() => getByText(container, "Archie Cohen"));
     const appointments = getAllByTestId(container, "appointment");
     const appointment = appointments[0];
 
     // Click the "Add" button on the first empty appointment.
     fireEvent.click(getByAltText(appointment, "Add"));
 
     // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
     fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), {
       target: { value: "Lydia Miller-Jones" }
     });
 
     // Click the first interviewer in the list.
     fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
 
     // Click the "Save" button on that same appointment.
     fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /SAVING/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Could not save appointment"));
    
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument;
  });

  // Checks that Delete error appears when appt deletion fails
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments.find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Confirm")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, /DELETING/i)).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Could not delete appointment")
    );

    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument;
  });
  
});



