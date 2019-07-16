<template>
  <v-container>
    <v-layout align-center justify-center fill-height>
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
          <template v-if="jokeListExist" />
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
    <v-layout row wrap mt-5>
      <v-flex
        v-for="(joke,index) in jokeList"
        :key="index"
        xl3
        lg4
        sm6
      >
        <v-flex lg11 mb-2>
          <v-card>
            <v-img
              :src="joke.icon_url"
              width="128"
              height="128"
            />
            <v-card-text class="px-0">
              {{ joke.value }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
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
      if (searchText.length > 0) {
        this.$axios.$get(`https://api.chucknorris.io/jokes/search?query=${searchText}`).then((res) => {
          // eslint-disable-next-line no-console
          // console.log(res.result)
          this.jokeList = res.result
        })
      } else {
        this.jokeList = []
      }
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
