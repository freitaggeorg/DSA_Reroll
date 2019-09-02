<template>
  <b-container>
    <h1>Character Erstellung</h1>
    <div
      v-for="(attribute, index) in fixedAttributes"
      :key="attribute.name + index"
      style="max-width: 300px;"
    >
      <b-form-group :label="attribute.name" label-cols-sm="4" label-cols-lg="3">
        <b-form-input
          v-model="attributes[index]"
          type="number"
          max="20"
          min="0"
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <div v-for="(talent, index) in fixedTalents" :key="talent.name + index">
        <b-form-group :label="talent.name" label-cols-sm="4" label-cols-lg="3">
          <b-form-input
            v-model="talents[index - 1]"
            style="max-width: 100px;"
            type="number"
            max="20"
            min="0"
          ></b-form-input>
        </b-form-group>
      </div>
    </div>
    <router-link to="/characters" tag="button">
      Zurück
    </router-link>
  </b-container>
</template>

<script>
import fixedTalents from "../character/talents";
import fixedAttributes from "../character/attributes";

export default {
  name: "CharacterErstellung",
  data() {
    return {
      name: "",
      handicap: 0,
      fixedAttributes: fixedAttributes,
      fixedTalents: [],
      attributes: [],
      talents: []
    };
  },
  mounted() {
    let allTalents = [];
    for (let i = 0; i < fixedTalents.length; i++) {
      allTalents = allTalents.concat(fixedTalents[i].subTalents);
    }
    this.fixedTalents = allTalents;
  }
};
</script>

<style scoped></style>
