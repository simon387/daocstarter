# DAoC Starter - STILL WORK IN PROGRESS!!!

A Dark Age of Camelot client starter <http://darkageofcamelot.com>  
100% HTML+CSS+JS platform independent Desktop application.

## based on:

+ NodeJS <https://github.com/nodejs/node>
+ Electron <https://github.com/electron/electron>
+ Express <https://github.com/expressjs/express>
+ Datatables.net <https://datatables.net>
+ jQuery <https://github.com/jquery/jquery>
+ NeDB (as mongodb) <https://github.com/louischatriot/nedb>
+ Bootstrap <https://github.com/twbs/bootstrap>
+ Scrollreveal <https://github.com/jlmakes/scrollreveal>
+ Start Bootstrap - Creative v3.3.7+1 <http://startbootstrap.com/template-overviews/creative>
+ Font-Awesome <https://github.com/FortAwesome/Font-Awesome>
+ Magnific Popup - v1.1.0 - 2016-02-20 <http://dimsemenov.com/plugins/magnific-popup/>
+ Handle v4.1 <https://technet.microsoft.com/en-us/sysinternals/handle.aspx>
+ npm/ini 1.3.4 <https://github.com/npm/ini>
+ node-archiver <https://github.com/archiverjs/node-archiver>
+ portfinder <https://github.com/indexzero/node-portfinder>
+ AutoIt, just for the Windows portable executable <https://www.autoitscript.com/site/autoit/>
+ opn <https://github.com/sindresorhus/opn>
+ compare-versions <https://github.com/omichelsen/compare-versions>
+ moment <https://github.com/moment/moment>

## developer's installation:

1. git clone git@github.com:simon387/daocstarter.git
2. npm i

## developer's debug start:

1. npm start

## creating windows single portable executable (from a Windows machine)

1. electron-packager . daocstarter --platform win32 --arch x64 --out dist --icon=img\i.ico --overwrite
2. install AutoIt or just get the Aut2exe.exe program
3. edit autoit-compiler.js (adjust paths if differents)
4. node .\autoit-compiler.js (take a look to daocstarter.au3 for more details)

## creating windows installer

1. npm install electron-packager -g
2. if not in a Windows environment, install Wine!
3. electron-packager . daocstarter --platform win32 --arch x64 --out dist --icon=img\i.ico --overwrite
4. electron-installer-windows --src dist/daocstarter-win32-x64 --dest dist/installers

