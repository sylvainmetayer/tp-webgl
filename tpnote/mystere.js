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

var gl;
var program;
var attribPos;
var buffer;
var tx=0, ty=0;
var uTranslation, uPerspective, uModel;
var projMatrix = mat4.create();
var modelMatrix = mat4.create();

function initShaders() {
    var vertSource = loadText('vertex.glsl');
    var fragSource = loadText('fragment.glsl');

    var vertex = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex, vertSource);
    gl.compileShader(vertex);

    if(!gl.getShaderParameter(vertex, gl.COMPILE_STATUS))
        console.log("Erreur lors de la compilation du vertex shader:\n"+gl.getShaderInfoLog(vertex));

    var fragment = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment, fragSource);
    gl.compileShader(fragment);

    if(!gl.getShaderParameter(fragment, gl.COMPILE_STATUS))
        console.log("Erreur lors de la compilation du fragment shader:\n"+gl.getShaderInfoLog(fragment));

    program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.log("Erreur lors du linkage du program:\n"+gl.getProgramInfoLog(program));

    gl.useProgram(program);

    attribPos = gl.getAttribLocation(program, "vertex_position");
    uTranslation = gl.getUniformLocation(program, "translation");
    uPerspective = gl.getUniformLocation(program, 'PMatrix');
    uModel = gl.getUniformLocation(program, "MMatrix");

    attribColor = gl.getAttribLocation(program, "color");
    gl.enableVertexAttribArray(attribColor);

}

function initBuffers() {

    var coordsCube = [
        //face avant
            -1,1,1,  -1,-1,1,  1,1,1,  1,1,1,  -1,-1,1,  1,-1,1,
        //face arriere
            -1,1,-1,  -1,-1,-1,  1,1,-1,  1,1,-1,  -1,-1,-1,  1,-1,-1,
        //face gauche
            -1,1,-1,  -1,-1,-1,  -1,1,1,  -1,1,1,  -1,-1,-1,  -1,-1,1,
        //face droite
        1,1,-1,  1,-1,-1,  1,1,1,  1,1,1,  1,-1,-1,  1,-1,1,
        //face haut
            -1,1,-1,  -1,1,1,  1,1,-1,  1,1,-1, -1,1,1,  1,1,1,
        //face bas
            -1,-1,-1,  -1,-1,1,  1,-1,-1,  1,-1,-1,  -1,-1,1,  1,-1,1
    ];

    var colors = [
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green

    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0]     // Left face: purple
  ];

    var generatedColors = [];

    for (j=0; j<6; j++) {
      var c = colors[j];

      for (var i=0; i<6; i++) {
        generatedColors = generatedColors.concat(c);
      }
    }

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordsCube), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    buffer.vertexSize = 3;
    buffer.numVertices = 12;
}

var time=0;

function draw() {
    requestAnimationFrame(draw);

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0,0.0,1.0,0.5);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(projMatrix, Math.PI/4, 1, 0.1, 100)

    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [0,0,-7]);
    mat4.rotateY(modelMatrix, modelMatrix, time);
    mat4.rotateX(modelMatrix, modelMatrix, time);

    gl.uniformMatrix4fv(uPerspective,false, projMatrix);
    gl.uniformMatrix4fv(uModel, false, modelMatrix);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(attribPos);
    gl.vertexAttribPointer(attribPos, buffer.vertexSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.enableVertexAttribArray(attribColor);
    gl.vertexAttribPointer(attribColor,4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0,36);
    time += 0.01;
}

function main() {
    var canvas = document.getElementById('dawin-webgl');
    gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('ERREUR : Echec du chargement du contexte !');
        return;
    }

    initShaders();
    initBuffers();

    draw();
}
