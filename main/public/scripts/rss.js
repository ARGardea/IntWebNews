var rssReader = (function () {
    var targetUrl = 'http://rss.nytimes.com/services/xml/rss/nyt/Arts.xml',
        targetDiv, rssData;

    return {
        addBit: function (bitType, className, addTarget, bitContent) {
            var newSpan = document.createElement(bitType);
            newSpan.setAttribute('class', className);
            newSpan.innerHTML = bitContent;
            addTarget.appendChild(newSpan);
        },
        makeBreak: function (breakTarget) {
            var br = document.createElement('br');
            breakTarget.appendChild(br);
        },
        loadRssData: function (data) {
            rssData = data;
            console.log('Data loaded!');
            if (data.responseData.feed && data.responseData.feed.entries) {

                data.responseData.feed.entries.forEach(function (entry) {
                    var newDiv = document.createElement('div');
                    newDiv.setAttribute('class', 'rssBit');
                    rssReader.addBit('span', 'titleSpan', newDiv, entry.title);
                    rssReader.makeBreak(newDiv);
                    rssReader.addBit('span', 'pubSpan', newDiv, 'Published ' + entry.publishedDate);
                    rssReader.makeBreak(newDiv);
                    rssReader.addBit('span', 'snipSpan', newDiv, entry.contentSnippet);

                    rssReader.makeBreak(newDiv);
                    var anchorBit = document.createElement('a');
                    anchorBit.setAttribute('href', entry.link);
                    anchorBit.innerHTML = 'Read More';
                    newDiv.appendChild(anchorBit);

                    targetDiv.appendChild(newDiv);
                });
            }
        },
        run: function () {
            console.log('RSS script now running!');
            targetDiv = document.getElementById('rss');
            //            $.get(targetUrl, function(data){
            //                rssReader.loadRssData(data);
            //            });
            $.ajax({
                url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(targetUrl),
                dataType: 'jsonp',
                success: function (data) {
                    rssReader.loadRssData(data);
                }
            });
        }
    }
}());