[![gitcheese.com](https://s3.amazonaws.com/gitcheese-ui-master/images/badge.svg)](https://www.gitcheese.com/donate/users/18740246/repos/80989370)

# DAoC Starter

A Dark Age of Camelot client starter <http://darkageofcamelot.com>  
100% HTML+CSS+JS core platform independent Desktop application.  
(Full features on Windows Machines Only)

![alt tag](https://user-images.githubusercontent.com/18740246/28262306-db0478f8-6ae2-11e7-8212-930a8169d112.png)
![alt tag](https://user-images.githubusercontent.com/18740246/28262307-db1cf806-6ae2-11e7-8e11-49e850738aa1.png)
![alt tag](https://user-images.githubusercontent.com/18740246/28262308-db1f0420-6ae2-11e7-9df9-28f5273d9543.png)
![alt tag](https://user-images.githubusercontent.com/18740246/28262309-db20729c-6ae2-11e7-94c9-b1aa310f09fe.png)
![alt tag](https://user-images.githubusercontent.com/18740246/28262310-db27d3b6-6ae2-11e7-890a-eb1b4b9889f7.png)

---

## main features

+ Advanced characters, accounts, teams, and settings management
+ Allow to log any number of accounts on the same machine
+ Quickest login/logout system
+ Autoupdate system
+ Smart Gamma Calibration tool
+ Spellcrafting tool
+ No installation required, full portable executable

---

## quick infos

+ On Windows, when you need to log in more then 2 DAoC's accounts, you need to run the daocstarter.exe as admin
+ The exe is portable, but the first time you run it you need to wait a bit because it transfers a lot of applications files in your user data settings
+ The exe is big because there a lot of files: this is duo to Electron nature, there is an entire browser there! (plus lot of node's  modules)
+ After the first "installation", the software is very fast! thanks to v8 Google Javascript Engine!
+ All data and passwords are stored in your user data settings

---

## based on:

+ NodeJS <https://github.com/nodejs/node>
+ Electron <https://github.com/electron/electron>
+ Express <https://github.com/expressjs/express>
+ Datatables.net <https://datatables.net>
+ jQuery <https://github.com/jquery/jquery>
+ jQueryUI <https://jqueryui.com>
+ NeDB (as mongodb) <https://github.com/louischatriot/nedb>
+ Bootstrap <https://github.com/twbs/bootstrap>
+ Scrollreveal <https://github.com/jlmakes/scrollreveal>
+ Start Bootstrap - Creative v3.3.7+1 <http://startbootstrap.com/template-overviews/creative>
+ Font-Awesome <https://github.com/FortAwesome/Font-Awesome>
+ Magnific Popup - v1.1.0 - 2016-02-20 <http://dimsemenov.com/plugins/magnific-popup/>
+ Handle v4.1 <https://technet.microsoft.com/en-us/sysinternals/handle.aspx>
+ npm/ini <https://github.com/npm/ini>
+ node-archiver <https://github.com/archiverjs/node-archiver>
+ portfinder <https://github.com/indexzero/node-portfinder>
+ AutoIt <https://www.autoitscript.com/site/autoit/>
+ opn <https://github.com/sindresorhus/opn>
+ compare-versions <https://github.com/omichelsen/compare-versions>
+ moment <https://github.com/moment/moment>
+ ps-node <https://github.com/neekey/ps>
+ node-powershell <https://github.com/rannn505/node-powershell>
+ and more!...

---

## developer's installation:

1. git clone git@github.com:simon387/daocstarter.git
2. npm i

---

## developer's debug start:

1. npm start

---

## creating windows single portable executable (from a Windows machine)

**NOTE: if your dev working directory is ```C:\dev\daocstarter\``` you don't need to edit the scripts**

1. install AutoIt or just get the Aut2exe.exe program
2. edit autoit-compiler.js (adjust paths if differents)
3. node borderless.js
4. compile to exe borderless.au3 with Aut2Exe.exe (in the current directory)
5. node CALGamma.js
6. compile to exe CALGamma.au3 with Aut2Exe.exe (in the current directory)
7. node titlerenamer.js
8. compile to exe titlerenamer.au3 with Aut2Exe.exe (in the current directory)
9. node .\autoit\autoit-compiler.js
10. compile to exe daocstarter.au3 (parameters: ```/icon .\img\i.ico /comp 4```)

**NOTE: Steps 1-8 can be done only the first time if you don't edit the autoit code.**

---

## creating windows installer (not tested!)

1. npm install electron-packager -g
2. npm install electron-installer-windows -g
3. if not in a Windows environment, install Wine!
4. electron-packager . daocstarter --platform win32 --arch x64 --out dist --icon=img\i.ico --overwrite
5. electron-installer-windows --src dist/daocstarter-win32-x64 --dest dist/installers

---

## License

[MIT](https://github.com/simon387/daocstarter/blob/master/LICENSE)

When using the Daocstarter or other GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).
