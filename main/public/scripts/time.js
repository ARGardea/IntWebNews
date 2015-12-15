var classTimer = (function () {
    var dayTime;

    return {
        manualMode: false,
        setup: function () {
            dayTime = true;
            this.checkTime();
            setInterval(classTimer.update, 1000);
            document.getElementById('timeTrigger').onclick = this.triggerManual;
            document.getElementById('autoTrigger').onclick = this.triggerAuto;
        },
        checkTime: function () {
            console.log('CHECK TIME');
            var currentHour = new Date().getHours();
            console.log(currentHour);
            if (currentHour >= 5 && currentHour < 17) {
                console.log("It's Day!");
                if (!dayTime) {
                    dayTime = true;
                    this.toggleTime(dayTime);
                }
            } else {
                console.log("It's Night!");
                if (dayTime) {
                    dayTime = false;
                    this.toggleTime(dayTime);
                }
            }
        },
        triggerManual: function () {
            classTimer.manualMode = true;
            classTimer.switchTime();
        },
        switchTime: function () {
            dayTime = !dayTime;
            this.toggleTime(dayTime);
        },
        triggerAuto: function () {
            classTimer.manualMode = false;
        },
        toggleTime: function (isDay) {
            var set = document.getElementsByClassName('timeMe');
            var dayClass = 'day',
                nightClass = 'night',
                addedClass, removedClass;
            if (isDay) {
                addedClass = dayClass;
                removedClass = nightClass;
            } else {
                addedClass = nightClass;
                removedClass = dayClass;
            }
            for (var i = 0; i < set.length; i++) {
                var item = set[i];
                item.classList.add(addedClass);
                item.classList.remove(removedClass);
                //                item.classList.add('HI');
                //                item.classList.remove('timeMe');
            }
            console.log(set);
        },
        update: function () {
            if (!classTimer.manualMode) {
                classTimer.checkTime();
            }
        },
        run: function () {
            classTimer.setup();
        }
    }
}());