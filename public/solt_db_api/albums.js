/**
 * Created by Vi on 12.10.2019.
 */
const writer_reader = require('./writer_reader');
const tableName = 'solt_db/albums.json';

let album = function (id, name, languageNative, languageTranslate) {
    this.id = id;
    this.name = name;
    this.languageNative = languageNative;
    this.languageTranslate = languageTranslate;
}

function createAlbum(name, languageNative, languageTranslate) {
    let fileData = writer_reader.getData(tableName);
    let id = fileData.length == undefined || fileData.length == NaN || fileData.length == null ? 0 : fileData[fileData.length].id + 1;
    fileData.table.push(new album(id, name, languageNative, languageTranslate));
    return writer_reader.setData(tableName, fileData, function () {
        console.log('Album with id = ' + id + ' was created.');
    });
}

function deleteAlbumById(id) {
    let fileData = writer_reader.getData(tableName);
    let delNum = -1;
    for(let elNum = 0; elNum < fileData.length; elNum++) {
        if (json[elNum]['id'].toString() === id) {
            delNum = elNum;
        }
    }
    delete fileData[delNum];
    return writer_reader.setData(tableName, fileData, function () {
        console.log('Album with id = ' + id + ' was deleted.');
    });
}

function deleteAlbumByName(name) {
    let fileData = writer_reader.getData(tableName);
    let delNum = -1;
    for(let elNum = 0; elNum < fileData.length; elNum++) {
        if (json[elNum]['name'].toString() === name) {
            delNum = elNum;
        }
    }
    delete fileData[delNum];
    return writer_reader.setBlocks(tableName, fileData, function () {
        console.log('Album with name = ' + name + ' was deleted.');
    });
}

function updateAlbum(updatedAlbum) {
    let fileData = writer_reader.getData(tableName);
    for(let elNum = 0; elNum < fileData.length; elNum++) {
        if (json[elNum]['id'].toString() === updatedAlbum.id) {
            json[elNum]['name'] = updatedAlbum.name;
            json[elNum]['languageNative'] = updatedAlbum.languageNative;
            json[elNum]['languageTranslate'] = updatedAlbum.languageTranslate;
        }
    }
    return writer_reader.setData(tableName, fileData, function () {
        console.log('Block with id = ' + updatedAlbum.id + ' was updated.');
    });
}

