import { getUsers } from "@/api/users";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import useNotifications from "@/utils/notifications";

const useUsers = () => {
  const { showNotification } = useNotifications();
  const store = useStore();
  const users = computed(() => store.getters.getUsers);

  onMounted(async () => {
    await get();
  });

  const get = async () => {
    try {
      const { data } = await getUsers();
      store.commit("setUsers", data);
    } catch (e) {
      showNotification("error", "Failed fetching taks", e);
    }
  };

  return { get, users };
};

export default useUsers;
