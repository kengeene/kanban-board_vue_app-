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

  it("Should be able to open a task using a shared link", () => {
    cy.visit("/?open=IJT-566");
    cy.getByData("dialog-title").should("contain", "Edit Bug IJT-566");
  });

  it("should be able to create a task", () => {
    cy.visit("/");
    cy.getByData("create-task-button").click();
    cy.getByData("user-profile-avi").should("not.exist");
    cy.getByData("title-field").type("Finish working on the Kanban app");
    cy.getByData("task-type-dropdown").click();
    cy.getByData("Bug").click();
    cy.getByData("task-status-dropdown").click();
    cy.getByData("Pending").click();
    cy.getByData("user-dropdown").click();
    cy.getByData("user-0").click();
    cy.getByData("user-profile-avi").should("exist");
    cy.getByData("confirmButton").click();
    cy.wait("@createTasks").then((interception) => {
      const taskId = interception.request.body.id;
      assert.deepEqual(interception.request.body, {
        id: taskId,
        taskStatus: "Pending",
        taskType: "Bug",
        title: "Finish working on the Kanban app",
        userId: "4907477f-6545-4e99-bfc3-340940202078",
        userFullName: "Sylvester Purdy II",
        userAvatar:
          "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/365.jpg",
      });
      cy.get(".notification").should("contain.text", `Successfully created ${taskId}`);
      cy.getByData("dialog-title").should("not.exist");
    });
  });
});
