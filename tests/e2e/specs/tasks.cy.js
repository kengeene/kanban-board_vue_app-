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

  it("Should be able to edit a task", () => {
    cy.visit("/");
    cy.getByData("task-IJT-566-title").click();
    cy.getByData("dialog-title").should("contain", "Edit Bug IJT-566");

    cy.getByData("title-field").clear();
    cy.getByData("title-field").type("This is a test");
    cy.getByData("confirmButton").click();
    cy.wait("@editedTask").then((interception) => {
      assert.deepEqual(interception.request.body, {
        id: "IJT-566",
        taskStatus: "Pending",
        taskType: "Bug",
        title: "This is a test",
        userAvatar:
          "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/138.jpg",
        userFullName: "Essie Roberts",
        userId: "d83f4f56-3f79-48f4-9bdc-cd16c07c4e45",
      });
    });
    cy.getByData("dialog-title").should("not.exist");
    cy.get(".notification").should("contain.text", "Successfully edited IJT-566");
  });
});
