<template>

  <ui-collapsible>
    <div slot="header">
      布局
    </div>
    <div>

      <ul class="cpList">  
          <li id="grid_grid" title="文本输入框" class="component">  
              <div class="cpIcon"></div>  
              <p>栅格布局</p>  
          </li>
          <li id="grid_padded" title="文本输入框" class="component">  
              <div class="cpIcon"></div>  
              <p>内边距</p>
          </li>
      </ul>

    </div>

  </ui-collapsible>

  <ui-collapsible>
    <div slot="header">
      控件
    </div>
    <div>

      <ul class="cpList">  
          <li id="input_input" title="文本输入框" class="component">  
              <div class="cpIcon"></div>  
              <p>文本输入框</p>  
          </li>  
          <li id="output_label" title="文本"  class="component">
              <div class="cpIcon"></div>  
              <p>文本</p>  
          </li>
          <li id="input_button" title="button" class="component">
            <div class="cpIcon"></div>
            <p>button</p>
          </li>
      </ul>

    </div>
  </ui-collapsible>

  <ui-collapsible>
    <div slot="header">
      插件
    </div>
    <div>
      
    </div>  
  </ui-collapsible>

</template>

<script>

export default {
  data () {
    return {
    }
  },

  ready() {
  },

  components: {

  }
}

</script>

<style>
    
  .cpList {
    cursor: default;
  }

</style>
