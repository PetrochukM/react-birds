import "./Projector";
import "./CanvasRenderer.js";
import Boid from "./boid.js";
import Bird from "./bird.js";

var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2,
    SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

var Birds = {
    init: function(_canvas) {
        this.camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
        this.camera.position.z = 450;

        this.scene = new THREE.Scene();

        this.birds = [];
        this.boids = [];

        var bird, boid;

        for (var i = 0; i < 125; i++) {

            this.boid = this.boids[i] = new Boid();
            this.boid.position.x = Math.random() * 400 - 200;
            this.boid.position.y = Math.random() * 400 - 200;
            this.boid.position.z = Math.random() * 400 - 200;
            this.boid.velocity.x = Math.random() * 2 - 1;
            this.boid.velocity.y = Math.random() * 2 - 1;
            this.boid.velocity.z = Math.random() * 2 - 1;
            this.boid.setAvoidWalls(true);
            this.boid.setWorldSize(500, 500, 400);

            bird = this.birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
                color: Math.random() * 0x272144,
                side: THREE.DoubleSide
            }));
            bird.phase = Math.floor(Math.random() * 62.83);
            this.scene.add(bird);

        }

        this.renderer = new THREE.CanvasRenderer({
            alpha: true,
            canvas: _canvas
        });
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        document.addEventListener('mousemove', function(e) {
            this.onDocumentMouseMove(e);
        }.bind(this), false);
        window.addEventListener('resize', function() {
            this.onWindowResize();
        }.bind(this), false);

        this.animate();
    },
    onWindowResize: function() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

    },
    onDocumentMouseMove: function(e) {

        var vector = new THREE.Vector3(e.clientX - SCREEN_WIDTH_HALF, -e.clientY + SCREEN_HEIGHT_HALF, 0);

        for (var i = 0, il = this.boids.length; i < il; i++) {

            var boid = this.boids[i];

            vector.z = boid.position.z;

            boid.repulse(vector);

        }

    },
    animate: function() {
        //requestAnimationFrame(animate);
        requestAnimationFrame(animate_cb);

        this.render();
    },
    render: function() {

        for (var i = 0, il = this.birds.length; i < il; i++) {

            var boid = this.boids[i];
            boid.run(this.boids);

            var bird = this.birds[i];
            bird.position.copy(this.boids[i].position);

            bird.material.color.setHex(0x2B243B);
            bird.material.transparent = true;
            bird.material.opacity = (bird.position.z + 500) / 1000;
            //color.r = color.g = color.b = (500 - bird.position.z) / 1000;
            //color.r = color.g = color.b = 0;

            bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
            bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());

            bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
            bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;

        }

        this.renderer.render(this.scene, this.camera);
    }

}

function animate_cb() {
    Birds.animate();
}

export default Birds;