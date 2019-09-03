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
    <b-row>
      <b-col><b-button>Wurf</b-button></b-col>
    </b-row>
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
// import { mapActions } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters("characters", ["characters", "activeCharacters"])
  },
  methods: {
    // ...mapActions("characters", ["addCharacter"])
  }
};
</script>
