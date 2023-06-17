<template>
  <div id="app">
    <v-row>
      <h1 class="heading">My Kanban Board</h1>
    </v-row>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/css/global.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
