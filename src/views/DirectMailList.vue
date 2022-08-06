<template>
  <div>
    <v-container fluid>
      <message-bar ref="msgBar" />
      <v-row class="d-flex flex-column flex-md-row">
        <v-col>
          <v-card class="mx-auto" outlined>
            <v-card-title primary-title>
              Filtros
              <v-divider class="mx-5" vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field class="mr-4" name="name" label="E-mail de envio" dense hide-details outlined></v-text-field>
              <v-text-field class="mr-4" name="name" label="Servidor SMTP" dense hide-details outlined></v-text-field>
              <v-text-field class="mr-4" name="name" label="Servidor SMTP" dense hide-details outlined></v-text-field>
              <v-text-field name="name" label="Servidor SMTP" dense hide-details outlined></v-text-field>
              <v-spacer></v-spacer>
              <v-btn color="info">Filtrar</v-btn>
            </v-card-title>

          </v-card>
        </v-col>
      </v-row>

      <v-row class="d-flex flex-column flex-md-row">
        <v-col>
          <v-card outlined>
            <v-card-title>
              E-mails já processadas
              <v-spacer></v-spacer>
              <v-btn to="/direct-mail" color="primary">Novo</v-btn>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="itemsTable"
              :loading="loading"
              disable-pagination
              hide-default-footer
              fixed-header
            >
              <!-- DATA STATUS -->
              <!-- eslint-disable-next-line -->
              <template v-slot:item.status="{ item }">
                <v-chip class="ma-2" :color="getColorStatus(item.status)" text-color="white" small label>
                  {{ getStatus(item.status) }}
                </v-chip>
              </template>
              <!-- DATA INICIO -->
              <!-- eslint-disable-next-line -->
              <template v-slot:item.date_ini="{ item }">
                {{ item.date_ini | formatDatetime }}
              </template>
              <!-- DATA FINAL -->
              <!-- eslint-disable-next-line -->
              <template v-slot:item.date_end="{ item }">
                {{ item.date_end | formatDatetime }}
              </template>
              <!-- DATA CRIACAO -->
              <!-- eslint-disable-next-line -->
              <template v-slot:item.createdAt="{ item }">
                {{ item.createdAt | formatDatetime }}
              </template>
              <!-- eslint-disable-next-line -->
              <template v-slot:item.actions="{ item }">
                <v-btn @click="deleteItem(item)" icon>
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
                <v-btn @click="dialogStart = true, itemId = item" icon>
                  <v-icon>mdi-play-outline</v-icon>
                </v-btn>
                <v-btn :to="`/direct-mail/${item._id}`" icon>
                  <v-icon>mdi-card-bulleted-outline</v-icon>
                </v-btn>
              </template>

              <!-- Modais -->
              <template v-slot:top>
                <v-toolbar flat>
                  <!-- Modal de delete -->
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

                  <!-- Modal Start -->
                  <v-dialog v-model="dialogStart" max-width="500px">
                    <v-card>
                      <v-card-title class="justify-center text-h6">Deseja inicar processo de envio ?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="dialogStart = false, itemId = null" text>Não</v-btn>
                        <v-btn color="success" @click="handleStart()" text>Sim</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import MessageBar from '@/components/MessageBar.vue'
  import { getDirectMails, deleteDirectMail, startProcess } from '@/services/DirectMailService'

  export default {
    name: 'DirectMail',

    inject: ['messageBar'],

    components: {
      MessageBar,
    },

    data () {
      return {
        drawer: false,
        group: null,
        files: null,
        loading: false,
        dialogDelete: false,
        dialogStart: false,
        itemsTable: [],
        itemIndex: -1,
        itemId: null,
        headers: [],
      }
    },

    methods: {
      async handleStart () {
        const id = this.itemId._id;

        try {
          let resp = await startProcess(id);

          if (resp.status === 200) {

            this.messageBar().showMessage('Processo iniciado...', 'info');
            this.itemId = null;
            this.$router.push(`/direct-mail-processing/${id}`)
          }

        } catch (err) {
          console.log(err.message);
          this.messageBar().showMessage(err.response.data.error, 'error');
        }
      },

      getStatus (id) {
        switch (id) {
          case 0:
            return 'Nunca iniciado';

          case 1:
            return 'Em andamento';

          case 2:
            return 'Erro';

          case 3:
            return 'Finalizado';
        }
      },

      getColorStatus (id) {
        switch (id) {
          case 0:
            return 'cyan';

          case 1:
            return 'orange';

          case 2:
            return 'red';

          case 3:
            return 'green';
        }
      },

      async loadingDirectMail () {
        this.loading = true;

        try {
          const resp = await getDirectMails();

          if (resp.status === 200) {
            this.itemsTable = resp.data;
            this.loading = false;
          }

        } catch (err) {
          this.loading = false;
          console.log(err.message);
          this.$refs.msgBar.showMessage(err.response.data.error, 'error');
        }
      },

      deleteItem (item) {
        this.itemIndex = this.itemsTable.indexOf(item);
        this.itemId = item._id;
        this.dialogDelete = true;
      },

      async deleteItemConfirm () {
        try {
          const resp = await deleteDirectMail(this.itemId);

          if (resp.status === 200) {
            this.$refs.msgBar.showMessage('Mala direta excluida com sucesso!');
            this.itemsTable.splice(this.itemIndex, 1);
            this.closeDelete();
          }

        } catch (err) {
          console.log(err.message);
          this.$refs.msgBar.showMessage(err.response.data.error, 'error');
        }
      },

      closeDelete () {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.itemId = null;
          this.itemIndex = -1;
        });
      },

      initVariables () {
        this.headers.push (
          { text: 'Descrição', align: 'start', sortable: false, value: 'description' },
          { text: 'Status', value: 'status' },
          { text: 'Inicio', value: 'date_ini' },
          { text: 'Fim', value: 'date_end' },
          { text: 'Criação', value: 'createdAt' },
        );

        if (this.userLogged.isAdmin) {

          this.headers.push (
            { text: 'Dono', value: 'user_id' }
          );
        }

        this.headers.push (
          { text: 'Ações', value: 'actions', align: 'center', sortable: false },
        );
      }
    },

    watch: {
      group () {
        this.drawer = false;
      },
    },

    computed: mapState ({
      userLogged: state => state.main.userLogged
    }),

    created () {
      this.initVariables();
      this.$store.dispatch('main/cleanBreadcrumbs');
      this.$store.dispatch('main/addBreadcrumbs', { text: 'Listagem Mala Direta', disabled: false, to: '/direct-mail-list' });
      this.loadingDirectMail();
    }
  }
</script>

<style>
</style>