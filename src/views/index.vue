<template>
  <div class="container">
    <el-row class="header" :gutter="5">
      <el-col :span="12">
        <search-component />
      </el-col>
      <el-col :span="12">
        <el-button type="primary" round @click="handleCreateTaskDialog()">Create Issue</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <tasks-container />
        <create-task-dialog
          :create-task-dialog="createTaskDialog"
          @closeDialog="handleCreateTaskDialog()"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tasksContainer from "@/components/tasks/tasks-container.vue";
import searchComponent from "@/components/search/index.vue";
import createTaskDialog from "@/components/create-task-dialog.vue";
export default {
  name: "Home",
  components: {
    tasksContainer,
    searchComponent,
    createTaskDialog,
  },
  data() {
    return {
      createTaskDialog: false,
    };
  },
  methods: {
    handleCreateTaskDialog() {
      if (!this.createTaskDialog) {
        this.createTaskDialog = true;
        return;
      }
      this.createTaskDialog = false;
      return;
    },
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
