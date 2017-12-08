const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
const nunjucks = require('nunjucks')

const rootDir = path.join(__dirname, '..')
const inputDir = 'src'
const outputDir = path.join(__dirname, '..', 'dist')

nunjucks.configure(inputDir, { watch: false })

renderPage()

function renderPage () {
  nunjucks.render('index.html', (error, html) => {
    if (error) {
      console.log(chalk.red('✘ HTML render error\n', error))
      process.exit(1)
    }

    fse.outputFile(`${outputDir}/index.html`, html, error => {
      console.log(chalk.green(`✓ HTML pages saved to ${path.relative(rootDir, outputDir)}/`))
    })
  })
}
