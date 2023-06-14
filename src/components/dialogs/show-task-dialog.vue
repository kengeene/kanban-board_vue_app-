<template>
  <div>
    <el-dialog v-model="displayDialog" :title="`Edit ${form.taskType} ${taskId}`">
      <el-form :model="form">
        <el-form-item label="Ticket Title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Task Type">
          <el-select v-model="form.taskType" placeholder="Please select an task type">
            <el-option
              v-for="(task, index) in taskTypes"
              :key="index"
              :label="task"
              :value="task"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Choose the task status">
          <el-select v-model="form.taskStatus" placeholder="Select a status">
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
            v-model="form.userUid"
            placeholder="Please select a user to assign the ticket to"
          >
            <el-option
              v-for="(user, index) in users"
              :key="index"
              :label="user.name"
              value="user"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">Cancel</el-button>
        <el-button type="primary" @click="displayDialog = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reactive } from "vue";
import useStatuses from "@/composibles/useStatuses";
import useTasks from "@/composibles/useTasks";
import useUsers from "@/composibles/useUsers";

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
  setup() {
    const form = reactive({
      title: "",
      taskType: "",
      taskStatus: "",
      userUid: "",
    });

    const { statusList: statuses } = useStatuses();
    const { taskTypes } = useTasks();
    const { users } = useUsers();

    return {
      form,
      statuses,
      taskTypes,
      users,
    };
  },
  data() {
    return {
      displayDialog: false,
    };
  },
  watch: {
    showTaskDialog: {
      handler: function (value) {
        this.displayDialog = value;
      },
      immediate: true,
    },
  },
  methods: {
    closeDialog() {
      this.displayDialog = false;
      this.$emit("closeDialog");
    },
  },
};
</script>

<style lang="sass" scoped></style>
