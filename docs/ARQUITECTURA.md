# Arquitectura de la web

Cómo está construida la página y dónde va cada cosa. Pensado para que cualquiera del equipo sepa dónde tocar sin romper nada.


## 1. Visión general

La web es **estática**: HTML para la estructura, CSS para el aspecto y JavaScript para el comportamiento. No hay servidor propio ni base de datos; los datos de ejemplo viven en un JSON.

```
flowchart LR  
  H\["HTML\<br/\>estructura y contenido"\] --\> C\["CSS\<br/\>aspecto"\]  
  H --\> J\["JS\<br/\>comportamiento"\]  
  D\["data/datos.json\<br/\>datos de ejemplo"\] -.-\> J
```

Cada página carga los mismos tres CSS y el mismo JS:

```
\<link rel="stylesheet" href="css/base.css"\>        \<!-- 1º: variables y reset --\>  
\<link rel="stylesheet" href="css/layout.css"\>      \<!-- 2º: estructura --\>  
\<link rel="stylesheet" href="css/components.css"\>  \<!-- 3º: piezas --\>  
\<script src="js/main.js" defer\>\</script\>
```

> El **orden importa**: `base.css` define las variables que usan los otros dos. Desde `pages/`, las rutas llevan `../` delante.


## 2. HTML

### Plantilla común de página

```
\<body\>  
  skip-link                     Enlace "Saltar al contenido" (accesibilidad)  
  \<header class="site-header"\>  Logo + navegación + Entrar / Afiliarse  
  \<main id="contenido"\>         Contenido propio de cada página  
  \<footer class="site-footer"\>  Marca + enlaces + contacto  
\</body\>
```

### Reglas

- **Cabecera y pie están duplicados** en las 8 páginas (index + 7 de `pages/`). Hay que mantenerlos iguales a mano.

- El enlace de la página actual lleva `aria-current="page"` en la navegación.

- En `index.html`, el `\<main\>` contiene las zonas 2 a 7 (ver tabla siguiente). Las páginas internas tienen una sola `section` con el título y el aviso "en construcción".

### Zonas de la home

| Nº | Zona | Etiqueta y clase | Dónde se estiliza | Estado |
| :-: | - | - | - | :-: |
| 1 | Cabecera | `header.site-header` · `.logo-hibrido` · `.main-nav` · `.header-actions` | `base.css` (logo) y `layout.css` | ✅ |
| 2 | Portada | `section.hero` · `.hero\_\_texto` · `.search` · `.chips` | `layout.css` y `components.css` | ✅ |
| 3 | Reto semanal | `aside.reto` · `.reto\_\_etiqueta` · `progress` | — | ⏳ |
| 4 | Perfiles | `section.perfiles` · `.perfiles\_\_lista` · `.perfil-card` | `layout.css` y `components.css` | ✅ |
| 5 | Empleo | `section.empleo` · `.section-head` · `.lista` | — | ⏳ |
| 6 | Foro | `section.foro` · `.section-head` · `.lista` | — | ⏳ |
| 7 | Más apartados | `section.mas` · `.mas\_\_item` | rejilla en `layout.css` | 🟡 |
| 8 | Pie | `footer.site-footer` · `.footer\_\_marca` · `.footer\_\_nav` · `.footer\_\_contacto` | `layout.css` | 🟡 |


Las zonas 5 y 6 van juntas dentro de un contenedor `.doble` (dos columnas iguales).


## 3. CSS

### Qué va en cada archivo

| Archivo | Contiene |
| - | - |
| `base.css` | Variables `:root`, reset (`box-sizing`), estilos de `body`, enlaces y títulos, ayudas de accesibilidad (`.visually-hidden`, `.skip-link`) y logo híbrido |
| `layout.css` | Anchos máximos, cabecera, hero, rejillas (`.perfiles\_\_lista`, `.mas`, `.doble`), páginas internas, pie y `@media` |
| `components.css` | `.btn`, `.chips` y `.chip`, `.perfil-card` y derivados, `.sello`, `.search` y el aviso "en construcción" |


### Convención de nombres

BEM simplificado, en español y sin tildes:

```
.bloque            .perfil-card  
.bloque\_\_elemento  .perfil-card\_\_avatar
```

### Responsive

Un único punto de corte: **`max-width: 800px`**. Las rejillas de tarjetas usan `repeat(auto-fit, minmax(250px, 1fr))`, que se adaptan solas sin necesidad de `@media`.

### Variables

