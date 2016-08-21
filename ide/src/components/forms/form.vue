<template>

<div @click="setTop()" id="{{fid}}" class="ui-form-container" v-bind:style="{ width: styles.width, height: styles.height, left: styles.left, top: styles.top}">
	<div class="form-title">
		<h1 class="ui-modal-header-text">
			{{title}}
			<slot name="title"></slot>
		</h1>
	  	<div>
	   		<a class="form-min" href="javascript:;" style="display:none" title="最小化"></a>
	   		<ui-icon-button class="form-control form-revert" type="flat" style="display:none" color="default" icon="minus"></ui-icon-button>
	   		<ui-icon-button class="form-control form-max" type="flat" color="default" icon="add"></ui-icon-button>
	   		<ui-icon-button @click="dispatchCloseEvent()" class="form-control form-close" type="flat" color="default" icon="close"></ui-icon-button>
	  	</div>
	</div>
		<div class="form-resizeL"></div>
		<div class="form-resizeT"></div>
		<div class="form-resizeR"></div>
		<div class="form-resizeB"></div>
		<div class="form-resizeLT"></div>
		<div class="form-resizeTR"></div>
		<div class="form-resizeBR"></div>
		<div class="form-resizeLB"></div>
	<div class="form-content">
		{{content}}
		<slot name="content"></slot>
	</div>
</div>

</template>

<script>
/*-------------------------- +
 获取id, class, tagName
 +-------------------------- */
var get = {
  byId: function(id) {
    return typeof id === "string" ? document.getElementById(id) : id
  },
  byClass: function(sClass, oParent) {
    var aClass = [];
    var reClass = new RegExp("(^| )" + sClass + "( |$)");
    var aElem = this.byTagName("*", oParent);
    for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
    return aClass;
  },
  byTagName: function(elem, obj) {
    return (obj || document).getElementsByTagName(elem);
  }
};
var dragMinWidth = 250;
var dragMinHeight = 124;
/*-------------------------- +
 拖拽函数
 +-------------------------- */
function drag(oDrag, handle)
{
  var disX, dixY = 0;
  var disX, disY;
  var oMin = get.byClass("form-min", oDrag)[0];
  var oMax = get.byClass("form-max", oDrag)[0];
  var oRevert = get.byClass("form-revert", oDrag)[0];
  var oClose = get.byClass("form-close", oDrag)[0];
  handle = handle || oDrag;
  handle.style.cursor = "move";

  handle.onmousedown = function (event)
  {
    var event = event || window.event;
    disX = event.clientX - oDrag.offsetLeft;
    disY = event.clientY - oDrag.offsetTop;
    var oForm = get.byClass('ui-form-container', oDrag.parentNode);

    for (var i = 0; i < oForm.length; i++) {
    	var currentForm = oForm[i];
    	currentForm.style.zIndex = '65000';
    };

  	oDrag.style.zIndex = '65500';
    document.onmousemove = function (event)
    {
      var event = event || window.event;
      var iL = event.clientX - disX;
      var iT = event.clientY - disY;
      var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
      var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
      iL <= 0 && (iL = 0);
      iT <= 0 && (iT = 0);
      iL >= maxL && (iL = maxL);
      iT >= maxT && (iT = maxT);
      oDrag.style.left = iL + "px";
      oDrag.style.top = iT + "px";
      return false
    };
    document.onmouseup = function ()
    {
      document.onmousemove = null;
      document.onmouseup = null;
      this.releaseCapture && this.releaseCapture()
    };
    this.setCapture && this.setCapture();
    return false
  };  
  //最大化按钮
  oMax.onclick = function ()
  {
    oDrag.style.top = oDrag.style.left = 0;
    oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
    oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
    this.style.display = "none";
    oRevert.style.display = "inline";
    oRevert.style.top = '-9px';
  };
  //还原按钮
  oRevert.onclick = function ()
  {    
    oDrag.style.width = dragMinWidth + "px";
    oDrag.style.height = dragMinHeight + "px";
    oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
    oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
    this.style.display = "none";
    oMax.style.display = "inline";
    oMax.style.top = '-9px';
  };
  //最小化按钮
  oMin.onclick = oClose.onclick = function ()
  {
    oDrag.style.display = "none";
    var oA = document.createElement("a");
    oA.className = "open";
    oA.href = "javascript:;";
    oA.title = "还原";
    document.body.appendChild(oA);
    oA.onclick = function ()
    {
      oDrag.style.display = "inline";
      document.body.removeChild(this);
      this.onclick = null;
    };
  };
  //阻止冒泡
  oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event)
  {
    this.onfocus = function () {this.blur()};
    (event || window.event).cancelBubble = true  
  };
}
/*-------------------------- +
 改变大小函数
 +-------------------------- */
