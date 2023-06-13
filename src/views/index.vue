<template>
  <div class="home">
    <search-component/>
    <tasks/>
  </div>
</template>

<script>
import tasks from '@/components/tasks.vue';
import searchComponent from '@/components/search/index.vue';

export default {
  name: 'Home',
  components: {
    tasks,
    searchComponent,
  },
};
</script>
