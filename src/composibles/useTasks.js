import { getTasks } from '@/api/tasks';
import useNotifications from '@/utils/notifications';
import { ref } from 'vue';
import { useStore } from 'vuex';

const useTasks = () => {
  const taskList = ref([]);
  const { showNotification } = useNotifications();
  const store = useStore();
  const search = ref('');

  const get = async () => {
    try {
      const { data } = await getTasks();
      store.commit('setTasks', data);
      taskList.value = data;
    } catch (e) {
      showNotification('error', 'Failed fetching taks', e);
    }
  };

  return {
    get,
    taskList,
    search,
  };
};

export default useTasks;
