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
var program; //shader program
var attribPos; //attribute position
var pointSize = 10.;
var mousePositions = [ ];
var buffer;
var position, size;

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
    var fragmentSource = loadText('fragment.glsl');
    var vertexSource = loadText('vertex.glsl');

    var fragment = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment, fragmentSource);
    gl.compileShader(fragment);

    var vertex = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex, vertexSource);
    gl.compileShader(vertex);

    gl.getShaderParameter(fragment, gl.COMPILE_STATUS);
    gl.getShaderParameter(vertex, gl.COMPILE_STATUS);

    if (!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(fragment));
    }

    if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(vertex));
    }

    program = gl.createProgram();
    gl.attachShader(program, fragment);
    gl.attachShader(program, vertex);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("Could not initialise shaders");
    }
    gl.useProgram(program);
}

//Evenement souris
function initEvents() {
    canvas.onclick = function(e) {
        //changement de repere pour les coordonnees de souris
        var x = (e.pageX/canvas.width)*2.0 - 1.0;
        var y = ((canvas.height-e.pageY)/canvas.height)*2.0 - 1.0;
        mousePositions.push(x);
        mousePositions.push(y);
        refreshBuffers();
        draw();
    }
}

//Fonction initialisant les attributs pour l'affichage (position et taille)
function initAttributes() {
  attribPos = gl.getAttribLocation(program, "position");
}

//Initialisation des buffers
function initBuffers() {
    buffer = gl.createBuffer();
    gl.enableVertexAttribArray(attribPos);
}

//Mise a jour des buffers : necessaire car les coordonnees des points sont ajoutees a chaque clic
function refreshBuffers() {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER , new Float32Array(mousePositions), gl.STATIC_DRAW);
}

//Fonction permettant le dessin dans le canvas
function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.vertexAttribPointer(attribPos, 2, gl.FLOAT, mousePositions,0.0,0.0);
    gl.drawArrays(gl.TRIANGLES, 0, mousePositions.length / 2);
}

function main() {
    initContext();
    initBuffers();
    initShaders();
    initAttributes();
    initEvents();
    draw();
}
