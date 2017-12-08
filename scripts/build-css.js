
const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
const postcss = require('postcss')

const rootDir = path.join(__dirname, '..')
const inputFilename = 'src/index.css'
const outputDir = 'dist/assets/css/'
const outputFilename = path.join(outputDir, 'index.css')

const processors = [
  require('postcss-import'),              // combine imports into one file
  require('postcss-custom-properties'),   // replace variables by their calculated values
  require('postcss-color-function'),      // replaces color functions with rgba values
  require('postcss-color-rgba-fallback'), // adds a hex value before every rgba value
  require('pixrem'),                      // adds pixel fallback before every rem value
  require('postcss-calc'),                // pre-calculcates calc functions where possible
  require('autoprefixer')                 // vendor prefix for older browsers
]

if (process.env.NODE_ENV === 'production') {
  processors.push(require('cssnano'))     // minify css
}

postcss(processors)
  .process(fse.readFileSync(inputFilename), {
    from: inputFilename,
    to: outputFilename.substr(outputDir.length), // file path relative to output dir
    map: { inline: false }
  })
  .then(writeOutput)
  .then(() => console.log(chalk.green(`✓ CSS file saved to ${path.relative(rootDir, outputDir)}/`)))
  .catch(error => handleError(error.message))


function writeOutput (result) {
  const promisses = []

  promisses.push(fse.outputFile(outputFilename, result.css, handleError))

  if (result.map) {
    promisses.push(fse.outputFile(`${outputFilename}.map`, result.map, handleError))
  }

  return Promise.all(promisses)
}

function handleError (error) {
  if (error) {
    console.log(chalk.red('✘ CSS Build error\n', error))
    process.exit(1)
  }
}
