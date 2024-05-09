export enum Posiciones {
    Defensa = 'defensa',
    Mediocampista = 'mediocampista',
    Delantero = 'delantero',
}
export function validarPosicion(posicion: string): boolean {
    return Object.values(Posiciones).includes(posicion as Posiciones);
}

export interface Jugador {
    nombre: string;
    posicion: Posiciones;
    descripcion: string;
}

export enum TipoDeJuego {
    F5 = 'f5',
    F7 = 'f7',
    F11 = 'f11',
}

export interface Equipo {
    id: number;
    nombre: string;
    tipo: TipoDeJuego;
    valoracion: number;
    jugadores: Jugador[];
}