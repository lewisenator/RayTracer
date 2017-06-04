import {Material} from "./material";
import {Vector3} from "../math/vector3";
import {Ray} from "../math/ray";
import {Hit} from "../hit";

export class Metal extends Material {

    constructor(public attenuation: Vector3,
                public fuzziness: number) {
        super(attenuation);
        if (fuzziness > 1) this.fuzziness = 1;
    }

    public scatter(ray: Ray, hit: Hit): Ray {
        let reflected = this.reflect(ray.direction.normalize(), hit.normal);
        let scattered = new Ray(hit.point, reflected.plus(Vector3.random().times(this.fuzziness)));
        return Vector3.dot(scattered.direction, hit.normal) > 0 ? scattered : null;
    }
}