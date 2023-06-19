<template>
  <div>
    <el-dialog
      v-model="displayDialog"
      :title="isEdit ? `Edit ${form.taskType} ${taskId}` : 'Create a task'"
      data-test="dialog-title"
      :destroy-on-close="true"
      :before-close="closeDialog"
    >
      <el-form
        ref="ruleFormRef"
        v-loading="loading"
        :model="form"
        label-width="170px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="Ticket Title" prop="title">
          <el-input v-model="form.title" autocomplete="off" data-test="title-field"></el-input>
        </el-form-item>
        <el-form-item label="Task Type" prop="taskType">
          <el-select
            v-model="form.taskType"
            data-test="task-type-dropdown"
            placeholder="Select a task type"
          >
            <el-option
              v-for="(task, index) in taskTypes"
              :key="index"
              :label="task"
              :value="task"
              :data-test="task"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Choose the task status" prop="taskStatus">
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
              :data-test="status.status"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Assign the ticket" prop="selectedUser">
          <el-select
            v-model="form.selectedUser"
            data-test="user-dropdown"
            placeholder="Select a user"
            value-key="userId"
          >
            <el-option
              v-for="(user, index) in userList"
              :key="index"
              :value="user"
              :label="user.userFullName"
              :data-test="`user-${index}`"
            >
            </el-option>
          </el-select>
          <span v-if="!!form.selectedUser.userId"
            ><img
              :src="form.selectedUser.userAvatar"
              class="images__profile-avi images__profile-avi--details-card"
              data-test="user-profile-avi"
            />
          </span>
        </el-form-item>
        <span>
          <el-button @click="closeDialog()">Cancel</el-button>
          <el-button type="primary" data-test="confirmButton" @click="submitForm(ruleFormRef)"
            >Confirm</el-button
          >
        </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch, reactive } from "vue";
import useStatuses from "@/composibles/useStatuses";
import useTasks from "@/composibles/useTasks";
import useUsers from "@/composibles/useUsers";
import { useStore } from "vuex";

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
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const displayDialog = ref(false);
    const ruleFormRef = ref();

    const form = ref({
      id: "",
      taskStatus: "Pending",
      taskType: "",
      title: "",
      userAvatar: "",
      userFullName: "",
      userId: "",
      selectedUser: {
        userAvatar: "",
        userFullName: "",
        userId: "",
      },
    });

    const validateSelectedUser = (rule, value, callback) => {
      if (value.userId === "") {
        callback(new Error("Please select a user to assign to"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      selectedUser: [{ validator: validateSelectedUser, trigger: "blur" }],
      title: [{ required: true, message: "Please input a title", trigger: "blur" }],
      taskType: [{ required: true, message: "Please select a task type", trigger: "blur" }],
      taskStatus: [
        {
          required: true,
          message: "Please select a task status",
        },
      ],
    });

    const loading = ref(false);

    const { statusList: statuses } = useStatuses();
    const { taskTypes, edit: editTask, get: getTasks, create: createTask } = useTasks();
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

    const handlePayload = async (payload) => {
      loading.value = true;
      try {
        props.isEdit ? await editTask(payload) : await createTask(payload);
      } catch (e) {
        return e;
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
        if (taskDetails.value && props.isEdit) {
          preFillForm();
        }
      },
      { immediate: true }
    );

    onMounted(async () => {
      !taskDetails.value ?? (await getTasks());
    });

    const submitForm = async (formEl) => {
      if (!formEl) return;
      // eslint-disable-next-line no-unused-vars
      await formEl.validate((valid, fields) => {
        if (valid) {
          const payload = {
            ...form.value,
            ...form.value.selectedUser,
          };

          delete payload.selectedUser;
          handlePayload(payload);
        } else {
          return;
        }
      });
    };

    return {
      validateSelectedUser,
      rules,
      ruleFormRef,
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
