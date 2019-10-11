/**
 * Created by Vi on 12.10.2019.
 */
const fs = require('fs');

function getData(tableName) {
    let fileData = fs.readFileSync(tableName, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        return jsonString;
    });
    return JSON.parse(fileData);
}

function setData(tableName, fileData, callback) {
    fs.writeFileSync(tableName, JSON.stringify(fileData), 'utf8', function(){
        console.log('Saved.')
    });
    callback();
    return true;
}