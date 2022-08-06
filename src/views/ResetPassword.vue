<template>
  <div class="background--image">
    <div class="layer1">
      <message-bar ref="msgBar" />
      <v-container grid-list-xs>
        <v-row>
          <v-col class="d-flex flex-row justify-center align-center" style="height: 100vh;">
            <v-card width="350px" color="rgba(255, 255, 255, 0.9)">
              <v-card-title class="text-h5 justify-center pa-10">
                Redefinir Senha
              </v-card-title>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="handleResetPass">
                  <v-card-text>
                    <validation-provider v-slot="{ errors }" name="Senha" rules="required|min:6">
                      <div class="grey--text text--darken-1">Senha</div>
                      <v-text-field v-model="pass" :error-messages="errors" name="password" type="password" solo></v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="Confirmação" :rules="`required|regex:${pass}`" mode="aggressive">
                      <div class="grey--text text--darken-1">Confirmação da senha</div>
                      <v-text-field v-model="confirm" :error-messages="errors" name="confirm" type="password" solo></v-text-field>
                    </validation-provider>
                  </v-card-text>

                  <v-card-actions class="pb-10">
                    <v-container>
                      <v-btn :loading="loading" :disabled="invalid" type="submit" width="100%" color="primary">Redefinir</v-btn>
                    </v-container>
                  </v-card-actions>
                </form>
              </validation-observer>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  import MessageBar from '@/components/MessageBar.vue'
  import { resetPass } from '@/services/authService'
  import '@/utils/rules'

  export default {
    name: 'ResetPassword',

    components: {
      MessageBar
    },

    data () {
      return {
        pass: null,
        confirm: null,
        loading: false,
        token: null
      }
    },

    methods: {
      async handleResetPass () {
        this.loading = true

        const param = {
          pass: this.pass,
          confirm: this.confirm,
          token: this.token
        }

        this.pass = null
        this.confirm = null
        this.$refs.observer.reset()

        try {
          const resp = await resetPass(param)

          if (resp.status === 200) {

            this.loading = false
            this.$refs.msgBar.showMessage('Sua senha foi redefinida com sucesso.')
            
            setTimeout(() => {
              this.$router.push('/login')
            }, 3500);
          }

        } catch (err) {
          console.log(err.message)
          this.loading = false
          this.$refs.msgBar.showMessage(err.response.data.error, 'error')
        }
      }
    },

    created () {
      this.token = this.$route.params.token
    }
  }
</script>

<style>
  .background--image {
    background: url('https://picsum.photos/1920/1080?random');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }

  .layer1 {
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.7) 90%);
    height: 100vh;
  }
</style>