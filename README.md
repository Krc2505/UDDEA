# UDDEA · Comunidad digital del fútbol profesional

Página web de **UDDEA**, una comunidad digital pensada para reunir a los profesionales del fútbol (dirección deportiva, secretaría técnica, análisis, jugadores, clubes y partners): algo así como *el LinkedIn del sector deportivo*.

Proyecto grupal de la asignatura **Informática 2**, desarrollado para la empresa UDDEA.

> **Estado:** versión **0.2 en desarrollo**. La estructura HTML está completa, los estilos base están aplicados y hay un primer comportamiento en JavaScript (buscador en vivo). Los contenidos de las páginas internas y varios bloques de la home están todavía por diseñar. Detalle en [`CHANGELOG.md`](file:///home/jheremy/Documentos/2do%20año/Proyecto%20ULAB/uddea-web/CHANGELOG.md).


## Contenido

- [Estado actual](#estado-actual)

- [Tecnologías](#tecnologías)

- [Estructura del repositorio](#estructura-del-repositorio)

- [Cómo ejecutarlo en local](#cómo-ejecutarlo-en-local)

- [Mapa de la home](#mapa-de-la-home)

- [Paleta y tipografía](#paleta-y-tipografía)

- [Documentación](#documentación)

- [Equipo y contacto](#equipo-y-contacto)


## Estado actual

| Elemento | HTML | CSS | JS |
| - | :-: | :-: | :-: |
| **Home** (`index.html`) | ✅ completo | 🟡 parcial | ✅ carga dinámica y buscador |
| **Perfiles, Empleo, Foro, Mentoría, Certificación, Encuentros, Mi cuenta** (`pages/`) | ✅ esqueleto | 🟡 solo cabecera, pie y aviso "en construcción" | ⏳ |
| **Datos** (`data/datos.json`) | — | — | ✅ conectado al JS |


✅ hecho · 🟡 en progreso · ⏳ pendiente


## Tecnologías

- **HTML5** semántico y accesible.

- **CSS3** con variables (`:root`), Flexbox y Grid. Sin frameworks.

- **JavaScript** puro (*vanilla*), cargado con `defer`.

- **Git y GitHub** para el trabajo en equipo.

No hay paso de compilación ni dependencias: basta con abrir los archivos en el navegador.


## Estructura del repositorio

```
uddea-web/  
├── index.html                 Home  
├── pages/                     Una página HTML por apartado  
│   ├── perfiles.html  
│   ├── empleo.html  
│   ├── foro.html  
│   ├── mentoria.html  
│   ├── certificacion.html  
│   ├── encuentros.html  
│   └── mi-cuenta.html  
├── css/  
│   ├── base.css               Variables, reset, tipografía, logo  
│   ├── layout.css             Cabecera, hero, rejillas, pie, responsive  
│   └── components.css         Botones, chips, tarjetas de perfil, buscador  
├── js/  
│   └── main.js                Buscador en vivo  
├── data/  
│   └── datos.json             Datos de ejemplo (perfiles)  
├── assets/  
│   ├── images/                Logo y otras imágenes  
│   └── icons/  
├── docs/  
│   ├── ARQUITECTURA.md        Cómo está construida la web  
│   └── GUIA\_GIT.md            Guía de Git y GitHub para el equipo  
├── CONTRIBUTING.md            Cómo colaborar (ramas, commits, revisión)  
├── CHANGELOG.md               Historial de versiones  
├── .gitignore  
└── README.md
```


## Cómo ejecutarlo en local

**Opción 1: abrir el archivo.** Doble clic en `index.html`. Vale para ver la estructura y los estilos.

**Opción 2: servidor local (recomendada).** Necesaria cuando se use `fetch` para cargar `data/datos.json`, porque los navegadores suelen bloquear esas peticiones si la página se abre como archivo (`file://`).

```
cd uddea-web  
python -m http.server 8000
```

Después, abre `http://localhost:8000` en el navegador. Para parar el servidor, `Ctrl + C`.


## Mapa de la home

Los comentarios de `index.html` usan esta numeración, que coincide con el modelo visual del proyecto.

| Nº | Zona | Clase principal | Estilos |
| :-: | - | - | :-: |
| 1 | Cabecera y navegación | `.site-header` | ✅ |
| 2 | Portada y buscador | `.hero` | ✅ |
| 3 | Reto de la semana | `.reto` | ⏳ |
| 4 | Perfiles verificados | `.perfiles` · `.perfil-card` | ✅ |
| 5 | Bolsa de empleo | `.empleo` · `.lista` | ⏳ |
| 6 | Foro temático | `.foro` · `.lista` | ⏳ |
| 7 | Mentoría, certificación y encuentros | `.mas` · `.mas\_\_item` | 🟡 rejilla sí, tarjeta no |
| 8 | Pie de página | `.site-footer` | 🟡 |


```
flowchart TD  
  Inicio --\> Perfiles & Empleo & Foro & Mentoría & Certificación & Encuentros & MiCuenta\["Mi cuenta"\]
```


## Paleta y tipografía

Definidas como variables en `css/base.css`. **Siempre se usan las variables, no el código del color.**

| Variable | Valor | Uso |
| - | - | - |
| `--color-primario` | `\#125B65` | Títulos, texto del logo, degradado del hero |
| `--color-secundario` | `\#57897E` | Enlaces, botones, degradado del hero |
| `--color-acento` | `\#0C4249` | Hover de elementos oscuros |
| `--color-alerta` | `\#F2A93B` | Avisos e insignias (ámbar) |
| `--color-fondo` | `\#F9FAFB` | Fondo de la página |
| `--color-superficie` | `\#FFFFFF` | Tarjetas |
| `--color-texto` | `\#1F2937` | Texto principal |
| `--color-texto-claro` | `\#6B7280` | Texto secundario |


**Tipografía:** pila del sistema (`system-ui`, `Segoe UI`, `Roboto`…), sin fuentes externas.

> Los colores se extrajeron del **logo prototipo** (`assets/images/`). Hay que confirmarlos con UDDEA cuando facilite su identidad visual definitiva.


## Documentación

| Documento | Para qué sirve |
| - | - |
| [`docs/ARQUITECTURA.md`](file:///home/jheremy/Documentos/2do%20año/Proyecto%20ULAB/uddea-web/docs/ARQUITECTURA.md) | Cómo está construida la web: HTML, CSS, JS, datos y pendientes técnicos |
| [`CONTRIBUTING.md`](file:///home/jheremy/Documentos/2do%20año/Proyecto%20ULAB/uddea-web/CONTRIBUTING.md) | Flujo de trabajo del equipo, convenciones y revisión |
| [`docs/GUIA\_GIT.md`](file:///home/jheremy/Documentos/2do%20año/Proyecto%20ULAB/uddea-web/docs/GUIA_GIT.md) | Guía de Git y GitHub paso a paso |
| [`CHANGELOG.md`](file:///home/jheremy/Documentos/2do%20año/Proyecto%20ULAB/uddea-web/CHANGELOG.md) | Qué cambió en cada versión |



## Equipo y contacto

- **Equipo de desarrollo:** \[nombres de los integrantes\]

- **Empresa:** UDDEA · [info@uddea.es](mailto:info@uddea.es)

