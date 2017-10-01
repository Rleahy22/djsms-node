(function() {
    "use strict";

    class YoutubeSearch {
        constructor (configService, $http) {
            Object.assign(this, { configService, $http});
        }

        search (query) {
            let url = 'https://www.googleapis.com/youtube/v3/search?';
            const key = 'key=' + this.configService.youtubeKey;
            const part = '&part=snippet';
            const maxResults = '&maxResults=5';

            query = '&q=' + query;
            url = url + key + part + maxResults + query;

            return this.$http.get(url)
                .then(function(response) {
                    let results = response.data.items.filter((item) => {
                        if (item.id.kind === "youtube#video") {
                            return item;
                        }
                    });

                    return results[0];
                });
        }
    }

    YoutubeSearch.$inject = [ 'configService', '$http'];

    angular.module('app')
    .service('youtubeSearch', YoutubeSearch);
})();
