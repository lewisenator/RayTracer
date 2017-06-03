import {Entity} from "./entity";
import {Ray} from "./math/ray";
import {Hit} from "./hit";

export class EntityManager extends Entity {

    public entities: Entity[] = [];

    constructor(...entities: Entity[]) {
        super();
        this.entities = entities;
    }

    public hit(ray: Ray, minDepth: number, maxDepth: number): Hit {
        let result: Hit = null;
        for (var i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            let newHit = entity.hit(ray, minDepth, result == null ? maxDepth : result.depth);
            if (newHit != null) {
                result = newHit;
            }
        }
        return result;
    }
}