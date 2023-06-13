import { getStatuses } from '@/api/statuses';
import useNotifications from '@/utils/notifications';
import { ref } from 'vue';

const useStatuses = () => {
  const statusList = ref([]);
  const { showNotification } = useNotifications();
  const get = async () => {
    try {
      const { data } = await getStatuses();
      statusList.value = data;
    } catch (e) {
      showNotification('error', 'Failed fetching statuses', e);
    }
  };

  return {
    get,
    statusList,
  };
};

export default useStatuses;
