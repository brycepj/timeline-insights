var Insights = (function (_) {

    function Insights(data, settings) {
        this.s = settings;
        this.d = _.sortBy(data, function (tweet) {
            return tweet.created_at;
        });
    }

    return Insights;

})(_);

