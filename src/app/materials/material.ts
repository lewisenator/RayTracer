import {Ray} from "../math/ray";
import {Hit} from "../hit";
import {Vector3} from "../math/vector3";

export interface Material {

    attenuation: Vector3;

    scatter(ray: Ray, hit: Hit): Ray;
}