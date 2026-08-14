import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export function GET(context: APIContext) {
	return rss({
		title: "ArteMichiko — Academia de Arte",
		description:
			"Centro Cultural Académico de Dibujo y Pintura Artística — Sistema Oriental único en México. Grafito, color, tinta y óleo.",
		site: context.site ?? "https://artemichiko.com",
		items: [
			{
				title: "Guía de dibujo con grafito",
				pubDate: new Date("2026-08-01"),
				link: "/blog/guia-dibujo-grafito/",
				description:
					"El grafito es la madre de todas las técnicas: los 5-9 lápices y el refinamiento del trazo.",
			},
			{
				title: "El óleo y sus veladuras",
				pubDate: new Date("2026-07-20"),
				link: "/blog/el-oleo-y-sus-veladuras/",
				description:
					"La especialidad del fundador: capas transparentes y la luz que vive dentro de la pintura.",
			},
			{
				title: "Acuarela: agua y pigmento",
				pubDate: new Date("2026-07-05"),
				link: "/blog/acuarela-agua-y-pigmento/",
				description:
					"La técnica más antigua del color: entre el control y el azar, el agua decide.",
			},
			{
				title: "Exposiciones en CDMX",
				pubDate: new Date("2026-06-18"),
				link: "/blog/exposiciones-cdmx/",
				description:
					"El circuito cultural de la ciudad: dónde ver obra y a dónde llevar la propia.",
			},
			{
				title: "Un día en ArteMichiko",
				pubDate: new Date("2026-06-02"),
				link: "/blog/un-dia-en-artemichiko/",
				description:
					"De la paciencia al trazo: cómo es un día de taller, de los 5 a los 70 años.",
			},
		],
	});
}
