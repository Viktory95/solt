/**
 * Created by Vi on 29.11.2019.
 */
const writer_reader = require('./writer_reader');
const log = require('electron-log');
const tableName = 'app_settings.json';

module.exports = {
    app_settings: (username, userLanguage) => {
        return {
            username: username,
            userLanguage: userLanguage
        };
    },

    getAppSettings: () => {
        return writer_reader.getData(tableName);
    },

    setAppSettings: (username, userLanguage) => {
        return writer_reader.setData(tableName, module.exports.app_settings(username, userLanguage), function () {
            log.info('App Settings was changed.');
        });
    }
}
