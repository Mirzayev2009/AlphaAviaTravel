import manifest from "../generated/image-manifest.json";

export function responsiveImage(url) {
  const image = manifest[url];
  if (!image) return { src: url };
  const [hash, width, height, widths] = image;
  const path = (size) => `/data/optimized/images/${hash}-${size}.webp`;
  return {
    src: path(widths.find((size) => size >= 960) || widths.at(-1)),
    srcSet: widths.map((size) => `${path(size)} ${size}w`).join(", "),
    width,
    height,
  };
}
