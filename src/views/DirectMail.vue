<template>
  <div>
    <!-- Loading -->
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <v-container fluid>
      <v-row class="d-flex flex-column flex-md-row">
        <v-col>
          <v-card class="mx-auto pb-5" outlined>
            <v-card-title class="mb-n8 d-flex flex-row justify-space-between align-baseline">
              <div class="mr-8">Mala direta</div>
              <v-text-field v-model="direct.description" label="Descrição" dense outlined></v-text-field>
            </v-card-title>

            <v-card-text>
              <v-card color="#385F73" dark>
                <v-card-title class="text-h5 mb-5">
                  Detalhes:
                </v-card-title>
                <v-card-subtitle>
                  <div>Última execução - <strong>{{ direct.date_ini | formatDate }}</strong></div>
                  <div>Iniciada em - <strong>{{ direct.date_ini | formatDatetime }}</strong></div>
                  <div>Finalizada em - <strong>{{ direct.date_end | formatDatetime }}</strong></div>
                  <div v-if="direct.status > 0" class="d-flex justify-end">
                    <v-btn :to="`/direct-mail-processing/${direct._id}`" color="white" x-small outlined>Detalhes Processamento</v-btn>
                  </div>
                </v-card-subtitle>
              </v-card>              

            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn to="/direct-mail-list" color="secondary" width="31%">
                <v-icon left>mdi-arrow-left-bold-box-outline</v-icon>
                Voltar
              </v-btn>
              <v-btn @click="saveDirectMail" color="primary" width="31%">
                <v-icon left>mdi-content-save-outline</v-icon>
                Salvar
              </v-btn>
              <v-btn @click="handleStart" color="success" width="31%">
                <v-icon left>mdi-play-box</v-icon>
                Executar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mx-auto" outlined>
            <v-card-title primary-title>
              Seleção de arquivo com destinatários
            </v-card-title>

            <v-card-text>
              <v-card class="mx-auto mb-7" height="151">
                <v-card-title class="text-body-2 mb-3 justify-center">
                  Informações
                </v-card-title>
                <v-card-text>
                  <div>Total de emails a serem enviados: <strong class="blue--text">{{ fileDetail ? fileDetail.length : 0 }}</strong></div>
                  <div class="text-center mt-5">
                    <v-chip v-if="fileDetail" color="green" label small>ARQUIVO INFORMADO</v-chip>
                    <!-- <v-btn class="mb-3 ml-5" color="red" icon><v-icon>mdi-trash-can-outline</v-icon></v-btn> -->
                  </div>
                </v-card-text>
              </v-card>

              <v-file-input
                v-model="files"
                :show-size="1000"
                @change="handleUpdateFile"
                color="deep-purple accent-4"
                label="Arquivo de destino"
                placeholder="Selecione um arquivo"
                prepend-inner-icon="mdi-microsoft-excel"
                prepend-icon=""
                :disabled="!direct._id"
                counter
                dense
                outlined
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                    {{ text }}
                  </v-chip>

                  <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">
                    +{{ files.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>
            </v-card-text>

          </v-card>
        </v-col>
        <v-col>
          <v-card class="mx-auto" outlined>
            <v-card-title primary-title>
              Configuração de envio
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12" class="mb-n7">
                  <v-text-field v-model="direct.configuration.outgoing_email" label="E-mail de envio" dense outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="9" class="mb-n7">
                  <v-text-field v-model="direct.configuration.smtp" label="Servidor SMTP" dense outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="3" class="mb-n7">
                  <v-text-field v-model="direct.configuration.port" label="Porta" dense outlined></v-text-field>
                </v-col>
                <v-col cols="12" class="mb-n7">
                  <v-text-field v-model="direct.configuration.authentication_user" label="Usuário de autenticação" dense outlined></v-text-field>
                </v-col>
                <v-col cols="12" class="mb-n2">
                  <v-text-field v-model="direct.configuration.password_user" label="Senha"
                    :placeholder="direct._id && !direct.configuration.password_user ? 'Senha atual informada' : ''"
                    type="password"
                    dense
                    outlined>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>

      <v-row class="d-flex flex-column flex-md-row mt-0">
        <v-col md="4" cols="auto">

          <v-card class="mx-auto mb-5" outlined>
            <v-card-title primary-title>
              Parametros

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="ml-4" v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                <span>Recomendamos não utilizar valor menor<br>que 10 segundos, pois o servidor de e-mail<br>pode bloquear os envios por suspeita de span.</span>
              </v-tooltip>
            </v-card-title>

            <v-card-text>
              <v-text-field v-model="direct.parameters.email_sending_interval" label="Intevalo de envio entre e-mails (secundos)" dense outlined></v-text-field>
            </v-card-text>

          </v-card>

          <v-card class="mx-auto" outlined>
            <v-card-title primary-title>
              Templates
            </v-card-title>

            <v-card-text>
              <v-text-field v-model="direct.parameters.template" disabled label="Template" dense outlined></v-text-field>
            </v-card-text>

          </v-card>
        </v-col>
        <v-col md="8" cols="auto">
          <v-card class="mx-auto" outlined>
            <v-card-title primary-title>
              Envio
            </v-card-title>

            <v-card-text>
              <v-text-field v-model="direct.subject" label="Assunto" dense outlined></v-text-field>
              <vue-editor v-model="direct.body_email" placeholder="Corpo do e-mail" :editor-toolbar="customToolbar"></vue-editor>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor"
  import { getUserInfo } from '@/services/authService'
  import { saveDirectMail, updateDirectMail, getDirectMail, uploadFile, startProcess } from '@/services/DirectMailService'

  export default {
    name: 'DirectMail',

    components: {
      VueEditor,
    },

    inject: ['messageBar'],

    data () {
      return {
        overlay: false,
        userLogged: {},
        drawer: false,
        group: null,
        files: null,
        fileDetail: null,
        paramId: null,
        direct: {
          _id: null,
          user_id: null,
          description: null,
          status: null,
          date_ini: null,
          date_end: null,
          configuration: {
            outgoing_email: null,
            smtp: null,
            port: null,
            authentication_user: null,
            password_user: null,
          },
          parameters: {
            template: null,
            email_sending_interval: null,
          },
          subject: null,
          body_email: null,
          createdAt: null
        },
        customToolbar: [
          [{
            header: [false, 1, 2, 3, 4, 5, 6]
          }], ["bold", "italic", "underline", "strike"], // toggled buttons
          [{
            align: ""
          }, {
            align: "center"
          }, {
            align: "right"
          }, {
            align: "justify"
          }], ["blockquote", "code-block"], [{
            list: "ordered"
          }, {
            list: "bullet"
          }, {
            list: "check"
          }], [{
            indent: "-1"
          }, {
            indent: "+1"
          }], // outdent/indent
          [{
            color: []
          }, {
            background: []
          }], // dropdown with defaults from theme
          [], ["clean"] // remove formatting button
        ],
      }
    },

    methods: {
      async handleStart () {
        try {
          let resp = await startProcess(this.direct._id);

          if (resp.status === 200) {

            this.messageBar().showMessage('Processo iniciado...', 'info');
            this.$router.push(`/direct-mail-processing/${this.direct._id}`)
          }

        } catch (err) {
          console.log(err.message);
          this.messageBar().showMessage(err.response.data.error, 'error');
        }
      },

      async handleUpdateFile () {

        if (!this.files) return;

        const formData = new FormData();
        formData.append("file", this.files);

        try {
          let resp = await uploadFile(formData);

          if (resp.status === 200) {

            this.fileDetail = resp.data ? resp.data : null;
            this.direct.changeFile = true;
            this.saveDirectMail();
          }

        } catch (err) {
          console.log(err.message);
          this.messageBar().showMessage(err.response.data.error, 'error');
        }
      },

      async saveDirectMail () {

        this.direct.user_id = this.userLogged._id;

        if (this.fileDetail) {
          this.direct.file = this.fileDetail;
        }

        try {
          let resp = null;

          if (this.direct._id) {

            resp = await updateDirectMail(this.direct);
          } else {
            
            resp = await saveDirectMail(this.direct);
          }

          if (resp.status === 200) {
            this.direct.changeFile = false;
            this.messageBar().showMessage('Mala direta salva com sucesso!');
          }

        } catch (err) {
          console.log(err.message);
          this.messageBar().showMessage(err.response.data.error, 'error');
        }
      },

      async getDirectMail (id) {
        try {
          const resp = await getDirectMail(id);

          if (resp.status === 200) {
            this.direct = resp.data[0];
            this.fileDetail = this.direct.file;
            this.overlay = false;
          }

        } catch (err) {
          this.overlay = false;
          console.log(err.message);
          this.messageBar().showMessage(err.response.data.error, 'error');
        }
      }
    },

    watch: {
      group () {
        this.drawer = false;
      },
    },

    created () {
      this.overlay = true;
      this.paramId = this.$route.params.id;

      if (this.paramId) {
        this.getDirectMail(this.paramId);
      } else {
        this.overlay = false;
        this.userLogged = getUserInfo();
      }

      this.$store.dispatch('main/cleanBreadcrumbs');
      this.$store.dispatch('main/addBreadcrumbs', { text: 'Mala Direta', disabled: false, to: '/direct-mail' });
    }
  }
</script>

<style lang="css">
  @import "~vue2-editor/dist/vue2-editor.css";
</style>
