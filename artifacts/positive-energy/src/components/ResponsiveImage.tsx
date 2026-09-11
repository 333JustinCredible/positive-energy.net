import type { ImgHTMLAttributes } from 'react';

const RESPONSIVE_WIDTHS = [480, 768, 1200, 1600] as const;

function getVariantPath(src: string, width: number): string | null {
  const match = src.match(/^(.*)\.(jpe?g|png)$/i);
  return match ? `${match[1]}-${width}.webp` : null;
}

export interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'srcSet' | 'sizes'> {
  sizes?: string;
  pictureClassName?: string;
}

export function ResponsiveImage({
  src,
  sizes = '100vw',
  pictureClassName,
  ...props
}: ResponsiveImageProps) {
  const variantPaths = src
    ? RESPONSIVE_WIDTHS.map((width) => {
        const path = getVariantPath(src, width);
        return path ? `${path} ${width}w` : null;
      }).filter((path): path is string => Boolean(path))
    : [];

  return (
    <picture className={pictureClassName}>
      {variantPaths.length > 0 && (
        <source type="image/webp" srcSet={variantPaths.join(', ')} sizes={sizes} />
      )}
      <img {...props} src={src} sizes={sizes} />
    </picture>
  );
}