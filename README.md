[![standard-readme compliant](https://img.shields.io/badge/Project-Birddesk-green.svg?style=flat-square)]()

## Initial install
 
1. `sudo apt-get install nodejs`
2. `sudo apt-get install npm`
3. `sudo ln -s /usr/bin/nodejs /usr/bin/node`
4. `npm install -g bower`
5. `npm install -g typings`

## Install

```bash
$ git clone https://{{Username}}@bitbucket.org/jantonk/birddesk-spa-frontend.git
$ cd birddesk-spa-frontend
$ npm install
$ bower install


### Run project

For Development:

```bash
$ npm start
```
`http://127.0.0.1:7777`

OR

For Production:

```bash
$ npm run build
```
`Create a virtual host and move the <<dist>> folder to the desired directory.`