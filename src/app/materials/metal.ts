import {Material} from "./material";
import {Vector3} from "../math/vector3";
import {Ray} from "../math/ray";
import {Hit} from "../hit";

export class Metal implements Material {

    constructor(public attenuation: Vector3) {}

    public scatter(ray: Ray, hit: Hit): Ray {
        let reflected = this.reflect(ray.direction.normalize(), hit.normal);
        let scattered = new Ray(hit.point, reflected);
        return Vector3.dot(scattered.direction, hit.normal) > 0 ? scattered : null;
    }

    private reflect(direction: Vector3, normal: Vector3): Vector3 {
        return direction.minus(normal.times(Vector3.dot(direction, normal) * 2.0));
    }
}