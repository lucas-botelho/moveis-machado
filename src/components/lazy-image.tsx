import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & { src: string };

/**
 * An <img> that lazy-loads by default and shows a shimmering skeleton until it
 * has decoded. The skeleton is painted as the image element's own background,
 * so no wrapper is added and existing layout selectors keep working. Width and
 * height should always be given so the skeleton reserves the right space.
 */
export function LazyImage({
  className,
  loading = "lazy",
  decoding = "async",
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [settledSrc, setSettledSrc] = useState<string | null>(null);
  const settled = settledSrc === props.src;

  // Server-rendered images can finish before hydration, so onLoad never fires.
  useEffect(() => {
    const image = ref.current;
    if (image?.complete) setSettledSrc(props.src);
  }, [props.src]);

  return (
    <img
      ref={ref}
      loading={loading}
      decoding={decoding}
      className={cn(className, settled ? "is-loaded" : "is-loading")}
      onLoad={(event) => {
        setSettledSrc(props.src);
        onLoad?.(event);
      }}
      onError={(event) => {
        setSettledSrc(props.src);
        onError?.(event);
      }}
      {...props}
    />
  );
}
