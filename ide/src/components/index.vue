<template>

  <forms v-bind:styles="styles" fid="controls">
    <span slot="title">控件</span>
    <div slot="content">
      <controls-panel></controls-panel>
    </div>
  </forms>

  <forms v-bind:styles="designStyles" fid="form">
    <span slot="title">设计与编码</span>
    <div slot="content">
      <section class="design">
        <design-panel></design-panel>
      </section>
    </div>
  </forms>

  <forms v-bind:styles="attrStyles" fid="attributes">
    <span slot="title">属性面板</span>
    <div slot="content">
    ssss
    </div>
  </forms>

  <forms v-show="false" v-bind:styles="consoleStyles" fid="console">
    <span slot="title">控制台</span>
    <div slot="content">
      
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
        width: '250px',
        height: 'calc(100% - 46px)',
        left: '0px',
        top: '46px'
      },

      designStyles: {
        left: '251px',
        top: '46px',
        width: 'calc(100% - 501px)',
        height: 'calc(100% - 46px)'
      },

      attrStyles: {
        left: 'calc(100% - 250px)',
        top: '46px',
        width: '250px',
        height: 'calc(100% - 46px)'
      },

      consoleStyles: {
        left: 'calc( (100% - 550px) / 2 )',
        top: 'calc(100% - 250px)',
        width: '550px',
        height: '250px'
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

  methods: {

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

.ui-snackbar {
  padding: 8px 24px;
}

</style>
