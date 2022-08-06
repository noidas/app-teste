<template>
  <v-container class="pt-10" grid-list-xs>
    <message-bar ref="msgBar" />

    <v-dialog v-model="modalPass" width="400">
      <v-card>
        <v-card-title class="text-h6 grey lighten-4">
          Alterar Senha
        </v-card-title>

        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="handleChangePass">
            <v-card-text>
              <validation-provider v-slot="{ errors }" name="Senha" rules="required|min:6">
                <div class="grey--text text--darken-1">Senha</div>
                <v-text-field v-model="pass" :error-messages="errors" name="password" type="password" outlined></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Confirmação" :rules="`required|regex:${pass}`" mode="aggressive">
                <div class="grey--text text--darken-1">Confirmação da senha</div>
                <v-text-field v-model="confirm" :error-messages="errors" name="confirm" type="password" outlined></v-text-field>
              </validation-provider>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
              <v-btn @click="closeModalPass" color="secondary" text>Fechar</v-btn>
              <v-spacer></v-spacer>
              <v-btn :loading="loading" :disabled="invalid" type="submit" color="primary" text>Salvar</v-btn>
            </v-card-actions>
          </form>
        </validation-observer>

      </v-card>
    </v-dialog>

    <v-card>
      <v-card-text>
        <v-row class="d-flex flex-md-row flex-column">
          <v-col class="d-flex flex-md-column flex-row align-center justify-center" md="4">
            <v-spacer></v-spacer>
            <v-avatar size="150px">
              <v-img src="https://picsum.photos/100"></v-img>
              <!-- <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img> -->
            </v-avatar>
            <v-spacer></v-spacer>
            <v-row style="width: 60%;">
              <v-col class="d-flex flex-row justify-space-around align-end">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn disabled color="primary" v-bind="attrs" v-on="on" icon>
                      <v-icon>mdi-camera-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Alterar Foto</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="modalPass = true" color="primary" v-bind="attrs" v-on="on" icon>
                      <v-icon>mdi-lock-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Alterar Senha</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="handleChangeUser" color="primary" v-bind="attrs" v-on="on" icon>
                      <v-icon>mdi-content-save-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Salvar Alterações</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
          </v-col>

          <v-divider class="d-none d-md-flex" vertical></v-divider>
          <v-divider class="d-md-none"></v-divider>

          <v-col class="px-10" md="8">
            <v-container grid-list-md>
              <div>Nome</div>
              <v-text-field v-model="userEdit.name" outlined></v-text-field>
              <div>E-mail</div>
              <v-text-field v-model="userEdit.email" outlined></v-text-field>
              <div>Data de criação</div>
              <v-text-field :value="userEdit.createdAt | formatDatetime" readonly outlined></v-text-field>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
  </v-container>
</template>

<script>
  import { getUserInfo } from '@/services/authService'
  import { getUser, changePass, updateUser } from '@/services/UserService'
  import MessageBar from '@/components/MessageBar.vue'
  import '@/utils/rules'

  export default {
    name: 'Perfil',

    components: {
      MessageBar
    },

    data () {
      return {
        userEdit: {
          _id: null,
          name: null,
          email: null,
          createdAt: null
        },
        pass: null,
        confirm: null,
        loading: false,
        modalPass: false
      }
    },

    methods: {
      async getUser () {

        const user = getUserInfo()

        try {
          const response = await getUser(user._id)
  
          if (response.status === 200) {
            this.userEdit._id = response.data._id
            this.userEdit.name = response.data.name
            this.userEdit.email = response.data.email
            this.userEdit.createdAt = response.data.createdAt
          }
        } catch (err) {
          console.log(err.message)
        }
      },

      closeModalPass () {
        this.pass = null
        this.confirm = null
        this.modalPass = false
        this.$refs.observer.reset()
      },

      async handleChangePass () {

        const params = {
          id: this.userEdit._id,
          pass: this.pass,
          confirm: this.confirm
        }

        try {
          const response = await changePass(params)
  
          if (response.status === 200) {
            this.closeModalPass()
            this.$refs.msgBar.showMessage('Senha alterada com sucesso!')
          }

        } catch (err) {
          console.log(err.message)
          this.$refs.msgBar.showMessage(err.response.data.error, 'error')
        }
      },

      async handleChangeUser () {

        const params = {
          name: this.userEdit.name,
          email: this.userEdit.email
        }

        try {
          const response = await updateUser(this.userEdit._id, params)
  
          if (response.status === 200) {
            this.$refs.msgBar.showMessage('Usuário alterado com sucesso!')
          }

        } catch (err) {
          console.log(err.message)
          this.$refs.msgBar.showMessage(err.response.data.error, 'error')
        }
      }
    },

    created () {
      this.$store.dispatch('main/cleanBreadcrumbs')
      this.$store.dispatch('main/addBreadcrumbs', { text: 'Meu Perfil', disabled: false, to: 'perfil' })
      this.getUser()
    }
  }
</script>

<style>
</style>