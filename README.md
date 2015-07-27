# Vanilla Flux Implementation
**authors:** Gregory Tandiono & Max Lin

This is a working example of vanilla flux using browserify (with babel transforms, shims, flowtype), es6, and flowtype (typed javascript). This project also includes batteries (a fake express server with faker)

This project is gulpless, gruntless, webpackless, requireless, it uses NPM all the way, for the sake of simplicity (and personal preference)

**There are tons of examples out there, why another one?**

*why not?*


## How to run it on your local machine

**Pre Req:**

- Node/iojs
- npm
- nodemon (`npm install nodemon -g`)
- flow (`brew install flow`) (**OPTIONAL**)

**Build Steps:**

- run `npm install`
- run `npm run build`
- run `node server.js` (should be in port 1337, you can change it in `server.js`)

**Development Steps:**

- run `npm run watch`
- run `nodemon server.js` (should be in port 1337, you can change it in `server.js`)


**Notes**

I use facebook's [flow](http://flowtype.org/) as a static type checker, notice the `/* @flow */` on the top of every (or most) of the js files I wish to have checked. Run `flow check` on the project's parent directory. Probably will give you tons of errors, because flow does not support a lot of es6 stuff just yet, but I'm keeping it there in case they support it soon.

This is still a working build without tests, if you find the nomenclature a bit strange, please open issues/PR, I will welcome it.


## Roadmap

- [x] Ability to Get Users
- [x] Ability to Create Users
- [ ] Ability to Update Users
- [ ] Ability to Destroy Users
- [ ] Add Create Users Client Exception Handling
- [ ] Write tests
- [ ] Implement the same flux logic in a react native ecosystem
- [ ] Implement Sockets.. (maybe?)
