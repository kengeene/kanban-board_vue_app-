import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      tasks: [],
    };
  },
  mutations: {
    setTasks(state, val) {
      state.tasks = val;
    },
  },
  actions: {},
  getters: {
    getTasks: (state) => state.tasks,
  },
});

export default store;
