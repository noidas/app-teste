<template>
  <v-container grid-list-xs>
    <!-- Loading -->
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <v-row>
      <v-col cols="12" md="5">
        <v-card color="#385F73" dark>
          <v-card-title class="text-h5 mb-5">
            Detalhes:
          </v-card-title>
          <v-card-subtitle v-if="!overlay">
            <div>Iniciada em - <strong>{{ direct.date_ini | formatDatetime }}</strong></div>
            <div>Finalizada em - <strong>{{ direct.date_end | formatDatetime }}</strong></div>
            <div>Qtd Enviada com Sucesso - <strong>{{ process.qtd_processed }}</strong></div>
            <div>Qtd de Erros - <strong>{{ qtdErros }}</strong></div>
          </v-card-subtitle>
        </v-card>           
      </v-col>

      <v-col class="d-flex flex-row justify-space-around" cols="12" md="5">
        <apexchart width="250" type="radialBar" :options="options" :series="series"></apexchart>
      </v-col>

      <v-col cols="12" md="2">
        <v-btn to="/direct-mail-list" color="secondary" block>Voltar Listagem</v-btn>
        <v-btn v-if="!overlay" :to="`/direct-mail/${direct._id}`" class="mt-4" color="primary" block>Voltar Processo</v-btn>
        <div class="d-flex justify-center align-center">
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="10"
            :value="(countDown * 100) / sizeCountDown"
            color="teal"
          >
            <div class="d-flex flex-column align-center">
              {{ countDown }}
              <div style="font-size: 9px;">Atualiza em...</div>
            </div>
          </v-progress-circular>
        </div>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title>
            E-mails já processadas
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              clearable
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="itensSend"
            :search="search"
            height="430"
            disable-pagination
            hide-default-footer
            fixed-header
          >
            <!-- DATA -->
            <!-- eslint-disable-next-line -->
            <template v-slot:item.sended="{ item }">
              {{ item.sended | formatDatetime }}
            </template>
            <!-- ERROR -->
            <!-- eslint-disable-next-line -->
            <template v-slot:item.error="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon :color="!item.error ? 'green' : 'red'" v-bind="attrs" v-on="on">mdi-radiobox-marked</v-icon>
                </template>
                <span>{{ !item.error ? 'Enviado com sucesso!' : item.error }}</span>
              </v-tooltip>

            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { getDirectMail, getProcess } from '@/services/DirectMailService'

  export default {
    name: 'DirectMailProcessing',

    inject: ['messageBar'],

    data () {
      return {
        countDown: 0,
        refreshCount: null,
        sizeCountDown: 100,
        qtdErros: 0,
        overlay: false,
        direct: null,
        process: null,
        search: '',
        headers: [
          { text: 'Recurso', align: 'start', value: 'resource'},
          { text: 'E-mail', align: 'start', value: 'email'},
          { text: 'Envio', value: 'sended' },
          { text: 'Status', value: 'error' },
        ],
        itensSend: [],
        series: [0],
        options: {
          colors: ["#20E647"],
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%",
                background: "#293450"
              },
              track: {
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  blur: 4,
                  opacity: 0.15
                }
              },
              dataLabels: {
                name: {
                  offsetY: -10,
                  color: "#fff",
                  fontSize: "13px"
                },
                value: {
                  color: "#fff",
                  fontSize: "22px",
                  show: true
                }
              }
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "vertical",
              gradientToColors: ["#87D4F9"],
              stops: [0, 100]
            }
          },
          stroke: {
            lineCap: "round"
          },
          labels: ["Progress"]
        }
      }
    },

    methods: {
      async getDirectMail(id) {
        try {
          const resp = await getDirectMail(id);

          if (resp.status === 200) {
            this.direct = resp.data[0];
            this.getProcessing();
          }

        } catch (err) {
          console.log(err.message);
          this.messageBar().showMessage(err.response.data.error, 'error');
        }
      },

      async getProcessing() {
        try {
          const resp = await getProcess({
            id: this.direct._id,
            user: this.direct.user_id
          });

          if (resp.status === 200) {

            if (resp.data === null ) {
              this.messageBar().showMessage('Processamento não encontrado.', 'warning');
              this.$router.go(-1);
            } else {

              this.process = resp.data;
              this.itensSend = this.process.details;
              this.process.details.reduce((valPrev, valCurrent) => valPrev + valCurrent, this.qtdErros);
              this.series = [((this.process.qtd_processed * 100) / this.direct.file.length).toFixed(2)]
            }
            this.overlay = false;
          }

        } catch (err) {
          this.overlay = false;
          console.log(err.message);
          this.messageBar().showMessage(err.response.data.error, 'error');
        }
      },

      startCount() {
        this.refreshCount = setInterval(() => {
          if (this.countDown === 0 ) {

            this.getDirectMail(this.$route.params.id).then(() => {
              if (this.direct.date_end) {
                this.stopInteval();
                this.countDown = 0;
                this.messageBar().showMessage('Processo finalizado.');
              }
            });
            
            this.getProcessing();
            this.countDown = this.direct.parameters.email_sending_interval
          } else {

            this.countDown--;
          }
        }, 1000);
      },

      stopInteval() {
        clearInterval(this.refreshCount);
        this.refreshCount = null;
        this.countDown = 0;
      }
    },

    created() {
      this.overlay = true;
      this.$store.dispatch('main/cleanBreadcrumbs')
      this.$store.dispatch('main/addBreadcrumbs', { text: 'Mala Direta', disabled: true, to: '/direct-mail' })
      this.$store.dispatch('main/addBreadcrumbs', { text: 'Processamento', disabled: false, to: '/direct-mail-processing' })
      
      const { id } = this.$route.params;

      if (id) {
        this.getDirectMail(id).then(() => {
          if (!this.direct.date_end) {
            this.sizeCountDown = this.direct.parameters.email_sending_interval;
            this.startCount();
          }
        });

      } else {
        this.$router.go(-1);
      }
    },

    destroyed() {
      this.stopInteval();
    },
  }
</script>

<style scoped>
 .f1 {
    background-color: beige;
  }
  .v-progress-circular {
    margin: 1rem;
  }
</style>