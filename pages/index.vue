<template>
  <v-container>
    <v-layout align-center justify-center fill-height>
      <v-flex xl5 lg5 md9 sm10 xs10>
        <Categories />
        <CardJoke />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Categories from '../components/ChuckNorris/Categories'
import CardJoke from '../components/ChuckNorris/CardJoke'

export default {
  name: 'Index',
  head () {
    return {
      titleTemplate: '%s - ' + this.$options.name
    }
  },
  components: { CardJoke, Categories },
  computed: {
    category () {
      return this.$store.state.chuck_norris.category
    }

  }
}
</script>
