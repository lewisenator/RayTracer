import {Vector3} from "./vector3";
import {Ray} from "./ray";
import {Entity} from "../entity";
import {Hit} from "../hit";

export class Sphere extends Entity {
    center: Vector3;
    radius: number;

    constructor();
    constructor(center: Vector3, radius: number);
    constructor(center?: Vector3, radius?: number) {
        super();
        this.center = center || new Vector3();
        this.radius = radius || 0;
    }

    public hit(ray: Ray, minDepth: number, maxDepth: number): Hit {
        let oc = ray.origin.minus(this.center);
        let a = Vector3.dot(ray.direction, ray.direction);
        let b = 2.0 * Vector3.dot(oc, ray.direction);
        let c = Vector3.dot(oc, oc) - this.radius * this.radius;
        let discriminant = b * b - 4 * a * c;
        if (discriminant > 0) {
            var temp = (-b - Math.sqrt(b * b - a * c)) / a;
            if (temp > minDepth && temp < maxDepth) {
                let result = new Hit();
                result.depth = temp;
                result.point = ray.pointAtDistance(result.depth);
                result.normal = result.point.minus(this.center).divide(this.radius).normalize();
                return result;
            }
            temp = (-b + Math.sqrt(b * b - a * c)) / a;
            if (temp > minDepth && temp < maxDepth) {
                let result = new Hit();
                result.depth = temp;
                result.point = ray.pointAtDistance(result.depth);
                result.normal = result.point.minus(this.center).divide(this.radius).normalize();
                return result;
            }
        }
        return null;
    }
}