<template>
  <b-container>
    <h1>Character Verwaltung</h1>
    <div v-for="(char, index) in characters" :key="char.name + index">
      <b-row>
        <b-col>
          {{ char.name }}
        </b-col>
        <b-col>
          <ExportIcon />
        </b-col>
        <b-col>
          <DeleteIcon />
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col>
        <router-link to="/newcharacter" tag="button">
          Neuen Character erstellen
        </router-link>
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

export default {
  name: "Home",
  components: {
    ExportIcon,
    DeleteIcon
  },
  computed: {
    ...mapGetters("characters", ["characters"])
  },
  methods: {
    ...mapActions("characters", ["addCharacter"])
  }
};
</script>
