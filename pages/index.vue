<template>
  <v-layout align-center justify-center fill-height>
    <v-flex lg3 md4 sm10 xs10>
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
