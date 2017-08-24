import {Vector3} from "./math/vector3";
import {Ray} from "./math/ray";

export class Camera {
    private lowerLeft = Vector3.from(0, 0, 0);

    private horizontal: Vector3;
    private vertical: Vector3;

    private u: Vector3;
    private v: Vector3;
    private w: Vector3;


    private lensRadius: number;

    constructor(private eye: Vector3,
                private lookat: Vector3,
                private up: Vector3,
                private verticalFOV: number,
                private aspectRatio: number,
                private aperture: number,
                private focalDistance: number) {
        this.lensRadius = aperture / 2;

        let theta = verticalFOV * Math.PI / 180;
        let halfHeight = Math.tan(theta / 2);
        let halfWidth = aspectRatio * halfHeight;

        this.w = eye.minus(lookat).normalize();
        this.u = up.cross(this.w).normalize();
        this.v = this.w.cross(this.u);

        this.lowerLeft = eye
            .minus(this.u.times(focalDistance).times(halfWidth))
            .minus(this.v.times(focalDistance).times(halfHeight))
            .minus(this.w.times(focalDistance));

        this.horizontal = this.u.times(focalDistance).times(halfWidth).times(2);
        this.vertical = this.v.times(focalDistance).times(halfHeight).times(2);

    }

    public rayAt(s: number, t: number): Ray {
        let rd = Vector3.random().times(this.lensRadius);
        let offsetU = this.u.times(rd.x);
        let offsetV = this.v.times(rd.y);
        let totalOffset = offsetU.plus(offsetV);

        let direction = this.lowerLeft
            .plus(this.horizontal.times(s))
            .plus(this.vertical.times(t))
            .minus(this.eye)
            .minus(totalOffset);

        return new Ray(this.eye.plus(totalOffset), direction);
    }
}