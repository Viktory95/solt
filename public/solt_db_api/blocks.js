/**
 * Created by Vi on 11.10.2019.
 */
const writer_reader = require('./writer_reader');
const tableName = 'solt_db/blocks.json';

let block = function (id, name, timePeriod, isShow) {
    this.id = id;
    this.name = name;
    this.timePeriod = timePeriod;
    this.isShow = isShow;
}

function createBlock(name, timePeriod, isShow) {
    let fileData = writer_reader.getData(tableName);
    let id = fileData.length == undefined || fileData.length == NaN || fileData.length == null ? 0 : fileData[fileData.length].id + 1;
    fileData.table.push(new block(id, name, timePeriod, isShow));
    return writer_reader.setData(tableName, fileData, function () {
        console.log('Block with id = ' + id + ' was created.');
    });
}

function deleteBlockById(id) {
    let fileData = writer_reader.getData(tableName);
    let delNum = -1;
    for(let elNum = 0; elNum < fileData.length; elNum++) {
        if (json[elNum]['id'].toString() === id) {
            delNum = elNum;
        }
    }
    delete fileData[delNum];
    return writer_reader.setData(tableName, fileData, function () {
        console.log('Block with id = ' + id + ' was deleted.');
    });
}

function deleteBlockByName(name) {
    let fileData = writer_reader.getData(tableName);
    let delNum = -1;
    for(let elNum = 0; elNum < fileData.length; elNum++) {
        if (json[elNum]['name'].toString() === name) {
            delNum = elNum;
        }
    }
    delete fileData[delNum];
    return writer_reader.setData(tableName, fileData, function () {
        console.log('Block with name = ' + name + ' was deleted.');
    });
}

function updateBlock(updatedBlock) {
    let fileData = writer_reader.getData(tableName);
    for(let elNum = 0; elNum < fileData.length; elNum++) {
        if (json[elNum]['id'].toString() === updatedBlock.id) {
            json[elNum]['name'] = updatedBlock.name;
            json[elNum]['timePeriod'] = updatedBlock.timePeriod;
            json[elNum]['isShow'] = updatedBlock.isShow;
        }
    }
    return writer_reader.setData(tableName, fileData, function () {
        console.log('Block with id = ' + updatedBlock.id + ' was updated.');
    });
}

