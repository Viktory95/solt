/**
 * Created by Vi on 11.10.2019.
 */
const writer_reader = require('./writer_reader');
const tableName = 'blocks.json';

module.exports = {
    block : (id, name, timePeriod, isShow, lastDate) => {
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

    getBlocksByTimePeriod: (timePeriod) => {
        let fileData = writer_reader.getData(tableName);
        for(let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['timePeriod'] !== timePeriod) {
                delete fileData[elNum];
            }
        }
        return fileData;
    },

    getBlocksByIsShow: (isShow) => {
        let fileData = writer_reader.getData(tableName);
        for(let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['isShow'] !== isShow) {
                delete fileData[elNum];
            }
        }
        return fileData;
    },

    getBlocksByTimer: () => {
        let fileData = writer_reader.getData(tableName);
        for(let elNum = 0; elNum < fileData.length; elNum++) {
            let trainDate = new Date(fileData[elNum]['lastDate']);
            trainDate.setDate(trainDate.getDate() + fileData[elNum]['timePeriod']);
            var today = new Date();
            if(trainDate !== today){
                delete fileData[elNum];
            }
        }
        return fileData;
    },

    createBlock : (name, timePeriod, isShow, lastDate) => {
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
        fileData.push(module.exports.block(id, name, timePeriod, isShow, lastDate));
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
                fileData[elNum]['lastDate'] = updatedBlock.lastDate;
            }
        }
        return writer_reader.setData(tableName, fileData, function () {
            console.log('Block with id = ' + updatedBlock.id + ' was updated.');
        });
    }
}