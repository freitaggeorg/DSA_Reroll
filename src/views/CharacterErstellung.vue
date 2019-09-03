<template>
  <b-container>
    <h1>Character Erstellung</h1>
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
      talents: [],
      tIndex: 0
    };
  },
  mounted() {
    this.fixedTalents = fixedTalents;
    // let allTalents = [];
    // for (let i = 0; i < fixedTalents.length; i++) {
    //   allTalents = allTalents.concat(fixedTalents[i].subTalents);
    // }
    //  this.fixedTalents = allTalents;
  }
};
</script>

<style scoped></style>
