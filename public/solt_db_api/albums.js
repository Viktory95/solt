/**
 * Created by Vi on 12.10.2019.
 */
const writer_reader = require('./writer_reader');
const language = require('./languages');
const log = require('electron-log');
const tableName = 'albums.json';

module.exports = {
    album: (id, name, languageNative, languageTranslate) => {
        return {
            id: id,
            name: name,
            languageNative: languageNative,
            languageTranslate: languageTranslate
        };
    },

    isExists: (id) => {
        let fileData = writer_reader.getData(tableName);
        for(let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === id || fileData[elNum]['name'] === id) {
                return true;
            }
        }
        return false;
    },

    getAllAlbums: () => {
        return writer_reader.getData(tableName);
    },

    getAlbumsByLanguageNative: (languageNative) => {
        let fileData = writer_reader.getData(tableName);
        for(let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['languageNative'] !== languageNative) {
                delete fileData[elNum];
            }
        }
        return fileData;
    },

    getAlbumsByLanguageTranslate: (languageTranslate) => {
        let fileData = writer_reader.getData(tableName);
        for(let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['languageTranslate'] !== languageTranslate) {
                delete fileData[elNum];
            }
        }
        return fileData;
    },

    createAlbum: (name, languageNative, languageTranslate) => {

        if(!language.isExists(languageNative) || !language.isExists(languageTranslate)) {
            log.warn('Can not create Album line. ' +
                'Language does not exists! ' +
                'Please check language with id = ' + languageNative + ' and with id = ' + languageTranslate);
            return false;
        }

        if(module.exports.isExists(name)) {
            log.warn('Can not create Album line. ' +
                'Album with name = ' + name + ' already exists.');
            return false;
        }

        let fileData = writer_reader.getData(tableName);

        let id = fileData.length == undefined
            || fileData.length == NaN
            || fileData.length == null
            || fileData.length == 0
            ? 0
            : fileData[fileData.length - 1].id + 1;
        fileData.push(module.exports.album(id, name, languageNative, languageTranslate));
        return writer_reader.setData(tableName, fileData, function () {
            log.info('Album with id = ' + id + ' was created.');
        });
    },

    deleteAlbumById: (id) => {
        let fileData = writer_reader.getData(tableName);
        let delNum = -1;
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === id) {
                delNum = elNum;
            }
        }
        delete fileData[delNum];
        return writer_reader.setData(tableName, fileData, function () {
            log.info('Album with id = ' + id + ' was deleted.');
        });
    },

    deleteAlbumByName: (name) => {
        let fileData = writer_reader.getData(tableName);
        let delNum = -1;
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['name'] === name) {
                delNum = elNum;
            }
        }
        delete fileData[delNum];
        return writer_reader.setBlocks(tableName, fileData, function () {
            log.info('Album with name = ' + name + ' was deleted.');
        });
    },

    updateAlbum: (updatedAlbum) => {
        let fileData = writer_reader.getData(tableName);

        if(!language.isExists(updatedAlbum.languageNative) || !language.isExists(updatedAlbum.languageTranslate)) {
            log.warn('Can not update Album line. ' +
                'Language does not exists! ' +
                'Please check language with id = ' + updatedAlbum.languageNative + ' and with id = ' + updatedAlbum.languageTranslate);
            return false;
        }

        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === updatedAlbum.id) {
                fileData[elNum]['name'] = updatedAlbum.name;
                fileData[elNum]['languageNative'] = updatedAlbum.languageNative;
                fileData[elNum]['languageTranslate'] = updatedAlbum.languageTranslate;
            }
        }
        return writer_reader.setData(tableName, fileData, function () {
            log.info('Block with id = ' + updatedAlbum.id + ' was updated.');
        });
    }
}