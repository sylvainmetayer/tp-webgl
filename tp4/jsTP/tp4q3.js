var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var textureTmp;

var images = [
	"sun", "mercury", "venus", "earth",
	"mars", "jupiter", "saturn",
	"uranus", "neptune", "pluto"
];

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var x = -10;
var y = 0;
var z = 0;
var distance = 5;
var distanceSoleil = distance +10;
var size = 1.90;
var sizeSoleil = 5;

var sunObject;

// SUN
var geometry = new THREE.SphereGeometry( sizeSoleil, 32, 32 );
var loader = new THREE.TextureLoader();
loader.load('img/sun.jpg',
	function ( texture ) {
		var material = new THREE.MeshBasicMaterial( {map:texture} );
		var sunObject = new THREE.Mesh( geometry, material );
		sunObject.position.set(x,y,z);
		scene.add(sunObject);
		x += distanceSoleil;
	}
);

// Utilisé pour les pivots
var first = true;
var rotation = 2;

// PLANETS
for (var i = 1; i < images.length; i++) {
	var geometry = new THREE.SphereGeometry( size, 32, 32 );
	var loader = new THREE.TextureLoader();
	name = images[i];
	loader.load('img/'+ name + '.jpg',
		function ( texture ) {
			var material = new THREE.MeshBasicMaterial( {map:texture} );
			var object = new THREE.Mesh( geometry, material );
			object.position.set(x,y,z);

			var pivot = new THREE.Object3D();
			pivot.rotation.z = first ? 0 : rotation * Math.PI / 9;
			first ? first = !first : first = first;
			rotation += 2;
			scene.children[0].add(pivot);
			pivot.add(object);
			x += distance;
		}
	);
}

camera.position.z = 35;
function render() {
console.log(scene.children);	requestAnimationFrame( render );
	scene.children[0].rotation.x += 0.05;
	scene.children[0].rotation.y += 0.05;

	for (var i = 0; i < scene.children[0].children.length; i++) {
		var object = scene.children[0].children[i];
		object.rotation.x += 0.05;
		object.rotation.y += 0.05;
	}

	renderer.render( scene, camera );
}

render();
