import {Hit} from "./hit";
import {Ray} from "./math/ray";

export abstract class Entity {

    abstract hit(ray: Ray, minDepth: number, maxDepth: number): Hit;

}