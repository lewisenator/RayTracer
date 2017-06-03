export class Vector3 {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    constructor();
    constructor(x: number, y: number, z: number);
    constructor(x?: number, y?: number, z?: number) {
        this.x = x || this.x;
        this.y = y || this.y;
        this.z = z || this.z;
    }

    public withX(x: number): Vector3 {
        this.x = x;
        return this;
    }

    public withY(y: number): Vector3 {
        this.y = y;
        return this;
    }

    public withZ(z: number): Vector3 {
        this.z = z;
        return this;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x +
            this.y * this.y +
            this.z * this.z);
    }

    public normalize(): Vector3 {
        let ratio = 1.0 / this.length();

        this.x *= ratio;
        this.y *= ratio;
        this.z *= ratio;

        return this;
    }

    public plus(other: Vector3): Vector3 {
        let result = this.clone();
        result.x += other.x;
        result.y += other.y;
        result.z += other.z;
        return result;
    }

    public minus(other: Vector3): Vector3 {
        let result = this.clone();
        result.x -= other.x;
        result.y -= other.y;
        result.z -= other.z;
        return result;
    }

    public times(other: Vector3 | number): Vector3 {
        let result = this.clone();
        if (other instanceof Vector3) {
            result.x *= other.x;
            result.y *= other.y;
            result.z *= other.z;
        } else if (typeof other === "number") {
            result.x *= other;
            result.y *= other;
            result.z *= other;
        }
        return result;
    }

    public divide(other: Vector3 | number): Vector3 {
        let result = this.clone();
        if (other instanceof Vector3) {
            result.x /= other.x;
            result.y /= other.y;
            result.z /= other.z;
        } else if (typeof other === "number") {
            result.x /= other;
            result.y /= other;
            result.z /= other;
        }
        return result;
    }

    public dot(other: Vector3): number {
        return this.x * other.x +
                this.y * other.y +
                this.z * other.z;
    }

    public static dot(a: Vector3, b: Vector3): number {
        return a.x * b.x +
            a.y * b.y +
            a.z * b.z;
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

    public static from(x: number, y: number, z: number): Vector3 {
        return new Vector3(x, y, z);
    }
}