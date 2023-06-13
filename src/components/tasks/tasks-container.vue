<template>
  <div>
    <el-row :gutter="20">
      <el-col v-for="(task, index) in tasks" :key="index" :span="rowSpan" class="tasks__column">
        <h2 class="tasks__heading">
          {{ task.title }}
        </h2>
        <draggable
          v-model="task.tickets"
          column="tasks"
          item-key="taskId"
          group="tasks"
          class="tasks__draggable"
        >
          <template #item="{ element: ticket }">
            <task-card :key="index" :task="ticket" />
          </template>
        </draggable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import useStatus from "@/composibles/useStatuses";
import useTasks from "@/composibles/useTasks";
import taskCard from "@/components/tasks/task.vue";
import draggable from "vuedraggable";

export default {
  name: "Tasks",
  components: {
    taskCard,
    draggable,
  },
  setup() {
    const { get: getStatuses, statusList: statuses } = useStatus();
    const { get: getTasks, taskList } = useTasks();
    const tasks = ref([]);

    onMounted(async () => {
      await getStatuses();
      await getTasks();

      statuses.value.forEach((status) => {
        tasks.value.push({
          title: status.status,
          tickets: taskList.value.filter((task) => task.taskStatus === status.status),
        });
      });
    });
    const taskCount = computed(() => tasks.value.length);
    const rowSpan = ref(5);

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
.tasks {
  &__heading {
    color: #5e6c84;
    font-size: 0.85714286em;
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
    color: var(--ds-text-subtlest, #5e6c84);
  }
  &__column {
    background-color: #f4f5f7;
  }

  &__draggable {
    min-height: 100%;
  }
}
</style>
