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
            let daysCount = 0;
            switch (fileData[elNum]['isShow']){
                case '1d': daysCount = 1; break;
                case '2d': daysCount = 2; break;
                case '3d': daysCount = 3; break;
                case '4d': daysCount = 4; break;
                case '5d': daysCount = 5; break;
                case '6d': daysCount = 6; break;
                case '1w': daysCount = 7; break;
                case '2w': daysCount = 14; break;
                case '3w': daysCount = 21; break;
                case '1m': daysCount = 30; break;
                case '2m': daysCount = 60; break;
                case '3m': daysCount = 90; break;
                case '4m': daysCount = 120; break;
                case '5m': daysCount = 150; break;
                case '6m': daysCount = 180; break;
                case '7m': daysCount = 210; break;
                case '8m': daysCount = 240; break;
                case '9m': daysCount = 270; break;
                case '10m': daysCount = 300; break;
                case '11m': daysCount = 330; break;
                case '1y': daysCount = 365; break;
            }
            let trainDate = new Date(fileData[elNum]['lastDate']);
            trainDate.setDate(trainDate.getDate() + daysCount);
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