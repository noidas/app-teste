<template>
  <div>
    <!-- Barra superior -->
    <v-app-bar color="#fcb69f" src="https://picsum.photos/1920/1080?random" dark>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
      </template>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
    </v-app-bar>

    <!-- Menu lateral -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <!-- Usuario logado -->
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="d-flex flex-column align-center pa-4">
          <v-btn to="/perfil" color="secondary" class="mb-3" width="100%" text>Meu Perfil</v-btn>
          <v-btn @click="logoutUser" color="primary" width="100%" text>Sair</v-btn>
        </div>
      </template>

      <!-- Opcoes -->
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://picsum.photos/100"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ userLogged.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ userLogged.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Opcoes finais -->
      <v-list dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="item in itemsMenu" :key="item.title" :to="item.to" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { logout } from '@/services/authService'

  export default {
    name: 'TopBar',

    props: ['userLogged'],
  
    data () {
      return {
        drawer: false,
        group: null,
        itemsMenu: [],
      }
    },

    methods: {
      logoutUser () {
        logout();
        this.$router.push('/login');
      },

      initVariables () {
        this.itemsMenu.push(
          { title: 'Mala Direta', icon: 'mdi-email-multiple-outline', to: '/direct-mail-list' }
        );

        if (this.userLogged.isAdmin) {

          this.itemsMenu.push(
            { title: 'Usuários', icon: 'mdi-account', to: 'users' },
          );
        }
      }
    },

    watch: {
      group () {
        this.drawer = false;
      },
    },

    computed: mapState ({
      breadcrumbs: state => state.main.breadcrumbs
    }),

    created () {
      this.initVariables();
      // v-if="Object.keys(userLogged).length > 0"
    }
  }
</script>

<style>

</style>