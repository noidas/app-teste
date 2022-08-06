<template>
  <v-card width="350px" color="rgba(255, 255, 255, 0.8)">
    <message-bar ref="msgBar" />
    <v-card-title class="text-h5 justify-center pa-10">
      Login
    </v-card-title>
    <validation-observer ref="observer">
      <form @submit.prevent="handleLogin">
        <v-card-text>
          <validation-provider v-slot="{ errors }" name="Usuário" rules="required|email">
            <v-text-field v-model="user.email" :error-messages="errors" label="Usuário" name="email" prepend-inner-icon="mdi-account" solo></v-text-field>
          </validation-provider>
          <validation-provider name="Senha" rules="required|min:6">
            <v-text-field v-model="user.password" label="Senha" name="password" type="password" prepend-inner-icon="mdi-lock" solo required></v-text-field>
          </validation-provider>
          <v-row>
            <v-col class="d-flex flex-row justify-space-between align-end">
              <v-checkbox v-model="rememberMe" label="Relembrar usuário" color="info" hide-details></v-checkbox>
              <a @click="$emit('showCards')" class="text--size">
                Esqueceu sua Senha?
              </a>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pb-10">
          <v-container>
            <v-btn :loading="loadingLogin" type="submit" width="100%" color="primary">Login</v-btn>
          </v-container>
        </v-card-actions>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
  import MessageBar from '@/components/MessageBar.vue'
  import { login } from '@/services/authService'
  import '@/utils/rules'

  export default {
    name: 'CardLogin',

    props: ['showCards'],

    components: {
      MessageBar
    },

    data () {
      return {
        loadingLogin: false,
        rememberMe: false,
        rememberKey: process.env.VUE_APP_REMEMBER,
        user: {
          email: null,
          password: null
        }
      }
    },

    methods: {
      async handleLogin () {
        this.loadingLogin = true;
        const data = {...this.user};
        this.user.password = null;

        try {
          const resp = await login(data);

          if (resp.status === 200) {

            if (this.rememberMe) localStorage.setItem(this.rememberKey, this.user.email);
            this.$router.push('home');
          }

        } catch (err) {
          console.log(err.message);
          this.loadingLogin = false;
          this.$refs.msgBar.showMessage(err.response.data.error, 'error');
        }
      }
    },

    created () {
      const login = localStorage.getItem(this.rememberKey);
      if (login) {
        this.user.email = login;
        this.rememberMe = true;
      }
    }
  }
</script>

<style>
  .text--size {
    font-size: 10px;
  }

  .v-label {
    font-size: 12px !important;
  }
</style>