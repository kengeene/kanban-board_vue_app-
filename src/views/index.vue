<template>
  <div class="home">
    <search-component/>
    <tasks-container/>
  </div>
</template>

<script>
import tasksContainer from '@/components/tasks/tasks-container.vue';
import searchComponent from '@/components/search/index.vue';

export default {
  name: 'Home',
  components: {
    tasksContainer,
    searchComponent,
  },
};
</script>
