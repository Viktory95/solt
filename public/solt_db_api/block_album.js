/**
 * Created by Vi on 12.10.2019.
 */
const writer_reader = require('./writer_reader');
const block = require('./blocks');
const album = require('./albums');
const log = require('electron-log');
const tableName = 'block_album.json';

module.exports = {
    blockAlbum: (id, albumId, blockId) => {
        return {
            id: id,
            albumId: albumId,
            blockId: blockId
        };
    },

    isExists: (albumId, blockId) => {
        let fileData = writer_reader.getData(tableName);
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['albumId'] === albumId && fileData[elNum]['blockId'] === blockId) {
                return true;
            }
        }
        return false;
    },

    getAllBlockAlbums: () => {
        return writer_reader.getData(tableName);
    },

    createBlockAlbum: (albumId, blockId) => {

        if (!block.isExists(blockId) || !album.isExists(albumId)) {
            log.warn('Can not create BlockAlbum line. ' +
                'Block or album does not exists! ' +
                'Please check block with id = ' + blockId + ' and album with id = ' + albumId);
            return false;
        }

        if (module.exports.isExists(albumId, blockId)) {
            log.warn('Can not create BlockAlbum line. ' +
                'BlockAlbum with albumId = ' + albumId + ' and blockId = ' + blockId + ' already exists.');
            return false;
        }

        let fileData = writer_reader.getData(tableName);

        let id = fileData.length == undefined
        || fileData.length == NaN
        || fileData.length == null
        || fileData.length == 0
            ? 0
            : fileData[fileData.length - 1].id + 1;
        fileData.push(module.exports.blockAlbum(id, albumId, blockId));
        return writer_reader.setData(tableName, fileData, function () {
            log.info('BlockAlbum with id = ' + id + ' was created.');
        });
    },

    deleteBlockAlbumById: (albumId, blockId) => {
        let fileData = writer_reader.getData(tableName);
        let newFileData = [];
        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['albumId'] !== albumId
                || fileData[elNum]['blockId'] !== blockId) {
                newFileData.push(fileData[elNum]);
            }
        }
        return writer_reader.setData(tableName, newFileData, function () {
            log.info('BlockAlbum with id = ' + blockId + ' was deleted.');
        });
    },

    updateBlockAlbum: (updatedBlockAlbum) => {
        let fileData = writer_reader.getData(tableName);

        if (!block.isExists(updatedBlockAlbum.blockId) || !album.isExists(updatedBlockAlbum.albumId)) {
            log.warn('Can not update BlockAlbum line. ' +
                'Block or album does not exists! ' +
                'Please check block with id = ' + updatedBlockAlbum.blockId + ' and album with id = ' + updatedBlockAlbum.albumId);
            return false;
        }

        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['id'] === updatedBlockAlbum.id) {
                fileData[elNum]['albumId'] = updatedBlockAlbum.albumId;
                fileData[elNum]['blockId'] = updatedBlockAlbum.blockId;
            }
        }

        return writer_reader.setData(tableName, fileData, function () {
            log.info('BlockAlbum with name = ' + updatedBlockAlbum.id + ' was updated.');
        });
    },

    getBlockAlbumByAlbumId: (albumId) => {
        let fileData = writer_reader.getData(tableName);
        let blocksAlbum = [];

        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['albumId'] === albumId) {
                blocksAlbum.push(fileData[elNum]);
            }
        }
        return blocksAlbum;
    },

    getBlockAlbumByBlockId: (blockId) => {
        let fileData = writer_reader.getData(tableName);
        let blocksAlbum = [];

        for (let elNum = 0; elNum < fileData.length; elNum++) {
            if (fileData[elNum]['blockId'] === blockId) {
                blocksAlbum.push(fileData[elNum]);
            }
        }
        return blocksAlbum;
    }
}