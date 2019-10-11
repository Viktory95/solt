/**
 * Created by Vi on 12.10.2019.
 */
const writer_reader = require('./writer_reader');
const tableName = 'solt_db/words.json';

let word = function (id, albumId, wordNative, wordTranslate, image, status, description, lastDate, statistic) {
    this.id = id;
    this.albumId = albumId;
    this.wordNative = wordNative;
    this.wordTranslate = wordTranslate;
    this.image = image;
    this.status = status;
    this.description = description;
    this.lastDate = lastDate;
    this.statistic = statistic;
}

function createWord(albumId, wordNative, wordTranslate, image, status, description, lastDate, statistic) {
    let fileData = writer_reader.getData(tableName);
    let id = fileData.length == undefined || fileData.length == NaN || fileData.length == null ? 0 : fileData[fileData.length].id + 1;
    fileData.table.push(new word(id, albumId, wordNative, wordTranslate, image, status, description, lastDate, statistic));
    return writer_reader.setData(tableName, fileData, function () {
        console.log('Word with id = ' + id + ' was created.');
    });
}

function deleteWordById(id) {
    let fileData = writer_reader.getData(tableName);
    let delNum = -1;
    for(let elNum = 0; elNum < fileData.length; elNum++) {
        if (json[elNum]['id'].toString() === id) {
            delNum = elNum;
        }
    }
    delete fileData[delNum];
    return writer_reader.setData(tableName, fileData, function () {
        console.log('Word with id = ' + id + ' was deleted.');
    });
}

function updateWord(updatedWord) {
    let fileData = writer_reader.getData(tableName);
    for(let elNum = 0; elNum < fileData.length; elNum++) {
        if (json[elNum]['id'].toString() === updatedWord.id) {
            json[elNum]['name'] = updatedWord.albumId;
            json[elNum]['name'] = updatedWord.wordNative;
            json[elNum]['name'] = updatedWord.wordTranslate;
            json[elNum]['name'] = updatedWord.image;
            json[elNum]['name'] = updatedWord.status;
            json[elNum]['name'] = updatedWord.description;
            json[elNum]['name'] = updatedWord.lastDate;
            json[elNum]['name'] = updatedWord.statistic;
        }
    }
    return writer_reader.setData(tableName, fileData, function () {
        console.log('Word with name = ' + updatedWord.wordNative + ' was updated.');
    });
}

