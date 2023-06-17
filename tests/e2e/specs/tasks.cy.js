// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  beforeEach(() => {
    cy.appStubs();
  });

  it("Should be able to drag a task", () => {
    cy.visit("/");
    cy.getByData("pending-column").children().should("have.length", 3);
    cy.get(".task-4GE-532").drag(".pending-column");
    cy.getByData("pending-column").children().should("have.length", 4);
    cy.wait("@editedTask").then(() => {
      cy.get(".notification").should("contain", "Successfully updated task 4GE-532");
    });
  });
});
