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
      editor.setTheme("ace/theme/twilight");
      var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
      editor.session.setMode(new JavaScriptMode());
    });

  },

  vuex: {
    actions: {
      increment: incrementCounter
    }
  },

  methods: {
    
  }
}

</script>

<style>

  #editor {
    width: 100%;
    height: 100vh;
    margin-top: -16px;
    margin-left: -16px;
    width: calc(100% + 32px);
  }
  
</style>