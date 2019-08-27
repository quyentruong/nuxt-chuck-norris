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
      <v-switch v-model="switchJoke" color="red" />
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="value"
        color="red"
      >
        {{ value/20 }}s
      </v-progress-circular>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardJoke',
  data: () => ({
    joke: '',
    switchJoke: false,
    intervalCount: 0,
    intervalCircle: 0,
    value: 0
  }),
  computed: {
    getCategory () {
      return this.$store.state.chuck_norris.category
    },
    getRequestJoke () {
      return this.$store.state.chuck_norris.requestJoke
    }
  },
  watch: {
    getCategory (newCat) {
      this.removeInterval()
      if (this.switchJoke) {
        this.startInterval(newCat)
      } else {
        this.fetchSomething(newCat)
      }
    },
    getRequestJoke (newCat) {
      this.removeInterval()
      if (this.switchJoke) {
        this.startInterval(this.getCategory)
      } else {
        this.fetchSomething(this.getCategory)
      }
    },
    switchJoke () {
      if (this.switchJoke) {
        this.startInterval(this.getCategory)
      } else {
        this.removeInterval()
      }
    }
  },
  created () {
    this.fetchSomething(this.getCategory)
  },
  beforeDestroy () {
    this.removeInterval()
    this.$store.commit('chuck_norris/setCategory', 'random')
  },
  methods: {
    fetchSomething (category) {
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
    startInterval (category) {
      this.intervalCircle = setInterval(() => {
        if (this.value === 100) {
          this.fetchSomething(category)
          this.value = 0
        }
        this.value += 20
      }, 1000)
    },
    removeInterval () {
      clearInterval(this.intervalCircle)
      this.value = 0
    }
  }
}
</script>

<style scoped>
    .card-text {
        font-size: 18px;
    }
</style>
