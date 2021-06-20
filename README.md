# MOB1Cyril

A front-end interface for the application [CSUAPI](https://github.com/XCarrel/CSUAPI).

Created in React Native during my MOB1 courses !


## Getting started

### Need to launch: 
- expo (npm install --global expo-cli)

### Need to start :

    $ npm i

If you want change the ip of the API you can go in /components/api.js 
and change the ip in "baseURL".
```
let connectAPI = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    timeout: 10000,
});
```