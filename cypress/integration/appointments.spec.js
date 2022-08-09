// Appointment tests
describe("Appointments", () => {

  it("should book an interview", () => {
    cy.visit("/");

    cy.contains("li", "Monday") // What's the difference w/ only having Monday?

    cy.get("[alt=Add]")
      .first()
      .click();
  });

});