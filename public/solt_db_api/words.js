/**
 * Created by Vi on 12.10.2019.
 */
const writer_reader = require('./writer_reader');
const album = require('./albums');
const tableName = '_words.json';

module.exports = {
    word: (id, albumId, wordNative, wordTranslate, image, status, description, lastDate, statistic) => {
        return {
            id: id,
            albumId: albumId,
            wordNative: wordNative,
            wordTranslate: wordTranslate,
            image: image,
            status: status,
            description: description,
            lastDate: lastDate,
            statistic: statistic
        };
    },

    isExists: (id, albumId) => {
        let fileData = writer_reader.getData(albumId + tableName);
        for(let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === id || fileData[elNum]['wordNative'] === id) {
                return true;
            }
        }
        return false;
    },

    getAllWords: () => {
        return writer_reader.getData(tableName);
    },

    createWord: (albumId, wordNative, wordTranslate, image, status, description, lastDate, statistic) => {

        if(!album.isExists(albumId)) {
            console.log('Can not create Word line. ' +
                'Album does not exists! ' +
                'Please check album with id = ' + albumId);
            return false;
        }

        if(module.exports.isExists(wordNative)) {
            console.log('Can not create Word line. ' +
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
        fileData.push(module.exports.word(id, albumId, wordNative, wordTranslate, image, status, description, lastDate, statistic));
        return writer_reader.setData(albumId + tableName, fileData, function () {
            console.log('Word with id = ' + id + ' was created.');
        });
    },

    deleteWordById: (id, albumId) => {
        let fileData = writer_reader.getData(albumId + tableName);
        let delNum = -1;
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === id) {
                delNum = elNum;
            }
        }
        delete fileData[delNum];
        return writer_reader.setData(albumId + tableName, fileData, function () {
            console.log('Word with id = ' + id + ' was deleted.');
        });
    },

    updateWord: (updatedWord) => {
        let fileData = writer_reader.getData(updatedWord.albumId + tableName);

        if(!album.isExists(updatedWord.id, updatedWord.albumId)) {
            console.log('Can not update Word line. ' +
                'Album does not exists! ' +
                'Please check album with id = ' + updatedWord.albumId);
            return false;
        }

        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === updatedWord.id) {
                fileData[elNum]['albumId'] = updatedWord.albumId;
                fileData[elNum]['wordNative'] = updatedWord.wordNative;
                fileData[elNum]['wordTranslate'] = updatedWord.wordTranslate;
                fileData[elNum]['image'] = updatedWord.image;
                fileData[elNum]['status'] = updatedWord.status;
                fileData[elNum]['description'] = updatedWord.description;
                fileData[elNum]['lastDate'] = updatedWord.lastDate;
                fileData[elNum]['statistic'] = updatedWord.statistic;
            }
        }
        return writer_reader.setData(updatedWord.albumId + tableName, fileData, function () {
            console.log('Word with name = ' + updatedWord.wordNative + ' was updated.');
        });
    }
}