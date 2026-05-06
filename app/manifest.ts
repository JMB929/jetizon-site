import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jetizon Onsite Assistant",
    short_name: "Jetizon",
    description: "Private Jetizon field assessment tool for charging and micromobility site screening.",
    start_url: "/onsite-assistant",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
