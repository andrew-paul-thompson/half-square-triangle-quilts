function generateTiles(tile_size) {
  let tile_array = [];

  let canvas = new OffscreenCanvas(tile_size, tile_size);
  let context = canvas.getContext("2d");

  // A
  context.fillStyle = "white";
  context.fillRect(0, 0, tile_size, tile_size);

  let path = new Path2D();
  path.moveTo(0, 0);
  path.lineTo(tile_size, tile_size);
  path.lineTo(0, tile_size);
  path.closePath();
  context.fillStyle = "black";
  context.fill(path);

  tile_array.push(context.getImageData(0, 0, canvas.width, canvas.height));

  // B
  context.fillStyle = "white";
  context.fillRect(0, 0, tile_size, tile_size);

  path = new Path2D();
  path.moveTo(0, 0);
  path.lineTo(0, tile_size);
  path.lineTo(tile_size, 0);
  path.closePath();
  context.fillStyle = "black";
  context.fill(path);

  tile_array.push(context.getImageData(0, 0, canvas.width, canvas.height));

  // C
  context.fillStyle = "white";
  context.fillRect(0, 0, tile_size, tile_size);

  path = new Path2D();
  path.moveTo(0, 0);
  path.lineTo(tile_size, tile_size);
  path.lineTo(tile_size, 0);
  path.closePath();
  context.fillStyle = "black";
  context.fill(path);

  tile_array.push(context.getImageData(0, 0, canvas.width, canvas.height));

  // D
  context.fillStyle = "white";
  context.fillRect(0, 0, tile_size, tile_size);

  path = new Path2D();
  path.moveTo(tile_size, 0);
  path.lineTo(tile_size, tile_size);
  path.lineTo(0, tile_size);
  path.closePath();
  context.fillStyle = "black";
  context.fill(path);

  tile_array.push(context.getImageData(0, 0, canvas.width, canvas.height));

  return tile_array;
}

function generateQuilt() {
  let message = document.getElementById("message").value;
  let width = parseInt(document.getElementById("width").value);
  generateQuiltFromString(message, width);
}

function generateQuiltFromArray(array, width) {
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.height, canvas.width);

  let width_in_tiles = parseInt(document.getElementById("width").value);

  const tile_size = Math.floor(canvas.width / width_in_tiles);

  const horizontal_offset = Math.floor((canvas.width - tile_size * width) / 2);

  for (i = 0; i < array.length; i++) {
    context.putImageData(
      tiles[array[i]],
      horizontal_offset + (i % width) * tile_size,
      Math.floor(i / width) * tile_size
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

function resizeCanvas() {
  let quilt = document.getElementById("quilt");
  const width = quilt.offsetWidth;
  const canvas = document.getElementById("canvas");

  let width_in_tiles = parseInt(document.getElementById("width").value);

  canvas.width = width;
  canvas.height = 1.5 * width;

  tiles = generateTiles(Math.floor(width / width_in_tiles));
}

resizeCanvas();

addEventListener("resize", (event) => {
  resizeCanvas();
  generateQuilt();
});
