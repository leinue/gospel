<template>

  <forms v-bind:styles="styles" fid="controls">
    <span slot="title">控件</span>
    <div slot="content">
      <controls-panel></controls-panel>
    </div>
  </forms>

<!--   <aside class="sidebar" v-hide="isCoding">
  </aside>
 -->

  <forms v-bind:styles="designStyles" fid="form">
    <span slot="title">设计与编码</span>
    <div slot="content">
      <section class="design">
        <design-panel></design-panel>  
      </section>
    </div>
  </forms>

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
      fuckshit: 'fuckshi111t',

      styles: {
        width: '272px',
        height: 'calc(100% - 56px)',
        left: '0px',
        top: '56px'
      },

      designStyles: {
        left: '273px',
        top: '56px',
        width: 'calc(100% - 274px)',
        height: 'calc(100% - 56px)'
      }
    }
  },

  ready() {
    console.log(document.width);
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
}

</style>
