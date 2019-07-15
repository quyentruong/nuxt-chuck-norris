<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card v-if="joke">
    <v-layout align-center justify-center row fill-height>
      <v-card-title primary-title>
        <h2 class="headline">
          {{ getCategory }} joke
        </h2>
      </v-card-title>
    </v-layout>
    <v-layout align-center justify-center row fill-height>
      <v-img
        :src="joke.icon_url"
        width="256"
        height="256"
      />
    </v-layout>
    <v-card-text class="card-text">
      {{ joke.value }}
    </v-card-text>
    <v-card-actions>
      <v-switch v-model="switchJoke" color="red">
        <template v-slot:label>
          Run each 5s: <v-progress-circular :indeterminate="switchJoke" color="red" :value="0" size="24" class="ml-2" />
        </template>
      </v-switch>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardJoke',
  data: () => ({
    joke: '',
    switchJoke: false,
    intervalCount: 0
  }),
  computed: {
    getCategory() {
      return this.$store.state.chuck_norris.category
    }
  },
  watch: {
    getCategory(newCat) {
      this.removeInterval()
      if (this.switchJoke) {
        this.startInterval(newCat)
      } else {
        this.fetchSomething(newCat)
      }
    },
    switchJoke() {
      if (this.switchJoke) {
        this.startInterval(this.getCategory)
      } else {
        this.removeInterval()
      }
    }
  },
  created() {
    this.fetchSomething(this.getCategory)
  },

  methods: {
    fetchSomething(category) {
      if (category === 'random') {
        this.$axios.$get(`https://api.chucknorris.io/jokes/random`).then((res) => {
          this.joke = res
        })
      } else {
        this.$axios.$get(`https://api.chucknorris.io/jokes/random?category=${category}`).then((res) => {
          this.joke = res
        })
      }
    },
    startInterval(category) {
      this.intervalCount = setInterval(() => {
        this.fetchSomething(category)
      }, 5000)
    },
    removeInterval() {
      clearInterval(this.intervalCount)
    }
  }
}
</script>

<style scoped>
.card-text{
  font-size: 18px;
}
</style>
