export default class ItunesSong {
    artistName = null;
    collectionName = null;
    previewURL = null;
    artworkUrl100 = null;

    constructor(resultItem) {
        this.artistName = resultItem.artistName;
        this.collectionName = resultItem.collectionName;
        this.previewURL = resultItem.previewUrl;
        this.artworkUrl100 = resultItem.artworkUrl100;
    }
}

