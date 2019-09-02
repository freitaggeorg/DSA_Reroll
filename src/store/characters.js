const state = {
  characters: []
};

const mutations = {
  pushCharacter(state, character) {
    state.characters.push(character);
  }
};

const actions = {
  addCharacter({ commit }, character) {
    commit("pushCharacter", character);
  }
};

const getters = {
  characters: state => {
    return state.characters;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
