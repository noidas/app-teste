<template>
  <v-app>
    <v-main>
      <router-view path="$router.key" />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name:'App',

    data () {
      return {
      }
    },

  }
</script>

<style lang="scss">
  .v-breadcrumbs__divider,
  .v-breadcrumbs__item {
    font-size: 1.3rem;
    color: white !important;
  }

  a {
    text-decoration: none;
  }

  // #app {
  // }

  // #nav {
  //   padding: 30px;

  //   a {
  //     font-weight: bold;
  //     color: #2c3e50;

  //     &.router-link-exact-active {
  //       color: #42b983;
  //     }
  //   }
  // }
</style>
