export const state = () => ({
  category: 'random'
  // category: 'animal'
})

export const mutations = {
  setCategory(state, newCat) {
    state.category = newCat
  }
}
