var master = {
    /* 
        Scripts:
            rssReader
    */
    run: function() {
        rssReader.run();
        classTimer.run();
    }
};

window.addEventListener("load", master.run);