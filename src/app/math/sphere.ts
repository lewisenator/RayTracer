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

    public intersects(ray: Ray): number {
        let oc = ray.origin.minus(this.center);
        let a = Vector3.dot(ray.direction, ray.direction);
        let b = 2.0 * Vector3.dot(oc, ray.direction);
        let c = Vector3.dot(oc, oc) - this.radius * this.radius;
        let discriminant = b * b - 4 * a * c;
        if (discriminant <= 0) {
            return -1.0;
        } else {
            let result = (-b - Math.sqrt(discriminant)) / (2.0 * a);
            return result;
        }
    }

    public color(ray: Ray): Vector3 {
        let t = this.intersects(ray);
        if (t > 0) {
            let n: Vector3 = ray.pointAtDistance(t).minus(Vector3.from(0, 0, -1));
            return Vector3.from(n.x + 1, n.y + 1, n.z + 1).times(0.5);
        } else {
            let direction = ray.direction.normalize();
            t = 0.5 * (direction.y + 1.0);
            let result = Vector3.from(1.0, 1.0, 1.0).times(1.0 - t).plus(Vector3.from(0.5, 0.7, 1.0).times(t));
            return result;
        }
    }
}