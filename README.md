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

## developer's installation:

1. git clone git@github.com:simon387/daocstarter.git
2. npm i

## developer's debug start:

1. npm start

## windows packaging single portable executable

1. electron-packager . daocstarter --platform win32 --arch x64 --out dist --icon=img\i.ico --overwrite
2. TODO: usa autoit

## windows installer

1. electron-packager . daocstarter --platform win32 --arch x64 --out dist --icon=img\i.ico --overwrite
2. electron-installer-windows --src dist/daocstarter-win32-x64 --dest dist/installers
