import { getUsers } from "@/api/users";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const useUsers = () => {
  const store = useStore();
  const users = computed(() => store.getters.getUsers);

  onMounted(async () => {
    await get();
  });

  const get = async () => {
    try {
      const { data } = await getUsers();
      store.commit("setUsers", data);
    } catch (error) {
      console.warn("Failed to fetch users");
    }
  };

  return { get, users };
};

export default useUsers;
