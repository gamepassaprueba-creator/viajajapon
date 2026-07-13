"use client";

import Link from "next/link";
import { useState } from "react";

const NODES = [
  { id: "hiroshima", name: "Hiroshima", x: 15, y: 70, href: "/destinos/hiroshima-y-miyajima", desc: "El gran Torii flotante y la memoria" },
  { id: "osaka", name: "Osaka", x: 35, y: 65, href: "/destinos/que-ver-en-osaka", desc: "Gastronomía, neones y caos nocturno" },
  { id: "kioto", name: "Kioto", x: 45, y: 55, href: "/destinos/que-ver-en-kioto", desc: "La capital tradicional: templos y geishas" },
  { id: "alpes", name: "Takayama", x: 55, y: 35, href: "/destinos/takayama", desc: "Los Alpes Japoneses y pueblos históricos" },
  { id: "hakone", name: "Hakone", x: 75, y: 55, href: "/destinos/hakone", desc: "Vistas al monte Fuji y ryokans con onsen" },
  { id: "tokio", name: "Tokio", x: 85, y: 45, href: "/destinos/que-ver-en-tokio", desc: "La metrópolis del futuro infinito" },
];

// Rutas (estilo mapa de metro)
const PATHS = [
  { from: "hiroshima", to: "osaka" },
  { from: "osaka", to: "kioto" },
  { from: "kioto", to: "hakone" },
  { from: "hakone", to: "tokio" },
  { from: "kioto", to: "alpes" },
  { from: "alpes", to: "tokio" },
];

export function InteractiveMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Helper to find node coordinates
  const getNode = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <div className="panel-manga-dark relative my-8 overflow-hidden bg-[#f5f5f5] p-2 md:p-6">
      <div className="mb-4 px-4 pt-2">
        <p className="kicker text-[#e1352e]">Mapa Interactivo</p>
        <h3 className="mt-1 text-2xl font-black text-[#0a0a0a]">La Ruta del Dragón</h3>
        <p className="mt-1 text-sm text-[#555]">Haz clic en las paradas clave del itinerario clásico para ver la guía de cada destino.</p>
      </div>

      <div className="relative aspect-video w-full min-w-[600px] overflow-x-auto sm:min-w-0">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Líneas de tren */}
          {PATHS.map((p, i) => {
            const from = getNode(p.from);
            const to = getNode(p.to);
            return (
              <line
                key={`path-${i}`}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="#0a0a0a"
                strokeWidth="0.8"
                strokeDasharray="2, 1"
                className="opacity-40"
              />
            );
          })}

          {/* Nodos */}
          {NODES.map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="group cursor-pointer transition-all"
              >
                {/* Hitbox invisible más grande para móvil */}
                <circle cx={`${node.x}%`} cy={`${node.y}%`} r="6" fill="transparent" />
                
                {/* Círculo base blanco y borde grueso negro */}
                <circle 
                  cx={`${node.x}%`} 
                  cy={`${node.y}%`} 
                  r="2" 
                  fill={isHovered ? "#e1352e" : "#ffffff"} 
                  stroke="#0a0a0a" 
                  strokeWidth="0.6" 
                  className="transition-colors duration-200"
                />
                
                {/* Texto del nombre de la ciudad */}
                <text
                  x={`${node.x}%`}
                  y={`${node.y - 4}%`}
                  textAnchor="middle"
                  fill="#0a0a0a"
                  className={`font-mono text-[2.5px] font-black uppercase tracking-widest transition-transform ${isHovered ? 'scale-110 font-bold' : ''}`}
                  style={{ pointerEvents: "none", transformOrigin: `${node.x}% ${node.y - 4}%` }}
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Panel de información dinámica al hacer hover o clic */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-64">
          <div className="border-[2px] border-[#0a0a0a] bg-white p-3 shadow-[3px_3px_0_#0a0a0a] transition-all min-h-[90px]">
            {hoveredNode ? (
              <>
                <p className="font-mono text-xs font-black uppercase text-[#e1352e]">{getNode(hoveredNode).name}</p>
                <p className="mt-1 text-sm font-bold text-[#0a0a0a]">{getNode(hoveredNode).desc}</p>
                <Link 
                  href={getNode(hoveredNode).href}
                  className="mt-2 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-[#555] hover:text-[#e1352e]"
                >
                  Leer guía completa &rarr;
                </Link>
              </>
            ) : (
              <div className="flex h-full items-center text-sm font-medium text-[#555]">
                Pasa el ratón por las paradas para ver qué te espera.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
