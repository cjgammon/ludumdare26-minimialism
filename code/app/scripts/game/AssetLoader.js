define([], function() {

    var AssetLoader,
        instance;

    var AssetLoader = function () {
        instance = this;

        function handle_assetloader_COMPLETE() {
            
        }

        instance.assetloader = new PreloadJS();
        instance.manifest = [
            {id: "ScreenTitle", src: "images/screenTitle.png"},
            {id: "Enemy", src: "images/enemy.png"},
            {id: "Hero", src: "images/hero.png"},
            {id: "Window", src: "images/window.png"},
            {id: "Bricks", src: "images/bricks.png"},
            {id: "DarkBricks", src: "images/darkbricks.png"},
            {id: "Fireball", src: "images/fireball.png"},
            {id: "GroundTile", src: "images/groundTile.png"},
            {id: "FireballSFX", src: "audio/Fireball.mp3", type: "sound"},
            {id: "Loop", src: "audio/loop.mp3|audio/loop.ogg", type: "sound"},
            {id: "JumpSFX", src: "audio/Jump1.mp3", type: "sound"}
        ];
        
        instance.load = function (callback) {
            instance.assetloader.onComplete = callback;
            instance.assetloader.installPlugin(SoundJS);
            instance.assetloader.loadManifest(instance.manifest);
        };
        
    }
        
    return new AssetLoader();
});
