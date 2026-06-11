"use client";

import { PointerEvent, useState } from "react";

type CoverImageFocusPickerProps = {
  imageUrl: string;
  alt: string;
  value?: string;
  heightClass: string;
  onChange: (value: string) => void;
};

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}

function positionToPercents(value?: string) {
  if (!value) {
    return { x: 50, y: 50 };
  }

  const percentMatch = value.match(/(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);

  if (percentMatch) {
    return {
      x: clamp(Number(percentMatch[1])),
      y: clamp(Number(percentMatch[2])),
    };
  }

  const horizontal = value.includes("left")
    ? 0
    : value.includes("right")
      ? 100
      : 50;
  const vertical = value.includes("top")
    ? 0
    : value.includes("bottom")
      ? 100
      : 50;

  return { x: horizontal, y: vertical };
}

export default function CoverImageFocusPicker({
  imageUrl,
  alt,
  value,
  heightClass,
  onChange,
}: CoverImageFocusPickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const position = positionToPercents(value);
  const objectPosition = `${position.x}% ${position.y}%`;

  const updatePosition = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100);
    onChange(`${Math.round(x)}% ${Math.round(y)}%`);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[#5c4a3d]/10 bg-[#e8e0d5] ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
        updatePosition(event);
      }}
      onPointerMove={(event) => {
        if (isDragging) {
          updatePosition(event);
        }
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 10 : 2;
        const current = positionToPercents(value);
        const next = { ...current };

        if (event.key === "ArrowLeft") {
          next.x = clamp(current.x - step);
        } else if (event.key === "ArrowRight") {
          next.x = clamp(current.x + step);
        } else if (event.key === "ArrowUp") {
          next.y = clamp(current.y - step);
        } else if (event.key === "ArrowDown") {
          next.y = clamp(current.y + step);
        } else {
          return;
        }

        event.preventDefault();
        onChange(`${Math.round(next.x)}% ${Math.round(next.y)}%`);
      }}
      role="slider"
      aria-label="Fokus cover slike"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position.x)}
      aria-valuetext={objectPosition}
      tabIndex={0}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        draggable={false}
        className={`${heightClass} w-full select-none object-cover`}
        style={{ objectPosition }}
      />
      <span
        className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#fdfaf6] bg-[#5c4a3d] shadow-lg"
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      />
      <span className="pointer-events-none absolute inset-x-3 bottom-3 rounded-md bg-[#2f241d]/70 px-3 py-2 text-xs font-semibold text-[#fdfaf6]">
        Prevucite sliku mišem da namestite kadar
      </span>
    </div>
  );
}
