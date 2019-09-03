<template>
  <b-container>
    <h1>Probewürfe</h1>
    <b-row>
      <b-col><b-button @click="newRoll">Würfeln</b-button></b-col>
    </b-row>
    <div class="head-row">
      <div class="head-row-attributes" style="text-align: left"></div>
      <div class="head-row-characters">
        <div v-for="(char, index) in characters" :key="char.name + index">
          <div v-if="activeCharacters[index]" class="character-name">
            {{ char.name }}
          </div>
          <div>
            {{ rolls[index] }}
          </div>
        </div>
      </div>
    </div>
    <div class="head-row">
      <div class="head-row-attributes" style="text-align: left">
        <b-form-group label="Modifikator" label-cols-sm="6" label-cols-lg="4">
          <b-form-input
            v-model="modificator"
            :formatter="modificatorFormat"
            type="number"
            max="10"
            min="-10"
            placeholder="0"
            style="width: auto;"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="head-row-characters">
        <div v-for="(char, index) in characters" :key="char.name + index">
          <div v-if="activeCharacters[index]" class="character-name">
            <b-form-input
              v-model="singleMod[index]"
              :formatter="modificatorFormat"
              type="number"
              max="10"
              min="-10"
              placeholder="0"
              style="width: auto;"
            ></b-form-input>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-for="talentGroup in results"
        :key="talentGroup.name"
        class="talent-group"
      >
        <div class="talent-group-name">
          {{ talentGroup.name }}
        </div>
        <div>
          <div
            v-for="talent in talentGroup.subTalents"
            :key="talent.name"
            class="result-row"
          >
            <div class="head-row-attributes">
              {{ talent.name }}
            </div>
            <div class="character-result-row">
              <div
                v-for="(roll, index) in talent.result"
                :key="talent.name + characters[index].name"
                class="character-name"
              >
                <div v-if="roll.success">
                  <CheckIcon title="" />
                </div>
                <div v-else>
                  <CancelIcon title="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { mapActions } from "vuex";
import CheckIcon from "vue-material-design-icons/Check";
import CancelIcon from "vue-material-design-icons/Cancel";

export default {
  name: "Home",
  components: {
    CheckIcon,
    CancelIcon
  },
  data() {
    return {
      modificator: 0,
      singleMod: []
    };
  },
  computed: {
    ...mapGetters("characters", [
      "characters",
      "activeCharacters",
      "rolls",
      "results"
    ])
  },
  mounted() {
    for (let i = 0; i < this.characters.length; i++) {
      this.singleMod.push(0);
    }
  },
  methods: {
    ...mapActions("characters", ["rollDice"]),
    modificatorFormat(value) {
      let rv = parseInt(value);
      if (isNaN(rv)) return 0;
      else if (rv < -10) return -10;
      else if (rv > 10) return 10;
      else return rv;
    },
    newRoll() {
      this.rollDice({
        globalMod: this.modificator,
        singleModArray: this.singleMod
      });
    }
  }
};
</script>
