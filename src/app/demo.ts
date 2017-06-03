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

        let sphereCenter = new Vector3(0, 0, -250.0);
        let sphereRadius = 80.0;
        let sphere = new Sphere(sphereCenter, sphereRadius);

        var imageData = this.context.createImageData(width, height);

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var red = x / width * 255;
                var green = y / height * 255;
                var blue = 0.2 * 255;

                let u = x / width;
                let v = y / height;

                var lightDirection = Vector3.from(-2.0 + 4.0 * u, -1.0 + 2.0 * v, -1);

                let ray = new Ray(new Vector3(0, 0, 0), lightDirection);
                if (sphere.intersects(ray) > -1) {
                    let color = sphere.color(ray).normalize();
                    red = (color.x / 2.0 + 0.5) * 255.0;
                    green = (color.y / 2.0 + 0.5) * 255.0;
                    blue = (color.z / 2.0 + 0.5) * 255.0;
                }
                let bufferOffset = (y * width + x) * 4;
                imageData.data[bufferOffset + 0] = red;
                imageData.data[bufferOffset + 1] = green;
                imageData.data[bufferOffset + 2] = blue;
                imageData.data[bufferOffset + 3] = 255; // alpha
            }
        }
        this.context.putImageData(imageData, 0, 0);
    }
}