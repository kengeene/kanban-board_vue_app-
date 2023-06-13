<template>
  <div class="container">
    <div class="header">
      <el-row :gutter="10">
        <el-cols :cols="10">
          <search-component />
        </el-cols>
        <el-cols :cols="5">
          <el-button type="primary" round @click="createIssueDialog = true">Create Issue</el-button>
        </el-cols>
      </el-row>
    </div>
    <tasks-container />
    <create-task-dialog v-if="createIssueDialog" :create-issue-dialog="createIssueDialog" />
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
      createIssueDialog: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
}
</style>
