<template>
  <div class="container">
    <div v-if="hasMenu">
      <header class="header">
        <nav class="hd-inner">
          <router-link class="logo" to="/" exact>
            <span></span>
          </router-link>
          <a href="javascript:;" class="logout" @click="logout">退出</a>
        </nav>
      </header>
      <div class="main" :style="'height:' + viewHeight + 'px'">
        <Navigator class="sidebar"></Navigator>
        <transition name="fade" mode="out-in">
          <router-view class="view main"></router-view>
        </transition>
      </div>
    </div>
    <div v-else>
      <transition name="fade" mode="out-in">
        <router-view class="view nomenu"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navigator from '@/components/common/Navigator'
export default {
  name: 'App',
  components: {
    Navigator
  },
  data() {
    return {
      visible: false,
      viewHeight: 0,
      hasMenu: true
    }
  },
  methods: {
    async logout() {
      let res = await this.$http.get(this.api.logout, { user: this.userinfo })
      if (res.errNo === 0) {
        this.$router.push('/account/account')
      }
    }
  },
  mounted() {
    this.viewHeight = document.body.offsetHeight - 70
  }
}
</script>

<style lang="scss">
  $rezenMain:#3BCA7D;
  .container {
    min-width: 600px;
    height: 100%;
    .header {
      min-width: 350px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.1);
      box-shadow: 0 1px 2px rgba(0,0,0,.1);
      background-color: #FFF;
      .hd-inner {
        box-sizing: border-box;
        height: 70px;
        line-height: 70px;
        .logo {
          display: block;
          width: 200px;
          height: 70px;
          line-height: 70px;
          text-align: center;
          color: #FFF;
          font-size: 24px;
          background: $rezenMain;
        }
        .logout {
          font-size: 14px;
          color: #333333;
          position: absolute;
          right: 40px;
          top: 0;
          &:active {
            color: $rezenMain;
          }
        }
      }
    }
    .main {
      overflow-x: hidden;
      padding-top: 70px;
      display: flex;
      justify-content: space-between;
      .sidebar {
        height: 100%;
        -webkit-box-shadow: 1px 0 2px rgba(0,0,0,.1);
        box-shadow: 1px 0 2px rgba(0,0,0,.1);
      }
      .view {
        height: 100%;
        overflow-y: scroll;
        flex-grow: 1;
        flex-shrink: 1;
        position: relative;
        padding: 20px;
        box-sizing: border-box;
        &.main {
          background: #F7F8FC;
        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: all .2s ease;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
    }
  }
  .el-popover /deep/ .el-form-item:last-of-type {
    margin-bottom: 0;
  }
</style>
