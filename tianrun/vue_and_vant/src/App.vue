<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    <tabbar v-if="$route.meta.showTab"></tabbar>
  </div>
</template>
<style lang="stylus">
</style>
