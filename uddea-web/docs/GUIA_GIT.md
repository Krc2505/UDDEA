# Guía de Git y GitHub para el proyecto UDDEA

Pensada para quien casi no ha usado Git. Los comandos son para **CachyOS** (basado en Arch). Todo lo que va en bloques de código se escribe en la terminal.

---

## 0. Ideas clave (léelo una vez)

| Término | Qué es | Analogía |
|---|---|---|
| **Repositorio (repo)** | La carpeta del proyecto + todo su historial de cambios | Una carpeta con "máquina del tiempo" |
| **Commit** | Una foto del proyecto en un momento, con un mensaje que explica el cambio | Un punto de guardado de un videojuego |
| **Remoto (`origin`)** | La copia del repo que vive en GitHub | La copia compartida en la nube |
| **Local** | La copia que tienes en tu ordenador | Tu copia de trabajo |
| **`push`** | Sube tus commits locales a GitHub | Subir |
| **`pull`** | Baja a tu ordenador lo que otros subieron | Bajar |
| **`clone`** | Copia por primera vez un repo de GitHub a tu ordenador | Descargar el proyecto entero |
| **Rama (branch)** | Una línea de trabajo paralela, para no romper `main` | Un borrador aparte |
| **Pull Request (PR)** | Petición en GitHub para unir tu rama a `main`, con revisión | "Revisa esto antes de mezclarlo" |

**Los 3 estados de un archivo** (esto explica `add` y `commit`):

```
Carpeta de trabajo  --git add-->  Zona de preparación  --git commit-->  Historial
(editas aquí)                     (eliges qué entra)                    (foto guardada)
```

`git add` no guarda nada todavía: solo **elige** qué cambios irán en la próxima foto. `git commit` hace la foto.

---

## 1. Instalar y configurar Git (una sola vez por ordenador)

### 1.1 Instalar

```bash
sudo pacman -S git openssh
git --version
```

La última línea debe mostrar un número de versión. Si lo muestra, está instalado.

### 1.2 Decirle a Git quién eres

