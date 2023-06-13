<template>
  <div class="home">
    <tasks/>
  </div>
</template>

<script>
import tasks from '@/components/tasks.vue';

export default {
  name: 'Home',
  components: {
    tasks,
  },
};
</script>
