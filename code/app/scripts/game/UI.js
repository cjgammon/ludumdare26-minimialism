define(['game/AssetLoader'], 
        function(AssetLoader) {

    var UI,
        instance;

    var UI = function () {
        var instance = this,
            counter,
            score,
            points,
            time;

        instance.trackingScore = true;

        function padTime(num) {
            var string = "";

            if (num < 10) {
                string = "000" + num;
            } else if (num < 100) {
                string = "00" + num;
            } else if (num < 1000) {
                string = "0" + num;
            }

            return string;
        }

        instance.init = function () {
            counter = 0;
            score = 0;

            timeLabel = new Text('TIME', '16px commodore', '#d6c768');
            timeLabel.x = 400;
            timeLabel.y = 10;
            instance.addChild(timeLabel);

            time = new Text('0000', '16px commodore', '#d6c768');
            time.x = 400;
            time.y = 30;
            instance.addChild(time);

            points = new Text('0', '16px commodore', 'white');
            points.textAlign = "right";
            points.x = 700;
            points.y = 10;
            instance.addChild(points);

            setInterval(instance.update, 1000);
        }

        instance.update = function () {
            counter += 1;
            time.text = padTime(counter);

            if (instance.trackingScore && counter % 5 === 0) {
                score += Math.round(Math.random() * 30);
                points.text = score + '0';
            }
        }

        instance.init();
    }

    UI.prototype = new Container();

    return UI;
});
