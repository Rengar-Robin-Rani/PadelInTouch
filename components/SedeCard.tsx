"use client";

import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Sede = {
  id: string;
  nombre: string;
  imagen: string;
  direccion: string;
  telefono: string;
  horario?: string;
  canchas?: number;
};

type Props = {
  sede: Sede;
  seleccionable?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
  showReservarButton?: boolean;
  onReservar?: (id: string) => void;
  disabled?: boolean;
};

function buildImageUrl(pathOrUrl: string) {
  if (/^(https?:)?\/\//i.test(pathOrUrl) || pathOrUrl.startsWith("/")) return pathOrUrl;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base}/storage/v1/object/public/canchas/${pathOrUrl}` : pathOrUrl;
}

const SedeCard: React.FC<Props> = ({
  sede,
  seleccionable = false,
  selected = false,
  onSelect,
  showReservarButton = false,
  onReservar,
  disabled = false,
}) => {
  const clickable = seleccionable && !showReservarButton;
  const imgSrc = buildImageUrl(sede.imagen);

  return (
    <div
      className={[
        "border rounded-2xl shadow-md overflow-hidden transition select-none",
        clickable ? "cursor-pointer hover:shadow-lg" : "cursor-default",
        selected ? "ring-2 ring-primary" : "",
        disabled ? "opacity-60 pointer-events-none" : "",
      ].join(" ")}
      onClick={clickable ? () => onSelect?.(sede.id) : undefined}
    >
      {/* Imagen */}
      <img
        src={imgSrc}
        alt={sede.nombre}
        className="w-full h-48 object-cover"
        loading="lazy"
        sizes="(min-width: 768px) 33vw, 100vw"
      />

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{sede.nombre}</h3>
          {typeof sede.canchas === "number" && (
            <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">
              {sede.canchas} canchas
            </span>
          )}
        </div>

        <div className="mt-2 space-y-1 text-gray-700 text-sm">
          <p className="flex items-center gap-2"><MapPin size={16} />{sede.direccion}</p>
          <p className="flex items-center gap-2"><Phone size={16} />{sede.telefono}</p>
          {sede.horario && (
            <p className="flex items-center gap-2"><Clock size={16} />{sede.horario}</p>
          )}
        </div>

        {showReservarButton && (
          <Button
            type="button"
            className="w-full mt-4 bg-primary hover:bg-primary/80"
            onClick={(e) => { e.stopPropagation(); onReservar?.(sede.id); }}
            disabled={disabled}
          >
            Reservar
          </Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(SedeCard);
