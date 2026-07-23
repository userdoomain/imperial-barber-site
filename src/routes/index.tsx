import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barbearia Imperial | Cortes Masculinos de Luxo" },
      {
        name: "description",
        content:
          "Barbearia Imperial: experiência premium em cortes masculinos, barba e estética. Ambiente sofisticado e barbeiros especialistas.",
      },
      { property: "og:title", content: "Barbearia Imperial" },
      {
        property: "og:description",
        content: "Experiência premium em estética masculina.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// O site é 100% HTML/CSS/JS puro, servido a partir de /public/barbearia/.
// Para baixar e hospedar em qualquer lugar, use a pasta public/barbearia/ (README incluso).
function Index() {
  return (
    <iframe
      src="/barbearia/index.html"
      title="Barbearia Imperial"
      style={{
        border: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
}
