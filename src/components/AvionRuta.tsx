import { Plane } from "lucide-react";

/**
 * Avión dentro de un <svg> de ruta: círculo rojo centrado en (x, y), un punto de la curva, y el icono
 * girado en la dirección del trayecto. Al ir dentro del mismo SVG que la línea, escala con ella y se
 * queda siempre encima de la raya, sea cual sea el ancho de pantalla.
 * `rumbo`: ángulo de la tangente en grados (0 = hacia la derecha, negativo = subiendo).
 */
export function AvionRuta({ x, y, r, rumbo, borde = 3 }: { x: number; y: number; r: number; rumbo: number; borde?: number }) {
  const icono = r * 1.1;
  // El icono de lucide apunta en diagonal hacia arriba a la derecha (-45°).
  const giro = rumbo + 45;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#e1352e" stroke="#fff" strokeWidth={borde} />
      <g transform={`rotate(${giro})`}>
        <Plane x={-icono / 2} y={-icono / 2} width={icono} height={icono} color="#fff" strokeWidth={2.5} />
      </g>
    </g>
  );
}
