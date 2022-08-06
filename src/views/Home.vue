<template>
  <v-container class="mt-10">
    <v-row>
      <v-col cols="12" class="d-flex justify-center justify-md-start">
        <card-link icon="mdi-email-multiple" text="Mala Direta" value="-" link="/direct-mail-list"></card-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import CardLink from '../components/cardLink.vue'

  export default {
    name: 'Home',

    components: {
      CardLink
    },

    data () {
      return {
        //
      }
    },

    methods: {
      //
    },

    computed: mapState ({
      breadcrumbs: state => state.main.breadcrumbs,
      itemsPerPage: state => state.main.itemsPerPage
    }),

    created () {
      this.$store.dispatch('main/cleanBreadcrumbs')
    }
  }
</script>

<style>
</style>