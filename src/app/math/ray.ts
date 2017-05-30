import {Vector3} from "./vector3";

export class Ray {
    public origin: Vector3;
    public direction: Vector3;

    constructor();
    constructor(origin: Vector3, direction: Vector3);
    constructor(origin?: Vector3, direction?: Vector3) {
        this.origin = origin || new Vector3();
        this.direction = direction || new Vector3();
    }

    public pointAtDistance(distance: number): Vector3 {
        return this.origin.plus(this.direction.times(distance));
    }
}