<template>

  <ui-tabs type="text">
      <ui-tab header="设计">
          My books

          <a href="gogole.com">Hey</a>
      </ui-tab>

      <ui-tab header="代码编辑" @selected="startCoding()">

        <div id="editor">some text</div>

      </ui-tab>
  </ui-tabs>

</template>

<script>

import { incrementCounter } from '../vuex/actions.js';

export default {
  data () {
    return {
    }
  },

  ready() {

    this.$nextTick(function() {

      var editor = ace.edit("editor");

    });

  },

  vuex: {
    actions: {
      increment: incrementCounter
    }
  },

  methods: {
    startCoding: function() {

    }
  }
}

</script>

<style>

  #editor {
      width: 100%;
      height: 800px;
  }
  
</style>