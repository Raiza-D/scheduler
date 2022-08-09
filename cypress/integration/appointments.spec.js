// Appointment tests
describe("Appointments", () => {

  it("should book an interview", () => {
    cy.visit("/");
    
    cy.contains("li", "Monday")
  })

});