import {Vector3} from "./math/vector3";
import {Ray} from "./math/ray";

export class Camera {

    public origin: Vector3 = Vector3.from(0, 0, 0);

    private _aspectRatio: number = 3.0 / 4.0;
    private _zoom: number = 1.0;

    private _scale: number;
    private _width: number;
    private _height: number;
    private _leftStart: number;
    private _bottomStart: number;

    constructor() {
        this.recalculate();
    }

    public set aspectRatio(aspectRatio: number) {
        this._aspectRatio = aspectRatio;
        this.recalculate();
    }

    public get aspectRatio() {
        return this._aspectRatio;
    }

    public set zoom(zoom: number) {
        this._zoom = zoom;
        this.recalculate();
    }

    public get zoom() {
        return this._zoom;
    }

    private recalculate() {
        this._scale = 1.0 / this._zoom;
        this._width = this._scale * this._aspectRatio;
        this._height = this._scale;
        this._leftStart = -this._width / 2.0;
        this._bottomStart = -this._height / 2.0;
    }

    public rayAt(u: number, v: number): Ray {
        let lightDirection = new Vector3(
            this._leftStart + this._width * u,
            this._bottomStart + this._height * v,
            -1);

        return new Ray(this.origin, lightDirection);
    }
}