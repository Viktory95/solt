/**
 * Created by Vi on 12.10.2019.
 */
const writer_reader = require('./writer_reader');
const album = require('./albums');
const log = require('electron-log');
const tableName = '_words.json';

module.exports = {
    word: (id, albumId, wordNative, wordTranslate, image, status, description, lastDate, statistic, goodAttempts, badAttempts) => {
        return {
            id: id,
            albumId: albumId,
            wordNative: wordNative,
            wordTranslate: wordTranslate,
            image: image,
            status: status,
            description: description,
            lastDate: lastDate,
            statistic: statistic,
            goodAttempts: goodAttempts,
            badAttempts: badAttempts
        };
    },

    isExists: (id, albumId) => {
        let fileData = writer_reader.getData(albumId + tableName);
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === id || fileData[elNum]['wordNative'] === id) {
                return true;
            }
        }
        return false;
    },

    getAllWords: () => {
        return writer_reader.getData(tableName);
    },

    getWordsByAlbumId: (albumId) => {
        return writer_reader.getData(albumId + tableName);
    },

    createWord: (albumId, wordNative, wordTranslate, image, status, description, lastDate, statistic) => {

        if (!album.isExists(albumId)) {
            log.warn('Can not create Word line. ' +
                'Album does not exists! ' +
                'Please check album with id = ' + albumId);
            return false;
        }

        if (module.exports.isExists(wordNative)) {
            log.warn('Can not create Word line. ' +
                'Word with wordNative = ' + wordNative + ' already exists.');
            return false;
        }

        let fileData = writer_reader.getData(albumId + tableName);

        let id = fileData.length == undefined
        || fileData.length == NaN
        || fileData.length == null
        || fileData.length == 0
            ? 0
            : fileData[fileData.length - 1].id + 1;
        fileData.push(module.exports.word(id, albumId, wordNative, wordTranslate, image, status, description, lastDate, statistic, 0, 0));
        return writer_reader.setData(albumId + tableName, fileData, function () {
            log.info('Word with id = ' + id + ' was created.');
        });
    },

    deleteWordById: (id, albumId) => {
        let fileData = writer_reader.getData(albumId + tableName);
        let newFileData = [];
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] !== id) {
                newFileData.push(fileData[elNum]);
            }
        }
        return writer_reader.setData(albumId + tableName, newFileData, function () {
            log.info('Word with id = ' + id + ' was deleted.');
        });
    },

    updateWord: (updatedWord) => {
        let fileData = writer_reader.getData(updatedWord.albumId + tableName);

        if (!album.isExists(updatedWord.id, updatedWord.albumId)) {
            log.warn('Can not update Word line. ' +
                'Album does not exists! ' +
                'Please check album with id = ' + updatedWord.albumId);
            return false;
        }

        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === updatedWord.id) {
                if (updatedWord.albumId != null) fileData[elNum]['albumId'] = updatedWord.albumId;
                if (updatedWord.wordNative != null) fileData[elNum]['wordNative'] = updatedWord.wordNative;
                if (updatedWord.wordTranslate != null) fileData[elNum]['wordTranslate'] = updatedWord.wordTranslate;
                if (updatedWord.image != null) fileData[elNum]['image'] = updatedWord.image;
                if (updatedWord.status != null) fileData[elNum]['status'] = updatedWord.status;
                if (updatedWord.description != null) fileData[elNum]['description'] = updatedWord.description;
                if (updatedWord.lastDate != null) fileData[elNum]['lastDate'] = updatedWord.lastDate;
                if (updatedWord.statistic != null) fileData[elNum]['statistic'] = updatedWord.statistic;
            }
        }
        return writer_reader.setData(updatedWord.albumId + tableName, fileData, function () {
            log.info('Word with name = ' + updatedWord.wordNative + ' was updated.');
        });
    },

    updateStatistic: (id, albumId, isSuccessful) => {
        let fileData = writer_reader.getData(albumId + tableName);

        if (!album.isExists(id, albumId)) {
            log.warn('Can not update Word line. ' +
                'Album does not exists! ' +
                'Please check album with id = ' + albumId);
            return false;
        }

        let updatedWord;
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === id) {
                updatedWord = fileData[elNum];
                if (isSuccessful) {
                    if (fileData[elNum]['goodAttempts'] != null) fileData[elNum]['goodAttempts'] = fileData[elNum]['goodAttempts'] + 1;
                } else {
                    if (fileData[elNum]['badAttempts'] != null) fileData[elNum]['badAttempts'] = fileData[elNum]['badAttempts'] + 1;
                }
            }
        }
        return writer_reader.setData(albumId + tableName, fileData, function () {
            log.info('Word with name = ' + updatedWord.wordNative + ' was updated.');
        });
    }
}