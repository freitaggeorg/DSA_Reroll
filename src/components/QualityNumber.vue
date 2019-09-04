<template>
  <div>
    <Numeric1 v-if="value === 1" title="" />
    <Numeric2 v-if="value === 2" title="" />
    <Numeric3 v-if="value === 3" title="" />
    <Numeric4 v-if="value === 4" title="" />
    <Numeric5 v-if="value === 5" title="" />
    <Numeric6 v-if="value === 6" title="" />
    <Numeric7 v-if="value === 7" title="" />
    <Numeric8 v-if="value === 8" title="" />
  </div>
</template>

<script>
import Numeric1 from "vue-material-design-icons/Numeric1";
import Numeric2 from "vue-material-design-icons/Numeric2";
import Numeric3 from "vue-material-design-icons/Numeric3";
import Numeric4 from "vue-material-design-icons/Numeric4";
import Numeric5 from "vue-material-design-icons/Numeric5";
import Numeric6 from "vue-material-design-icons/Numeric6";
import Numeric7 from "vue-material-design-icons/Numeric7";
import Numeric8 from "vue-material-design-icons/Numeric8";
export default {
  name: "Quality",
  components: {
    Numeric1,
    Numeric2,
    Numeric3,
    Numeric4,
    Numeric5,
    Numeric6,
    Numeric7,
    Numeric8
  },
  props: {
    value: { type: Number, default: 1 }
  }
};
</script>

<style scoped></style>
