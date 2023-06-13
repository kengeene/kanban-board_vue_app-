<template>
  <div>
    <el-input v-model="search" placeholder="Search">
      <template #prepend>
        <el-button icon="el-icon-search"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
import useTasks from "@/composibles/useTasks";

export default {
  name: "Search",
  setup() {
    const { search } = useTasks();

    return {
      search,
    };
  },
};
</script>

<style lang="scss" scoped></style>
