window.onload = function() {

  $(".cpList", parent.document).find("li").each(function() {  
    var _this = $(this);

    _this.on("dragstart", function(ev) {//开始拖拽  
        var dt = ev.dataTransfer;
        console.log(dt, ev);
        dt.setData('application/elem', ev.target.id);//将拖拽组件ID传入
    });

    _this.on('dragend', function(ev) {
    	console.log('end');
    	ev.preventDefault();
    });
  });

  var $destId = '.gospel-designer-area';
  var $dest = $($destId);

  var elemHighLight = {
    hightlight: function(target) {
    	target.addClass('highlight-elem');
    },

    undoHighlight: function(target) {
    	target.removeClass('highlight-elem');
    }
  };

  var controls = {
    generatorElement: function(elemType, isInput) {

    	isInput = isInput || false;

    	var elemTypeList = {
    		button: function(caption) {
    			caption = caption || '按钮';
    			var btnHTML = '<a href="#" class="button">' + caption + '</a>';
    			return btnHTML;
    		},

    		input: function(value) {
    			value = value || '';
    			var inputHTML = '';
    			return inputHTML;
    		},

    		label: function(value) {
    			value = value || '标签文本';
    			var html = '<p>' + value + '</p>';
    			return html;    					
    		},

    		grid: function() {

    		},

    		padded: function(value) {
    			var html = '<div class="content-padded"></div>';
    			return html;    					
    		}
    	}

    	return typeof elemTypeList[elemType] == 'undefined' ? '' : elemTypeList[elemType]();

    },

    appendElement: function(container, elem) {
    	if(!elem) {
    		return false;
    	}

    	$(container).append(elem);
    }
  }

  $dest.on('dragenter', function(ev) {
    var targetEl = $(ev.target);
    elemHighLight.hightlight(targetEl);
  });

  $dest.on('dragleave', function(ev) {
    var targetEl = $(ev.target);
    elemHighLight.undoHighlight(targetEl);
  });

  $dest.on('dragover', function(ev) {
    ev.preventDefault();
  });

  $dest.on('drop', function(ev) {
    ev.preventDefault();

    var df = ev.dataTransfer;
    var elemId = df.getData('application/elem');

    var targetEl = $(ev.target);
    elemHighLight.undoHighlight(targetEl);

    var ctx = $(this).get(0);

    var isInput = elemId.indexOf('input') === 0 ? true : false;
    var elemType = elemId.split('_')[1];

    var elemHTML = controls.generatorElement(elemType, isInput);
    controls.appendElement(ev.target, elemHTML);

    return false;
  });

  $($destId).each(function(key, val) {
    // console.log(key, val);
  });

};

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