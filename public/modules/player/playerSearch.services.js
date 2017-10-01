(function() {
    "use strict";

    class YoutubeSearch {
        constructor (configService, $http) {
            Object.assign(this, { configService, $http});

            this.config = this.configService.getConfig();
        }

        search (query) {
            const url = `https://www.googleapis.com/youtube/v3/search?key=${this.config.youtubeKey}&part=snippet&maxResults=5&q=${query}`;

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
