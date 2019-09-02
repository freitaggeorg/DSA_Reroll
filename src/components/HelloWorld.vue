<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>{{ characters }}</div>
    <b-button @click="addCharacter('01')">addCharacter</b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: { type: String, default: "" }
  },
  computed: {
    ...mapGetters("characters", ["characters"])
  },
  methods: {
    ...mapActions("characters", ["addCharacter"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
