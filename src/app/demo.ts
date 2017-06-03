import {Sphere} from "./math/sphere";
import {Vector3} from "./math/vector3";
import {Ray} from "./math/ray";
import {EntityManager} from "./entity-manager";
import {Camera} from "./camera";
import {Diffuse} from "./materials/diffuse";
import {Metal} from "./materials/metal";

const minZ = 0.0001;
const maxZ = 1000;
const samplesPerPixel = 50;

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

        let camera = new Camera();
        camera.aspectRatio = width / height;
        camera.zoom = 1.0;

        let sphere1 = new Sphere(Vector3.from(-105, 0, -250.0), 50.0, new Metal(Vector3.from(0.8, 0.7, 0.7)));
        let sphere2 = new Sphere(Vector3.from(0, 0, -250.0), 50.0, new Diffuse(Vector3.from(0.3, 0.3, 0.9)));
        let sphere3 = new Sphere(Vector3.from(105, 0, -250.0), 50.0, new Diffuse(Vector3.from(0.4, 0.9, 0.9)));

        let entityManager = new EntityManager(sphere1, sphere2, sphere3);

        var imageData = this.context.createImageData(width, height);

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {

                let color = Vector3.from(0, 0, 0);
                for (var s = 0; s < samplesPerPixel; s++) {
                    let u = (x + Math.random()) / width;
                    let v = (y + Math.random()) / height;

                    let ray = camera.rayAt(u, v);
                    color = color.plus(this.color(ray, entityManager, 0));
                }
                color = color.divide(samplesPerPixel);
                color = new Vector3(
                    Math.sqrt(color.x / 255) * 255,
                    Math.sqrt(color.y / 255) * 255,
                    Math.sqrt(color.z / 255) * 255);

                let bufferOffset = ((height - y - 1) * width + x) * 4;
                imageData.data[bufferOffset + 0] = color.x;
                imageData.data[bufferOffset + 1] = color.y;
                imageData.data[bufferOffset + 2] = color.z;
                imageData.data[bufferOffset + 3] = 255; // alpha
            }
        }
        this.context.putImageData(imageData, 0, 0);
    }

    private color(ray: Ray, entityManager: EntityManager, depth: number): Vector3 {
        let direction = ray.direction.normalize();

        // sky
        let t = 0.5 * direction.y + 1.0;
        let result = Vector3.from(0.2, 0.5, 1.0).times(t * 255);

        // ground
        if (direction.y < -0.1) {
            let t = 0.5 * direction.y + 1.0;
            result = Vector3.from(0.2, 0.8, 0.2).times(t * 255);
        }

        let hit = entityManager.hit(ray, minZ, maxZ);
        if (hit != null) {
            result = Vector3.from(0, 0, 0);
            if (depth < 50) {
                let scattered = hit.material.scatter(ray, hit);
                if (scattered != null) {
                    result = hit.material.attenuation.times(this.color(scattered, entityManager, depth + 1));
                }
            }
        }

        return result;
    }
}