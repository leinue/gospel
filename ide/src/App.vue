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
            :hide-nav-icon="true"
            @nav-icon-clicked="setLoading"
            >
            <div slot="brand">
              <div class="ui-toolbar-title">
                <ui-icon-button
                    type="clear" color="white" icon="menu"
                    v-el:trigger-b
                ></ui-icon-button>
                <span style="top: 17px;position: fixed;">Gospel</span>
              </div>
            </div>

            <div slot="actions">

                <ui-icon-button
                    type="clear" color="white" icon="play_circle_outline" v-el:debug
                ></ui-icon-button>

                <ui-tooltip :trigger="$els.debug" content="启动调试"></ui-tooltip>

                <ui-icon-button
                    type="clear" color="white" icon="stop_circle_outline" v-el:stop-debug
                ></ui-icon-button>

                <ui-tooltip :trigger="$els.stopDebug" content="停止调试"></ui-tooltip>

                <ui-icon-button
                    type="clear" color="white" icon="view_modules" has-dropdown-menu :show-menu-secondary-text="true"
                    :menu-options="formMenu" dropdown-position="bottom right" v-el:forms
                ></ui-icon-button>

                <ui-tooltip :trigger="$els.forms" content="窗口"></ui-tooltip>

                <ui-icon-button
                    type="clear" color="white" icon="more_vert" has-dropdown-menu
                    :menu-options="menu" dropdown-position="bottom right"
                ></ui-icon-button>
            </div>
        </ui-toolbar>
      </div>
      <ui-menu :options="mainMenuOptions" @option-selected="triggerMainMenuSelected()" :trigger="$els.triggerB" show-icons show-secondary-text></ui-menu>
      <!-- <ui-button @click="setLoading()" color="primary">Google Material Design</ui-button> -->
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
  methods: {

    setLoading: function() {
      var btn = this.$els.triggerB;
    },

    triggerMainMenuSelected: function() {
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

      mainMenuOptions: [{
          id: 'edit',
          text: '新建项目',
          icon: 'edit',
          secondaryText: 'Ctrl+N'
      }, {
          id: 'duplicate',
          text: '保存项目',
          icon: 'content_copy',
          secondaryText: 'Ctrl+S'
      },{
          type: 'divider'
      }, {
          id: 'delete',
          text: '删除项目 ',
          icon: 'delete',
          secondaryText: 'Del'
      }],

      formMenu: [{
        id: 'controls',
        text: '控件面板',
        secondaryText: 'O'
      }, {
        id: 'console',
        text: '控制台',
        secondaryText: 'O'
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

.sidebar {
  width: 272px;
  height: 100vh;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  overflow-y: auto;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0,0,0,.35),0 2px 2px rgba(0,0,0,.2);
  z-index: 5;
}

.ui-collapsible-header .ui-icon {
  margin-top: -20px;
}

.toolbar {
  height: 100%;
  /*line-height: 100%;*/

}

</style>
