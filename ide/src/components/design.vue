<template>

  <ui-tabs type="text">
      <ui-tab header="设计">
          My books

          <a href="gogole.com">Hey</a>
      </ui-tab>

      <ui-tab header="代码编辑" @selected="startCoding()">
          Authors
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
  
</style>