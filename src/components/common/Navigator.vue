<template>
  <el-menu class="navigator">
    <el-menu-item
      v-for="(category, categoryIndex) in navigatorData"
      v-show="!category.children"
      :key="'menu' + categoryIndex"
      :index="'menu' + categoryIndex">
      <i class="el-icon-menu"></i>
      <router-link
        class="link"
        :to="category.path">{{category.label}}</router-link>
    </el-menu-item>
    <el-submenu
      v-for="(category, categoryIndex) in navigatorData"
      v-show="category.children"
      :key="'sub' + categoryIndex"
      :index="'sub' + categoryIndex">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>{{category.label}}</span>
      </template>
      <el-menu-item
        v-for="(link, linkIndex) in category.children"
        :key="linkIndex"
        :index="categoryIndex + '-' + linkIndex">
        <router-link
          class="link"
          :to="category.path + '/' + link.path">{{link.label}}</router-link>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import router from '../../router/index'
export default {
  name: 'Navigator',
  computed: {
    navigatorData() {
      let deepFilter = source => {
        return source.filter(item => {
          if (!item.hide) {
            if (item.children && item.children.length > 0) {
              item.children = deepFilter(item.children)
              return item
            } else {
              return item
            }
          }
        })
      }
      return deepFilter(router.options.routes)
    }
  }
}
</script>

<style lang="less" scoped>
  .navigator {
    position: relative;
    min-width: 200px;
    /deep/ .el-submenu__title {
      color: #4D4D4D;
      font-size: 16px;
      i {
        color: #38CA7C;
      }
      &:hover {
        background-color: rgba(59,202,125,.1);
      }
      .link {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    /deep/ .el-menu-item {
      color: #8E8E8E;
      a {
        color: #8E8E8E;
      }
      i {
        color: #38CA7C;
      }
      &.is-active {
        background-color: rgba(59,202,125,.1);
        border-left: 2px solid rgba(59,202,125,.7);
        .router-link-active {
          color: #38CA7C;
        }
      }
      &:hover {
        background-color: rgba(59,202,125,.1);
      }
    }
    & > .el-menu-item {
      font-size: 16px;
      a {
        color: #4D4D4D;
      }
    }
  }
</style>
