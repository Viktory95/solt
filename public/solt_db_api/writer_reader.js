/**
 * Created by Vi on 12.10.2019.
 */
const fs = require('fs');
const path = require('path');

module.exports = {
    getData : (tableName) => {
        let fileData = fs.readFileSync(path.resolve('./solt_db/'+tableName), 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            return jsonString;
        });
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