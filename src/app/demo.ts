import {Sphere} from "./math/sphere";
import {Vector3} from "./math/vector3";
import {Ray} from "./math/ray";
import {EntityManager} from "./entity-manager";

const minZ = 0;
const maxZ = 1000;

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

        let sphere1 = new Sphere(Vector3.from(0, 0, -250.0), 80.0);
        let sphere2 = new Sphere(Vector3.from(-100, -100, -400.0), 80.0);
        let entityManager = new EntityManager(sphere1, sphere2);

        var imageData = this.context.createImageData(width, height);

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                let u = x / width;
                let v = y / height;

                var lightDirection = Vector3.from(-2.0 + 4.0 * u, -1.0 + 2.0 * v, -1);

                let ray = new Ray(new Vector3(0, 0, 0), lightDirection);
                let color = this.color(ray, entityManager);

                let bufferOffset = (y * width + x) * 4;
                imageData.data[bufferOffset + 0] = color.x;
                imageData.data[bufferOffset + 1] = color.y;
                imageData.data[bufferOffset + 2] = color.z;
                imageData.data[bufferOffset + 3] = 255; // alpha
            }
        }
        this.context.putImageData(imageData, 0, 0);
    }

    private color(ray: Ray, entityManager: EntityManager): Vector3 {
        let result = new Vector3(255, 255, 255);

        let hit = entityManager.hit(ray, minZ, maxZ);
        if (hit != null) {
            result = Vector3.from(
                (0.5 * hit.normal.x + 0.5) * 255,
                (0.5 * hit.normal.y + 0.5) * 255,
                (0.5 * hit.normal.z + 0.5) * 255);
        }

        return result;
    }
}