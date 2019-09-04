<template>
  <b-container>
    <h1>Character Verwaltung</h1>
    <div class="head-row">
      <div class="head-row-attributes" style="text-align: left">
        Characters
      </div>
      <div class="head-row-characters">
        <div class="action">Active</div>
        <div class="action">Delete</div>
      </div>
    </div>
    <hr />
    <div
      v-for="(char, index) in characters"
      :key="char.name + index"
      class="characters"
    >
      <div class="result-row" :class="{ colored: index % 2 === 0 }">
        <div class="head-row-attributes">
          {{ char.name }}
        </div>
        <div class="head-row-characters">
          <div class="action">
            <EditIcon
              title=""
              class="edit-icon"
              @click="selectAndEdit(index)"
            />
          </div>
          <div class="action">
            <div
              :style="{ color: activeCharacters[index] ? 'green' : 'red' }"
              class="edit-icon"
              @click="toggleCharacter(index)"
            >
              <ToggleOnIcon v-if="activeCharacters[index]" />
              <ToggleOffIcon v-else />
            </div>
          </div>
          <div class="action">
            <DeleteIcon
              v-if="confirmDelete !== index"
              class="edit-icon"
              title="Delete"
              @click="confirmDelete = index"
            />
            <DeleteIcon
              v-if="confirmDelete === index"
              class="delete-icon"
              title="Confirm delete!"
              @click="requestDelete(index)"
            />
            <CancelIcon
              v-if="confirmDelete === index"
              class="edit-icon"
              title="Cancel"
              @click="confirmDelete = null"
            />
          </div>
        </div>
      </div>
    </div>
    <hr />
    <b-row>
      <b-col>
        <router-link to="/newcharacter" tag="button" class="btn btn-secondary">
          Neuen Character erstellen
        </router-link>
      </b-col>
      <b-col>
        <b-button v-if="!confirmDeleteAll" @click="confirmDeleteAll = true"
          >Delete all</b-button
        >
        <b-button
          v-if="confirmDeleteAll"
          variant="danger"
          @click="deleteCharacters"
          >Confirm Delete</b-button
        >
        <b-button v-if="confirmDeleteAll" @click="confirmDeleteAll = false"
          >Cancel</b-button
        >
      </b-col>
      <b-col>
        <b-button @click="showExport = true"><ExportIcon /></b-button>
      </b-col>
    </b-row>
    <b-row style="margin-top: 100px;">
      <b-col>
        <router-link to="/" tag="button" class="btn btn-secondary">
          Zurück
        </router-link>
      </b-col>
    </b-row>
    <div v-if="showExport" class="export-div">
      <div class="click-background" @click="showExport = false"></div>
      <div class="export-window">
        <b-form-textarea
          id="export-input"
          placeholder="Fixed height textarea"
          rows="10"
          no-resize
          :value="exportCharacters"
        ></b-form-textarea>
        <b-button @click="copyToClipboard">Kopieren</b-button>
        <b-button @click="showExport = false">Schließen</b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import ExportIcon from "vue-material-design-icons/ExportVariant";
import DeleteIcon from "vue-material-design-icons/Delete";
import ToggleOnIcon from "vue-material-design-icons/ToggleSwitch";
import ToggleOffIcon from "vue-material-design-icons/ToggleSwitchOff";
import EditIcon from "vue-material-design-icons/Pencil";
import CancelIcon from "vue-material-design-icons/Cancel";

export default {
  name: "Home",
  components: {
    ExportIcon,
    DeleteIcon,
    ToggleOnIcon,
    ToggleOffIcon,
    EditIcon,
    CancelIcon
  },
  data() {
    return {
      confirmDelete: null,
      confirmDeleteAll: false,
      showExport: false
    };
  },
  computed: {
    ...mapGetters("characters", [
      "characters",
      "activeCharacters",
      "exportCharacters"
    ])
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
    },
    deleteCharacters() {
      this.confirmDeleteAll = false;
      this.deleteAllCharacters();
    },
    copyToClipboard() {
      let copyText = document.querySelector("#export-input");
      copyText.select();
      document.execCommand("copy");
      // console.log(response);
    }
  }
};
</script>
