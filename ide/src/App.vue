<template>

  <div id="app">
    <header>
      <div class="group photo-cover photo-2">
        <ui-toolbar
            type="colored"
            text-color="white"
            brand="Gospel"
            title="Web可视化集成编程环境" 
            show-brand 
            :loading="isLoading" 
            preloader-top
            @nav-icon-clicked="setLoading">
            <div slot="actions">
                <ui-icon-button
                    type="clear" color="white" icon="more_vert" has-dropdown-menu
                    :menu-options="menu" dropdown-position="bottom right"
                ></ui-icon-button>
            </div>
        </ui-toolbar>
      </div>
      <ui-menu :options="menuOptions" :trigger="$els.triggerA" show-icons show-secondary-text></ui-menu>
      <ui-button @click="setLoading()" color="primary">Google Material Design</ui-button>
    </header>
    <section>
      <router-view></router-view>
    </section>
    <footer>
    </footer>
  </div>

</template>

<script>

export default {
  components: {

  },

  methods: {

    setLoading: function() {

    }

  },

  props: {
    isLoading: false
  },

  data() {
    return {

      menu: [{
          id: 'register',
          text: '注册'
      },{
          id: 'login',
          text: '登录'
      },{
        type: 'divider'
      },{
          id: 'settings',
          text: '设置'
      }, {
          id: 'about',
          text: '关于'
      }, {
          id: 'help',
          text: '帮助'
      }],

      menuOptions: [{
          id: 'edit',
          text: 'Edit',
          icon: 'edit',
          secondaryText: 'Ctrl+E'
      }, {
          id: 'duplicate',
          text: 'Duplicate',
          icon: 'content_copy',
          secondaryText: 'Ctrl+D'
      }, {
          id: 'share',
          text: 'Share',
          icon: 'share',
          secondaryText: 'Ctrl+Shift+S',
          disabled: true
      }, {
          type: 'divider'
      }, {
          id: 'delete',
          text: 'Delete',
          icon: 'delete',
          secondaryText: 'Del'
      }]

    }
  }
}

</script>

<style>

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0px;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}

.photo-cover {
    background-position: 50%;
    background-size: cover;
}

.ui-menu-item:not(.divider) {
  width: auto!important;
  max-width: 100%!important;
}

</style>
