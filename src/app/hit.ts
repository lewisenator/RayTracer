import {Vector3} from "./math/vector3";
import {Material} from "./materials/material";

export class Hit {
    depth: number;
    point: Vector3;
    normal: Vector3;
    material: Material;
}