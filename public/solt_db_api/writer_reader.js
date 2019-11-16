/**
 * Created by Vi on 12.10.2019.
 */
const fs = require('fs');
const path = require('path');

module.exports = {
    getData : (tableName) => {
        let fileData = null;
        if (fs.existsSync(path.resolve('./solt_db/' + tableName))) {
            fileData = fs.readFileSync(path.resolve('./solt_db/' + tableName), 'utf8', (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return err;
                }
                return jsonString;
            });
        }
        else {
            fs.writeFileSync(path.resolve('./solt_db/' + tableName), '[]', 'utf8', function () {
                console.log('File with name ' + tableName + ' was created.');
            });
            fileData = '[]';
        }
        return JSON.parse(fileData);
    },

    setData : (tableName, fileData, callback) => {
        fs.writeFileSync(path.resolve('./solt_db/'+tableName), JSON.stringify(fileData), 'utf8', function () {
            console.log('Saved.')
        });
        callback();
        return true;
    }
}