Cada commit lleva tu nombre y correo, y queda grabado en el commit. Se hace una sola vez con `--global`.

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu_correo@ejemplo.com"
git config --global init.defaultBranch main
```

- Usa el **mismo correo que tu cuenta de GitHub**, para que GitHub asocie tus commits contigo.
- La tercera línea hace que la rama principal se llame `main` (por defecto Git usaba `master`).

Comprobar:

```bash
git config --list
```

Debes ver `user.name`, `user.email` e `init.defaultBranch=main`.

---

## 2. Conectar tu ordenador con GitHub mediante SSH (una sola vez por ordenador)

SSH es un "carnet" digital: GitHub reconoce tu ordenador sin pedirte contraseña cada vez. Se crean **dos** archivos: la clave **privada** (nunca se comparte) y la **pública** (esta sí se sube a GitHub).

### 2.1 Crear la clave

```bash
ssh-keygen -t ed25519 -C "tu_correo@ejemplo.com"
```

- Cuando pregunte dónde guardarla, pulsa **Enter** (ruta por defecto).
- Cuando pida *passphrase*, puedes poner una contraseña (más seguro) o dejarla vacía con Enter.

### 2.2 Cargarla en el agente SSH

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 2.3 Copiar la clave pública

```bash
cat ~/.ssh/id_ed25519.pub
```

Copia **todo** el texto que sale (empieza por `ssh-ed25519`).

### 2.4 Añadirla a GitHub

En github.com: foto de perfil → **Settings** → **SSH and GPG keys** → **New SSH key** → pon un título (por ejemplo "Portátil CachyOS"), pega la clave y guarda.

### 2.5 Probar

```bash
ssh -T git@github.com
```

La primera vez preguntará si confías en el host: escribe `yes`. Debe responder con un mensaje de bienvenida con tu usuario de GitHub (no abre una terminal; es normal).

---

## 3. Crear el repositorio en GitHub (lo hace una sola persona)

1. En github.com: botón **+** (arriba a la derecha) → **New repository**.
2. **Repository name:** `uddea-web`.
3. Elige **Private** (solo lo verán las personas invitadas).
4. **No marques** "Add a README", ".gitignore" ni "license": ya los traemos en la carpeta y, si GitHub crea archivos, habría que unir historiales distintos.
5. **Create repository**. GitHub mostrará una página con la dirección SSH, del estilo `git@github.com:TU_USUARIO/uddea-web.git`. Esa es la que usarás abajo.

---

## 4. Subir el proyecto por primera vez (quien creó el repo)

Colócate en la carpeta del proyecto (la que contiene `index.html`):

```bash
cd ~/ruta/a/uddea-web
```

**Paso a paso, con qué hace cada comando:**

```bash
git init
```
Convierte la carpeta en repositorio (crea una carpeta oculta `.git` con el historial).

```bash
git status
```
Muestra qué archivos hay y cuáles no están seguidos todavía. **Úsalo muchísimo**: nunca hace daño.

```bash
git add .
```
Prepara todos los archivos para la primera foto.

```bash
git commit -m "Esqueleto HTML inicial de la web"
```
Hace la foto, con ese mensaje.

```bash
git branch -M main
```
Asegura que la rama se llama `main`.

```bash
git remote add origin git@github.com:TU_USUARIO/uddea-web.git
```
Le dice a Git: "el remoto se llama `origin` y está en esta dirección". Cambia `TU_USUARIO` por tu usuario real.

```bash
git push -u origin main
```
Sube tu rama `main` a GitHub. La opción `-u` recuerda la relación, así que después bastará con `git push` y `git pull`.

Recarga la página del repo en GitHub: deberías ver todos los archivos.

---

## 5. Invitar a tu compañero

En el repo de GitHub: **Settings** → en la barra lateral, apartado **Access** → **Collaborators** → **Add people** → busca su usuario de GitHub → **Add**. Le llega un correo y debe **aceptar la invitación**. (Las invitaciones a repositorios personales caducan si no se aceptan a tiempo.)

---

## 6. Tu compañero clona el proyecto

Cuando haya aceptado la invitación y haya hecho los pasos 1 y 2 en su ordenador:

```bash
cd ~/donde/quiera/guardar/proyectos
git clone git@github.com:TU_USUARIO/uddea-web.git
cd uddea-web
```

`clone` descarga todo el proyecto y deja ya configurado el remoto `origin`. No necesita `init` ni `remote add`.

---

## 7. Flujo de trabajo diario (los dos)

Regla de oro: **`main` siempre debe funcionar**. Cada tarea se hace en una rama.

**1) Ponte al día**
```bash
git switch main
git pull
```

**2) Crea tu rama** (nombre corto y descriptivo)
```bash
git switch -c feature/css-cabecera
```

**3) Trabaja** editando los archivos. Mira qué cambió cuando quieras:
```bash
git status
git diff
```

**4) Guarda tu trabajo en commits pequeños**
```bash
git add css/layout.css
git commit -m "Añade estilos de la cabecera"
```
Un commit = una idea. Mensajes en español, en presente, que expliquen *qué* hace el cambio.

**5) Sube tu rama**
```bash
git push -u origin feature/css-cabecera
```
(La primera vez con `-u`; las siguientes, solo `git push`.)

**6) Pull Request en GitHub:** al subir la rama, GitHub muestra un botón verde **Compare & pull request**. Ábrelo, escribe qué cambiaste y asigna al compañero como revisor. Cuando lo revise, se pulsa **Merge pull request**.

**7) Vuelve a `main` y actualízate**
```bash
git switch main
git pull
```

---

## 8. Cómo evitar (y resolver) conflictos

Un **conflicto** ocurre cuando dos personas cambian las mismas líneas del mismo archivo. Para evitarlos:

- Repartid el trabajo **por archivos**: por ejemplo, una persona `css/layout.css` y la otra `css/components.css`, o una persona el HTML de una página y la otra otra.
- Haced `git pull` en `main` antes de crear cada rama nueva.
- Avisad al compañero antes de tocar un archivo común (`index.html`).

Si aparece un conflicto, Git marca el archivo con `<<<<<<<`, `=======` y `>>>>>>>`: entre las marcas están las dos versiones. Se edita el archivo dejando la versión correcta, se borran las marcas y se hace `git add archivo` y `git commit`. **Si dudas, no borres nada: pregunta o pega el mensaje de Git.**

---

## 9. Chuleta de comandos

| Quiero… | Comando |
|---|---|
| Ver el estado | `git status` |
| Ver qué cambié (sin guardar) | `git diff` |
| Preparar un archivo | `git add ruta/archivo` |
| Hacer commit | `git commit -m "mensaje"` |
| Ver el historial | `git log --oneline` |
| Ver mis ramas | `git branch` |
| Crear y cambiar a una rama | `git switch -c nombre` |
| Cambiar de rama | `git switch nombre` |
| Subir | `git push` |
| Bajar novedades | `git pull` |
| Descargar un repo | `git clone dirección` |

---

## 10. Fuentes oficiales (para verificar)

- Pro Git (libro oficial de Git), "Configurando Git por primera vez": https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Configurando-Git-por-primera-vez
- Pro Git, capítulo 2 "Fundamentos de Git" y capítulo 3 "Ramificaciones en Git": https://git-scm.com/book/es/v2
- GitHub Docs, generar una clave SSH y añadirla al ssh-agent: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
- GitHub Docs, invitar colaboradores a un repositorio personal: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository
