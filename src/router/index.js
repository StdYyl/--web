import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/member/login'
import forgot from '../views/member/forgot'
import perfectInfo from '../views/member/perfectInfo'
import information from '../views/member/Information'
import userLayout from '../components/layout/UserLayout'
import home from '../views/home/home'
import dashboard from '../views/dashboard/dashboard'

import Project from '../views/project/project'
import ProList from '../views/project/list'

import SettingPro from '../components/project/Setting'
import Progress from '../components/project/Progress'

import System from '../views/system/system'
import Setting from '../views/system/setting'
import Log from '../views/system/log'
import User from '../views/system/user'

import UserMgn from '../views/user/index'
import intfIndex from '../views/interface/index'
import intfAll from '../components/intf/index'
import ExportIntf from '../components/intf/ExportIntf'
import AddIntf from '../components/intf/AddIntf'
import PreviewIntf from '../components/intf/Preview'


import Accept from '../views/member/accept'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/user/login'
    },
    {
      path: '/user',
      name: 'userLayout',
      component: userLayout,
      meta: {model: 'Login'},
      children: [
        {
          path: 'login',
          name: 'login',
          component: login,
          meta: {model: '登陆'},
        },
        {
          path: 'forgot',
          name: 'forgot',
          component: forgot,
          meta: {model: '忘记密码'},
        },
        {
          path: 'perfectInfo',
          name: 'perfectInfo',
          component: perfectInfo,
          meta: {model: '完善信息'},
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {model: '主页'},
      children: [
        {
          path: '',
          redirect: 'project'
        },
        {
          path: 'project',
          name: 'project',
          component: Project,
          meta: {model: '项目管理'},
          children: [
            {
              path: '',
              redirect: 'list'
            },
            {
              path: 'list/:id?',
              name: 'list',
              component: ProList,
              meta: {model: '项目列表'},
            },
            {
              path: 'information',
              name: 'information',
              component: information,
              meta: {model: '个人信息'},
            },
          ]
        },
        {
          path: 'member',
          name: 'member',
          component: UserMgn,
          meta: {model: '成员管理'},
        },
        {
          path: 'setting/:id',
          name: 'setting',
          component: SettingPro,
          meta: {model: '项目设置'}
        },
        {
          path: 'intfIndex/:id',
          name: 'intfIndex',
          component: intfIndex,
          meta: {model: '接口列表首页'},
          children: [
            {
              path: '',
              redirect: 'intfAll'
            },
            {
              path: 'intfAll',
              name: 'intfAll',
              component: intfAll,
              meta: {model: '所有接口'},
            },
            {
              path: 'AddIntf',
              name: 'AddIntf',
              component: AddIntf,
              meta: {model: '添加接口'},
            },
            {
              path: 'ExportIntf',
              name: 'ExportIntf',
              component: ExportIntf,
              meta: {model: '批量导入接口'},
            },
            {
              path: 'PreviewIntf/:id',
              name: 'PreviewIntf',
              component: PreviewIntf,
              meta: {model: '预览接口'},
            },
          ]
        },
        {
          path: 'progress/:id',
          name: 'progress',
          component: Progress,
          meta: {model: '进度管理'}
        },
        {
          path: 'member/accept',
          name: 'accept',
          component: Accept,
          meta: {model: '接受邀请'}
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta: {model: '管理员主页'},
      children: [
        {
          path: '',
          redirect: 'system'
        },
        {
          path: 'system',
          name: 'system',
          component: System,
          meta: {model: '系统管理'},
          children: [
            {
              path: 'setting',
              name: 'setting',
              component: Setting,
              meta: {model: '系统设置'},
            },
            {
              path: 'logger',
              name: 'logger',
              component: Log,
              meta: {model: '日志管理'},
            },
            {
              path: 'user',
              name: 'user',
              component: User,
              meta: {model: '用户管理'},
            }
          ]
        },
        {
          path: 'member/accept',
          name: 'accept',
          component: Accept,
          meta: {model: '接受邀请'}
        }
      ]
    }

  ]
})
