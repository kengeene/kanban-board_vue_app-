<template>
        <el-card class="task-card">
        <div style="padding: 14px">
          <h3>{{title}}</h3>
          <div>
            <span>
            </span>
            <span>{{ id }}</span>
            <span></span>
            <span>{{ points }}</span>
            <span><el-icon><Share /></el-icon></span>
          </div>
        </div>
      </el-card>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    points: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss">
$image-dimensions: 20px;
.task-card{
    margin-bottom: 30px;
    cursor: pointer;

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
}
</style>
