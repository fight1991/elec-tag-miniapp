/**
 * 根据命令行运行参数，修改 根目录config/env.js 里面的项目配置信息
 * 即动态的将 const/env 下的配置文件的内容写入到 config/env.js 中
 */

const fs = require('fs')
const path = require('path')
//源文件
const sourceFiles = {
  prefix: '/const/env/',
  dev: 'dev.json',
  test: 'test.json',
  prod: 'prod.json'
}
//目标文件
const targetFiles = [{
  prefix: '/config/',
  filename: 'env.js'
}]
const preText = 'export default '
// 获取命令行参数
const cliArgs = process.argv.splice(2)
// [ '--dev' ]
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
    // 拼接js导出
    let content = preText + data
    // 将获取的内容写入到目标文件中
    targetFiles.forEach(function(item, index) {
      if (item.filename === 'env.js') {
        // 写入文件(这里只做简单的强制替换整个文件的内容)
      fs.writeFile(__dirname + item.prefix + item.filename, content, 'utf8', (err) => {
        if (err) {
          throw new Error(`error occurs when reading file ${sourceFile}. Error detail: ${err}`)
          process.exit(1)
        }
      })
      }
      
    })
  })