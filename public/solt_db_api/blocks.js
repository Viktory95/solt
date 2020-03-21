/**
 * Created by Vi on 11.10.2019.
 */
const writer_reader = require('./writer_reader');
const log = require('electron-log');
const tableName = 'blocks.json';

module.exports = {
    block: (id, name, timePeriod, isShow, lastDate) => {
        return {
            id: id,
            name: name,
            timePeriod: timePeriod,
            isShow: isShow,
            lastDate: lastDate
        };
    },

    isExists: (id) => {
        let fileData = writer_reader.getData(tableName);
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === id || fileData[elNum]['name'] === id) {
                return true;
            }
        }
        return false;
    },

    getAllBlocks: () => {
        return writer_reader.getData(tableName);
    },

    switchVisibility: (id) => {
        let fileData = writer_reader.getData(tableName);
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === id) {
                module.exports.updateBlock({
                    id: fileData[elNum].id,
                    name: fileData[elNum].name,
                    isShow: fileData[elNum].isShow == 0 ? 1 : 0,
                    timePeriod: fileData[elNum].timePeriod,
                    lastDate: fileData[elNum].lastDate
                });
            }
        }
    },

    getBlocksByTimePeriod: (timePeriod) => {
        let fileData = writer_reader.getData(tableName);
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['timePeriod'] !== timePeriod) {
                delete fileData[elNum];
            }
        }
        return fileData;
    },

    getBlocksByIsShow: (isShow) => {
        let fileData = writer_reader.getData(tableName);
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['isShow'] !== isShow) {
                delete fileData[elNum];
            }
        }
        return fileData;
    },

    getBlocksByTimer: () => {
        let fileData = writer_reader.getData(tableName);
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            let trainDate = new Date(fileData[elNum]['lastDate']);
            trainDate.setDate(trainDate.getDate() + fileData[elNum]['timePeriod']);
            var today = new Date();
            if (trainDate !== today) {
                delete fileData[elNum];
            }
        }
        return fileData;
    },

    createBlock: (name, timePeriod, isShow, lastDate) => {
        if (module.exports.isExists(name)) {
            log.warn('Can not create Block line. ' +
                'Block with name = ' + name + ' already exists.');
            return false;
        }

        let fileData = writer_reader.getData(tableName);

        let id = fileData.length == undefined
        || fileData.length == NaN
        || fileData.length == null
        || fileData.length == 0
            ? 0
            : fileData[fileData.length - 1].id + 1;
        fileData.push(module.exports.block(id, name, timePeriod, isShow, lastDate));
        return writer_reader.setData(tableName, fileData, function () {
            log.info('Block with id = ' + id + ' was created.');
        });
    },

    deleteBlockById: (id) => {
        let fileData = writer_reader.getData(tableName);
        let newFileData = [];
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] !== id) {
                newFileData.push(fileData[elNum]);
            }
        }
        return writer_reader.setData(tableName, newFileData, function () {
            log.info('Block with id = ' + id + ' was deleted.');
        });
    },

    deleteBlockByName: (name) => {
        let fileData = writer_reader.getData(tableName);
        let newFileData = [];
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['name'] !== name) {
                newFileData.push(fileData[elNum]);
            }
        }
        return writer_reader.setData(tableName, newFileData, function () {
            log.info('Block with name = ' + name + ' was deleted.');
        });
    },

    updateBlock: (updatedBlock) => {
        let fileData = writer_reader.getData(tableName);
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === updatedBlock.id) {
                fileData[elNum]['name'] = updatedBlock.name;
                fileData[elNum]['timePeriod'] = updatedBlock.timePeriod;
                fileData[elNum]['isShow'] = updatedBlock.isShow;
                fileData[elNum]['lastDate'] = updatedBlock.lastDate;
            }
        }
        return writer_reader.setData(tableName, fileData, function () {
            log.info('Block with id = ' + updatedBlock.id + ' was updated.');
        });
    }
}