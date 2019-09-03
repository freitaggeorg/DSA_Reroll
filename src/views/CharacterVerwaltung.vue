<template>
  <b-container>
    <h1>Character Verwaltung</h1>
    <div v-for="(char, index) in characters" :key="char.name + index">
      <b-row>
        <b-col @click="selectAndEdit(index)">
          {{ char.name }}
        </b-col>
        <b-col>
          <div
            :style="{ color: activeCharacters[index] ? 'green' : 'red' }"
            @click="toggleCharacter(index)"
          >
            <ToggleOnIcon v-if="activeCharacters[index]" />
            <ToggleOffIcon v-else />
          </div>
        </b-col>
        <b-col>
          <ExportIcon />
        </b-col>
        <b-col>
          <DeleteIcon @click="requestDelete(index)" />
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col>
        <router-link to="/newcharacter" tag="button">
          Neuen Character erstellen
        </router-link>
      </b-col>
      <b-col>
        <b-button @click="deleteAllCharacters">Delete all</b-button>
      </b-col>
    </b-row>
    <b-row style="margin-top: 100px;">
      <b-col>
        <router-link to="/" tag="button">
          Zurück
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import ExportIcon from "vue-material-design-icons/ExportVariant";
import DeleteIcon from "vue-material-design-icons/Delete";
import ToggleOnIcon from "vue-material-design-icons/ToggleSwitch";
import ToggleOffIcon from "vue-material-design-icons/ToggleSwitchOff";

export default {
  name: "Home",
  components: {
    ExportIcon,
    DeleteIcon,
    ToggleOnIcon,
    ToggleOffIcon
  },
  computed: {
    ...mapGetters("characters", ["characters", "activeCharacters"])
  },
  mounted() {
    this.selectCharacter(null);
  },
  methods: {
    ...mapActions("characters", [
      "selectCharacter",
      "deleteSelectedCharacter",
      "toggleCharacter",
      "deleteAllCharacters"
    ]),
    async requestDelete(index) {
      await this.selectCharacter(index);
      await this.deleteSelectedCharacter();
    },
    async selectAndEdit(index) {
      await this.selectCharacter(index);
      this.$router.push("/newcharacter");
    }
  }
};
</script>
