const state = {
  characters: ["01"]
};

const mutations = {
  pushCharacter(state, character) {
    state.character.push(character);
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
