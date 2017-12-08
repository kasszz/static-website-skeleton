# Static website skeleton with DatoCMS
> A static website that is build with Nunjucks, PostCSS, and Rollup. The data comes from DatoCMS.


## Build Setup
Add an .env file with the `DATO_API_TOKEN=xxx` to the root of the project. This is needed for the project to get the content from DatoCMS.

``` bash
# install dependencies
npm install

# get data from DatoCMS
npm run data

# build with HTTP server
npm start

# build only
npm run build

# watch only
npm run watch
```
