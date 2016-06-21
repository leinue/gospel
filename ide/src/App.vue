<template>

  <div id="app">
    <header>

      <div class="group photo-cover photo-2">
        <ui-toolbar
            type="clear" brand="Gospel" title="Web可视化集成编程环境" show-brand :loading="isLoading" preloader-top
        >
            <div slot="actions">
                <ui-icon-button
                    type="clear" color="black" icon="more_vert" has-dropdown-menu
                    :menu-options="menu" dropdown-position="bottom right"
                ></ui-icon-button>
            </div>
        </ui-toolbar>
      </div>

      <h1>Gospel IDE Frontend</h1>
      <p>
        <a v-link="{ path: '/404' }">Go to 404</a>
      </p>
    </header>
    <section>
      <router-view></router-view>
    </section>
    <footer>
      <ui-button @click="setLoading()" color="primary">Google Material Design</ui-button>
    </footer>
  </div>

</template>

<script>

export default {
  components: {

  },

  methods: {

    setLoading: function() {
      // this.isLoading = !this.isLoading;
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
          id: 'settings',
          text: '设置'
      }, {
          id: 'about',
          text: '关于'
      }, {
          id: 'help',
          text: '帮助'
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
  width: 100%;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}

.photo-2 {
    background-image: url("http://i.imgur.com/vFBagiE.jpg");
}

.photo-cover {
    background-position: 50%;
    background-size: cover;
    height: 300px;
}

</style>
