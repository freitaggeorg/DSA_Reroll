import roll from "../character/dice";
import talents from "../character/talents";
// import attributes from "../character/attributes";

const charsFromLocalStorage = JSON.parse(localStorage.getItem("chars"));
const activeCharsFromLocalStorage = JSON.parse(
  localStorage.getItem("activeChars")
);

const state = {
  characters: charsFromLocalStorage ? charsFromLocalStorage : [],
  selectedCharIndex: null,
  activeCharacters: activeCharsFromLocalStorage
    ? activeCharsFromLocalStorage
    : [],
  rolls: [],
  results: []
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
  },
  addRolls(state, { index, rolls }) {
    state.rolls.splice(index, 1, rolls);
  },
  updateResults(state) {
    state.results = [];
    for (let v = 0; v < talents.length; v++) {
      state.results.push({
        name: talents[v].name,
        subTalents: []
      });

      // subTalents
      for (let i = 0; i < talents[v].subTalents.length; i++) {
        // create object
        state.results[v].subTalents.push({
          name: talents[v].subTalents[i].name,
          result: []
        });
        // fill results array
        for (
          let charIndex = 0;
          charIndex < state.characters.length;
          charIndex++
        ) {
          // calculate results
          // attribute 1 vs roll 1
          let c1 =
            parseInt(
              state.characters[charIndex].attributes[
                talents[v].subTalents[i].attributes[0]
              ]
            ) - state.rolls[charIndex][0];

          // attribute 2 vs roll 2
          let c2 =
            parseInt(
              state.characters[charIndex].attributes[
                talents[v].subTalents[i].attributes[1]
              ]
            ) - state.rolls[charIndex][1];

          // attribute 3 vs roll 3
          let c3 =
            parseInt(
              state.characters[charIndex].attributes[
                talents[v].subTalents[i].attributes[2]
              ]
            ) - state.rolls[charIndex][2];

          // success?
          const pointsToSpend = parseInt(
            state.characters[charIndex].talents[talents[v].subTalents[i].index]
          );

          let success =
            pointsToSpend +
            (c1 > 0 ? 0 : c1) +
            (c2 > 0 ? 0 : c2) +
            (c3 > 0 ? 0 : c3);

          let quality = Math.ceil(success % 3);
          if (quality <= 0) quality = 1;

          let obj = {
            success: success >= 0,
            successRate: success,
            pointsToSpend: pointsToSpend,
            quality: quality,
            c1: c1,
            c2: c2,
            c3: c3
          };

          state.results[v].subTalents[i].result.push(obj);
        }
      }
    }
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
  },
  rollDice({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      try {
        for (let i = 0; i < state.characters.length; i++) {
          const rolls = await roll();
          commit("addRolls", { index: i, rolls: rolls });
        }
        commit("updateResults");
        resolve();
      } catch (e) {
        reject(e);
      }
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
  },
  rolls: state => {
    return state.rolls;
  },
  results: state => {
    return state.results;
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
