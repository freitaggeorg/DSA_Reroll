const charsFromLocalStorage = JSON.parse(localStorage.getItem("chars"));
const activeCharsFromLocalStorage = JSON.parse(
  localStorage.getItem("activeChars")
);

const state = {
  characters: charsFromLocalStorage ? charsFromLocalStorage : [],
  selectedCharIndex: null,
  activeCharacters: activeCharsFromLocalStorage
    ? activeCharsFromLocalStorage
    : []
};

const mutations = {
  pushCharacter(state, character) {
    state.characters.push(character);
    state.activeCharacters.push(true);
    updateLocalStorage(state);
  },
  updateSelected(state, index) {
    state.selectedCharIndex = index;
  },
  updateSelectedCharacter(state, character) {
    state.characters[state.selectedCharIndex] = character;
    updateLocalStorage(state);
  },
  deleteSelected(state) {
    state.characters.splice(state.selectedCharIndex, 1);
    state.activeCharacters.splice(state.selectedCharIndex, 1);
    updateLocalStorage(state);
  },
  changeActiveCharacter(state, index) {
    state.activeCharacters.splice(index, 1, !state.activeCharacters[index]);
    updateLocalStorage(state);
  },
  deleteAll(state) {
    state.activeCharacters = [];
    state.characters = [];
    localStorage.removeItem("chars");
    localStorage.removeItem("activeChars");
  }
};

const actions = {
  saveCharacter({ commit, state }, character) {
    return new Promise(resolve => {
      if (state.selectedCharIndex === null) {
        commit("pushCharacter", character);
      } else {
        commit("updateSelectedCharacter", character);
      }
      commit("updateSelected", null);
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
  },
  selectedCharIndex: state => {
    return state.selectedCharIndex;
  },
  selectedCharacter: state => {
    return state.characters[state.selectedCharIndex];
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
