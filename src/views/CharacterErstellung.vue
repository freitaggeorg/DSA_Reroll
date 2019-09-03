<template>
  <b-container>
    <h1>Character Erstellung</h1>
    <div>
      <b-form-group label="Name" label-cols-sm="4" label-cols-lg="3">
        <b-form-input
          v-model="name"
          type="text"
          placeholder="name"
          style="width: auto;"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Behinderung" label-cols-sm="4" label-cols-lg="3">
        <b-form-input
          v-model="handicap"
          type="number"
          max="5"
          min="-5"
          placeholder="0"
          style="width: auto;"
        ></b-form-input>
      </b-form-group>
    </div>
    <div style="margin: 50px 0px;">
      <h2>Attribute</h2>
      <div
        v-for="(attribute, index) in fixedAttributes"
        :key="attribute.name + index"
      >
        <b-form-group
          :label="attribute.name"
          label-cols-sm="4"
          label-cols-lg="3"
        >
          <b-form-input
            v-model="attributes[index]"
            type="number"
            max="20"
            min="0"
            placeholder="0"
            style="width: auto;"
          ></b-form-input>
        </b-form-group>
      </div>
    </div>

    <div>
      <h2>Fertigkeiten</h2>
      <!-- <div v-for="(talent, index) in fixedTalents" :key="talent.name + index"> -->
      <div
        v-for="(talentgroup, index) in fixedTalents"
        :key="talentgroup.name + index"
      >
        <h3>{{ talentgroup.name }}</h3>
        <div
          v-for="(talent, index2) in talentgroup.subTalents"
          :key="talent.name + index2"
        >
          <b-form-group
            :label="talent.name"
            label-cols-sm="4"
            label-cols-lg="3"
          >
            <b-form-input
              v-model="talents[talent.index]"
              style="width: auto;"
              type="number"
              max="20"
              min="0"
              placeholder="0"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
    </div>
    <div>
      <b-button :class="{ disabled: name === '' }" @click="buildAndSaveChar">
        Speichern<SaveIcon title="" />
      </b-button>
    </div>
    <router-link to="/characters" tag="button" class="btn btn-secondary">
      Zurück
    </router-link>
  </b-container>
</template>

<script>
import fixedTalents from "../character/talents";
import fixedAttributes from "../character/attributes";
// import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import SaveIcon from "vue-material-design-icons/ContentSave";

export default {
  name: "CharacterErstellung",
  components: {
    SaveIcon
  },
  data() {
    return {
      name: "",
      handicap: 0,
      fixedAttributes: fixedAttributes,
      fixedTalents: fixedTalents,
      attributes: [],
      talents: []
    };
  },
  mounted() {
    // this.fixedTalents = fixedTalents;
    // let allTalents = [];
    // for (let i = 0; i < fixedTalents.length; i++) {
    //   allTalents = allTalents.concat(fixedTalents[i].subTalents);
    // }
    //  this.fixedTalents = allTalents;
  },
  methods: {
    ...mapActions("characters", ["saveCharacter"]),
    async buildAndSaveChar() {
      if (this.name !== "") {
        // build our character structure
        let char = {
          name: this.name,
          handicap: this.handicap,
          attributes: this.attributes,
          talents: this.talents
        };

        // save the character into our state management
        await this.saveCharacter(char);
        this.$router.push("/characters");
      }
    }
  }
};
</script>

<style scoped></style>
