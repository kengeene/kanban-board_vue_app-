<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="rowSpan" class="tasks__column"
            v-for="status, index in statuses" :key="index">
                <h2 class="tasks__heading">
                    {{ status.status }}
                </h2>
                <task-card :title="task.title" :tickets="task.tickets"
                v-for="task, index in tasks" :key="index"/>
        </el-col>
        </el-row>
    </div>
</template>

<script>
import taskCard from '@/components/task-card.vue';
import {
  ref, computed, reactive, onMounted,
} from 'vue';
import useStatus from '@/composibles/useStatuses';

export default {
  name: 'tasks',
  components: {
    taskCard,
  },
  setup() {
    const { get: getStatuses, statusList: statuses } = useStatus();

    onMounted(async () => {
      await getStatuses();
    });
    const tasks = reactive([
      { title: 1, tickets: [] },
      { title: 2, tickets: [] },
      { title: 3, tickets: [] },
      { title: 4, tickets: [] },
    ]);
    const taskCount = computed(() => tasks.length);
    const rowSpan = ref(6);

    return {
      rowSpan,
      taskCount,
      tasks,
      statuses,
    };
  },
};
</script>

<style lang="scss" scoped>
.tasks{
    &__heading{
        color: #5e6c84;
        font-size: .85714286em;
        font-weight: 600;
        line-height: 1.33333333;
        margin-top: 20px;
        text-transform: uppercase;
        display: inline-block;
        font-weight: 400;
        margin-top: 3px;
        flex: 0 100 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
        color: var(--ds-text-subtlest,#5e6c84);
    }
    &__column{
        background-color: #f4f5f7;
    }
}
</style>
