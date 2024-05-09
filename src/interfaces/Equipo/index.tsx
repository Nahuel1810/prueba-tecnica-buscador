export enum Posiciones {
    Arquero = 'ARQUERO',
    Defensa = 'DEFENSA',
    Mediocampista = 'MEDIOCAMPISTA',
    Delantero = 'DELANTERO',
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
    F5 = 'F5',
    F7 = 'F7',
    F11 = 'F11',
}
export function validarTipoDeJuego(tipo: string): boolean {
    return Object.values(TipoDeJuego).includes(tipo as TipoDeJuego);
}

export interface Equipo {
    id: number;
    nombre: string;
    tipo: TipoDeJuego;
    valoracion: number;
    jugadores: Jugador[];
}