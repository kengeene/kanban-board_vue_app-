<template>
  <div class="container">
    <el-row class="header">
      <el-col :span="12">
        <el-button type="primary" round @click="handleCreateTaskDialog()">Create Issue</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <tasks-container />
        <show-task-dialog
          v-if="showTaskDialog || createTaskDialog"
          :show-task-dialog="showTaskDialog || createTaskDialog"
          :task-id="showTaskDialogId"
          :is-edit="!createTaskDialog"
          @closeDialog="closeDialog()"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tasksContainer from "@/components/tasks/tasks-container.vue";
// import createTaskDialog from "@/components/dialogs/create-task-dialog.vue";
import showTaskDialog from "@/components/dialogs/show-task-dialog.vue";
import { provide, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "Home",
  components: {
    tasksContainer,
    // createTaskDialog,
    showTaskDialog,
  },
  setup() {
    const createTaskDialog = ref(false);
    const showTaskDialog = ref(false);
    const showTaskDialogId = ref(null);
    const route = useRoute();

    onMounted(() => {
      // Open the dialog if the URL has been shared i.e. it has the task id as a query param
      if (route.query?.open) {
        handleShowTaskDialog(route.query.open);
      }
    });

    const handleShowTaskDialog = (taskId) => {
      showTaskDialogId.value = taskId;
      showTaskDialog.value = true;
    };

    const handleCreateTaskDialog = () => {
      createTaskDialog.value = true;
    };

    const closeDialog = () => {
      showTaskDialogId.value = "";
      showTaskDialog.value = false;
      createTaskDialog.value = false;
    };

    provide("handleShowTaskDialog", handleShowTaskDialog);
    provide("handleCreateTaskDialog", handleCreateTaskDialog);

    return {
      closeDialog,
      createTaskDialog,
      showTaskDialog,
      showTaskDialogId,
      handleShowTaskDialog,
      handleCreateTaskDialog,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
}
.header {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
