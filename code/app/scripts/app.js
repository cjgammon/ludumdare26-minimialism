define(['game/Background', 
        'game/Enemy',
        'game/Hero',
        'game/HeroAI',
        'game/Fireball',
        'game/UI',
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

            enemy = new Enemy();
            stage.addChild(enemy);

            ui = new UI();
            stage.addChild(ui);
            
            HERO_TIMEOUT = setTimeout(instance.startGame, WAIT_FOR_HERO);

            UserEvent.FIREBALL.add(instance.handle_FIREBALL);
        },

        startGame: function () {
            hero = new Hero();
            stage.addChild(hero);

            ai = new AI(hero, enemy, instance);
            ai.start();

            ui.trackingScore = false;
        },

        tick: function () {
            stage.update();
            instance.updateFireballs();
        },

        updateFireballs: function () {
            var i = 0;
            
            for (i; i < fireballs.length; i += 1) {
                if (fireballs[i].x + 100 < 0 || fireballs[i].x - 100 > stage.canvas.width) {
                    stage.removeChild(fireballs[i]);
                    fireballs.splice(i, 1);
                }
            }
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
        },

        handle_FIREBALL: function () {
            var fireball,
                direction;
            
            direction = enemy.getDirection();
            fireball = new Fireball(direction);
            fireball.x = direction > 0 ? enemy.x + 80 : enemy.x - 30;
            fireball.y = enemy.y + 20;
            fireball.init();
            stage.addChild(fireball);

            fireballs.push(fireball);
            
            SoundJS.play('FireballSFX', SoundJS.INTERRUPT_ANY, 0, 0, 0, 0.5); 
        },
        
        /**
         * GETTERS
         */

        getFireballs: function () {
            return fireballs;
        }
    }

    return new App();
});
