export class Demo {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
    }

    run() {
        // requestAnimationFrame(this.run);

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let width = this.canvas.width;
        let height = this.canvas.height;

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                let red = x / width * 255;
                let green = y / height * 255;
                let blue = 0.2 * 255;

                let pixelData = this.context.getImageData(x, y, 1, 1);
                pixelData.data[0] = red;
                pixelData.data[1] = green;
                pixelData.data[2] = blue;
                this.context.putImageData(pixelData, x, y);
            }
        }
    }
}