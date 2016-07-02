<template>

  <forms v-bind:title="fuck" v-bind:content="fuckshit">
    <div slot="content">
      <p>ssss</p>
    </div>
  </forms>

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
import forms from './forms/form.vue';

export default {
  data () {
    return {
      msg: 'Hello Index!',
      isCoding: false,
      fuck: 'fuck111',
      fuckshit: 'fuckshi111t'
    }
  },

  ready() {
    console.log('index.vue');
  },

  components: {
    controlsPanel,
    designPanel,
    forms
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
