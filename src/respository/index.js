const { faker } = require('@faker-js/faker');

module.exports = () => {
  const data = {
    tasks: [],
    users: [],
    taskStatuses: [{ id: 1, status: 'Pending' }, { id: 2, status: 'In Progress' }, { id: 3, status: 'In QA' }, { id: 4, status: 'Done' }],
    taskTypes: ['Bug', 'Feature'],
  };

  for (let i = 0; i < 10; i++) {
    data.users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
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
      taskId: faker.string.alphanumeric({ casing: 'upper', length: 3 }) + faker.string.numeric(3),
      taskStatus: faker.helpers.arrayElement(data.taskStatuses),
      userId: data.users[randomUsersindex].id,
      userAvatar: data.users[randomUsersindex].avatar,
    });
  }
  return data;
};
