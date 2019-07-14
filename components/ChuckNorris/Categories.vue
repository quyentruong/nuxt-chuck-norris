<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap align-center>
      <template v-if="itemsExist">
        <v-select
          v-model="items[0]"
          :items="items"
          box
          label="Categories"
        />
      </template>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Categories',
  data: () => ({
    items: []
  }),
  computed: {
    itemsExist() {
      return this.items.length > 0
    }
  },
  created() {
    this.fetchSomething()
  },
  methods: {
    async fetchSomething() {
      const ip = await this.$axios.$get('https://api.chucknorris.io/jokes/categories')
      ip.unshift('random')
      this.items = ip
    }
  }
}
</script>

<style scoped>

</style>
