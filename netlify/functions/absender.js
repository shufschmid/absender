const { createCanvas, loadImage } = require("canvas");
//wichtig:
//add the following environment variables to netlify deploy settings (not to the .env file)
//LD_LIBRARY_PATH to /var/task/node_modules/canvas/build/Release
//hier: https://answers.netlify.com/t/node-canvas-error-libuuid-so-1-cannot-open-shared-object-file-no-such-file-or-directory/30179/33 
// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const liter = event.queryStringParameters.liter || "";
    const width = 470;
    const height = 250;

    const imagePosition = {
      w: 149,
      h: 149,
      x: 0,
      y: 0,
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
    context.fillText(liter, 80, 240);

    context.font = "bold 30pt 'PT Sans";
    context.textAlign = "left";
    context.fillText("Buttenmost", 160, 50);
    context.fillText("aus Hochwald", 160, 82);

    context.font = "22pt 'PT Sans";
    context.fillText("Verena Ming", 160, 150);
    context.fillText("Mattenweg 17", 160, 180);

    context.fillText("4146 Hochwald", 160, 210);

    context.fillText("www.buttenmost.ch", 160, 240);
    
     const image = await loadImage("https://raw.githubusercontent.com/shufschmid/absender/master/assets/rosehip.png").then((image) => {
      const { w, h, x, y } = imagePosition;
      context.drawImage(image, x, y, w, h);

    }); 

    const buffer = await canvas.toBuffer("image/png");
    return {
      statusCode: 200,
      headers: {
        //"Content-Type": "application/octet-stream"
        "Content-Type": "image/png",
      },
      body: buffer.toString("base64"), //https://michaelheap.com/netlify-function-lambda-return-image/
      isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
