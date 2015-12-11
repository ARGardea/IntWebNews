var rssReader = (function () {
    var targetUrl = 'http://rss.nytimes.com/services/xml/rss/nyt/Arts.xml',
        targetDiv, rssData;

    return {
        loadRssData: function (data) {
            rssData = data;
            console.log('Data loaded!');
            console.log(data);
        },
        run: function () {
            console.log('RSS script now running!');
            targetDiv = document.getElementById('rss');
            $.get(targetUrl, function(data){
                rssReader.loadRssData(data);
            });
        }
    }
}());