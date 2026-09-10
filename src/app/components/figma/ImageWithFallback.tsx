"use client";
import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

/**
 * Larghezze richieste all'ottimizzatore. Devono essere fra quelle
 * ammesse da Next (images.deviceSizes), altrimenti la richiesta è
 * rifiutata.
 */
const WIDTHS = [640, 828, 1080, 1920] as const;

/**
 * L'ottimizzatore accetta solo percorsi locali e host dichiarati in
 * next.config.mjs. Gli SVG sono esclusi da Next per motivi di sicurezza,
 * e comunque non guadagnerebbero nulla dalla conversione.
 */
export function canOptimize(src: unknown): src is string {
  return (
    typeof src === "string" &&
    src.startsWith("/") &&
    !src.startsWith("/_next/") &&
    !src.toLowerCase().endsWith(".svg")
  );
}

export function optimizedSrc(src: string, width: number, quality = 75): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/**
 * Passa l'immagine per l'ottimizzatore di Next, che la serve in WebP e
 * alla larghezza utile al dispositivo.
 *
 * Prima veniva servito il file originale: sulla pagina del team questo
 * significava ~58 MB scaricati, con avatar da 4,5 MB mostrati a 72×72
 * pixel. Resta un <img> con lo stesso DOM e le stesse classi invece di
 * next/image, perché i contenitori di queste immagini non sono
 * posizionati e `fill` ne romperebbe il layout in una trentina di punti.
 */
export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement> & { sizes?: string }
) {
  const [didError, setDidError] = useState(false)

  const { src, alt, style, className, sizes, ...rest } = props

  if (didError) {
    return (
      <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`} style={style}>
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" loading="lazy" decoding="async" {...rest} data-original-url={String(src ?? '')} />
        </div>
      </div>
    )
  }

  if (!canOptimize(src)) {
    return (
      <img src={src} alt={alt} className={className} style={style} loading="lazy" decoding="async" {...rest} onError={() => setDidError(true)} />
    )
  }

  return (
    <img
      src={optimizedSrc(src, 1080)}
      srcSet={WIDTHS.map((w) => `${optimizedSrc(src, w)} ${w}w`).join(", ")}
      sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      {...rest}
      onError={() => setDidError(true)}
    />
  )
}
