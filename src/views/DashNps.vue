<template>
  <div class="grey lighten-3" style="height: 100vh;">
    <v-container>
      <v-row class="mt-5" align="baseline">
        <div class="mr-2">Data inicio:</div>
        <v-text-field outlined dense></v-text-field>
        <v-spacer></v-spacer>
        <div class="mr-2">Data fim:</div>
        <v-text-field outlined dense></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary">Consultar</v-btn>
      </v-row>
      
      <v-row justify="center" align="center" style="height: 70vh;">
        <v-col>
          <div class="font-weight-bold">% de Promotores</div>
          <v-sheet class="d-flex flex-row align-center justify-center" color="success" height="80" width="100%">
            <div class="white--text text-h4 font-weight-bold">{{ data.promotores.percent }}</div>
          </v-sheet>
          <div class="mt-5 font-weight-bold">% de Neutros</div>
          <v-sheet class="d-flex flex-row align-center justify-center" color="yellow darken-2" height="80" width="100%">
            <div class="white--text text-h4 font-weight-bold">{{ data.neutros.percent }}</div>
          </v-sheet>
          <div class="mt-5 font-weight-bold">% de Detratores</div>
          <v-sheet class="d-flex flex-row align-center justify-center" color="error" height="80" width="100%">
            <div class="white--text text-h4 font-weight-bold">{{ data.detratores.percent }}</div>
          </v-sheet>
        </v-col>

        <v-col>
          <div class="font-weight-bold">Quantidade de Promotores</div>
          <v-sheet class="d-flex flex-row align-center justify-center" color="success" height="80" width="100%">
            <div class="white--text text-h4 font-weight-bold">{{ data.promotores.value }}</div>
          </v-sheet>
          <div class="mt-5 font-weight-bold">Quantidade de Neutros</div>
          <v-sheet class="d-flex flex-row align-center justify-center" color="yellow darken-2" height="80" width="100%">
            <div class="white--text text-h4 font-weight-bold">{{ data.neutros.value }}</div>
          </v-sheet>
          <div class="mt-5 font-weight-bold">Quantidade de Detratores</div>
          <v-sheet class="d-flex flex-row align-center justify-center" color="error" height="80" width="100%">
            <div class="white--text text-h4 font-weight-bold">{{ data.detratores.value }}</div>
          </v-sheet>
        </v-col>

        <v-col>
          <div class="font-weight-bold">NPS</div>
          <v-sheet class="d-flex flex-row align-center justify-center" color="grey lighten-2" height="80" width="100%" style="border: 1px solid #AAA !important;">
            <div class="text-h4 font-weight-bold">{{ data.nps }}</div>
          </v-sheet>
          <div class="mt-5 font-weight-bold">Classificação</div>
          <v-sheet class="d-flex flex-row align-center justify-center" color="yellow darken-2" height="204" width="100%">
            <div class="text-h6 white--text font-weight-bold">{{ data.classificacao }}</div>
          </v-sheet>
        </v-col>

        <v-col>
          <div class="font-weight-bold">NPS</div>
          <v-sheet class="d-flex flex-row align-center justify-center" height="329" width="100%" color="grey lighten-3" style="border: 1px solid #AAA !important;">
            <apexchart width="100%" height="100%" type="donut" :options="chartOptions" :series="series"></apexchart>
          </v-sheet>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'DashNps',

    data () {
      return {
        data: {
          promotores: {
            value: 119,
            percent: '51,96%'
          },
          neutros: {
            value: 97,
            percent: '42,35%'
          },
          detratores: {
            value: 13,
            percent: '5,67%'
          },
          // promotores% - detratores%
          nps: 46.29,
          // zona critica -100 a 0
          // zona de aperfeiçoamento 0 a 50
          // zona de qualidade 50 a 75
          // zona de exelencia 75 a 100
          classificacao: 'Zona de Aperfeiçoamento'
        },
        series: [],
        chartOptions: {
          colors: ['#4caf50', '#fbc02d', '#ff5252'],
          labels: ['Promotores', 'Neutros', 'Detratores'],
          legend: {
            position: 'bottom',
            fontSize: '10px',
          },
          plotOptions: {
            pie: {
              donut: {
                size: '55%',
                background: 'transparent',
              }
            }
          }
        }
      }
    },

    created () {
      this.series = [this.data.promotores.value, this.data.neutros.value, this.data.detratores.value]
    }
  }
</script>

<style>

</style>