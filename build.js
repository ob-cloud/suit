const fs = require('fs')
const path = require('path')
const {default: Suit} = require('./dist/suit.cjs')

function cleardir (dir) {
  Array.from(fs.readdirSync(dir)).forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isFile()) {
      fs.unlinkSync(filePath)
    } else if(stat.isDirectory()) {
      cleardir(filePath)
    }
  })
}

function writeFile (file, value) {
  fs.writeFile(path.resolve(__dirname, file), value, () => {
    console.log('File Created: ', file)
  })
}

function proccess () {
  let data = fs.readFileSync(path.join('dist', 'suit.esm.js'), 'utf8')
  // data = data.replace(/[\n\t]/g, '')
  const index = data.indexOf('var TypeHints$1 = new TypeHints();')
  // console.log('--- ', index , data.slice(index, +index + 20))
  const pre = data.slice(0, index - 4)
  const next = data.slice(index - 4)
  const extra = []
  // console.log(next)
  Object.keys(Suit.typeHints).forEach(key => {
    extra.push(`
    /**
     * 设备类型、设备子类型判断<br>
     * 实例接口文档由代码生成，具体参数使用请参考私有方法
     *
     * @see __handler() 的参数 [设备类型]
     * @see __handleSubType() [子设备类型]
     *
     * @param {number} [deviceType] 套件类型
     * @param {number} [deviceSubType] 套件子类型
     * @example
     * new TypeHints().${key}(deviceType, deviceSubType)
     */
    ${key}(deviceType, deviceSubType) {}`)
  })
  let append = extra.join('')
  // append = append.replace(/[\n\t]/g, '')

  const lib = pre + append + next
  // console.log(lib)
  writeFile('docsource/suit.js', lib)
  cleardir(path.resolve(__dirname, 'docs'))
}

proccess()
