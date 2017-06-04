import {Ray} from "../math/ray";
import {Hit} from "../hit";
import {Vector3} from "../math/vector3";

export abstract class Material {

    constructor(public attenuation: Vector3) {}

    abstract scatter(ray: Ray, hit: Hit): Ray;

    protected reflect(direction: Vector3, normal: Vector3): Vector3 {
        return direction.minus(normal.times(Vector3.dot(direction, normal) * 2.0));
    }

    protected refract(direction: Vector3, normal: Vector3, refractiveIndex: number): Vector3 {
        let normalizedDirection = direction.normalize();
        let dt = Vector3.dot(normalizedDirection, normal);
        let discriminant = 1.0 - refractiveIndex * refractiveIndex * (1 - dt * dt);
        if (discriminant > 0) {
            return normalizedDirection.minus(normal.times(dt)).times(refractiveIndex)
                .minus(normal.times(Math.sqrt(discriminant)))
        }
        return null;
    }

    protected schlick(cosine: number, reflectiveIndex: number): number {
        let r0 = (1 - reflectiveIndex) / (1 + reflectiveIndex);
        r0 = r0 * r0;
        return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
    }
}