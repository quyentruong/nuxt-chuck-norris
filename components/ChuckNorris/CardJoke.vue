<template>
  <v-card v-if="joke">
    <v-layout align-center justify-center row>
      <v-card-title primary-title>
        <h2 class="headline">
          {{ getCategory }} joke
        </h2>
      </v-card-title>
    </v-layout>
    <v-layout align-center justify-center row>
      <v-flex offset-lg5 offset-xl5 offset-xs5 offset-sm5 offset-md5>
        <v-img
          align-center
          :src="joke.icon_url"
          :lazy-src="joke.icon_url"
          width="64"
          height="64"
        />
      </v-flex>
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
  beforeDestroy() {
    this.removeInterval()
    this.$store.commit('chuck_norris/setCategory', 'random')
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
