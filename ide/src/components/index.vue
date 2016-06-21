<template>

  <aside class="sidebar" v-hide="isCoding">
    <controls-panel></controls-panel>
  </aside>

  <section class="design">
    <design-panel></design-panel>
  </section>

</template>

<script>

import controlsPanel from './controls.vue';
import designPanel from './design.vue';
import store from '../vuex.js';

export default {
  data () {
    return {
      msg: 'Hello Index!',
      isCoding: false
    }
  },

  ready() {
    console.log('index.vue');
  },

  components: {
    controlsPanel,
    designPanel
  },

  store
}

</script>

<style>

.design {
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-left: 272px;
}

</style>
