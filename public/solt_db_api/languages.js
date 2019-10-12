/**
 * Created by Vi on 12.10.2019.
 */
const writer_reader = require('./writer_reader');
const tableName = 'languages.json';

module.exports = {
    language: (id, name) => {
        return {
            id: id,
            name: name
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

    getAllLanguages: () => {
        return writer_reader.getData(tableName);
    },

    createLanguage: (name) => {

        if(module.exports.isExists(name)) {
            console.log('Can not create Language line. ' +
                'Language with name = ' + name + ' already exists.');
            return false;
        }

        let fileData = writer_reader.getData(tableName);

        let id = fileData.length == undefined
            || fileData.length == NaN
            || fileData.length == null
            || fileData.length == 0
            ? 0
            : fileData[fileData.length - 1].id + 1;
        fileData.push(module.exports.language(id, name));
        return writer_reader.setData(tableName, fileData, function () {
            console.log('Language with id = ' + id + ' was created.');
        });
    },

    deleteLanguageById: (id) => {
        let fileData = writer_reader.getData(tableName);
        let delNum = -1;
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === id) {
                delNum = elNum;
            }
        }
        delete fileData[delNum];
        return writer_reader.setData(tableName, fileData, function () {
            console.log('Language with id = ' + id + ' was deleted.');
        });
    },

    updateLanguage: (updatedLanguage) => {
        let fileData = writer_reader.getData(tableName);
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === updatedLanguage.id) {
                fileData[elNum]['name'] = updatedLanguage.name;
            }
        }
        return writer_reader.setData(tableName, fileData, function () {
            console.log('Language with name = ' + updatedLanguage.name + ' was updated.');
        });
    }
}