define(['game/AssetLoader',
        'game/events/UserEvent',
        'game/Boid'], 
        function(AssetLoader, UserEvent, Boid) {

    var BoidSwarm,
        instance;

    var BoidSwarm = function (stage) {
        var boids = [],
            neighborDistance = 10000,
		    globalSpeed = 0.5;  //TODO:: put this in a global var
            
        
        instance = this;


        function getDistance(p1, p2) {
            var dx, dy,
                distance;

            dx = p2.x - p1.x;
            dy = p2.y - p1.y;
            distance = dx * dx + dy * dy; 

            return distance;
        }

        /**
         * initialize
         */
        instance.init = function () {
            var i,
                boid;

            for (i = 0; i < 10; i += 1) {
                boid = new Boid();
                boid.id = i;
                boid.x = Math.random() * stage.canvas.width;
                boid.y = Math.random() * stage.canvas.height;
                stage.addChild(boid);

                boids.push(boid);
            }

		    Ticker.addListener(instance.update);
        }

        instance.update = function () {
            var i, j, k,
                b1, b2,
                v1, v2, v3, v4,
                neighbors,
                nD = neighborDistance,
                norm;

            for (i = 0; i < boids.length; i += 1) {
                b1 = boids[i];
                neighbors = [];

                for (j = 0; j < boids.length; j += 1) {
                    b2 = boids[j];
                    
                    if( b1 != b2 ) {
                        distance = getDistance(b1, b2);
                        if (distance < nD && b1.c === b2.c ) {
                            neighbors.push(b2);
                        }
                    }

                }
                
                v1 = 0;//steerTowardsCenter(b1, neighbors);
                v2 = 0;//steerTowardsMouse(b1);
                v3 = 0;//steerAwayFromNeighbours(b1, neighbors);
                v4 = 0;//matchVelocity(b1, neighbors);
                
                b1.velocity.x += v1.x + v2.x + v3.x + v4.x;
                b1.velocity.y += v1.y + v2.y + v3.y + v4.y;

 			    k = Math.sqrt(b1.velocity.x * b1.velocity.x + b1.velocity.y * b1.velocity.y);
                norm = 1 / k;
                if (k > 10) k = 10;
                if (k < 2) k = 2;
                b1.velocity.x *= b1.speed * k * norm;
                b1.velocity.y *= b1.speed * k * norm;
                
                b1.oPosition.x = b1.x;
                b1.oPosition.y = b1.y;
                    
                b1.x += b1.velocity.x * globalSpeed;
                b1.y += b1.velocity.y * globalSpeed;
                
                //bounds
                if (b1.x < 0 || b1.x > stage.canvas.width) b1.velocity.x *= -1;
                if (b1.y < 0 || b1.y > stage.canvas.height) b1.velocity.y *= -1;
            }

        }

        instance.init();
    }

    return BoidSwarm;
});
