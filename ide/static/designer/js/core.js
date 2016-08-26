(function () {

  var jq = jQuery.noConflict(),

      isLoadedOnce = false,

      util = {

        randomString: function(len) {
        　len = len || 32;
        　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        　var maxPos = $chars.length;
        　var pwd = '';
        　for (i = 0; i < len; i++) {
        　    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        　}
        　return pwd;
        },

        json2css: function(data) {
          var stringify = JSON.stringify(data);

          stringify = stringify.replace('{', '');
          stringify = stringify.replace('}', '');
          stringify = stringify.replace(/,/g, ';');
          stringify = stringify.replace(/"([^"]*)"/g, '$1');

          return stringify;
        }

      };

  document.oncontextmenu = function(){
    // return false;
  };

  function Designer(elem) {
    this.init(elem);
  }

  Designer.fn = Designer.prototype = {

    controlsList: [],

    $destId: '',

    $dest: [],

    currentControl: '',

    init: function(elem) {

      if(!elem) {
        throw 'arguments "elem" can not be omitted in function "designer.init": ' + elem;
      }

      this.$destId = elem;

      this.$dest = $(this.$destId);

      if(!this.isLoadedOnce()) {
        this.makeControlsDraggable();
      }

      if(this.getControlsListLength() !== 0) {
        var self = this;
        this.controlsList.forEach(function(val, key) {
          self.makeElemInDesignerDraggable(val);
        });
      }

      this.handleDragEvent();
    },

    makeControlsDraggable: function() {

      $(".cpList", parent.document).find("li").each(function() {  
        var _this = $(this);

        _this.on("dragstart", function(ev) {//开始拖拽  
            var dt = ev.dataTransfer;
            dt.setData('application/elem', ev.target.id);//将拖拽组件ID传入
        });

        _this.on('dragend', function(ev) {
          ev.preventDefault();
        });

      });

    },

    isLoadedOnce: function() {
      return isLoadedOnce;
    },

    makeElemInDesignerDraggable: function(id) {

      var isControlMouseDown = false,
          isControlDragged = false,

          isTargetToControl = function(target) {
            return !$(target).hasClass('content');
          };

      jq('#' + id).dragging({
        move: 'both',
        randomPosition: false,

        onMouseUp: function(e) {

          if(!isTargetToControl(e.target)) {
            return false;
          }

          isControlMouseDown = false;
          isControlDragged = false;
          // $('.xyruler').hide();
        },

        onMouseDown: function(e) {

          if(!isTargetToControl(e.target)) {
            return false;
          }          

          isControlMouseDown = true;
        },

        onMouseMove: function(e, direction, moveX, moveY) {

          if(!isTargetToControl(e.target)) {
            return false;
          }

          if(!isControlMouseDown) {
            console.log('isControlMouseDown false');
            return false;
          }

          isControlDragged = true;

          var center = {
              x: 0,
              y: 0
            },

            target = $(e.target),

            targetWidth = parseInt(target.width()),
            targetHeight = parseInt(target.height()),

            xyrulers = $('.xyruler');

          center.y = parseInt(parseInt($('body').height()) / 2) - parseInt(targetHeight / 2);
          center.x = parseInt(parseInt($(document).width()) / 2) - parseInt(targetWidth / 2);

          console.log(parseInt(target.parent().parent().css('left')), parseInt(target.parent().parent().css('top')), center);

          if(center.x === parseInt(target.parent().parent().css('left'))) {

            console.log('x =');

            xyrulers.each(function(key, ruler) {

              ruler = $(ruler);
              if(ruler.hasClass('yruler')) {
                ruler.show();
              }

            });
          }else {
            // $('.yruler').hide();
          }

          if(center.y === parseInt(target.parent().parent().css('top'))) {

            console.log('sss');

            xyrulers.each(function(key, ruler) {

              ruler = $(ruler);
              if(ruler.hasClass('xruler')) {
                ruler.show();
              }

            });
          }else {
            // $('.xruler').hide();
          }

        }
      });
    },

    getControlsListLength: function() {
      return this.controlsList.length;
    },

    highlightElem: {

      hightlight: function(target) {
        target.addClass('highlight-elem');
      },

      undoHighlight: function(target) {
        target.removeClass('highlight-elem');
      }

    },

    controls: {

      generatorElement: function(elemType, isInput) {

        isInput = isInput || false;

        var elemTypeList = {
          button: function(caption) {
            caption = caption || '按钮';
            var btnHTML = '<a href="#" class="button">' + caption + '</a>\r\n';
            return btnHTML;
          },

          input: function(value) {
            value = value || '';
            var inputHTML = '<div class="list-block">\
      <ul><li>\
          <div class="item-content">\
            <div class="item-media"><i class="icon icon-form-name"></i></div>\
            <div class="item-inner">\
              <div class="item-input">\
                <input type="text" placeholder="Your name">\
              </div>\
            </div>\
          </div>\
        </li></ul></div>\r\n';
            return inputHTML;
          },

          label: function(value) {
            value = value || '标签文本';
            var html = '<p>' + value + '</p>\r\n';
            return html;              
          },

          grid: function() {

          },

          padded: function(value) {
            var html = '<div class="content-padded"></div>\r\n';
            return html;              
          }
        }

        return typeof elemTypeList[elemType] == 'undefined' ? '' : elemTypeList[elemType]();

      },

      appendElement: function(container, elem, pos) {
        if(!elem) {
          return false;
        }

        var myId = util.randomString(8),

            pos = {
              position: 'absolute',
              top: pos.clientY + 'px',
              left: pos.clientX + 'px'
            },

            controlBoxId = util.randomString(9);

        pos = util.json2css(pos);

        var ctrlHTML = '<div id="' + myId + '" class="element-box" style="' + pos + '">\r\n<div class="control-box" id="' + controlBoxId + '">' + '<div class="controls-bar"><div class="bar-radius"></div><div class="bar-radius top-left"></div><div class="bar-radius mid-left"></div><div class="bar-radius bottom-left"></div><div class="bar-radius top-right"></div><div class="bar-radius mid-right"></div><div class="bar-radius bottom-right"></div><div class="bar-radius bottom-mid"></div></div>' + '</div>' + elem + '</div>\r\n';

        $(container).append(ctrlHTML);

        $('#' + controlBoxId).css({
          height: $('#' + myId).height()
        });

        Designer.fn.unActiveAll();
        Designer.fn.activeControl(controlBoxId);

        Designer.fn.controlsList.push(myId);
        Designer.fn.makeElemInDesignerDraggable(myId);

      }

    },

    handleDragEvent: function() {

      var $dest = this.$dest;
      var self = this;

      if($dest.length === 0) {
        throw 'error in init designer, failed to get container';
      }

      $dest.on('dragenter', function(ev) {
        var targetEl = $(ev.target);
        self.highlightElem.hightlight(targetEl);
      });

      $dest.on('dragleave', function(ev) {
        var targetEl = $(ev.target);
        self.highlightElem.undoHighlight(targetEl);
      });

      $dest.on('dragover', function(ev) {
        ev.preventDefault();
      });

      $dest.on('drop', function(ev) {
        ev.preventDefault();

        var df = ev.dataTransfer,
            elemId = df.getData('application/elem'),
            targetEl = $(ev.target);

        self.highlightElem.undoHighlight(targetEl);

        var ctx = $(this).get(0),
            isInput = elemId.indexOf('input') === 0 ? true : false,
            elemType = elemId.split('_')[1],
            elemHTML = self.controls.generatorElement(elemType, isInput);

        self.controls.appendElement(ev.target, elemHTML, {
          clientX: ev.clientX,
          clientY: ev.layerY
        });

        parent.refreshDesignerCode($('body').html());

        return false;
      });

      isLoadedOnce = true;


      jQuery(document).mouseup(function(e) {

        var target = $(e.target),

            isElementBoxClicked = target.hasClass('element-box') ? true : false;

        if(!target.hasClass('controls-bar')) {
          //点击非控件区域，取消显示所有控制器
          self.unActiveAll();
        }

        if(!target.hasClass('content') || isElementBoxClicked) {
          //点击了某一控件，置此控件为当前控件

          if(!isElementBoxClicked) {
            self.activeControl(target.prev().attr('id'));
          }else {
            self.activeControl(target.find('.control-box').attr('id'));
          }
        }

      });

    },

    unActiveAll: function() {
      $('.control-box').hide();
      this.setCurrentActiveControl('');
    },

    activeControl: function(id) {
      $('#' + id).show();
      this.setCurrentActiveControl($('#' + id).parent().attr('id'));
    },

    getCurrentActiveControl: function() {
      return this.currentControl;
    },

    setCurrentActiveControl: function(id) {
      this.currentControl = id;
    }

  }

  parent.document.onreadystatechange = function() {
    window.designer = new Designer('.gospel-designer-area');
  };

})();
// var Draggable = function(options){
//     var options = options || {};  
//     var tag = options.dragTag || "LI";//目前只支持li  
//     tag = tag.toUpperCase();  
//     var $dest = $(options.destId);//拖拽放入的容器对象  
//     $dest.on("dragover", function(ev) {  
//         ev.preventDefault();  
//     });  
//     $dest.on("drop", function(ev) {  
//         ev.preventDefault();  
//         var df = ev.originalEvent.dataTransfer;  
//         var data = df.getData("Text");  
//         var el = ev.target;//目标对象  
//         var ctx = $(this).get(0);//当前容器  
//         if (data==""){  
//             return false;  
//         }  
//         do {  
//             var litem = document.createElement('li');  
//             var item = $(litem);  
//             var html = "";  
//             if (data=='input_type'){  
//                 html = "<input type='text' readonly value='test' />";  
//             }else if (data=='label_type'){  
//                 html = "<label>测试文本</label>";  
//             }  
//             $(item).addClass("liClass");  
//             $(item).html(html);  
//             if ($(this).children().length>0){//当前容器下有li  
//                 if(tag === '' || el.nodeName == tag){//当前目标对象的tagName是LI  
//                     if (el.nextElementSibling){//如果当前对象的下一个兄弟节点存在，那么就将当前拖拽的对象插入到这个兄弟节点的前面  
//                         el.parentNode.insertBefore($(item).get(0),el.nextElementSibling);  
//                     }else{//兄弟节点不存，那么直接append到容器中  
//                         ctx.appendChild($(item).get(0));  
//                     }  
//                 }  
//             }else{//当前容器下没有li，直接append进这个容器中  
//                 ctx.appendChild($(item).get(0));  
//             }  
//         }  
//         while(el !== ctx && (el = el.parentNode));//当前目标对象不是容器，那么就将当前目标对象的父级节点赋值给当前目标对象  
//     });  
//     // $dest.sortable();//JQUERY UI sortable组件  
//     return (function(){  
        
//     })(options);  
// };
// //拖拽组件  
// Draggable({destId:".tab",dragTag:"li"});