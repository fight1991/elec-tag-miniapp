/**
 * 根据命令行运行参数，修改 根目录config/locationKey.js 里面的项目配置信息
 * 即动态的将 const/env 下的配置文件的内容写入到 config/env.js 中
 */

const fs = require('fs')
const path = require('path')
//源文件
const sourceFiles = {
  prefix: '/const/unique/',
  test: 'testApp.json',
  release: 'releaseApp.json'
}
//目标文件
const targetFiles = [{// 修改城市选择插件key
  prefix: '/config/',
  filename: 'locationKey.js'
},{ // 修改appid
  prefix: '/',
  filename: 'project.config.json'
}]
const preText = 'export default '
// 获取命令行参数
const cliArgs = process.argv.splice(2)
// [ '--test' ]
// 当前环境
const currentEnv = cliArgs[0].substr(2)
// dev
// 根据不同环境选择不同的源文件
const sourceFile = sourceFiles[currentEnv]
// 处理数据
fs.readFile(__dirname + sourceFiles.prefix + sourceFile,
  (err, data) => {
    if (err) {
      throw new Error(`Error occurs when reading file ${sourceFile}.\nError detail: ${err}`)
      process.exit(1)
    }
    // 获取源文件中的内容为data
    let configData = JSON.parse(data)
    // 将获取的内容写入到目标文件中
    targetFiles.forEach(function(item, index) {
      if (item.filename === 'locationKey.js') {
        // 拼接js导出
        let content = preText + JSON.stringify(configData.locationKey)
        fs.writeFile(__dirname + item.prefix + item.filename, content, 'utf8', (err) => {
          if (err) {
            throw new Error(`error occurs when reading file ${sourceFile}. Error detail: ${err}`)
            process.exit(1)
          }
        })
      }
      if (item.filename === 'project.config.json') {
        // 先读取,再存储
        fs.readFile(__dirname + '/project.config.json',(err, originData)=> {
          if (err) {
            throw new Error(`${err}`)
            process.exit(1)
          }
          let tempData = JSON.parse(originData)
          tempData.appid = configData.appid
          fs.writeFile(__dirname + '/project.config.json', JSON.stringify(tempData), 'utf8', (err) => {
            if (err) {
              throw new Error(`error occurs when reading file ${sourceFile}. Error detail: ${err}`)
              process.exit(1)
            }
          })
        })
      }
      
    })
  })