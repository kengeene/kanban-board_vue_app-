<template>
        <el-card class="task-card" :data-tooltip="task.title">
          <h3 class="task-card__title">{{task.title}}</h3>
          <div class="task-card__properties">
            <span>
                {{ task.taskId }}
            </span>
            <span></span>
            <span></span>
            <span><img class="task-card__icon" :src="task.userAvatar"/></span>
            <span><el-icon><Share /></el-icon></span>
          </div>
      </el-card>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
$image-dimensions: 20px;
.task-card{
    margin-bottom: 30px;
    cursor: pointer;
    padding: 15px;

    &__properties{
        display: flex;
        align-content: center;
        align-items: center;
        flex-direction: row;
        justify-content: space-evenly;
    }

    &__icon{
        height: $image-dimensions;
        width: $image-dimensions;
        border-radius: $image-dimensions;
        background-color: grey;
        color: black;
    }

    .el-card__body{
        padding: 0;
    }

    &__title{
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
