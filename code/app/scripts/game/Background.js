define(['game/AssetLoader'], 
        function(AssetLoader) {

    var Background,
        instance,
        canvas,
        stage;

    var Background = function () {
        instance = this;

        back = new Container();
        ground = new Container();

        instance.init = function () {
            var i,
                g, s,
                BrickBMD = AssetLoader.assetloader.getResult("Bricks").src;
                DarkBrickBMD = AssetLoader.assetloader.getResult("DarkBricks").src;
                GroundTileBMD = AssetLoader.assetloader.getResult("GroundTile").src;
                WindowBMD = AssetLoader.assetloader.getResult("Window").src;

            for (i = 0; i < 30; i += 1) {
                groundTile = new Bitmap(GroundTileBMD);
                groundTile.x = i * 30;
                ground.addChild(groundTile);
            }

            for (i = 0; i < 4; i += 1) {
                win = new Bitmap(WindowBMD);
                win.x = 100 + i * 150;
                win.y = 250;
                back.addChild(win);
            }

            g = new Graphics();
            g.beginFill(Graphics.getRGB(0, 0, 0));
            g.drawRect(0, 0, 1000, 500);
            s = new Shape(g);
            instance.addChild(s);

            for (i = 0; i < 4; i += 1) {
                dark = new Bitmap(DarkBrickBMD);
                dark.x = 130 + i * 150;
                dark.y = 280;
                instance.addChild(dark);
            }

            for (i = 0; i < 2; i += 1) {
                brick = new Bitmap(BrickBMD);
                brick.x = i * 418;
                instance.addChild(brick);
            }

            instance.addChild(back);
            
            ground.y = 400;
            instance.addChild(ground);
        }

        instance.update = function () {
            
        }

        instance.init();
    }

    Background.prototype = new Container();

    return Background;
});
