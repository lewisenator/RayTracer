import {Sphere} from "./math/sphere";
import {Vector3} from "./math/vector3";
import {Ray} from "./math/ray";

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

        let sphereCenter = new Vector3(width / 2, height / 2, -5.0);
        let sphereRadius = 20.0;
        let sphere = new Sphere(sphereCenter, sphereRadius);

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var red = x / width * 255;
                var green = y / height * 255;
                var blue = 0.2 * 255;

                let ray = new Ray(new Vector3(x, y, 0), new Vector3(x, y, -100));
                if (sphere.intersects(ray)) {
                    red = 255;
                    green = 0;
                    blue = 0;
                }

                let pixelData = this.context.getImageData(x, y, 1, 1);
                pixelData.data[0] = red;
                pixelData.data[1] = green;
                pixelData.data[2] = blue;
                this.context.putImageData(pixelData, x, y);
            }
        }
    }
}