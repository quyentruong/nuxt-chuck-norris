<template>
  <v-layout>
    <v-flex text-xs-center>
      <Categories />
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>assa</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Categories from '../components/ChuckNorris/Categories'
export default {
  components: { Categories }
}
</script>
