/* eslint-disable no-async-promise-executor */
import { editTask, getTasks, getTaskTypes } from "@/api/tasks";
import useNotifications from "@/utils/notifications";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import useStatus from "@/composibles/useStatuses";

const useTasks = () => {
  const search = ref("");

  const { showNotification } = useNotifications();
  const { statusList: statuses } = useStatus();

  const store = useStore();
  const taskTypes = computed(() => store.getters.getTaskTypes);
  const sortedTasks = computed(() => store.getters.getSortedTasks);
  const taskList = computed(() => store.getters.getTasks);

  onMounted(async () => {
    await getAllTaskTypes();
  });

  const get = async () => {
    try {
      const { data } = await getTasks();
      store.commit("setTasks", data);
      const sortedTasks = [];
      statuses.value.forEach((status) => {
        sortedTasks.push({
          title: status.status,
          tickets: taskList.value.filter((task) => task.taskStatus === status.status),
        });
      });
      store.commit("setSortedTasks", sortedTasks);
    } catch (e) {
      showNotification("error", "Failed fetching taks", e);
    }
  };

  const updateTaskStatuses = async (tasksToUpdate, updateStatus) => {
    try {
      const filteredTasks = tasksToUpdate.filter((x) => {
        return x.taskStatus !== updateStatus;
      });

      for (const task of filteredTasks) {
        task.taskStatus = updateStatus;
        await editTask(task);
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

  const edit = async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { status } = await editTask(payload);
        if (status == 200) {
          await get();
          resolve();
        }
      } catch (e) {
        showNotification("error", "Failed editing task", e);
        reject(e);
      }
    });
  };

  return {
    edit,
    taskTypes,
    get,
    taskList,
    search,
    updateTaskStatuses,
    sortedTasks,
  };
};

export default useTasks;
