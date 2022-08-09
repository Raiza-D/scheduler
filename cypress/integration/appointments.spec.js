// Appointment tests
describe("Appointments", () => {

  it("should book an interview", () => {

    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("li", "Monday") // What's the difference w/ only having Monday?

    cy.get("[alt=Add]") // We use first() func bc we hide the second Add button. Where is the code for this?
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']") // Why is Sylvia Palmer in single quotes?
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Sylvia Palmer"); // This is checking Sylvia Palmer for the first appointment. How do I check for Sylvia Palmer in the second and CORRECT appointment?

  });

});