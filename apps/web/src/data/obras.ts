// ArteMichiko — Catálogo de obras (fuente única, sin base de datos)
// Consumido en el frontmatter de /galeria y /galeria/[slug] para evitar
// drift entre el grid y las fichas. El usuario reemplazará placehold.co
// por imágenes reales.

export type Tecnica =
	| "Dibujo"
	| "Pintura"
	| "Grabado"
	| "Acuarela"
	| "Óleo"
	| "Técnica Interna";

export type ColorTheme = "jade" | "oro" | "neutro";

export interface Obra {
	slug: string;
	titulo: string;
	tecnica: Tecnica;
	ano: string;
	dimensiones: string;
	imagen: string;
	/** Alt-text descriptivo para Image SEO (Google Images/Lens + IA multimodal).
	 * Formato: "Técnica real — Título, [obra del taller ArteMichiko | estudio de alumno]". */
	alt: string;
	colorTheme: ColorTheme;
	descripcion: string;
}

export const tecnicas: readonly Tecnica[] = [
	"Dibujo",
	"Pintura",
	"Grabado",
	"Acuarela",
	"Óleo",
	"Técnica Interna",
];

export const obras: Obra[] = [
	{
		slug: "sombra-del-ciruelo",
		titulo: "Sombra del ciruelo",
		tecnica: "Técnica Interna",
		ano: "2025",
		dimensiones: "80 × 60 cm",
		imagen: "https://placehold.co/800x1000/F5F0E6/11110E?text=Obra+1",
		alt: "Tinta china sobre papel de arroz — Sombra del ciruelo, obra del taller ArteMichiko",
		colorTheme: "jade",
		descripcion:
			"El pincel se detuvo antes que la mano. Lo que queda es la sombra del ciruelo al mediodía: un espacio en silencio donde el vacío trabaja más que la tinta.",
	},
	{
		slug: "rio-de-tinta",
		titulo: "Río de tinta",
		tecnica: "Dibujo",
		ano: "2024",
		dimensiones: "50 × 35 cm",
		imagen: "https://placehold.co/800x1000/EDE3D0/11110E?text=Obra+2",
		alt: "Dibujo a grafito sobre papel de algodón — Río de tinta, estudio de alumno de ArteMichiko",
		colorTheme: "neutro",
		descripcion:
			"Grafito sobre papel de algodón. El río no se dibuja: se persigue trazo a trazo hasta que la corriente encuentra su cauce.",
	},
	{
		slug: "barro-y-luz",
		titulo: "Barro y luz",
		tecnica: "Óleo",
		ano: "2025",
		dimensiones: "90 × 70 cm",
		imagen: "https://placehold.co/800x1000/EFE6D4/11110E?text=Obra+3",
		alt: "Óleo sobre tela con veladuras — Barro y luz, obra del taller ArteMichiko",
		colorTheme: "oro",
		descripcion:
			"Veladuras de óxido sobre la tela. La cerámica guarda la luz de la tarde y la devuelve despacio, como una promesa.",
	},
	{
		slug: "niebla-sobre-el-ajusco",
		titulo: "Niebla sobre el Ajusco",
		tecnica: "Acuarela",
		ano: "2024",
		dimensiones: "38 × 56 cm",
		imagen: "https://placehold.co/800x1000/E2E8DF/11110E?text=Obra+4",
		alt: "Acuarela sobre papel — Niebla sobre el Ajusco, obra del taller ArteMichiko",
		colorTheme: "neutro",
		descripcion:
			"El agua decide la frontera entre el cerro y el cielo. Acuarela en una sola sesión: lo que la niebla esconde, el papel lo recuerda.",
	},
	{
		slug: "jardin-de-michiko",
		titulo: "Jardín de Michiko",
		tecnica: "Pintura",
		ano: "2023",
		dimensiones: "100 × 80 cm",
		imagen: "https://placehold.co/800x1000/D8E4DC/11110E?text=Obra+5",
		alt: "Pintura acrílica sobre tela — Jardín de Michiko, obra del taller ArteMichiko",
		colorTheme: "jade",
		descripcion:
			"Un jardín que no existe fuera del cuadro. Capas de acrílico y paciencia hasta que el verde encontró su temperatura exacta.",
	},
	{
		slug: "cicatriz-dorada",
		titulo: "Cicatriz dorada",
		tecnica: "Grabado",
		ano: "2025",
		dimensiones: "40 × 30 cm",
		imagen: "https://placehold.co/800x1000/11110E/D4AF37?text=Obra+6",
		alt: "Xilografía con dorado — Cicatriz dorada, obra del taller ArteMichiko",
		colorTheme: "oro",
		descripcion:
			"Xilografía con mordida profunda. La herida de la madera se rellena de oro, como si el kintsugi se hubiera trasladado al papel.",
	},
	{
		slug: "el-silencio-del-sello",
		titulo: "El silencio del sello",
		tecnica: "Técnica Interna",
		ano: "2026",
		dimensiones: "60 × 45 cm",
		imagen: "https://placehold.co/800x1000/F5F0E6/11110E?text=Obra+7",
		alt: "Tinta china sobre papel de arroz — El silencio del sello, obra del taller ArteMichiko",
		colorTheme: "oro",
		descripcion:
			"Tinta china sobre papel de arroz. Un solo gesto, un solo sello: el instante exacto en que la respiración se vuelve trazo.",
	},
	{
		slug: "volcan-dormido",
		titulo: "Volcán dormido",
		tecnica: "Dibujo",
		ano: "2023",
		dimensiones: "70 × 50 cm",
		imagen: "https://placehold.co/800x1000/D9D2C4/11110E?text=Obra+8",
		alt: "Dibujo al carboncillo y ceniza fijada — Volcán dormido, estudio de alumno de ArteMichiko",
		colorTheme: "neutro",
		descripcion:
			"Carboncillo y ceniza fijada. El volcán duerme, pero el humo de la tiza aún sube por la ladera.",
	},
	{
		slug: "carpa-en-la-noche",
		titulo: "Carpa en la noche",
		tecnica: "Grabado",
		ano: "2024",
		dimensiones: "35 × 45 cm",
		imagen: "https://placehold.co/800x1000/11110E/00A86B?text=Obra+9",
		alt: "Aguafuerte sobre papel — Carpa en la noche, obra del taller ArteMichiko",
		colorTheme: "jade",
		descripcion:
			"Aguafuerte de una sola placa. La carpa atraviesa la tinta como si el agua fuera más profunda que el papel.",
	},
	{
		slug: "azahar",
		titulo: "Azahar",
		tecnica: "Óleo",
		ano: "2026",
		dimensiones: "60 × 60 cm",
		imagen: "https://placehold.co/800x1000/F5F0E6/11110E?text=Obra+10",
		alt: "Óleo sobre tela — Azahar, obra del taller ArteMichiko",
		colorTheme: "jade",
		descripcion:
			"Pinceladas cortas como pétalos caídos. El perfume del azahar se pinta con luz, no con materia.",
	},
];
