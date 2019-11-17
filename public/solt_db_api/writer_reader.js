/**
 * Created by Vi on 12.10.2019.
 */
const fs = require('fs');
const path = require('path');
const log = require('electron-log');

module.exports = {
    getData : (tableName) => {
        let fileData = null;
        if (fs.existsSync(path.resolve('./solt_db/' + tableName))) {
            fileData = fs.readFileSync(path.resolve('./solt_db/' + tableName), 'utf8', (err, jsonString) => {
                if (err) {
                    log.error("File read failed:", err);
                    return err;
                }
                return jsonString;
            });
        }
        else {
            fs.writeFileSync(path.resolve('./solt_db/' + tableName), '[]', 'utf8', function () {
                log.info('File with name ' + tableName + ' was created.');
            });
            fileData = '[]';
        }
        return JSON.parse(fileData);
    },

    setData : (tableName, fileData, callback) => {
        fs.writeFileSync(path.resolve('./solt_db/'+tableName), JSON.stringify(fileData), 'utf8', function () {
            log.info('Data in db were saved.');
        });
        callback();
        return true;
    }
}