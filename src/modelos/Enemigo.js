class Enemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y);
        this.estado = estados.moviendo;
        this.vxInteligencia = -1;
        this.vx = this.vxInteligencia;

        this.aMover = new Animacion(imagenes.enemigo_movimiento,
            this.ancho, this.alto, 6, 3);

        this.aMorir = new Animacion(imagenes.enemigo_morir,
            this.ancho, this.alto, 6, 8, this.finAnimacionMorir.bind(this));

        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vy = 0;
        this.vx = 1;
    }


    actualizar() {
        this.animacion.actualizar();

        if (this.vx === 0) {
            this.vxInteligencia *= -1;
            this.vx = this.vxInteligencia;
        }

    }

    dibujar() {
        this.animacion.dibujar(this.x, this.y);
    }

}
