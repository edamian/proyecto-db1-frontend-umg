import Vue from 'vue';
import Vuex from 'vuex';
import notas from './notas';

Vue.use(Vuex);

export default function () {
  const Store = new Vuex.Store({
    modules: {
      notas,
    },
    strict: process.env.DEV,
  });
  return Store;
}
