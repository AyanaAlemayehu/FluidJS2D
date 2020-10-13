/*
* @summary This is the class used for position vectors, and generally any vector that does not dynamically change.
* @class
*   @param x: This is the coefficient of the x component, or the coefficient of the i unit vector
*   @param y: This is the coefficient of the y component, or the coefficient of the j unit vector
*/
class pVector {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.angle = Math.atan(x/y);
        this.mag = Math.sqrt(x**2 + y**2);
    }
}

/*
* @summary This is the class used for dynamic vectors.
* @class
*   @param x: This is the term of the x component, or the term of the i unit vector
*   @param y: This is the term of the y component, or the term of the j unit vector
*/

class dVector {
    constructor()
}

