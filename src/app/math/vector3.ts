export class Vector3 {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor();
    constructor(x?: number, y?: number, z?: number) {
        this.x = x ? x : this.x;
        this.y = y ? y : this.y;
        this.z = z ? z : this.z;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x +
            this.y * this.y +
            this.z * this.z);
    }

    public normalize() {
        let ratio = 1.0 / this.length();

        this.x *= ratio;
        this.y *= ratio;
        this.z *= ratio;
    }

    public add(other: Vector3) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
    }

    public minus(other: Vector3) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
    }

    public times(other: Vector3 | number) {
        if (other instanceof Vector3) {
            this.x *= other.x;
            this.y *= other.y;
            this.z *= other.z;
        } else if (typeof other === "number") {
            this.x *= other;
            this.y *= other;
            this.z *= other;
        }
    }

    public divide(other: Vector3 | number) {
        if (other instanceof Vector3) {
            this.x /= other.x;
            this.y /= other.y;
            this.z /= other.z;
        } else if (typeof other === "number") {
            this.x /= other;
            this.y /= other;
            this.z /= other;
        }
    }

    public dot(other: Vector3): number {
        return this.x * other.x +
                this.y * other.y +
                this.z * other.z;
    }

    public cross(other: Vector3): Vector3 {
        let result = new Vector3();
        result.x = this.y * other.z - this.z * other.y;
        result.y = this.z * other.x - this.x * other.z;
        result.z = this.x * other.y - this.y * other.x;
        return result;
    }

    public clone(): Vector3 {
        let result = new Vector3();
        result.x = this.x;
        result.y = this.y;
        result.z = this.z;
        return result;
    }
}