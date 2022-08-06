<template>
  <v-container fluid>
    <message-bar ref="msgBar" />
    <v-row class="d-flex flex-column flex-md-row">
      <v-col>
        <v-card class="mx-auto" outlined>
          <v-card-title primary-title>
            Filtros
            <v-divider class="mx-5" vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="filters.user" class="mr-4" label="Usuários" clearable dense hide-details outlined></v-text-field>
            <v-text-field v-model="filters.email" class="mr-4" label="E-mail" clearable dense hide-details outlined></v-text-field>
            <v-spacer></v-spacer>
            <v-btn @click="loadingUsers" color="info">Filtrar</v-btn>
          </v-card-title>

        </v-card>
      </v-col>
    </v-row>

    <v-row class="d-flex flex-column flex-md-row">
      <v-col>
        <v-card outlined>
          <v-data-table
            :headers="headersTable"
            :items="itemsTable"
            height="600"
            disable-pagination
            hide-default-footer
            fixed-header
            outline
          >
            <!-- CARD PARA INCLUSAO E EDICAO -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Usuários</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on" dark>Novo</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <validation-observer ref="observer" v-slot="{ invalid }">
                      <form @submit.prevent="save">
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col>
                                <validation-provider v-slot="{ errors }" name="Nome" rules="required|min:3">
                                  <v-text-field v-model="editedItem.name" label="Nome" :error-messages="errors" tabindex="0" autofocus required outlined></v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="E-mail" rules="required|email">
                                  <v-text-field v-model="editedItem.email" label="E-mail" :error-messages="errors" required outlined></v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="Senha" :rules="editedIndex > -1 ? '' : 'required|min:3'" mode="aggressive">
                                  <v-text-field v-model="editedItem.password" label="Senha" :placeholder="editedIndex > -1 ? 'Permanece senha atual' : ''" :error-messages="errors" type="password" :required="editedIndex > -1 ? false : true" outlined></v-text-field>
                                </validation-provider>
                                <div class="d-flex flex-row justify-space-around">
                                  <v-checkbox v-model="editedItem.status" :label="`Status: ${editedItem.status ? 'Ativo' : 'Inativo'}`"></v-checkbox>
                                  <v-checkbox v-model="editedItem.is_admin" label="Administrator"></v-checkbox>
                                </div>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="close" color="secondary" text>Cancelar</v-btn>
                          <v-btn :disabled="invalid" type="submit" color="primary" text>Salvar</v-btn>
                        </v-card-actions>

                      </form>
                    </validation-observer>

                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="justify-center text-h6">Tem certeza que deseja apagar esse item ?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="success" text @click="closeDelete">Não</v-btn>
                      <v-btn color="error" text @click="deleteItemConfirm">Sim</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.status="{ item }">
              <v-badge :color="item.status ? 'green' : 'red'" inline dot></v-badge>
            </template>
            <!-- COLUNA ACOES -->
            <!-- eslint-disable-next-line -->
            <template v-slot:item.actions="{ item }">
              <v-btn @click="editItem(item)" icon>
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
              <v-btn @click="deleteItem(item)" icon>
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MessageBar from '@/components/MessageBar.vue'
  import { saveUser, getUsers, deleteUser, updateUser, getUsersFilter } from '@/services/UserService'
  import '@/utils/rules'

  export default {
    name: 'UserListCad',

    components: {
      MessageBar,
    },

    data () {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        filters: {
          user: null,          
          email: null
        },
        editedItem: {
          _id: '',
          name: '',
          email: '',
          password: '',
          status: true,
          is_admin: false
        },
        defaultItem: {
          _id: '',
          name: '',
          email: '',
          password: '',
          status: true,
          is_admin: false
        },
        headersTable: [
          { text: 'Nome', value: 'name' },
          { text: 'E-mail', value: 'email' },
          { text: 'Status', value: 'status' },
          { text: 'Ações', value: 'actions', align: 'center', sortable: false },
        ],
        itemsTable: []
      }
    },

    methods: {
      async loadingUsers () {

        const params = {
          user: this.filters.user,
          email: this.filters.email
        }

        try {
          const response = params.user || params.email ?  await getUsersFilter(params) : await getUsers(params)
  
          if (response.status === 200) {
            this.itemsTable = response.data
          }
        } catch (err) {
          console.log(err.message)
        }
      },

      editItem (item) {
        this.editedIndex = this.itemsTable.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.itemsTable.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        try {
          const resp = await deleteUser(this.editedItem._id)

          if (resp.status === 200) {
            this.$refs.msgBar.showMessage('Usuário excluído.', 'error')
            this.itemsTable.splice(this.editedIndex, 1)
            this.closeDelete()
          }

        } catch (err) {
          console.log(err.message)
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          try {
            const resp = await updateUser(this.editedItem._id, this.editedItem)

            if (resp.status === 200) {
              this.$refs.msgBar.showMessage('Usuário alterado.')
              Object.assign(this.itemsTable[this.editedIndex], this.editedItem)
              this.close()
            }

          } catch (err) {
            console.log(err.message)
          }

        } else {

          try {
            const resp = await saveUser(this.editedItem)

            if (resp.status === 200) {
              this.$refs.msgBar.showMessage('Usuário salvo.')
              this.editedItem._id = resp.data._id
              this.itemsTable.push(this.editedItem)
              this.close()
            }

          } catch (err) {
            console.log(err.message)
          }
        }
      },
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo usuário' : 'Alterar usuário'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },

      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.$store.dispatch('main/cleanBreadcrumbs')
      this.$store.dispatch('main/addBreadcrumbs', { text: 'Usuários', disabled: false, to: 'users' })
      this.loadingUsers()
    }
  }
</script>

<style>

</style>