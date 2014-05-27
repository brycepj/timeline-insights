Insights.prototype.fauxpas = function () {

    var data = this.tweetsWithDates();
    console.log(data);
    function rapidFire() {

        var scrubbed = [];
        var prevMin, prevHour, prevSec;
        var tweetsThisMinute = 1;

        for (var i = 0; i < data.length; i++) {

            var tweet = data[i];

            if (!tweet.in_reply_to_screen_name) {

                var currentHour = tweet.moment._a[3];
                var currentMin = tweet.moment._a[4];
                var currentSec = tweet.moment._a[5];



        }


        return {
            count: scrubbed,
            tweets: [
                {
                    day: 111111,
                    text: 1111
                }
            ]
        };
    }


    return {
        rapidFire: function () {
            return rapidFire();
        },
        pls: function () {
            console.log('run pls');
        }
    };
};