import {Vector3} from "./vector3";
import {Ray} from "./ray";

export class Sphere {
    center: Vector3;
    radius: number;

    constructor();
    constructor(center: Vector3, radius: number);
    constructor(center?: Vector3, radius?: number) {
        this.center = center || new Vector3();
        this.radius = radius || 0;
    }

    public intersects(ray: Ray): boolean {
        let oc = ray.origin.minus(this.center);
        let a = Vector3.dot(ray.direction, ray.direction);
        let b = 2.0 * Vector3.dot(oc, ray.direction);
        let c = Vector3.dot(oc, oc) - this.radius * this.radius;
        let discriminant = b * b - 4 * a * c;
        return discriminant > 0;
    }
}