<template>
  <b-container>
    <h1>Probewürfe</h1>
    <div class="head-row">
      <div class="head-row-attributes">Attribute</div>
      <div class="head-row-characters">
        <div v-for="(char, index) in characters" :key="char.name + index">
          <div v-if="activeCharacters[index]" class="character-name">
            {{ char.name }}
          </div>
        </div>
      </div>
    </div>
    <hr />
    <b-button @click="rollDices">Wurf</b-button>
    <b-table sticky-header head-variant="light" :items="tableItems"> </b-table>
    <b-row>
      <b-col>
        Attributes here
      </b-col>
    </b-row>
    <b-row style="margin-top: 100px;">
      <b-col>
        <router-link to="/characters" tag="button">
          Charactere verwalten
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { Random } from "random-js";
import fixedTalents from "../character/talents";

const random = new Random();

// import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      fixedTalents: fixedTalents,
      dices: [],
      tableItems: []
    };
  },
  computed: {
    ...mapGetters("characters", ["characters", "activeCharacters"])
  },
  methods: {
    calculedValue: function(
      mainTalentIndex,
      subTalentIndex,
      characterIndex,
      runningTalentIndex
    ) {
      const talent = this.fixedTalents[mainTalentIndex].subTalents[
        subTalentIndex
      ];
      const char = this.characters[characterIndex];
      const dices = this.dices[characterIndex];
      let value = char.talents[runningTalentIndex];

      let c = 0;

      for (let i = 0; i < 3; i++) {
        c = dices[i] - char.attributes[talent.attributes[i]];
        if (c > 0) {
          value -= c;
        }
      }
      return value;
    },
    rollDices: function() {
      for (let k in this.characters) {
        if (this.activeCharacters[k]) {
          this.dices[k] = [
            random.integer(1, 20),
            random.integer(1, 20),
            random.integer(1, 20)
          ];
        }
      }
      this.createTableItems();
    },
    createTableItems: function() {
      let items = [];
      let obj = {};
      let counter = 0;
      for (let i in this.fixedTalents) {
        for (let j in this.fixedTalents[i].subTalents) {
          obj = { attribute: fixedTalents[i].subTalents[j].name };
          for (let k in this.characters) {
            if (this.activeCharacters[k]) {
              if (this.dices[k]) {
                let caluledValue = this.calculedValue(i, j, k, counter);
                if (caluledValue >= 0) {
                  //roll a success
                  obj[this.characters[k].name] =
                    "QS" + (Math.floor(caluledValue / 3) + 1);
                } else {
                  //roll a fail
                  obj[this.characters[k].name] = "Fail";
                }
              } else {
                obj[this.characters[k].name] = "-";
              }
              counter++;
            }
          }
          items.push(obj);
        }
      }
      this.tableItems = items;
    }
    // ...mapActions("characters", ["addCharacter"])
  }
};
</script>
