<template>
  <v-card width="350px" color="rgba(255, 255, 255, 0.8)">
    <message-bar ref="msgBar" />
    <v-card-title class="text-h5 justify-center pa-10">
      Esqueci minha Senha
    </v-card-title>
    <validation-observer ref="observer">
      <form @submit.prevent="handleForgotPass">
        <v-card-text>
          <validation-provider name="E-mail" rules="required|email">
            <v-text-field v-model="email" label="E-mail" name="email" prepend-inner-icon="mdi-email" solo required></v-text-field>
          </validation-provider>
        </v-card-text>

        <v-card-actions class="pb-10">
          <v-container>
            <v-btn :loading="loading" type="submit" width="100%" color="primary">Solicitar</v-btn>
            <v-btn @click="$emit('showCards')" class="mt-4" width="100%" color="secondary">Voltar</v-btn>
          </v-container>
        </v-card-actions>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
  import { forgotPass } from '@/services/authService'
  import MessageBar from '@/components/MessageBar.vue'
  import '@/utils/rules'

  export default {
    name: 'CardForgotPassword',

    components: {
      MessageBar
    },

    data () {
      return {
        loading: false,
        email: null,
      }
    },

    methods: {
      async handleForgotPass () {
        this.loading = true

        try {
          const resp = await forgotPass({ email: this.email })

          if (resp.status === 200) {

            this.loading = false
            this.$refs.msgBar.showMessage('Você receberá um e-mail com instruções de como recuperar sua senha.')

            setTimeout(() => {
              this.$emit('showCards')
            }, 4000);
          }

        } catch (err) {
          console.log(err.message)
          this.loading = false
          this.$refs.msgBar.showMessage(err.response.data.error, 'error')
        }
      }
    },

    created () {
      // 
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
