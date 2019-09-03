<template>
  <b-container>
    <h1>Probewürfe</h1>
    <b-row>
      <b-col><b-button @click="rollDice">Wurf</b-button></b-col>
    </b-row>
    <div class="head-row">
      <div class="head-row-attributes" style="text-align: left">Attribute</div>
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
  computed: {
    ...mapGetters("characters", [
      "characters",
      "activeCharacters",
      "rolls",
      "results"
    ])
  },
  methods: {
    ...mapActions("characters", ["rollDice"])
  }
};
</script>
