<template>
  <b-container>
    <h1>Probewürfe</h1>
    <b-row>
      <b-col v-for="char in characters" :key="char.name + index">
        <div>{{ char.name ? char.name : "" }}</div>
      </b-col>
    </b-row>
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
import { mapActions } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters("characters", ["characters"])
  },
  methods: {
    ...mapActions("characters", ["addCharacter"])
  }
};
</script>
