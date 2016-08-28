<template>
		
	<div class="attr-panel">

	    <div class="grid">
	      <div class="grid-cell">
			<ui-textbox
		        label="控件ID" name="control-id" type="text" placeholder="输入控件ID"
		        :value.sync="'ss'"
			></ui-textbox>      	
	      </div>
	    </div>

	    <div class="grid">
	    	<div class="grid-cell">
				<ui-select
	                name="control-class" :search-placeholder.sync="'搜索类名'" label="控件类名" :options="classList" partial="ui-select-image"
	                placeholder="选择类名" show-search multiple
				></ui-select>
	    	</div>
	    </div>

	    <div class="grid">
	      <div class="grid-cell">
			<ui-textbox
		        label="左边" name="name" type="text" placeholder="0"
		        :value.sync="'0'"
			></ui-textbox>
	      </div>
	      <div class="grid-cell">
			<ui-textbox
		        label="顶边" name="name" type="text" placeholder="0"
		        :value.sync="'0'"
			></ui-textbox>
	      </div>
	    </div>

	    <div class="grid">
	      <div class="grid-cell">
			<ui-textbox
		        label="宽度" name="name" type="text" placeholder="0"
		        :value.sync="'0'"
			></ui-textbox>      	
	      </div>
	      <div class="grid-cell">
			<ui-textbox
		        label="高度" name="name" type="text" placeholder="0"
		        :value.sync="'0'"
			></ui-textbox>
	      </div>
	    </div>

	    <div class="grid">
	    	<div class="grid-cell">
				<ui-textbox
			        label="提示信息" name="name" type="text" placeholder="0"
			        :value.sync="'placeholder'"
				></ui-textbox>
	    	</div>
	    </div>

	    <div class="grid">
	    	<div class="grid-cell">
				<ui-textbox
			        label="默认值" name="name" type="text" placeholder="0"
			        :value.sync="'默认值'"
				></ui-textbox>
	    	</div>
	    </div>

	</div>

</template>

<script>

export default {
  data () {
    return {
    	classList: [
		    {
		        text: 'Red',
		        image: 'https://placehold.it/64/ff0000/ff0000',
		        value: 'red'
		    }, {
		        text: 'Blue',
		        image: 'https://placehold.it/64/0000ff/0000ff',
		        value: 'blue'
		    }, {
		        text: 'Green',
		        image: 'https://placehold.it/64/008000/008000',
		        value: 'green'
		    }, {
		        text: 'Yellow',
		        image: 'https://placehold.it/64/ffff00/ffff00',
		        value: 'yellow'
		    }, {
		        text: 'Purple',
		        image: 'https://placehold.it/64/800080/800080',
		        value: 'purple'
		    }, {
		        text: 'Pink',
		        image: 'https://placehold.it/64/ffc0cb/ffc0cb',
		        value: 'pink'
		    }, {
		        text: 'Lavender',
		        image: 'https://placehold.it/64/e6e6fa/e6e6fa',
		        value: 'lavender'
		    }, {
		        text: 'Orange',
		        image: 'https://placehold.it/64/ffa500/ffa500',
		        value: 'orange'
		    }, {
		        text: 'Peach',
		        image: 'https://placehold.it/64/ffdab9/ffdab9',
		        value: 'peach'
		    }, {
		        text: 'Lime',
		        image: 'https://placehold.it/64/00ff00/00ff00',
		        value: 'lime'
		    }
		]
    }
  },

  ready() {
  },

  components: {

  },

  methods: {

  }
}
	
</script>

<style>

	.grid {
	  	display: flex;
	}

	.grid-cell {
		padding-right: 15px;
		padding-left: 5px;
	  	flex: 1;
	}

	.ui-textbox-label-text {
		font-size: 11px;
	}

	.ui-textbox-input, .ui-textbox-textarea {
		font-size: 13px!important;
	}

	.ui-select-label-text {
		font-size: 11px;
	}

	.ui-select-display {
		font-size: 11px;
	}

	.ui-select-search-input {
		font-size: 13px;
		padding: 0 4px;
	}

	.ui-form-container .form-content {
		overflow: visible!important;
	}
</style>
