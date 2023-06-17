<template>
  <div>
    <el-row class="tasks__container">
      <el-col
        v-for="(task, index) in tasks"
        :key="index"
        :span="rowSpan"
        class="tasks__column"
        :class="`tasks__col-${index}`"
      >
        <h2 class="tasks__heading">
          {{ task.title }}
        </h2>
        <draggable
          v-model="task.tickets"
          column="tasks"
          item-key="id"
          group="tasks"
          class="tasks__draggable"
          :class="`${task.title.toLowerCase()}-column`"
          :data-test="`${task.title.toLowerCase()}-column`"
          :component-data="getComponentData()"
          @update:model-value="updateModel(task.tickets, task.title)"
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
    const { get: getTasks, taskList, updateTaskStatuses, sortedTasks: tasks } = useTasks();

    onMounted(async () => {
      await getStatuses();
      await getTasks();
    });

    const taskCount = computed(() => tasks.value.length);
    const rowSpan = ref(5);

    const activeNames = ref(null);

    const updateModel = (taskList, currentStatus) => {
      updateTaskStatuses(taskList, currentStatus);
    };

    const inputChanged = (value) => {
      activeNames.value = value;
    };

    const getComponentData = () => {
      // Can handle different changes
      return {
        onChange: null,
        onInput: inputChanged,
        wrap: true,
        value: "",
      };
    };

    return {
      updateModel,
      activeNames,
      getComponentData,
      rowSpan,
      taskCount,
      tasks,
      statuses,
      taskList,
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
    color: #041128;
  }

  &__container {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }

  &__column {
    background-color: #f4f5f7;
    border-radius: 8px;
    padding: 0 20px;
  }

  &__draggable {
    min-height: 100%;
  }

  // color palettes from https://www.canva.com/colors/color-palettes/in-the-blue/
  &__col-0 {
    background-color: #c4dbe0;
  }
  &__col-1 {
    background-color: #2eb5e0;
  }
  &__col-2 {
    background-color: #00a8a8;
  }
  &__col-3 {
    background-color: #0c6980;
  }
}
</style>
