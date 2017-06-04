import {Material} from "./material";
import {Vector3} from "../math/vector3";
import {Hit} from "../hit";
import {Ray} from "../math/ray";

export class Dialectric extends Material {

    constructor(public refractiveIndex: number,
                public fuzziness: number) {
        super(new Vector3(1.0, 1.0, 1.0));
        if (fuzziness > 1) this.fuzziness = 1;
    }

    public scatter(ray: Ray, hit: Hit): Ray {
        let ri = this.refractiveIndex;
        let outwardNormal: Vector3;
        let cosine: number;

        if (Vector3.dot(ray.direction.normalize(), hit.normal) > 0) {
            outwardNormal = hit.normal.times(-1);
            cosine = ri * Vector3.dot(ray.direction, hit.normal) / ray.direction.length();
        } else {
            outwardNormal = hit.normal;
            ri = 1.0 / this.refractiveIndex;
            cosine = -Vector3.dot(ray.direction, hit.normal) / ray.direction.length();
        }

        let refracted = this.refract(ray.direction, outwardNormal, ri);

        if (refracted != null) {
            let refractProbability = this.schlick(cosine, ri);
            if (Math.random() > refractProbability) {
                return new Ray(hit.point, refracted.plus(Vector3.random().times(this.fuzziness)));
            }
        }

        let reflected = this.reflect(ray.direction.normalize(), hit.normal);
        return new Ray(hit.point, reflected.plus(Vector3.random().times(this.fuzziness)));
    }
}