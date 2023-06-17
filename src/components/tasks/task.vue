<template>
  <div>
    <el-card class="task-card" :data-test="`task-${task.id}`" :class="`task-${task.id}`">
      <el-tooltip class="box-item" effect="dark" :content="task.title" placement="top-start"
        ><h3 class="task-card__title" @click="showTaskDialog()">{{ task.title }}</h3>
      </el-tooltip>
      <div class="task-card__properties">
        <span>
          {{ task.id }}
        </span>
        <span></span>
        <span></span>
        <span>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="task.userFullName"
            placement="top-start"
          >
            <img class="task-card__icon" :src="task.userAvatar" />
          </el-tooltip>
        </span>
        <span @click="copyLink()"
          ><el-icon><Share /></el-icon
        ></span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { copyToClipboard } from "@/utils/text.js";
import { inject } from "vue";
export default {
  name: "TaskCard",
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const handleShowTaskDialog = inject("handleShowTaskDialog");

    const showTaskDialog = () => {
      handleShowTaskDialog(props.task.id);
    };

    return {
      showTaskDialog,
    };
  },
  methods: {
    copyLink() {
      const url = `${process.env.VUE_APP_BASE_URL}?open=${this.task.id}`;
      copyToClipboard(url);
    },
  },
};
</script>

<style lang="scss">
$image-dimensions: 20px;
.task-card {
  margin-bottom: 30px;
  cursor: pointer;
  padding: 15px;
  border-radius: 8px;

  &__properties {
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
  }

  &__icon {
    height: $image-dimensions;
    width: $image-dimensions;
    border-radius: $image-dimensions;
    background-color: grey;
    color: black;
  }

  .el-card__body {
    padding: 0;
  }

  &__title {
    text-align: left;
    display: block;
    box-sizing: content-box;
    line-height: 1.42857143;
    max-height: 4.28571429em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }
}
</style>
