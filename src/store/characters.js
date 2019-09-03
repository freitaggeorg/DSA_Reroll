const charsFromLocalStorage = JSON.parse(localStorage.getItem("chars"));
const activeCharsFromLocalStorage = JSON.parse(
  localStorage.getItem("activeChars")
);

const state = {
  characters: charsFromLocalStorage ? charsFromLocalStorage : [],
  selectedCharacter: null,
  activeCharacters: activeCharsFromLocalStorage
    ? activeCharsFromLocalStorage
    : {}
};

const mutations = {
  pushCharacter(state, character) {
    state.characters.push(character);
    state.activeCharacters.push(true);
    updateLocalStorage(state);
  },
  updateSelected(state, index) {
    state.selectedCharacter = index;
  },
  deleteSelected(state) {
    state.characters.splice(state.selectedCharacter, 1);
    state.activeCharacters.splice(state.selectedCharacter, 1);
    updateLocalStorage(state);
  },
  changeActiveCharacter(state, index) {
    state.activeCharacters.splice(index, 1, !state.activeCharacters[index]);
    updateLocalStorage(state);
  },
  deleteAll(state) {
    state.activeCharacters = [];
    state.characters = [];
    updateLocalStorage(state);
  }
};

const actions = {
  saveCharacter({ commit }, character) {
    return new Promise(resolve => {
      commit("pushCharacter", character);
      resolve();
    });
  },
  selectCharacter({ commit }, index) {
    return new Promise(resolve => {
      commit("updateSelected", index);
      resolve();
    });
  },
  deleteSelectedCharacter({ commit }) {
    return new Promise(resolve => {
      commit("deleteSelected");
      resolve();
    });
  },
  toggleCharacter({ commit }, index) {
    return new Promise(resolve => {
      commit("changeActiveCharacter", index);
      resolve();
    });
  },
  deleteAllCharacters({ commit }) {
    return new Promise(resolve => {
      commit("deleteAll");
      resolve();
    });
  }
};

const getters = {
  characters: state => {
    return state.characters;
  },
  activeCharacters: state => {
    return state.activeCharacters;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

function updateLocalStorage(state) {
  localStorage.setItem("chars", JSON.stringify(state.characters));
  localStorage.setItem("activeChars", JSON.stringify(state.activeCharacters));
}
