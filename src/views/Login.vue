<template>
  <div class="background--image">
    <div class="layer1">
      <v-container grid-list-xs>
        <!-- <v-btn @click="showCards" color="success">test</v-btn> -->
        <v-row>
          <v-col class="d-none d-sm-none d-md-flex"></v-col>
          <v-col class="d-flex flex-row justify-center align-center" style="height: 100vh;">
            <card-login v-if="showCardLogin" @showCards="showCards" />
            <card-forgot-password v-else @showCards="showCards" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  import CardLogin from '@/components/CardLogin.vue'
  import CardForgotPassword from '@/components/CardForgotPassword.vue'

  export default {
    name: 'Login',

    components: {
      CardLogin,
      CardForgotPassword
    },

    data () {
      return {
        showCardLogin: true,
      }
    },

    methods: {
      showCards () {
        this.showCardLogin = !this.showCardLogin
      }
    },

    created () {
      // 
    }
  }
</script>

<style>
  .background--image {
    background: url('../assets/fundo-login2.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }

  .layer1 {
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.9) 80%);
    height: 100vh;
  }

  .f1 {
    background-color: aqua;
  }

  .f2 {
    background-color: aquamarine;
  }
</style>