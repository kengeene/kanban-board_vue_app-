# Description
A minimalistic Kanban board on which you can create, view and move tickets between columns.

The user should:

- be able to create tickets on the board.
- be able to move tickets between the various columns in an interactive way, persisting across page refreshes.
- be able to share a direct link to the ticket.


Deployment Status: [![Netlify Status](https://api.netlify.com/api/v1/badges/679e3035-c66d-4ff4-a7e2-b6da0a9bc2ee/deploy-status)](https://app.netlify.com/sites/jovial-madeleine-2e845c/deploys)

Live Link: https://jovial-madeleine-2e845c.netlify.app/
# Tools used
- Vue.js
- Element UI
- Jest
- Cypress
- SASS
- JSON Server
- Faker
- vuedraggable
- eslint
- Prettier
- AdonisJs(Server)
- Fly.io(Backend App deployment)
- Netlify(Frontend App deployment)

# API Server
When running the server locally, json-server is used to generate mock data and the endpoints needed for the app to run. For the app running in the production environment(https://jovial-madeleine-2e845c.netlify.app/), it's pointing to a Node(https://kanban-adonis-api.fly.dev/) application deployed on Fly.io

# Testing

This project has both Unit tests(JEST) and E2E Tests(Cypress). They cover all of the scenarios explaied in the description. The tests run will run everytime a push event occurs on a branch this is made possible by Github actions.

# Folder Structure
Here is a breakdown of all of the folders within the src directory:

-src
    |
    api - This folder contains all of the endpoints needed
    |
    assets - This folder contains all assets the application needs
    |
    components - Contains all of the different components needed for the app
    |
    composibles - This folder contains all of the compsibles/business logic
    |
    repository - This is where the mock data is kept used when running the app locally
    |
    router - This file creates all the routes
    |
    store - This file contains the Vuex store
    |
    utils - This folder contains utility helper methods
    |
    views - This folder contains the application views

# Appreciation
Thank you for taking your time to go through the project, if you have any useful/helpful tips on how I can make the project even more awesome feel free to reach me on kengeene@gmail.com