![alt text](https://github.com/darinlarimore/Rev-Jekyll/blob/master/assets/icons-71433d7ab3b1ffd5f6ef1e22e4149fd6/firefox_app_128x128.png "Rev Logo")

# Rev 2018

## Staging
http://rev.trendyminds.com/ < this deploys automatically with deploybot

## Requirements
* yarn 1.3.2
* node 6.x
* ruby 2.4.2

To install node modules run and bundle components

```
yarn

bundle install
```

## Local Development Server
```
yarn start
```

## Build
To build the website run the following line

```
yarn build
```
The built website will be in `_site` folder.

You can also run a local server to test it with this command
```
yarn serve:dist
```
