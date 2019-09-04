<template>
  <b-container>
    <h1>Probewürfe</h1>
    <b-row>
      <b-col><b-button @click="newRoll">Würfeln</b-button></b-col>
      <b-col>
        <router-link to="/characters" tag="button" class="btn btn-secondary">
          Charactere verwalten
        </router-link>
      </b-col>
    </b-row>
    <div class="head-row">
      <div class="head-row-attributes" style="text-align: left">
        <b-form-input
          v-model="searchTerm"
          type="text"
          placeholder="Search..."
          style="width: auto;"
        ></b-form-input>
      </div>
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
    <div class="head-row" style="margin-bottom: 0;">
      <div class="head-row-attributes">
        <b-form-group label="Modifier" label-cols-sm="6" label-cols-lg="6">
          <b-form-input
            v-model="modifier"
            :formatter="modifierFormat"
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
              :formatter="modifierFormat"
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
    <div class="head-row" style="margin-top: 0;">
      <div class="head-row-attributes">
        Handicap
      </div>
      <div class="head-row-characters">
        <div v-for="(char, index) in characters" :key="char.name + index">
          <div v-if="activeCharacters[index]" class="character-name">
            <b-form-checkbox v-model="enableHandicap[index]"> </b-form-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-for="talentGroup in filteredResults(searchTerm)"
        :key="talentGroup.name"
        class="talent-group"
      >
        <div class="talent-group-name">
          {{ talentGroup.name }}
        </div>
        <div>
          <div
            v-for="(talent, r) in talentGroup.subTalents"
            :key="talent.name"
            class="result-row"
            :class="{ colored: r % 2 === 0 }"
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
                <div v-if="criticalRoll[index] !== 0">
                  <div
                    v-if="criticalRoll[index] === 1"
                    class="success critical"
                  >
                    <DoubleCheckIcon title="" />
                  </div>
                  <div v-else class="fail critical">
                    <CloseIcon title="" /><CloseIcon title="" />
                  </div>
                </div>
                <div v-else-if="!enableHandicap[index]" class="max-height">
                  <div v-if="roll.success" class="result-row centered success">
                    <CheckIcon title="" />
                    <QualityNumber :value="roll.quality" />
                  </div>
                  <div v-else class="result-row centered fail">
                    <CancelIcon title="" />
                  </div>
                </div>
                <div v-else class="max-height">
                  <div v-if="roll.successH" class="result-row centered success">
                    <CheckIcon title="" />
                    <QualityNumber :value="roll.qualityH" />
                  </div>
                  <div
                    v-else
                    class="result-row centered fail"
                    :class="{ handicap: roll.handicapLevel === 2 }"
                  >
                    <CancelIcon title="" />
                    <!-- <HelpCircle v-if="roll.handicapLevel === 2" /> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CheckIcon from "vue-material-design-icons/Check";
import DoubleCheckIcon from "vue-material-design-icons/CheckAll";
import CancelIcon from "vue-material-design-icons/Cancel";
// import HelpCircle from "vue-material-design-icons/HelpCircleOutline";
import CloseIcon from "vue-material-design-icons/Close";
import QualityNumber from "../components/QualityNumber";

export default {
  name: "Home",
  components: {
    CheckIcon,
    DoubleCheckIcon,
    CancelIcon,
    // HelpCircle,
    CloseIcon,
    QualityNumber
  },
  data() {
    return {
      modifier: 0,
      singleMod: [],
      enableHandicap: [],
      searchTerm: ""
    };
  },
  computed: {
    ...mapGetters("characters", [
      "characters",
      "activeCharacters",
      "rolls",
      "results",
      "filteredResults"
    ]),
    criticalRoll: function() {
      let criticalArray = [];
      for (let i = 0; i < this.rolls.length; i++) {
        let duplicate = this.rolls[i].filter(function(value, index, self) {
          return self.indexOf(value) !== index;
        });
        if (duplicate.length > 0) {
          if (duplicate[0] === 20) criticalArray.push(20);
          else if (duplicate[0] === 1) criticalArray.push(1);
          else criticalArray.push(0);
        } else {
          criticalArray.push(0);
        }
      }
      return criticalArray;
    }
  },
  watch: {
    modifier: function(val) {
      for (let i = 0; i < this.singleMod.length; i++) {
        this.singleMod[i] = val;
      }
    }
  },
  mounted() {
    for (let i = 0; i < this.characters.length; i++) {
      this.singleMod.push(0);
      this.enableHandicap.push(true);
    }
  },
  methods: {
    ...mapActions("characters", ["rollDice"]),
    modifierFormat(value) {
      let rv = parseInt(value);
      if (isNaN(rv)) return 0;
      else if (rv < -10) return -10;
      else if (rv > 10) return 10;
      else return rv;
    },
    newRoll() {
      this.rollDice(this.singleMod);
    }
  }
};
</script>
