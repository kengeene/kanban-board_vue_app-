<template>
  <div>
    <el-dialog
      v-model="displayDialog"
      :title="`Edit ${form.taskType} ${taskId}`"
      data-test="dialog-title"
    >
      <el-form v-loading="loading" :model="form">
        <el-form-item label="Ticket Title">
          <el-input v-model="form.title" autocomplete="off" data-test="title-field"></el-input>
        </el-form-item>
        <el-form-item label="Task Type">
          <el-select
            v-model="form.taskType"
            data-test="task-type-dropdown"
            placeholder="Please select an task type"
          >
            <el-option
              v-for="(task, index) in taskTypes"
              :key="index"
              :label="task"
              :value="task"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Choose the task status">
          <el-select
            v-model="form.taskStatus"
            data-test="task-status-dropdown"
            placeholder="Select a status"
          >
            <el-option
              v-for="(status, index) in statuses"
              :key="index"
              :label="status.status"
              :value="status.status"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Assign the ticket">
          <el-select
            v-model="form.selectedUser"
            data-test="user-dropdown"
            placeholder="Please select a user to assign the ticket to"
            value-key="userId"
          >
            <el-option
              v-for="(user, index) in userList"
              :key="index"
              :value="user"
              :label="user.userFullName"
            >
            </el-option>
          </el-select>
          <span v-if="form.selectedUser"
            ><img
              :src="form.selectedUser.userAvatar"
              class="images__profile-avi images__profile-avi--details-card"
              data-test="user-profile-avi"
            />
          </span>
        </el-form-item>
        <span>
          <el-button @click="closeDialog()">Cancel</el-button>
          <el-button type="primary" data-test="confirmButton" @click="submitForm()"
            >Confirm</el-button
          >
        </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import useStatuses from "@/composibles/useStatuses";
import useTasks from "@/composibles/useTasks";
import useUsers from "@/composibles/useUsers";
import { useStore } from "vuex";
import useNotifications from "@/utils/notifications";

export default {
  name: "ShowTaskDialog",
  props: {
    showTaskDialog: {
      type: Boolean,
      default: false,
    },
    taskId: {
      type: String,
      default: "",
      required: true,
    },
  },
  setup(props, { emit }) {
    const displayDialog = ref(false);

    const form = ref({
      id: "",
      taskStatus: "",
      taskType: "",
      title: "",
      userAvatar: "",
      userFullName: "",
      userId: "",
    });
    const loading = ref(false);

    const { showNotification } = useNotifications();
    const { statusList: statuses } = useStatuses();
    const { taskTypes, edit: editTask, get: getTasks } = useTasks();
    const { users } = useUsers();
    const store = useStore();

    const taskDetails = computed(
      () =>
        store.getters.getTasks.filter((x) => {
          return x.id === props.taskId;
        })[0]
    );

    watch(
      () => props.showTaskDialog,
      (value) => {
        displayDialog.value = value;
      },
      {
        immediate: true,
      }
    );

    const closeDialog = () => {
      displayDialog.value = false;
      emit("closeDialog");
    };

    const submitForm = async () => {
      loading.value = true;
      try {
        const payload = {
          ...form.value,
          ...form.value.selectedUser,
        };

        delete payload.selectedUser;
        await editTask(payload);
        showNotification("success", `Successfully edited ${payload.id}`);
      } catch (e) {
        showNotification("error", "Failed editing task", e);
      } finally {
        loading.value = false;
        closeDialog();
      }
    };

    const userList = computed(() => {
      return users.value.map((x) => ({
        userAvatar: x.avatar,
        userFullName: x.fullName,
        userId: x.id,
      }));
    });

    const preFillForm = () => {
      form.value = {
        ...taskDetails.value,
        selectedUser: {
          userAvatar: taskDetails.value.userAvatar,
          userFullName: taskDetails.value.userFullName,
          userId: taskDetails.value.userId,
        },
      };
    };

    watch(
      () => taskDetails.value,
      () => {
        if (taskDetails.value) {
          preFillForm();
        }
      },
      { immediate: true }
    );

    onMounted(async () => {
      !taskDetails.value ?? (await getTasks());
    });

    return {
      closeDialog,
      displayDialog,
      loading,
      submitForm,
      form,
      statuses,
      taskTypes,
      userList,
    };
  },
};
</script>

<style lang="sass" scoped></style>
