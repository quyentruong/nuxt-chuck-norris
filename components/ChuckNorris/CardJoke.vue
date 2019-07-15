<template>
  <div>{{ joke.value }}</div>
</template>

<script>
export default {
  name: 'CardJoke',
  data: () => ({
    joke: ''
  }),
  computed: {
    getCategory() {
      return this.$store.state.chuck_norris.category
    }
  },
  watch: {
    getCategory(newCat) {
      this.fetchSomething(newCat)
    }
  },
  methods: {
    fetchSomething(category) {
      this.$axios.$get(`https://api.chucknorris.io/jokes/random?category=${category}`).then((res) => {
        this.joke = res
      })
    }
  }
}
</script>

<style scoped>

</style>
