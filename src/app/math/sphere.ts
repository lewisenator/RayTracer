import {Vector3} from "./vector3";
import {Ray} from "./ray";
import {Entity} from "../entity";
import {Hit} from "../hit";
import {Material} from "../materials/material";
import {Diffuse} from "../materials/diffuse";

export class Sphere extends Entity {
    center: Vector3;
    radius: number;
    material: Material;

    constructor();
    constructor(center: Vector3, radius: number, material: Material);
    constructor(center?: Vector3, radius?: number, material?: Material) {
        super();
        this.center = center || new Vector3();
        this.radius = radius || 0;
        this.material = material || new Diffuse(Vector3.from(0.8, 0.3, 0.3));
    }

    public hit(ray: Ray, minDepth: number, maxDepth: number): Hit {
        let oc = ray.origin.minus(this.center);
        let a = Vector3.dot(ray.direction, ray.direction);
        let b = Vector3.dot(oc, ray.direction);
        let c = Vector3.dot(oc, oc) - this.radius * this.radius;
        let discriminant = b * b - a * c;
        if (discriminant > 0) {
            var temp = (-b - Math.sqrt(discriminant)) / a;
            if (temp > minDepth && temp < maxDepth) {
                let result = new Hit();
                result.depth = temp;
                result.point = ray.pointAtDistance(result.depth);
                result.normal = result.point.minus(this.center).divide(this.radius).normalize();
                result.material = this.material;
                return result;
            }
            temp = (-b + Math.sqrt(discriminant)) / a;
            if (temp > minDepth && temp < maxDepth) {
                let result = new Hit();
                result.depth = temp;
                result.point = ray.pointAtDistance(result.depth);
                result.normal = result.point.minus(this.center).divide(this.radius).normalize();
                result.material = this.material;
                return result;
            }
        }
        return null;
    }
}