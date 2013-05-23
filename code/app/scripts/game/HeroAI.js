define([], 
        function() {

    var AI = function (hero, enemy, game) {
        var instance = this,
            goalX;
 

        function safeDistance() {
            return 200 + Math.random() * 100;
        }

        function runTowards(heroX, goalX) {
            if (heroX < goalX) {
                hero.moveRight();  //run towards
            } else if (heroX > goalX) {
                hero.moveLeft();   //run towards
            }
        }

        function basicAvoidEnemyLogic() {
            var maxpadding = 200,
                minpadding = 100,
                heroX = hero.x,
                goalX = hero.x < enemy.x ? enemy.x - maxpadding : enemy.x + maxpadding;

            if (heroX > goalX - maxpadding && heroX < goalX + maxpadding) {
                //if within max padding range
                if (enemy.getDucking()) {
                    //if spinning
                    if (heroX < goalX - minpadding + 10 || heroX > goalX + minpadding - 10){
                        hero.jump();
                        overrideX = overrideX ? overrideX : hero.x < enemy.x ? enemy.x + maxpadding : enemy.x - maxpadding;
                        runTowards(heroX, overrideX);
                    }                
                } else if (!enemy.getJumping()) {
                    //if not jumping
                    runAway();
                    overrideX = false;
                } else if (heroX < goalX - minpadding + 10 || heroX > goalX + minpadding - 10){
                    //if within min padding range & jumping
                    //sprint under
                    overrideX = overrideX ? overrideX : hero.x < enemy.x ? enemy.x + maxpadding : enemy.x - maxpadding;
                    runTowards(heroX, overrideX);
                }
            } else {
                //if outside max padding range
                runTowards(heroX, goalX);
            }

            function runAway() {
                if (heroX > goalX + minpadding) {
                    hero.moveLeft();
                } else if (heroX < goalX - minpadding){
                    hero.moveRight();
                }
            }
        }

        function basicAvoidFireballLogic() {
            var i = 0,
                fireballs = game.getFireballs(),
                fireball;

            for (i; i < fireballs.length; i += 1) {
                fireball = fireballs[i];

                if (fireball.x > hero.x && fireball.x < hero.x + 50) {
                    hero.jump();
                }
            }
        }

        instance.init = function () {

        }

        instance.update = function () {
            basicAvoidEnemyLogic();
            basicAvoidFireballLogic();
        }

        instance.start = function () {
		    Ticker.addListener(instance.update);
            //goalX = enemy.x - 200;
        }

        instance.init();
    }

    return AI;
});
