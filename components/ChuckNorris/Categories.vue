<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap align-center>
      <v-select
        v-if="categoriesExist"
        v-model="selected"
        :items="categories"
        box
        label="Categories"
        @change="setCategory"
      />
      <v-progress-circular
        v-else
        indeterminate
        color="red"
      />
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'Categories',
  data: () => ({
    categories: [],
    selected: ''
  }),
  computed: {
    categoriesExist() {
      return this.categories.length > 0
    }
  },
  watch: {
    categories(newCat) {
      const parsed = JSON.stringify(newCat)
      sessionStorage.setItem('categories', parsed)
    }
  },
  created() {
    if (sessionStorage.getItem('categories')) {
      try {
        this.categories = JSON.parse(sessionStorage.getItem('categories'))
      } catch (e) {
        sessionStorage.removeItem('categories')
      }
    } else {
      this.fetchSomething()
    }
    this.selected = this.categories[0]
  },

  methods: {
    async fetchSomething() {
      const ip = await this.$axios.$get('https://api.chucknorris.io/jokes/categories')
      ip.unshift('random')
      this.categories = ip
      this.selected = this.categories[0]
    },
    setCategory() {
      this.$store.commit('chuck_norris/setCategory', this.selected)
    }
  }
}
</script>

<style scoped>

</style>
