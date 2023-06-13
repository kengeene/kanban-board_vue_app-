import { getTasks } from '@/api/tasks';
import useNotifications from '@/utils/notifications';
import { ref } from 'vue';

const useTasks = () => {
  const taskList = ref([]);
  const { showNotification } = useNotifications();

  const get = async () => {
    try {
      const { data } = await getTasks();
      taskList.value = data;
    } catch (e) {
      showNotification('error', 'Failed fetching taks', e);
    }
  };

  return {
    get,
    taskList,
  };
};

export default useTasks;
