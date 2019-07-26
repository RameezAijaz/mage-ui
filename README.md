# Mage-UI ![logo](https://github.com/RameezAijaz/mage-ui/blob/master/src/assets/img/mage_logo_36x36.png "logo")
Quickly scaffold UI boilerplate with just single command using:
![logo](https://github.com/RameezAijaz/mage-ui/blob/master/tech_used.png "logo")

# Demo

<a href="https://mage-ui-demo.firebaseapp.com/" target="_blank"> Click here for MAGE-UI demo ...</a>


# Usage
## With npx
```
$ npx mage-ui
```
## Without npx

install mage-ui globally
```
$ npm i -g mage-ui
```
run `mage-ui` inside the directory where you want to scaffold the project

```
$ mage-ui
```

# Runing Boilerplate

1. `cd` into project boilerplate.
2. Run `npm run watch` to start the webpack. It will create dist directory with the bundled code and keep watching for changes.
3. Run `npm start` to start the dev server. It will automatically open the home page of boilerplate in the browser.
4. Run `npm run build` to create the optimized, minfied and production ready code inside `dist` directory.

# Result

![logo](http://codementor.tech/wp-content/uploads/2019/07/mage_ui.png "logo")

# Boilerplate Directory Structure

Boilerplate directory structure is quite intituitive and simple.
* Project root directory contains following files and directories 

![screenshot](http://codementor.tech/wp-content/uploads/2019/07/Screen-Shot-2019-07-25-at-11.11.45-PM.png "screenshot")
 * `src` directory is the main directory. `index.html` and `App.js` are the entry points. 
 
 ![screenshot](http://codementor.tech/wp-content/uploads/2019/07/Screen-Shot-2019-07-25-at-11.15.53-PM.png "screenshot")
 
 * `assets` directory is for static assets like css, images and static js files

 ![screenshot](http://codementor.tech/wp-content/uploads/2019/07/Screen-Shot-2019-07-25-at-11.18.58-PM.png "screenshot")
 
 * `base_template` directory contains the react component for header, footer, router etc

 ![screenshot](http://codementor.tech/wp-content/uploads/2019/07/Screen-Shot-2019-07-25-at-11.21.14-PM.png "screenshot")
 
 * `common` directory contains the general react components that can be used by other components
 
 
 ![screenshot](http://codementor.tech/wp-content/uploads/2019/07/Screen-Shot-2019-07-25-at-11.21.21-PM.png "screenshot")
 
 * every page in the boilerplate is a seperate react component. `pages` directory contains them

 ![screenshot](http://codementor.tech/wp-content/uploads/2019/07/Screen-Shot-2019-07-25-at-11.21.30-PM.png "screenshot")
 
 
