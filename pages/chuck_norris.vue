<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex text-xs-center xs3>
      <Categories />
      <CardJoke />
    </v-flex>
  </v-layout>
</template>

<script>
import Categories from '../components/ChuckNorris/Categories'
import CardJoke from '../components/ChuckNorris/CardJoke'

export default {
  components: { CardJoke, Categories },
  computed: {
    category() {
      return this.$store.state.chuck_norris.category
    }

  }
}
</script>
