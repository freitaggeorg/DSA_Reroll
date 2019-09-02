import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import CharacterErstellung from "./views/CharacterErstellung";
import CharacterVerwaltung from "./views/CharacterVerwaltung";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/characters",
      name: "characters",
      component: CharacterVerwaltung
    },
    {
      path: "/newcharacter",
      name: "CharacterErstellung",
      component: CharacterErstellung
    }
  ]
});
