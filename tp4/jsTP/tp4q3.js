var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var controls;
var textureTmp;

var images = ["sun.jpg", "earth.jpg", "jupiter.jpg", "mars.jpg", "mercury.jpg", "neptune.jpg", "pluto.jpg", "saturn.jpg", "uranus.jpg", "venus.jpg"];

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { } );
var cube = new THREE.Mesh( geometry, material );
var loader = new THREE.TextureLoader();
loader.load('img/'+images[0],
	function ( texture ) {
		material.map = texture;
	},
	// Function called when download errors
	function ( xhr ) {
		console.log( 'An error happened' );
	}
);
scene.add(cube);

camera.position.z = 5;

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}

render();
