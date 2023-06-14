import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      tasks: [],
      statuses: [],
      taskTypes: [],
      users: [],
    };
  },
  mutations: {
    setTasks(state, val) {
      state.tasks = val;
    },
    setStatuses(state, val) {
      state.statuses = val;
    },
    setTaskTypes(state, val) {
      state.taskTypes = val;
    },
    setUsers(state, val) {
      state.users = val;
    },
  },
  actions: {},
  getters: {
    getTasks: (state) => state.tasks,
    getStatuses: (state) => state.statuses,
    getTaskTypes: (state) => state.taskTypes,
    getUsers: (state) => state.users,
  },
});

export default store;
