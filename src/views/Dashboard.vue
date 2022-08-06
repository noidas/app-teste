<template>
  <div class="back--grey">
    <message-bar ref="msgbar"></message-bar>
    <top-bar :userLogged="userLogged"></top-bar>

    <router-view :userLogged="userLogged"></router-view>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getUserInfo } from '@/services/authService'
  import TopBar from '@/components/TopBar.vue'
  import MessageBar from '@/components/MessageBar.vue'

  export default {
    name: 'Dashboard',

    components: {
      TopBar,
      MessageBar
    },

    provide () {
      return {
        messageBar: () => {
          return this.$refs.msgbar
        }
      }
    },

    // data () {
    //   return {
    //   }
    // },
    computed: mapState ({
      userLogged: state => state.main.userLogged
    }),

    created () {
      const user = getUserInfo()

      this.$store.dispatch('main/setUserLogged', {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.idAdmin
      })
    }
  }
</script>

<style>
  .back--grey {
    height: 100vh;
    background-color: #F5F5F5;
  }
</style>