<template>

  <ui-tabs type="text">
      <ui-tab header="设计">

        <div class="designer-wrapper">
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
        codes: '// TO DO'
      }
    }
  },

  ready() {

    var self = this;

    self.$nextTick(function() {

      //可拖拽组件初始化
      $('.cpList li').each(function(){  
          $(this).attr("draggable","true");
      });

      //初始化设计器

      var initDesigner = function() {
        var iframe = document.createElement("iframe");
        iframe.src = "./static/designer.html";
        iframe.setAttribute('class', 'designer');
        iframe.setAttribute('id', self.$get('designer.id'))
        iframe.setAttribute('width', '375');
        iframe.setAttribute('height', '667');
        iframe.setAttribute('name', 'gospelDesignerArea');

        var designerOnload = function() {
          var designerCode = $('.designer').contents().find('body').html();
          self.$set('codes', designerCode);
          self.$set('designer.dom', iframe);
          self.$set('designer.context', document.getElementById('gospelDesignerArea').contentWindow);

          self.$nextTick(function() {

            var refreshIframe = function(html) {
              var designer = self.$get('designer.context');
              $('.designer').contents().find('body').html(html);
            }

            //初始化编辑器
            ace.require("ace/ext/language_tools");
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/twilight");
            editor.setOptions({
                enableBasicAutocompletion: true
            });

            var HTMLMode = ace.require("ace/mode/html").Mode;
            var JavaScript = ace.require('ace/mode/javascript').Mode;
            editor.session.setMode(new HTMLMode());

            var editorBeforeChanged = new Date().getTime();

            editor.getSession().on('change', function(changed) {

              var editorAfterChanged = new Date().getTime();

              console.log(editorAfterChanged, editorBeforeChanged);

              if(editorAfterChanged - editorBeforeChanged > 1500) {
                editorBeforeChanged = editorAfterChanged;
                console.log('输入完毕');
              }

              refreshIframe(editor.getValue());

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
      };

      initDesigner();

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