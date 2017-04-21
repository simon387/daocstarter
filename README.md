# DAoC Starter

A Dark Age of Camelot client starter <http://darkageofcamelot.com>  
100% HTML+CSS+JS platform independent Desktop application.

![alt tag](http://www.simonecelia.it/github/img/screen.png)

## main features

+ advanced characters, accounts, and settings management
+ allow to log any number of accounts on the same machine
+ quickest login/logout system
+ autoupdate system

## quick infos

+ On Windows, when you need to log in more then 2 DAoC's accounts, you need to run the daocstarter.exe as admin
+ The exe is portable, but the first time you run it you need to wait a bit because it transfers a lot of applications file in your user data settings
+ The exe is big because there a lot of files: this is duo to Electron nature, there is an entire browser there! (plus lot of node's  modules)
+ After the first "installation", the software is very fast! thanks to javascript!
+ All data and passwords are stored in your user data settings

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
+ AutoIt, just for the Windows portable executable <https://www.autoitscript.com/site/autoit/>
+ opn <https://github.com/sindresorhus/opn>
+ compare-versions <https://github.com/omichelsen/compare-versions>
+ moment <https://github.com/moment/moment>
+ ps-node <https://github.com/neekey/ps>
+ node-powershell <https://github.com/rannn505/node-powershell>
+ and more!...

## developer's installation:

1. git clone git@github.com:simon387/daocstarter.git
2. npm i

## developer's debug start:

1. npm start

## creating windows single portable executable (from a Windows machine)

1. install AutoIt or just get the Aut2exe.exe program
2. edit autoit-compiler.js (adjust paths if differents)
3. node .\autoit-compiler.js

## creating windows installer (not tested!)

1. npm install electron-packager -g
2. npm install electron-installer-windows -g
3. if not in a Windows environment, install Wine!
4. electron-packager . daocstarter --platform win32 --arch x64 --out dist --icon=img\i.ico --overwrite
5. electron-installer-windows --src dist/daocstarter-win32-x64 --dest dist/installers

## more dev details

+ source code of titlerenamer.exe is inside autoit-compiler.js