function resize(oParent, handle, isLeft, isTop, lockX, lockY)
{
  handle.onmousedown = function (event)
  {
    var event = event || window.event;
    var disX = event.clientX - handle.offsetLeft;
    var disY = event.clientY - handle.offsetTop;  
    var iParentTop = oParent.offsetTop;
    var iParentLeft = oParent.offsetLeft;
    var iParentWidth = oParent.offsetWidth;
    var iParentHeight = oParent.offsetHeight;
    document.onmousemove = function (event)
    {
      var event = event || window.event;
      var iL = event.clientX - disX;
      var iT = event.clientY - disY;
      var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
      var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;          var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
      var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
      isLeft && (oParent.style.left = iParentLeft + iL + "px");
      isTop && (oParent.style.top = iParentTop + iT + "px");
      iW < dragMinWidth && (iW = dragMinWidth);
      iW > maxW && (iW = maxW);
      lockX || (oParent.style.width = iW + "px");
      iH < dragMinHeight && (iH = dragMinHeight);
      iH > maxH && (iH = maxH);
      lockY || (oParent.style.height = iH + "px");
      if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
      return false;  
    };
    document.onmouseup = function ()
    {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    return false;
  }
};

export default {
  data () {
    return {
    }
  },

  ready() {

  	var self = this;

	console.log(self.fid);

  	self.$nextTick(function() {
		var oDrag = document.getElementById(self.fid);
		var oTitle = get.byClass("form-title", oDrag)[0];
		var oL = get.byClass("form-resizeL", oDrag)[0];
		var oT = get.byClass("form-resizeT", oDrag)[0];
		var oR = get.byClass("form-resizeR", oDrag)[0];
		var oB = get.byClass("form-resizeB", oDrag)[0];
		var oLT = get.byClass("form-resizeLT", oDrag)[0];
	 	var oTR = get.byClass("form-resizeTR", oDrag)[0];
		var oBR = get.byClass("form-resizeBR", oDrag)[0];
		var oLB = get.byClass("form-resizeLB", oDrag)[0];
		drag(oDrag, oTitle);
		//四角
		resize(oDrag, oLT, true, true, false, false);
		resize(oDrag, oTR, false, true, false, false);
		resize(oDrag, oBR, false, false, false, false);
		resize(oDrag, oLB, true, false, false, false);
		//四边
		resize(oDrag, oL, true, false, false, true);
		resize(oDrag, oT, false, true, true, false);
		resize(oDrag, oR, false, false, false, true);
		resize(oDrag, oB, false, false, true, false);
  	});

  },



  props: {
  	title: {
  		default: ''
  	},
  	content: '',
  	styles: {
  		width: '250px',
  		height: '400px',
  		left: '0px',
  		top: '56px'
  	},
  	fid: {
  		default: 'ss'
  	}
  },

  methods: {

  	dispatchCloseEvent: function() {
  		this.$dispatch('on-close', 'close');
  	},

  	setTop: function() {

		var oDrag = document.getElementById(this.fid);
	    var oForm = get.byClass('ui-form-container', oDrag.parentNode);

	    for (var i = 0; i < oForm.length; i++) {
	    	var currentForm = oForm[i];
	    	currentForm.style.zIndex = '65000';
	    };

	  	oDrag.style.zIndex = '65500';

  	}

  },

  events: {
  	'on-close': function(msg) {
  		console.log(msg);
  	}
  }
}

</script>

<style>
	.ui-form-container .form-title {
		position: relative;
		height: 27px;
		margin: 5px;
	}

	.ui-form-container .form-title h1 {
		font-size: 1em;
		height: 27px;
		line-height: 24px;
		border-bottom: 1px solid rgb(238, 238, 238);
	}

	.ui-form-container .form-title div {
		position: absolute;
		height: 19px;
		top: 2px;
		right: 0;
	}

	.ui-form-container .form-title a,a.open {
		float: left;
		width: 21px;
		height: 19px;
		display: block;
		margin-left: 5px;
	}

	a.open {
		position: absolute;
		top: 10px;
		left: 50%;
		margin-left: -10px;
		background-position: 0 0;
	}

	a.open:hover {
		background-position: 0 -29px;
	}

	.ui-form-container .form-title a.form-min {
		background-position: -29px 0;
	}

	.ui-form-container .form-title a.form-min:hover {
		background-position: -29px -29px;
	}

	.ui-form-container .form-title a.form-max {
		background-position: -60px 0;
	}

	.ui-form-container .form-title a.form-max:hover {
		background-position: -60px -29px;
	}

	.ui-form-container .form-title a.form-revert {
		background-position: -149px 0;
		display: none;
	}

	.ui-form-container .form-title a.form-revert:hover {
		background-position: -149px -29px;
	}

	.ui-form-container .form-title a.form-close {
		background-position: -89px 0;
	}

	.ui-form-container .form-title a.form-close:hover {
		background-position: -89px -29px;
	}

	.ui-form-container .form-content {
		overflow: auto;
	}

	.ui-form-container .form-resizeBR {
		position: absolute;
		width: 14px;
		height: 14px;
		right: 0;
		bottom: 0;
		overflow: hidden;
		cursor: nw-resize;
	}

	.ui-form-container .form-resizeL,.ui-form-container .form-resizeT,.ui-form-container .form-resizeR,.ui-form-container .form-resizeB,.ui-form-container .form-resizeLT,.ui-form-container .form-resizeTR,.ui-form-container .form-resizeLB {
		position: absolute;
		background: #000;
		overflow: hidden;
		opacity: 0;
		filter: alpha(opacity=0);
	}

	.ui-form-container .form-resizeL,.ui-form-container .form-resizeR {
		top: 0;
		width: 5px;
		height: 100%;
		cursor: w-resize;
	}

	.ui-form-container .form-resizeR {
		right: 0;
	}

	.ui-form-container .form-resizeT,.ui-form-container .form-resizeB {
		width: 100%;
		height: 5px;
		cursor: n-resize;
	}

	.ui-form-container .form-resizeT {
		top: 0;
	}

	.ui-form-container .form-resizeB {
		bottom: 0;
	}

	.ui-form-container .form-resizeLT,.ui-form-container .rform-esizeTR,.ui-form-container .form-resizeLB {
		width: 8px;
		height: 8px;
		background: #FF0;
	}

	.ui-form-container .form-resizeLT {
		top: 0;
		left: 0;
		cursor: nw-resize;
	}

	.ui-form-container .form-resizeTR {
		top: 0;
		right: 0;
		cursor: ne-resize;
	}

	.ui-form-container .form-resizeLB {
		left: 0;
		bottom: 0;
		cursor: ne-resize;
	}

	.ui-form-container {
	    outline: none;
	    margin: 0 auto;
	    padding: 0;
	    background-color: #fff;
	    border-radius: 2px;
	    max-height: 100vh;
	    max-width: 100vw;
	    overflow-x: hidden;
	    overflow-y: auto;
		position: absolute;
		z-index: 60000;
		border: 1px solid #dde1e4;
	}

	.form-control {
		margin-top: -14px;
	}
</style>
