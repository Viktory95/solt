/**
 * Created by Vi on 12.10.2019.
 */
const block = require('../blocks');
const album = require('../albums');
const block_album = require('../block_album');
const language = require('../languages');
const word = require('../words');

module.exports = {

    create_test: () => {
        block.createBlock('block1', '1w', 'true');
        block.createBlock('block2', '2w', 'false');
        block.createBlock('block2', '2w', 'false');

        language.createLanguage('language1');
        language.createLanguage('language2');
        language.createLanguage('language3');
        language.createLanguage('language1');

        album.createAlbum('album1', 0, 1);
        album.createAlbum('album2', 0, 2);
        album.createAlbum('album2', 1, 2);

        block_album.createBlockAlbum(0, 0);
        block_album.createBlockAlbum(0, 0);

        word.createWord(0, 'word1', 'wordTrs1', '', '', '', '', 5.4);
        word.createWord(1, 'word2', 'wordTrs2', '', '', '', '', 44.7);
        word.createWord(1, 'word2', 'wordTrs2', '', '', '', '', 44.7);
    },

    update_test: () => {
        block.updateBlock(block.block(0, 'block1', '2m', 'true'));

        language.updateLanguage(language.language(0, 'language3'));

        album.updateAlbum(album.album(1, 2, 1));

        block_album.updateBlockAlbum(block_album.blockAlbum(0, 1, 0));

        word.updateWord(word.word(0, 0, 'word1', 'wordTrs1', '', '', '', '', 8.4));
    },

    delete_test: () => {
        block_album.deleteBlockAlbumById(0);

        word.deleteWordById(0);
        word.deleteWordById(1);

        album.deleteAlbumById(0);
        album.deleteAlbumByName('album2');

        block.deleteBlockById(1);
        block.deleteBlockByName('block1');

        language.deleteLanguageById(0);

    }
}