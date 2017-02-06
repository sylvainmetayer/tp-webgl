function loadText(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.overrideMimeType("text/plain");
    xhr.send(null);
    if(xhr.status === 200)
        return xhr.responseText;
    else {
        return null;
    }
}

// variables globales du programme;
var canvas;
var gl; //contexte
var program; //vertex program
var attribPos; //attribute position
var attribSize; //attribute size
var pointSize = 10.;

function initContext() {
    canvas = document.getElementById('dawin-webgl');
    gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('ERREUR : echec chargement du contexte');
        return;
    }
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
}

//Initialisation des shaders et du program
function initShaders() {
  var vertexSrc = loadText("shader.glsl");
  var fragmentSrc = loadText("fragment.glsl");

  var vertex = gl.createShader(gl.VERTEX_SHADER);
  var fragment = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertex, vertexSrc);
  gl.shaderSource(fragment, fragmentSrc);

  gl.compileShader(vertex);
  gl.compileShader(fragment);

  gl.getShaderParameter(vertex, gl.COMPILE_STATUS);
  gl.getShaderInfoLog(vertex);
  gl.getShaderInfoLog(fragment);

  program = gl.createProgram();

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);

  gl.linkProgram(program);
  gl.getProgramParameter(program, gl.LINK_STATUS);
  gl.getProgramInfoLog (program);

  gl.useProgram(program);
}

//Fonction initialisant les attributs pour l'affichage (position et taille)
function initAttributes() {
  console.log(gl.getAttribLocation(program, "position"));
}

//Fonction permettant le dessin dans le canvas
function draw() {
  gl.drawArrays(gl.POINTS, 0, 1);
}

function main() {
    initContext();
    initShaders();
    initAttributes();
    gl.clear(gl.COLOR_BUFFER_BIT);
    draw();
}
