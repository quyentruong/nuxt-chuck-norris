<template>
  <v-container>
    <v-layout align-center justify-center fill-height mb-5>
      <v-flex xl3 lg3 md6 sm6>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent
        >
          <v-text-field
            v-model="searchText"
            :rules="searchTextRule"
            label="Search Text"
            prepend-icon="search"
            single-line
            clear-icon="cancel"
            clearable
            required
            @click:prepend="searchJoke"
            @keyup.enter.exact="searchJoke"
          />
        </v-form>
      </v-flex>
    </v-layout>
    <template v-if="searchPress">
      <template v-if="jokeListExist" />
      <v-layout v-else align-center justify-center>
        <span v-if="total!==0">Fetching Jokes &nbsp;&nbsp;&nbsp;
          <v-progress-circular
            indeterminate
            color="red"
          /></span>
        <span v-else class="display-1"><v-icon>sentiment_very_dissatisfied</v-icon> &nbsp;&nbsp;&nbsp; Not Found</span>
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
    valid: true,
    total: 1,
    searchText: '',
    jokeList: [],
    searchPress: false,
    searchTextRule: [
      v => !!v || 'Text is required',
      v => (v && v.length > 2) || 'Text must be more than 2 characters'
    ]
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
          this.total = res.total
          this.jokeList = res.result
        })
      } else {
        this.jokeList = []
      }
    },
    searchJoke() {
      if (this.$refs.form.validate()) {
        this.total = 1
        this.jokeList = []
        this.fetchSomething(this.searchText)
        this.searchPress = true
        this.$refs.form.reset()
      }
    }
  }
}
</script>

<style scoped>

</style>
