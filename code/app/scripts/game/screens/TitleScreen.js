define(['game/AssetLoader'], 
        function(AssetLoader) {

    var TitleScreen,
        instance;

    var TitleScreen = function () {
        instance = this;

        back = new Container();
        ground = new Container();

        instance.init = function () {
            BMD = AssetLoader.assetloader.getResult("ScreenTitle").src;

            g = new Graphics();
            g.beginFill(Graphics.getRGB(0, 0, 0));
            g.drawRect(0, 0, 1000, 500);
            s = new Shape(g);
            instance.addChild(s);

            screen = new Bitmap(BMD);
            instance.addChild(screen);
        }

        instance.init();
    }

    TitleScreen.prototype = new Container();

    return TitleScreen;
});
