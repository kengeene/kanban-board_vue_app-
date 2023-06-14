import { getTasks, getTaskTypes } from "@/api/tasks";
import useNotifications from "@/utils/notifications";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

const useTasks = () => {
  const taskList = ref([]);
  const { showNotification } = useNotifications();
  const store = useStore();
  const search = ref("");
  const taskTypes = computed(() => store.getters.getTaskTypes);

  onMounted(async () => {
    await getAllTaskTypes();
  });

  const get = async () => {
    try {
      const { data } = await getTasks();
      store.commit("setTasks", data);
      taskList.value = data;
    } catch (e) {
      showNotification("error", "Failed fetching taks", e);
    }
  };

  const updateTaskStatuses = (tasksToUpdate, updateStatus) => {
    try {
      const filteredTasks = tasksToUpdate.filter((x) => {
        return x.taskStatus !== updateStatus;
      });

      for (const task of filteredTasks) {
        task.taskStatus = updateStatus;
        showNotification(
          "success",
          `Successfully updated task ${task.id}`,
          `To status '${updateStatus}'`
        );
      }
    } catch (e) {
      showNotification("error", "Failed updating tasks", e);
    }
  };

  const getAllTaskTypes = async () => {
    try {
      const { data } = await getTaskTypes();
      store.commit("setTaskTypes", data);
    } catch (e) {
      showNotification("error", "Failed fetching taks", e);
    }
  };

  return {
    taskTypes,
    get,
    taskList,
    search,
    updateTaskStatuses,
  };
};

export default useTasks;
