import {Material} from "./material";
import {Ray} from "../math/ray";
import {Vector3} from "../math/vector3";
import {Hit} from "../hit";

export class Diffuse extends Material {

    constructor(public attenuation: Vector3) {
        super(attenuation);
    }

    public scatter(ray: Ray, hit: Hit): Ray {
        let target = hit.point.plus(hit.normal).plus(Vector3.random());
        return new Ray(hit.point, target.minus(hit.point));
    }
}