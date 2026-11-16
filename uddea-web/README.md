# UDDEA · Web de la comunidad digital del fútbol

Proyecto grupal de Informática 2. Versión **v0.1 (esqueleto HTML)**: estructura de la página, sin estilos ni comportamiento todavía.

## Estructura del proyecto

```
uddea-web/
├── index.html          Home (cabecera, portada, perfiles, empleo, foro, más, pie)
├── pages/              Una página HTML por apartado
│   ├── perfiles.html
│   ├── empleo.html
│   ├── foro.html
│   ├── mentoria.html
│   ├── certificacion.html
│   ├── encuentros.html
│   └── mi-cuenta.html
├── css/
│   ├── base.css        Variables, reset, tipografía
│   ├── layout.css      Cabecera, rejillas, pie, responsive
│   └── components.css  Botones, tarjetas, listas, buscador
├── js/
│   └── main.js         Comportamiento (se carga con defer)
├── assets/
│   ├── images/
│   └── icons/
├── docs/
│   └── GUIA_GIT.md     Guía de Git y GitHub para el equipo
├── .gitignore
└── README.md
```

## Cómo verlo en el navegador

Abre `index.html` con doble clic. (Opcional, con servidor local: `python -m http.server 8000` dentro de la carpeta y visita `http://localhost:8000`.)

## Reglas de trabajo en equipo

1. Nunca se trabaja directamente sobre `main`: cada tarea va en su **rama** (`feature/nombre-tarea`).
2. Antes de empezar: `git switch main` y `git pull`.
3. Commits pequeños y con mensaje claro (en español, en presente: "Añade estilos de la cabecera").
4. Se avisa al compañero antes de tocar el mismo archivo que él.
5. Los cambios entran en `main` mediante **Pull Request** en GitHub, revisada por la otra persona.

Detalle paso a paso en [`docs/GUIA_GIT.md`](docs/GUIA_GIT.md).

## Numeración del modelo visual → HTML

Los comentarios de `index.html` usan la misma numeración que el modelo visual de la home:
1 Cabecera · 2 Portada · 3 Reto de la semana · 4 Perfiles verificados · 5 Bolsa de empleo · 6 Foro temático · 7 Mentoría, certificación y encuentros · 8 Pie de página.
