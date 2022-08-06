<template>
  <div>
    <!-- Modal para mensagens -->
    <v-snackbar v-model="snackbarMsg" :multi-line="multiLineMsg" :color="colorMsg ? colorMsg : ''" :timeout="timeMsg ? timeMsg : ''" top right :text="checkOK">
      <!-- Listagem multi linhas -->
      <v-list v-if="isList" :color="colorMsg ? colorMsg : ''">
        <v-list-item v-for="(item, i) in textMsg" :key="i">
          <v-list-item-icon>
            <v-icon>mdi-circle-small</v-icon>
          </v-list-item-icon>
 
          <v-list-item-content>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
 
      <!-- Mensagem simples -->
      <div v-else>{{ textMsg }}</div>
 
      <!-- Os itens abaixo deverao aparecer somente um por vez -->
      <template v-slot:action="{ attrs }">
        <!-- Loading circular -->
        <v-progress-circular v-if="loadingMsg" class="mx-4" color="primary" indeterminate></v-progress-circular>
 
        <!-- Icone para check Ok -->
        <v-icon v-if="checkOK" color="green" v-bind="attrs">mdi-check-circle-outline</v-icon>
 
        <!-- Botao de fechar -->
        <v-btn v-if="closeMsg" @click="snackbarMsg = false" class="ml-5" color="black" v-bind="attrs" text>
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
 
<script>
  export default {
    name: 'MessageBar',
 
    data () {  
      return {
        checkOK: false,
        overlay: false,
        snackbarMsg: false,
        multiLineMsg: false,
        colorMsg: 'sucess',
        timeMsg: 5000,
        loadingMsg: false,
        closeMsg: false,
        textMsg: null,
        isList: false
      }
    },
 
    methods: {
      closeMessage () {
        this.snackbarMsg = false
      },
 
      showMessage (text, type = 'success', time = 5000 ) {
 
        switch (type) {
          case 'error':
            this.multiLineMsg = true
            this.colorMsg = 'error'
            this.timeMsg = time
            this.loadingMsg = false
            this.closeMsg = true
            this.checkOK = false
            this.isList = false
            break;
     
          case 'success':
            this.multiLineMsg = false
            this.colorMsg = 'success'
            this.timeMsg = time
            this.loadingMsg = false
            this.closeMsg = true
            this.checkOK = false
            this.isList = false
            break;
 
          case 'info':
            this.multiLineMsg = false
            this.colorMsg = 'info'
            this.timeMsg = time
            this.loadingMsg = false
            this.closeMsg = true
            this.checkOK = false
            this.isList = false
            break;
 
          case 'warning':
            this.multiLineMsg = false
            this.colorMsg = 'warning'
            this.timeMsg = time
            this.loadingMsg = false
            this.closeMsg = true
            this.checkOK = false
            this.isList = false
            break;
 
          case 'progress':
            this.multiLineMsg = false
            this.colorMsg = 'info'
            this.timeMsg = time
            this.loadingMsg = true
            this.closeMsg = false
            this.checkOK = false
            this.isList = false
            break;
 
          case 'light':
            this.multiLineMsg = false
            this.colorMsg = 'info'
            this.timeMsg = time
            this.loadingMsg = false
            this.closeMsg = false
            this.checkOK = true
            this.isList = false
            break;
        }
 
        if (typeof(text) == 'object') {
 
          this.isList = true
          this.multiLineMsg = true
        }
 
        this.textMsg = text
        this.snackbarMsg = true
      }
    }
  }
</script>
 
<style lang="scss" scoped>
 
  ::v-deep {
 
    .v-list > .v-list-item {
      min-height: 24px;
    }
 
    .v-list > .v-list-item > .v-list-item__icon {
      margin: 0;
    }
 
    .v-list > .v-list-item > .v-list-item__content {
      padding: 6px 0;
    }
  }
</style>