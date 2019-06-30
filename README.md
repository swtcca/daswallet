# 钱包和离线签名
## 优势
1. js开发，原生性能
2. vuejs生态
3. swtc-xxx开发库
4. 可以用websocket/jingtum-api/jcc-rpc
5. 同时支持两套系统

## nativescript + vue
## plugins
## swtclib
## mixins
## vuex
## 步骤
1. [安装nativescript](https://www.nativescript.org)
2. git fork
3. git clone
4. npm install
5. 手工清理
> `rm -fr node_modules/nativescript-zxing/platforms/android`
6. 连接设备，运行
> `npm run ios`

> `npm run android`

## 截图
<img align="center" src="https://raw.githubusercontent.com/swtcca/swtc-app-examples/master/images/android-wallet.png" width="360" alt="android" />
<img align="center" src="https://raw.githubusercontent.com/swtcca/swtc-app-examples/master/images/android-coldwallet.png" width="360" alt="android" />
<img align="center" src="https://raw.githubusercontent.com/swtcca/swtc-app-examples/master/images/android-offsign.png" width="360" alt="android" />
<img align="center" src="https://raw.githubusercontent.com/swtcca/swtc-app-examples/master/images/android-offlinesign.png" width="360" alt="android" />
<img align="center" src="https://raw.githubusercontent.com/swtcca/swtc-app-examples/master/images/ios-wallet.png" width="360" alt="ios" />
<img align="center" src="https://raw.githubusercontent.com/swtcca/swtc-app-examples/master/images/ios-coldwallet.png" width="360" alt="ios" />
<img align="center" src="https://raw.githubusercontent.com/swtcca/swtc-app-examples/master/images/ios-offsign.png" width="360" alt="ios" />

----------------------------------------

# NativeScript Vue Blank Template
App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

## Quick Start
Execute the following command to create an app from this template:

```
tns create my-blank-vue --template tns-template-blank-vue
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm](https://www.npmjs.com/package/tns-template-blank-vue).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
tns create my-blank-vue --template https://github.com/NativeScript/template-blank-vue
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!

## Walkthrough

### Architecture
There is a single blank component located in:
- `/components/Home.vue` - sets up an empty page layout.

**Home** page has the following components:
- `ActionBar` - It holds the title of the page.
- `GridLayout` - The main page layout that should contains all the page content.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](http://developer.telerik.com/wp-login.php?action=slack-invitation). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the [NativeScript repository](https://github.com/NativeScript/NativeScript/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