Tabla completa de colores y tipografía en el [README](file:///home/jheremy/Documentos/2do%20año/Proyecto%20ULAB/uddea-web/README.md#paleta-y-tipografía).


## 4. JavaScript (`js/main.js`)

Carga los perfiles dinámicamente desde el JSON, genera las tarjetas HTML, y filtra los resultados en el buscador de la home ignorando mayúsculas y tildes.

```
flowchart LR  
  A\["El usuario escribe en \#buscar"\] --\> B\["Evento input"\]  
  B --\> C\["limpiarTexto: minúsculas y sin tildes"\]  
  C --\> D\{"¿La tarjeta contiene el texto?"\}  
  D -- Sí --\> E\["display: block"\]  
  D -- No --\> F\["display: none"\]
```

Detalles a tener en cuenta:

- `limpiarTexto()` pasa a minúsculas y quita las tildes con `normalize("NFD")` para que "analisis" encuentre "Análisis".

- El formulario **no se envía** (`preventDefault`): la búsqueda ocurre en la propia página.

- Solo filtra elementos `.perfil-card`, que hoy existen únicamente en la home. En el resto de páginas el script no hace nada (comprueba antes que `\#buscar` exista).


## 5. Datos (`data/datos.json`)

Datos de ejemplo para sustituir los textos entre corchetes de las tarjetas. Los datos ya se cargan automáticamente en el index mediante fetch().

| Campo | Tipo | Ejemplo | Descripción |
| - | - | - | - |
| `id` | número | `1` | Identificador único |
| `nombre` | texto | `"Carlos M."` | Nombre mostrado |
| `rol` | texto | `"Dirección deportiva"` | Rol profesional |
| `club` | texto | `"Club Deportivo Norte"` | Club actual |
| `ciudad` | texto | “Madrid” | Ciudad |
| `validado` | booleano | `true` | Si muestra el sello "Trayectoria validada" |
| `avatar\_url` | texto | `""` | Ruta de la imagen (vacío = círculo gris) |


Plan previsto: `fetch("data/datos.json")` → recorrer `perfiles` → crear una `.perfil-card` por cada uno. Para que `fetch` funcione hay que usar un [servidor local](file:///home/jheremy/Documentos/2do%20año/Proyecto%20ULAB/uddea-web/README.md#cómo-ejecutarlo-en-local).

> Son datos de ejemplo. Conviene confirmar que los nombres son ficticios, para no asociar personas inventadas con clubes reales.


## 6. Recursos (`assets/`)

- `images/`: logo y otras imágenes. `icons/`: iconos.

- El logo actual es un **prototipo generado**. Sustituir por el oficial cuando UDDEA lo facilite y revisar entonces la paleta.


## 7. Accesibilidad (lo que ya se cumple)

- Enlace "Saltar al contenido" al principio de cada página.

- Etiqueta oculta (`.visually-hidden`) en el campo del buscador.

- Secciones con `aria-labelledby` y navegaciones con `aria-label`.

- `aria-current="page"` en el enlace de la página actual.

- Avatares decorativos con `aria-hidden="true"`; imágenes con `alt`.


## 8. Deuda técnica y pendientes

Detectados al revisar el código actual.

| Tema | Detalle | Prioridad |
| - | - | :-: |
| Estilos sin hacer | `.reto`, `.reto\_\_etiqueta`, `progress`, `.section-head`, `.lista`, `.mas\_\_item`, `.footer\_\_marca`, `.footer\_\_contacto` y `\[aria-current="page"\]` no tienen CSS | Alta |
| Buscador | Impide el envío del formulario y solo filtra tarjetas de la home, así que su `action="pages/perfiles.html"` queda sin efecto. Decidir si busca en la página o lleva al directorio | Alta |
| Nombre del logo | `Logo UDDEA simple(imagen prototipo generada).png` tiene espacios y paréntesis. Renombrar a `logo-uddea.png` y actualizar las 8 páginas | Media |
| Favicon | Solo está en `index.html`; falta en `pages/` (con ruta `../assets/...`) | Media |
| Comentarios de color | La cabecera de `base.css` y la sombra del hero en `layout.css` aún citan la paleta anterior (`\#0B3D2E`…) | Media |
| `@media` | `.hero` y `.site-footer` son `flex`, así que `grid-template-columns` no les afecta; basta con `flex-direction` | Baja |
| Cabecera y pie repetidos | Mantener 8 copias a mano. Más adelante, generarlos con JavaScript | Baja |
| Indentación | 2 espacios en `base.css` y 3 en `layout.css` y `components.css` | Baja |


