var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var controls;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var textures  = new THREE.CubeTextureLoader()
  	.setPath( 'textures/' )
  	.load( [
      'px.jpg',
      'nx.jpg',
  		'py.jpg',
  		'ny.jpg',
  		'pz.jpg',
  		'nz.jpg'
] );

scene.background = textures;
camera.position.z = 2000;
controls = new THREE.TrackballControls( camera );
// or controls = new THREE.OrbitControls( camera );
controls.autoRotate = false;

var render = function() {
	requestAnimationFrame( render );
	controls.update();
	renderer.render( scene, camera );
}

render();
