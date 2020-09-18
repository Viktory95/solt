/**
 * Created by Vi on 05.10.2019.
 */
const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const {
    ADD_BLOCK,
    UPDATE_BLOCK,
    DELETE_BLOCK,
    GET_BLOCK_BY_ID,
    ADD_ALBUM,
    UPDATE_ALBUM,
    DELETE_ALBUM,
    GET_BLOCK_ALBUM_BY_ALBUM_ID,
    DELETE_ALBUM_FROM_BLOCK,
    ADD_WORD,
    ADD_ALBUM_TO_BLOCK,
    GET_ALL_ALBUMS,
    GET_ALL_LANGUAGES,
    GET_ALL_BLOCKS,
    GET_SETTINGS,
    SET_SETTINGS,
    GET_BLOCK_IS_SHOW,
    SWITCH_VISIBILITY,
    GET_ALL_WORDS,
    GET_WORDS_BY_ALBUM_ID
} = require('../utils/constants');

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
// const test_api = require('./solt_db_api/solt_db_api_test/solt_db_api_test');

const block = require('./solt_db_api/blocks');
const album = require('./solt_db_api/albums');
const word = require('./solt_db_api/words');
const language = require('./solt_db_api/languages');
const block_album = require('./solt_db_api/block_album');
const settings = require('./solt_db_api/app_settings');

let mainWindow;
let imageWindow;
let settingsWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {webSecurity: false, nodeIntegration: true}
    });
    imageWindow = new BrowserWindow({width: 600, height: 600, parent: mainWindow, show: false});
    settingsWindow = new BrowserWindow({width: 600, height: 600, parent: mainWindow, show: false});

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    imageWindow.loadURL(isDev ? 'http://localhost:3000/image' : `file://${path.join(__dirname, '../build/index.html')}`);
    settingsWindow.loadURL(isDev ? 'http://localhost:3000/settings' : `file://${path.join(__dirname, '../build/index.html')}`);

    /*Test api*/
    //test_api.create_test();

    mainWindow.on('closed', () => mainWindow = null);

    mainWindow.webContents.openDevTools();

    imageWindow.on('close', (e) => {
        e.preventDefault();
        imageWindow.hide();
    });

    settingsWindow.on('close', (e) => {
        e.preventDefault();
        settingsWindow.hide();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('toggle-image', (event, arg) => {
    imageWindow.show();
    imageWindow.webContents.send('image', arg);
});


ipcMain.on('toggle-settings', () => {
    settingsWindow.isVisible() ? settingsWindow.hide() : settingsWindow.show();
});

/*BLOCK*/
ipcMain.on(ADD_BLOCK, (event, arg) => {
    block.createBlock(arg.name, arg.timePeriod, arg.isShow, null);
});

ipcMain.on(UPDATE_BLOCK, (event, arg) => {
    block.updateBlock({id: arg.id, name: arg.name, timePeriod: arg.timePeriod, isShow: arg.isShow});
});

ipcMain.on(DELETE_BLOCK, (event, arg) => {
    block.deleteBlockById(arg.id);
});

ipcMain.on(GET_BLOCK_BY_ID, (event, arg) => {
    event.returnValue = block.getBlockById(arg.id);
});

ipcMain.on(SWITCH_VISIBILITY, (event, arg) => {
    block.switchVisibility(arg.id);
});

ipcMain.on(GET_BLOCK_IS_SHOW, (event) => {
    event.returnValue = block.getBlocksByIsShow(1);
});

ipcMain.on(GET_ALL_BLOCKS, (event) => {
    event.returnValue = block.getAllBlocks();
});

/*ALBUM*/
ipcMain.on(ADD_ALBUM, (event, arg) => {
    album.createAlbum(arg.name, arg.languageNativeId, arg.languageTranslateId);
});

ipcMain.on(UPDATE_ALBUM, (event, arg) => {
    album.updateAlbum({id: arg.id, name: arg.name, languageNative: arg.languageNativeId, languageTranslate: arg.languageTranslateId});
});

ipcMain.on(DELETE_ALBUM, (event, arg) => {
    album.deleteAlbumById(arg.id);
});

ipcMain.on(GET_BLOCK_ALBUM_BY_ALBUM_ID, (event, arg) => {
    event.returnValue = block_album.getBlockAlbumByAlbumId(arg.albumId);
});

ipcMain.on(GET_ALL_ALBUMS, (event) => {
    event.returnValue = album.getAllAlbums();
});

ipcMain.on(ADD_ALBUM_TO_BLOCK, (event, arg) => {
    block_album.createBlockAlbum(arg.albumId, arg.blockId);
});

ipcMain.on(DELETE_ALBUM_FROM_BLOCK, (event, arg) => {
    block_album.deleteBlockAlbumById(arg.albumId, arg.blockId);
});

/*WORD*/
ipcMain.on(ADD_WORD, (event, arg) => {
    word.createWord(arg.albumId, arg.wordNative, arg.wordTranslate, arg.image, null, arg.description, null, null);
});

ipcMain.on(GET_ALL_WORDS, (event) => {
    event.returnValue = word.getAllWords();
});

ipcMain.on(GET_WORDS_BY_ALBUM_ID, (event, arg) => {
    event.returnValue = word.getWordsByAlbumId(arg.albumId);
});

/*SETTINGS*/

ipcMain.on(SET_SETTINGS, (event, arg) => {
    settings.setAppSettings(arg.username, arg.userLanguage);
});

ipcMain.on(GET_ALL_LANGUAGES, (event) => {
    event.returnValue = language.getAllLanguages();
});

ipcMain.on(GET_SETTINGS, (event) => {
    event.returnValue = settings.getAppSettings();
});

