<template>
  <v-card elevation="2" width="17em" class="mb-5 rounded-lg">
    <v-sheet color="blue lighten-3">
      <div class="md pos-img">
        <v-icon size="64">{{ icon }}</v-icon>
      </div>
      <v-card-title class="text-h5 font-weight-bold">{{ value }}</v-card-title>
      <v-card-subtitle>
        {{ text }}
      </v-card-subtitle>

      <router-link :to="link">
        <v-footer class="justify-center rounded-b-lg">
          Mais detalhes
          <v-icon class="ml-3">mdi-arrow-right-bold-circle</v-icon>
        </v-footer>
      </router-link>
    </v-sheet>
  </v-card>  
</template>

<script>
  export default {
    name: 'CardLink',

    props: ['icon', 'text', 'value', 'link']
  }
</script>

<style scoped lang="scss">
  .pos-img {
    transition: 1s;
    position: absolute;
    margin-top: 10px;
    padding-left: 70%;
    flex-wrap: wrap;
    transform: scale(1);
  }

  .theme--light.v-card:hover {
    .pos-img {
      transition: 1s;
      padding-left: 60%;
      transform: scale(1.2);
    }
  } 

  .theme--light.v-footer {
    transition: 0.5s;
    background-color: #64B5F6;
  }

  .theme--light.v-footer:hover {
    transition: 0.5s;
    background-color: #42A5F5;
  }
</style>