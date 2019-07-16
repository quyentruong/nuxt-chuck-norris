<template>
  <v-container>
    <v-layout align-center justify-center fill-height mb-5>
      <v-flex xl3 lg3 md6 sm6>
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
      </v-flex>
    </v-layout>
    <template v-if="searchPress">
      <template v-if="jokeListExist" />
      <v-layout v-else align-center justify-center>
        Fetching Jokes &nbsp;&nbsp;&nbsp;
        <v-progress-circular
          indeterminate
          color="red"
        />
      </v-layout>
    </template>
    <v-layout row wrap>
      <!--   Layout for whole row to contain number of card  4,3,3,2,2  -->
      <v-flex
        v-for="(joke,index) in jokeList"
        :key="index"
        xl3
        lg4
        md4
        sm6
      >
        <!--     Set card width   -->
        <v-flex
          xl11
          lg11
          md11
          sm11
          xm11
          mb-2
        >
          <v-card>
            <v-layout align-center justify-center fill-height>
              <v-flex offset-lg5 offset-xl5 offset-xs5 offset-sm5 offset-md5>
                <v-img
                  :src="joke.icon_url"
                  :lazy-src="joke.icon_url"
                  width="64"
                  height="64"
                />
              </v-flex>
            </v-layout>
            <v-card-text>
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
  head() {
    return {
      titleTemplate: '%s - ' + this.$options.name
    }
  },
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
      this.jokeList = []
      this.fetchSomething(this.searchText)
      this.searchText = ''
      this.searchPress = true
    }
  }
}
</script>

<style scoped>

</style>
