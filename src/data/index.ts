import { Equipo, TipoDeJuego, Posiciones } from "../interfaces/Equipo";

const data: { equipos: Equipo[] } = {
    equipos: [
        {
            id: 1,
            nombre: "Los Magníficos",
            tipo: TipoDeJuego.F5,
            valoracion: 5,
            jugadores: [
                {
                    nombre: "Juan Pérez",
                    posicion: Posiciones.Delantero,
                    descripcion: "Rápido y habilidoso"
                },
                {
                    nombre: "María González",
                    posicion: Posiciones.Defensa,
                    descripcion: "Fuerte en el marcaje"
                }
            ]
        },
        {
            id: 2,
            nombre: "Los Terribles",
            tipo: TipoDeJuego.F11,
            valoracion: 4.3,
            jugadores: [
                {
                    nombre: "Juan Pérez",
                    posicion: Posiciones.Delantero,
                    descripcion: "Rápido y habilidoso"
                },
                {
                    nombre: "María González",
                    posicion: Posiciones.Defensa,
                    descripcion: "Fuerte en el marcaje"
                }
            ]
        },
    ]
};

export default data