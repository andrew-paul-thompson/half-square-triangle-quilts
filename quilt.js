const TILE_SIZE = 45;

function generateTiles() {
  let tile_array = [];

  let canvas = new OffscreenCanvas(TILE_SIZE, TILE_SIZE);
  let context = canvas.getContext("2d");

  // A
  context.fillStyle = "white";
  context.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

  let path = new Path2D();
  path.moveTo(0, 0);
  path.lineTo(TILE_SIZE, TILE_SIZE);
  path.lineTo(0, TILE_SIZE);
  path.closePath();
  context.fillStyle = "black";
  context.fill(path);

  tile_array.push(context.getImageData(0, 0, canvas.width, canvas.height));

  // B
  context.fillStyle = "white";
  context.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

  path = new Path2D();
  path.moveTo(0, 0);
  path.lineTo(0, TILE_SIZE);
  path.lineTo(TILE_SIZE, 0);
  path.closePath();
  context.fillStyle = "black";
  context.fill(path);

  tile_array.push(context.getImageData(0, 0, canvas.width, canvas.height));

  // C
  context.fillStyle = "white";
  context.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

  path = new Path2D();
  path.moveTo(0, 0);
  path.lineTo(TILE_SIZE, TILE_SIZE);
  path.lineTo(TILE_SIZE, 0);
  path.closePath();
  context.fillStyle = "black";
  context.fill(path);

  tile_array.push(context.getImageData(0, 0, canvas.width, canvas.height));

  // D
  context.fillStyle = "white";
  context.fillRect(0, 0, TILE_SIZE, TILE_SIZE);

  path = new Path2D();
  path.moveTo(TILE_SIZE, 0);
  path.lineTo(TILE_SIZE, TILE_SIZE);
  path.lineTo(0, TILE_SIZE);
  path.closePath();
  context.fillStyle = "black";
  context.fill(path);

  tile_array.push(context.getImageData(0, 0, canvas.width, canvas.height));

  return tile_array;
}

const tiles = generateTiles();

function generateQuilt() {
  let message = document.getElementById("message").value;
  let width = parseInt(document.getElementById("width").value);
  generateQuiltFromString(message, width);
}

function generateQuiltFromArray(array, width) {
  let quilt = document.getElementById("quilt");
  let context = quilt.getContext("2d");
  context.clearRect(0, 0, quilt.height, quilt.width);

  const horizontal_offset = Math.floor((quilt.width - TILE_SIZE * width) / 2);

  for (i = 0; i < array.length; i++) {
    context.putImageData(
      tiles[array[i]],
      horizontal_offset + (i % width) * TILE_SIZE,
      Math.floor(i / width) * TILE_SIZE
    );
  }
}

function generateQuiltFromString(text, width) {
  let array = new Array(text.length);
  const textEncoder = new TextEncoder();
  let bytes = textEncoder.encode(text);
  for (i = 0; i < bytes.length; i++) {
    let digits = [];
    let byte = bytes[i];
    for (j = 0; j < 4; j++) {
      digits.push(byte % 4);
      byte = Math.floor(byte / 4);
    }
    for (j = 0; j < 4; j++) {
      array[4 * i + j] = digits[3 - j];
    }
  }
  generateQuiltFromArray(array, width);
}
