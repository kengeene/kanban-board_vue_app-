<template>
    <div>
        <el-input placeholder="Search" v-model="search">
      <template v-slot:prepend >
        <el-button icon="el-icon-search"></el-button>
      </template>
    </el-input>
    </div>
</template>

<script>
import useTasks from '@/composibles/useTasks';

export default {
  name: 'Search',
  setup() {
    const { search } = useTasks();

    return {
      search,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
