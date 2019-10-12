/**
 * Created by Vi on 11.10.2019.
 */
const writer_reader = require('./writer_reader');
const tableName = 'blocks.json';

module.exports = {
    block : (id, name, timePeriod, isShow) => {
        return {
            id: id,
            name: name,
            timePeriod: timePeriod,
            isShow: isShow
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

    getAllBlocks: () => {
        return writer_reader.getData(tableName);
    },

    createBlock : (name, timePeriod, isShow) => {
        if(module.exports.isExists(name)) {
            console.log('Can not create Block line. ' +
                'Block with name = ' + name + ' already exists.');
            return false;
        }

        let fileData = writer_reader.getData(tableName);

        let id = fileData.length == undefined
            || fileData.length == NaN
            || fileData.length == null
            || fileData.length == 0
            ? 0
            : fileData[fileData.length-1].id + 1;
        fileData.push(module.exports.block(id, name, timePeriod, isShow));
        return writer_reader.setData(tableName, fileData, function () {
            console.log('Block with id = ' + id + ' was created.');
        });
    },

    deleteBlockById : (id) => {
        let fileData = writer_reader.getData(tableName);
        let delNum = -1;
        for(let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === id) {
                delNum = elNum;
            }
        }
        delete fileData[delNum];
        return writer_reader.setData(tableName, fileData, function () {
            console.log('Block with id = ' + id + ' was deleted.');
        });
    },

    deleteBlockByName : (name) => {
        let fileData = writer_reader.getData(tableName);
        let delNum = -1;
        for(let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['name'] === name) {
                delNum = elNum;
            }
        }
        delete fileData[delNum];
        return writer_reader.setData(tableName, fileData, function () {
            console.log('Block with name = ' + name + ' was deleted.');
        });
    },

    updateBlock : (updatedBlock) => {
        let fileData = writer_reader.getData(tableName);
        for(let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === updatedBlock.id) {
                fileData[elNum]['name'] = updatedBlock.name;
                fileData[elNum]['timePeriod'] = updatedBlock.timePeriod;
                fileData[elNum]['isShow'] = updatedBlock.isShow;
            }
        }
        return writer_reader.setData(tableName, fileData, function () {
            console.log('Block with id = ' + updatedBlock.id + ' was updated.');
        });
    }
}