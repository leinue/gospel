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
      <ui-menu :options="mainMenuOptions" @option-selected="triggerMainMenuSelected" :trigger="$els.triggerB" show-icons show-secondary-text></ui-menu>
      <!-- <ui-button @click="setLoading()" color="primary">Google Material Design</ui-button> -->
      <section>

        <ui-modal
          :show.sync="modalShowingCtrl.newProjectModal" header="新建项目">
          <div slot="default">

            <ui-radio-group
                :options="projectTypeGroup" label="请选择项目类型" :value.sync="project.projectType" help-text="个人项目是免费的"
            ></ui-radio-group>

            <p></p>

            <ui-radio-group
                :options="projectPlatformGroup" label="请选择项目平台" :value.sync="project.projectPlatform"
            ></ui-radio-group>

            <p></p>

            <ui-textbox
                label="项目名称" name="projectName" type="text" placeholder="请输入项目名称" :value.sync="project.projectName"
                validation-rules="required" :autocomplete="false"
                @keydown="projectNameChanged"
            ></ui-textbox>

          </div>
          <div slot="footer">
              <ui-button @click="modalShowingCtrl.newProjectModal = false">取消</ui-button>
              <ui-button color="primary" @click="confirmToCreateTheProject()" :disabled.sync="modalShowingCtrl.btnConfirmDisabled">新建</ui-button>
          </div>
        </ui-modal>

        <ui-confirm
            header="删除项目" type="danger" confirm-button-text="删除"
            confirm-button-icon="delete" deny-button-text="取消" @confirmed="deleteProjectConfirmed"
            @denied="deleteProjectDenied" :show.sync="confirmShowingCtrl.deleteProjectConfirm" close-on-confirm
        >
            你确认要删除此项目吗？（无法恢复）
        </ui-confirm>

        <ui-snackbar :show.sync="snckbarShowingCtrl.saveSucess" action="确认">保存成功</ui-snackbar>

      </section>
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

    triggerMainMenuSelected: function(selectedOption) {

      switch(selectedOption.id) {
        case 'new-project':
          this.modalShowingCtrl.newProjectModal = true;
          break;
        case 'save-project':
          this.snckbarShowingCtrl.saveSucess = true;
          break;
        case 'delete-project':
          this.confirmShowingCtrl.deleteProjectConfirm = true;
          break;
        default:
          break;
      }

    },

    confirmToCreateTheProject: function() {
      if(this.project.projectName != '') {
        this.modalShowingCtrl.newProjectModal = false;
      }
    },

    projectNameChanged: function() {
      if(this.project.projectName != '') {
        this.modalShowingCtrl.btnConfirmDisabled = false;
      }
    },

    deleteProjectConfirmed: function() {
      this.confirmShowingCtrl.deleteProjectConfirm = false;
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
          id: 'new-project',
          text: '新建项目',
          icon: 'edit',
          secondaryText: 'Ctrl+N'
      }, {
          id: 'save-project',
          text: '保存项目',
          icon: 'content_copy',
          secondaryText: 'Ctrl+S'
      },{
          type: 'divider'
      }, {
          id: 'delete-project',
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
      }],

      modalShowingCtrl: {
        newProjectModal: false,
        btnConfirmDisabled: true
      },

      confirmShowingCtrl: {
        deleteProjectConfirm: false
      },

      snckbarShowingCtrl: {
        saveSucess: false
      },

      projectTypeGroup: [{
        value: 'personal',
        text: '个人项目'
      },{
        value: 'team',
        text: '团队项目'
      }],

      projectPlatformGroup: [{
        value: 'web',
        text: 'Web端'
      }, {
        value: 'WebApp',
        text: 'Web App'
      }, {
        value: 'HybirdApp',
        text: '混合App'
      }],

      project: {
        projectType: 'personal',
        projectPlatform: 'web',
        projectName: ''
      }
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
}

.ui-modal-mask {
  z-index: 65535!important;
}

.ui-radio-input:checked ~ .ui-radio-inner-dot {
    margin-top: 2px;
    margin-left: 2px;
}

.ui-snackbar {
  z-index: 65535!important;
  transform: scale(1);
}
</style>
