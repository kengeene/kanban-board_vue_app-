<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="rowSpan">
                <div>
                    {{ rowStatus }}
                </div>
                <task-card :title="task.title" :tickets="task.tickets"
                v-for="task, index in tasks" :key="index"/>
        </el-col>
        </el-row>
    </div>
</template>

<script>
import taskCard from '@/components/task-card.vue';

export default {
  name: 'tasks',
  components: {
    taskCard,
  },
  props: {
    rowStatus: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      rowSpan: 6,
      tasks: [
        { title: 1, tickets: [] },
        { title: 2, tickets: [] },
        { title: 3, tickets: [] },
        { title: 4, tickets: [] },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
