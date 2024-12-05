let song;
let fft;

function preload() {
  song = loadSound('song.mp3'); // Cargar la canción
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT(0.8, 256); // Inicializar FFT para análisis del espectro
  song.loop(); // Reproducir la canción en bucle
}

function draw() {
  background(0); // Fondo negro
  let spectrum = fft.analyze(); // Analizar el espectro del audio

  noStroke();
  
  // Colores del degradado
  let color1 = color(0, 0, 255); // Azul
  let color2 = color(255, 0, 255); // Morado
  let color3 = color(255, 105, 180); // Rosado

  // Dibujar el ecualizador en todos los cuadrantes
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width); // Posición x de la onda
    let h = map(spectrum[i], 0, 255, 0, height / 2); // Mapa de altura de la onda

    // Colores del ecualizador
    let col = lerpColor(lerpColor(color1, color2, i / spectrum.length), 
                        lerpColor(color2, color3, i / spectrum.length), 
                        (i / spectrum.length) * 2);
    
    // Dibujar la parte superior del ecualizador (cuadrante superior)
    fill(col);
    beginShape();
    vertex(x, height / 2); // Centro
    vertex(x + width / spectrum.length / 2, height / 2 - h); // Arriba
    vertex(x + width / spectrum.length, height / 2); // Derecha
    endShape(CLOSE);

    // Dibujar la parte inferior del ecualizador (cuadrante inferior)
    beginShape();
    vertex(x, height / 2); // Centro
    vertex(x + width / spectrum.length / 2, height / 2 + h); // Abajo
    vertex(x + width / spectrum.length, height / 2); // Derecha
    endShape(CLOSE);

    // Dibujar reflejo en el cuadrante superior izquierdo
    beginShape();
    vertex(width - x, height / 2); // Centro
    vertex(width - (x + width / spectrum.length / 2), height / 2 - h); // Arriba
    vertex(width - (x + width / spectrum.length), height / 2); // Derecha
    endShape(CLOSE);

    // Dibujar reflejo en el cuadrante inferior izquierdo
    beginShape();
    vertex(width - x, height / 2); // Centro
    vertex(width - (x + width / spectrum.length / 2), height / 2 + h); // Abajo
    vertex(width - (x + width / spectrum.length), height / 2); // Derecha
    endShape(CLOSE);

    // Dibujar reflejo en el cuadrante inferior derecho
    beginShape();
    vertex(x, height / 2); // Centro
    vertex(x + width / spectrum.length / 2, height / 2 + h); // Abajo
    vertex(x + width / spectrum.length, height / 2); // Derecha
    endShape(CLOSE);
  }
}
