import notify from './notify'
Component({
  relations: {
    '../dropdownMenu/dropdownMenu': {
      type: 'parent'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    test: '1212134',
    text: 'chld'
  },
  lifetimes: {
    attached () {
      console.log('子组件钩子函数')
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    send () {
      notify.send(Date.now())
    }
  }
})
