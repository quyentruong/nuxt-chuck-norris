export const state = () => ({
  category: 'random',
  requestJoke: ''
  // category: 'animal'
})

export const mutations = {
  setCategory(state, newCat) {
    state.category = newCat
  },
  setRequestJoke(state, newReq) {
    state.requestJoke = newReq
  }
}
