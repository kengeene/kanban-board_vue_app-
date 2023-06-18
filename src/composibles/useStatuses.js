import { getStatuses } from "@/api/tasks";
import useNotifications from "@/utils/notifications";
import { computed } from "vue";
import { useStore } from "vuex";

const useStatuses = () => {
  const { showNotification } = useNotifications();
  const store = useStore();
  const statusList = computed(() => store.getters.getStatuses);

  const get = async () => {
    try {
      const { data } = await getStatuses();
      store.commit("setStatuses", data);
    } catch (e) {
      showNotification("error", "Failed fetching statuses", e);
    }
  };

  return {
    get,
    statusList,
  };
};

export default useStatuses;
