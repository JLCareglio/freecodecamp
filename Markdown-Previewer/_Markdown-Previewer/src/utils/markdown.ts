import { marked } from 'marked';

marked.use({
  gfm: true,
  breaks: true,
});

export const convertMarkdownToHtml = (markdownText: string): string => {
  try {
    return marked.parse(markdownText) as string;
  } catch (error) {
    console.error('Error al analizar markdown:', error);
    return '<p>Error al analizar markdown</p>';
  }
};

export const defaultMarkdown = `# ¡Bienvenido a Mi Previsualizador de Markdown!

## Este es un subencabezado...
### Y aquí tienes algunas cosas geniales que puedes hacer:

Puedes insertar código en línea usando comillas invertidas, como esto: \`<div></div>\`.

\`\`\`javascript
// También puedes crear bloques de código de múltiples líneas:

function otroEjemplo(primeraLinea, ultimaLinea) {
  if (primeraLinea == '\`\`\`' && ultimaLinea == '\`\`\`') {
    return codigoMultiLinea;
  }
}
\`\`\`

¡Dale estilo a tu texto! Puedes usar **negrita**, _cursiva_ o incluso **_¡ambos a la vez!_**
¿Y por qué no tachar ~~lo que ya no necesitas~~?

Incorpora [enlaces a sitios web](https://www.freecodecamp.org) y crea
> citas en bloque para resaltar información importante.

¿Te gustan las tablas? ¡Aquí tienes un ejemplo!

Encabezado 1 | Encabezado 2 | Encabezado 3
------------ | ------------ | ------------
Celda 1      | Celda 2      | Celda 3
Otra fila    | Con más datos | Y más contenido

- Las listas con viñetas son fáciles de crear
  - Puedes anidarlas
     - A varios niveles
        - ¡Como prefieras!

1. Puedes crear listas numeradas
2. Con comentarios simpáticos
3. Para explicar cada punto
4. Y hacer que sea divertido de leer

¡Y no olvides que también puedes incluir imágenes!

![Foto de un gatito](https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg)
`;