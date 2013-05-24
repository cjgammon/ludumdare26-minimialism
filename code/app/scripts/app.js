define(['game/Background', 
        'game/Enemy',
        'game/Hero',
        'game/HeroAI',
        'game/Fireball',
        'game/UI',
        'game/BoidSwarm',
        'game/events/UserEvent',
        'game/screens/TitleScreen',
        'game/AssetLoader'], 
        function(
            Background, 
            Enemy,
            Hero,
            AI,
            Fireball,
            UI,
            BoidSwarm,
            UserEvent,
            TitleScreen,
            AssetLoader) {

    var App,
        instance,
        canvas,
        stage,
        bg,
        ai,
        ui,
        hero,
        enemy,
        state,
        BG_LOOP,
        HERO_TIMEOUT,
        WAIT_FOR_HERO = 60000,
        titleScreen,
        fireballs = [];

    var App = function () {
        instance = this;
    }

    App.prototype = {
        init: function() {
            AssetLoader.load(instance.setupTitle);
                  
		    canvas = document.getElementById("stage");
            stage = new Stage(canvas); 

            $(document).bind('keydown', instance.handle_KEY_DOWN);
            $(document).bind('keyup', instance.handle_KEY_UP);

            Ticker.setFPS(60);
		    Ticker.addListener(instance.tick);
        },

        /**
         * TITLE
         */
        setupTitle: function () {
            state = 'title';

            titleScreen = new TitleScreen();
            stage.addChild(titleScreen);
        },

        destroyTitle: function () {
            instance.setupGame();
            stage.removeChild(titleScreen);
        },

        /**
         * GAME METHODS
         */
        setupGame: function () {
            state = 'game';
            BG_LOOP = SoundJS.play('Loop', SoundJS.INTERRUPT_NONE, 0, 0, -1, 1);

            bg = new Background();
            stage.addChild(bg);

            swarm = new BoidSwarm(stage);
            
            ui = new UI();
            stage.addChild(ui);
        },

        tick: function () {
            stage.update();
        },

        handle_KEY_DOWN: function (e) {
            //console.log(e.keyCode);
            if (state == 'title') {
                instance.destroyTitle();
            }
            UserEvent.KEY_DOWN.dispatch(e);
        },

        handle_KEY_UP: function (e) {
            UserEvent.KEY_UP.dispatch(e);
        }

        /**
         * GETTERS
         */
    }

    return new App();
});
