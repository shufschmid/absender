const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

// Dimensions for the image
const width = 470;
const height = 250;

const imagePosition = {
  w: 149,
  h: 149,
  x: 0,
  y: 0,
};

// Add post object with the content to render
const info = {
  kg: "27",
};

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#fff";
context.fillRect(0, 0, width, height);

// Set the style of the test and render it to the canvas
context.font = "bold 70pt 'PT Sans'";
context.textAlign = "center";
context.fillStyle = "#000";
// 600 is the x value (the center of the image)
// 170 is the y (the top of the line of text)
context.fillText(info.kg, 60, 240);

context.font = "bold 32pt 'PT Sans"
context.textAlign ="left"
context.fillText("Buttenmost", 160, 50);
context.fillText("aus Hochwald", 160, 82);

context.font = "22pt 'PT Sans"
context.fillText("Verena Ming", 160, 150);
context.fillText("Mattenweg 17", 160, 180);

context.fillText("4146 Hochwald", 160, 210);

context.fillText("www.buttenmost.ch", 160, 240);



// Load the logo file and then render it on the screen.
loadImage("./assets/rosehip.png").then((image) => {
  const { w, h, x, y } = imagePosition;
  context.drawImage(image, x, y, w, h);

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./image.png", buffer);
});
