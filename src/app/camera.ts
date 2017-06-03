import {Vector3} from "./math/vector3";
import {Ray} from "./math/ray";

export class Camera {

    public origin: Vector3 = Vector3.from(0, 0, 0);
    public aspectRatio: number = 3.0 / 4.0;
    public zoom: number = 1.0;

    public rayAt(u: number, v: number): Ray {
        let scale = 1.0 / this.zoom;
        let width = scale * this.aspectRatio;
        let height = scale;

        let lightDirection = Vector3.from(
            -width / 2.0 + width * u,
            -height / 2.0 + height * v,
            -1);

        return new Ray(this.origin, lightDirection);
    }
}