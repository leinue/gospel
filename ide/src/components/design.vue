<template>

  <ui-tabs type="text">
      <ui-tab header="设计" @selected="refreshIframe()">

        <div class="designer-wrapper">
          <div class="loader">
            <ui-progress-circular :show="loading" color="multi-color">
            </ui-progress-circular>
          </div>
        </div>

      </ui-tab>

      <ui-tab header="代码编辑" @selected="startCoding()">

        <div id="editor">{{codes}}</div>

      </ui-tab>
  </ui-tabs>

</template>

<script>

import { incrementCounter } from '../vuex/actions.js';

export default {
  data () {
    return {

      codes: '// TO DO',

      designer: {
        id: 'gospelDesignerArea',
        context: '',
        dom: '',
        class: 'designer',
        wrapper: '.designer-wrapper',
        container: '.gospel-designer-area',
        src: './static/designer.html',
        width: '375',
        height: '667',
        name: 'gder',
      },

      editor: '',

      loading: true,
    }
  },

  ready() {

    var self = this;

    self.$nextTick(function() {

      //可拖拽组件初始化
      $('.cpList li').each(function(){  
          $(this).attr("draggable", "true");
      });

      //初始化设计器

      self.$get('initDesignerWrapper')();

    });

  },

  watch: {

  },

  vuex: {
    actions: {
      increment: incrementCounter
    }
  },

  methods: {

    initDesignerWrapper: function() {

      var self = this;

      var iframe = document.createElement("iframe");
      iframe.src = this.designer.src;
      iframe.setAttribute('class', this.designer.class);
      iframe.setAttribute('id', this.designer.id)
      iframe.setAttribute('width', this.designer.width);
      iframe.setAttribute('height', this.designer.height);
      iframe.setAttribute('name', this.designer.name);

      this.designer.context = $('.' + self.designer.class).contents();

      var designerOnload = function() {
        self.loading = false;
        $('.loader').hide();
        var designerCode = self.designer.context.find('body').html();
        self.designer.dom = iframe;

        self.$nextTick(function() {

          //初始化编辑器
          ace.require("ace/ext/language_tools");
          self.editor = ace.edit("editor");
          self.editor.setTheme("ace/theme/twilight");
          self.editor.setOptions({
              enableBasicAutocompletion: true
          });

          window.refreshDesignerCode = this.refreshDesignerCode;

          var HTMLMode = ace.require("ace/mode/html").Mode;
          var JavaScript = ace.require('ace/mode/javascript').Mode;
          this.editor.session.setMode(new HTMLMode());

          var editorBeforeChanged = new Date().getTime();

          this.editor.getSession().on('change', function(changed) {

            var editorAfterChanged = new Date().getTime();

            if(editorAfterChanged - editorBeforeChanged > 1500) {
              editorBeforeChanged = editorAfterChanged;
            }

          });

        });

      }

      if (iframe.attachEvent){

        iframe.attachEvent("onload", function(){
          designerOnload();
        });

      } else {

        iframe.onload = function(){
          designerOnload();
        };

      }

      $('.designer-wrapper').append(iframe);

    },

    startCoding: function() {
      this.refreshDesignerCode($('.' + this.designer.class).contents().find('body').html());
      this.editor.focus();
      this.editor.gotoLine(this.editor.session.getLength());
    },

    refreshDesignerCode: function(codes) {
      this.codes = codes;
      this.editor.setValue(codes);
      this.editor.clearSelection();
    },

    refreshIframe: function() {
      $('.' + this.designer.class).contents().find('body').html(this.editor.getValue());
      var Designer = document.getElementById(this.designer.id).contentWindow.designer;

      Designer.init(this.designer.container);
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

  .loader {
    position: absolute;
    top: 50%;
    width: 100px;
    height: 100px;
    left: 50%;
  }
  
</style>
