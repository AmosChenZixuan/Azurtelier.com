

<img src="public/static/favicons/icon.png" height="48" >
<div align="center">
  <img src="public/static/images/logo.png" height="64" >
</div>

---

![banner](public/static/images/banner.png)

# Blog Personal de AmosChenZixuan

Basado en el [**Tailwind Nextjs Starter Blog**](https://github.com/timlrx/tailwind-nextjs-starter-blog)

Este es un proyecto de [Next.js](https://nextjs.org/) y [Tailwind CSS](https://tailwindcss.com/) basado en el directorio App de Next con [Componentes del lado del servidor de React](https://nextjs.org/docs/getting-started/react-essentials#server-components) y utiliza [Contentlayer](https://www.contentlayer.dev/) para gestionar el contenido en markdown.

## Características adicionales por mí

- Internacionalización
  - Soporta inglés y chino.
- Fuente personalizada
- Barra de navegación inteligente
  - Se oculta y reaparece al hacer scroll
- Etiquetas con desplazamiento parallax
- Estado de Spotify
  - Muestra la canción que se está reproduciendo actualmente
  - Si no hay ninguna canción reproduciéndose, muestra la última reproducida
- Visor de imágenes
  - Soporta arrastre y zoom
- Galería de fotos (En desarrollo)
  - Cuadrícula de imágenes responsive y compacta
  - Soporta compartir y enlaces externos
- Currículum (Por hacer)
  - Línea de tiempo con animaciones de desplazamiento atractivas

## Características originales de la plantilla

- Next.js con TypeScript
- [Contentlayer](https://www.contentlayer.dev/) para gestionar la lógica de contenido
- Personalización fácil de estilos con [Tailwind 3.0](https://tailwindcss.com/blog/tailwindcss-v3) y atributo de color primario
- [MDX - ¡escribe JSX en documentos markdown!](https://mdxjs.com/)
- Puntuación casi perfecta en Lighthouse - [Informe de Lighthouse](https://www.webpagetest.org/result/230805_BiDcBQ_4H7)
- Ligero, 85 kB de JS en la primera carga
- Vista optimizada para móviles
- Tema claro y oscuro
- Optimización de fuentes con [next/font](https://nextjs.org/docs/app/api-reference/components/font)
- Integración con [pliny](https://github.com/timlrx/pliny) que proporciona:
  - Múltiples opciones de analíticas, incluyendo [Umami](https://umami.is/), [Plausible](https://plausible.io/), [Simple Analytics](https://simpleanalytics.com/), PostHog y Google Analytics
  - Comentarios mediante [Giscus](https://github.com/laymonage/giscus), [Utterances](https://github.com/utterance/utterances) o Disqus
  - API y componente de boletín (newsletter) con soporte para Mailchimp, Buttondown, ConvertKit, Klaviyo, Revue y EmailOctopus
  - Búsqueda con paleta de comandos mediante [Kbar](https://github.com/timc1/kbar) o Algolia
- Resaltado de sintaxis en el servidor con números de línea y resaltado de líneas mediante [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus)
- Visualización de matemáticas soportada mediante [KaTeX](https://katex.org/)
- Soporte para citas y bibliografía mediante [rehype-citation](https://github.com/timlrx/rehype-citation)
- Optimización automática de imágenes mediante [next/image](https://nextjs.org/docs/basic-features/image-optimization)
- Soporte para etiquetas: cada etiqueta única tendrá su propia página
- Soporte para múltiples autores
- 3 diseños diferentes para el blog
- 2 diseños diferentes para la lista de entradas del blog
- Soporte para enrutamiento anidado de entradas del blog
- Página de proyectos
- Encabezados de seguridad preconfigurados
- Amigable con SEO con feed RSS, mapas del sitio y ¡mucho más!

## Instalación

#### Prerrequisitos: Node y Yarn

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install 18
nvm use 18

npm i --global yarn
```

```bash
yarn
```

Tenga en cuenta que, si está utilizando Windows, es posible que deba ejecutar:

```bash
set PWD="$(pwd)"
```

## Desarrollo

Primero, ejecute el servidor de desarrollo:

```bash
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) en su navegador para ver el resultado.

Edite el diseño en `app` o el contenido en `data`. Con la recarga en vivo, las páginas se actualizan automáticamente mientras las edita.
