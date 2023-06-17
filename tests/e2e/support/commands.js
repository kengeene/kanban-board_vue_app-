// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "@4tw/cypress-drag-drop";
import tasks from "../fixtures/tasks.json";
import users from "../fixtures/users.json";

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.on("uncaught:exception", () => {
  return false;
});

Cypress.Commands.add("appStubs", () => {
  cy.intercept("**/taskTypes", {
    statusCode: 200,
    body: tasks.taskTypes,
    times: 1,
  }).as("taskTypes");
  cy.intercept("**/taskStatuses", {
    statusCode: 200,
    body: tasks.taskStatuses,
    times: 1,
  }).as("taskStatuses");
  cy.intercept("GET", "**/tasks", {
    statusCode: 200,
    body: tasks.tasks,
    times: 1,
  }).as("tasks");
  cy.intercept("GET", "**/users", {
    statusCode: 200,
    body: users.users,
    times: 1,
  }).as("users");
  cy.intercept("PUT", "**/tasks/**", {
    statusCode: 200,
  }).as("editedTask");
  cy.intercept("POST", "**/tasks", {
    statusCode: 201,
  }).as("createTasks");
});
