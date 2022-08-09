// Appointment tests
describe("Appointments", () => {

  it("should book an interview", () => {
    cy.visit("/");

    cy.contains("li", "Monday") // What's the difference w/ only having Monday?

    cy.get("[alt=Add]") // We use first() func bc we hide the second Add button. Where is the code for this?
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
  });

});