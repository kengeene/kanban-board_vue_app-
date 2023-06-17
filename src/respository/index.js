const { faker } = require("@faker-js/faker");
import { generateProjectId } from "@/utils/text.js";

module.exports = () => {
  const data = {
    tasks: [],
    users: [],
    taskStatuses: [
      { id: 1, status: "Pending" },
      { id: 2, status: "In Progress" },
      { id: 3, status: "In QA" },
      { id: 4, status: "Done" },
    ],
    taskTypes: ["Bug", "Feature"],
  };

  for (let i = 0; i < 10; i++) {
    data.users.push({
      id: faker.string.uuid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
    });
  }

  for (let i = 0; i < 15; i++) {
    // To help randomly assign a user to tasks
    const randomUsersindex = Math.floor(Math.random() * data.users.length);

    data.tasks.push({
      title: faker.lorem.words(5),
      taskType: faker.helpers.arrayElement(data.taskTypes),
      id: generateProjectId(),
      taskStatus: faker.helpers.arrayElement(data.taskStatuses.map((x) => x.status)),
      userId: data.users[randomUsersindex].id,
      userAvatar: data.users[randomUsersindex].avatar,
      userFullName: data.users[randomUsersindex].fullName,
    });
  }
  return data;
};
