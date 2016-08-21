<template>

  <ui-tabs type="text">
      <ui-tab header="设计">

        <div class="designer-wrapper">
          <iframe class="designer" src="./static/designer.html" width="375" height="667"></iframe>
        </div>

      </ui-tab>

      <ui-tab header="代码编辑" @selected="startCoding()">

        <div id="editor">var x = '';
if (x) {
    alert('fucku bitch');
}</div>

      </ui-tab>
  </ui-tabs>

</template>

<script>

import { incrementCounter } from '../vuex/actions.js';
import $ from 'jquery';

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

      console.log('fuck', $);
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
    height: 100vh;
    margin-top: -16px;
    margin-left: -16px;
    width: calc(100% + 32px);
  }

  .drop {
    z-index: 65535;
  }

  .designer-wrapper {
    text-align: center;
    height: 100vh;
    margin-top: -16px;
    margin-left: -16px;
    width: calc(100% + 32px);
    line-height: 50%;
    background: -webkit-linear-gradient(left top, #dde9f2 , #efefef); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #dde9f2, #efefef); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #dde9f2, #efefef); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #dde9f2 , #efefef); /* 标准的语法 */
    padding: 16px;
  }

  .designer-wrapper .designer {
    border: 1px solid #dde1e4;
    box-shadow: 0 1px 6px rgba(0,0,0,.33);
    background: rgb(255, 255, 255);
    line-height: 50%;
  }
  
</style>