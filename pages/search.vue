<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex text-xs-center xs3>
      <v-text-field
        v-model="searchText"
        prepend-icon="search"
        hide-details
        single-line
        clear-icon="cancel"
        clearable
        @click:prepend="searchJoke"
        @keyup.enter.exact="searchJoke"
      />
      <template v-if="searchPress">
        <template v-if="jokeListExist">
          <template v-for="(joke,index) in jokeList">
            <p :key="index">
              {{ joke.value }}
            </p>
          </template>
        </template>
        <div v-else>
          Fetching Jokes
          <v-progress-circular
            indeterminate
            color="red"
          />
        </div>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Search',
  data: () => ({
    searchText: '',
    jokeList: [],
    searchPress: false
  }),
  computed: {
    jokeListExist() {
      return this.jokeList.length > 0
    }
  },
  methods: {
    fetchSomething(searchText) {
      this.$axios.$get(`https://api.chucknorris.io/jokes/search?query=${searchText}`).then((res) => {
        // eslint-disable-next-line no-console
        // console.log(res.result)
        this.jokeList = res.result
      })
    },
    searchJoke() {
      this.fetchSomething(this.searchText)
      this.searchText = ''
      this.searchPress = true
    }
  }
}
</script>

<style scoped>

</style>
