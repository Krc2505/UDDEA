console.log("UDDEA: JavaScript funciona correctamente");
/* ==========================================================
   main.js — Comportamiento de la página
   ========================================================== */

let perfiles = [];

// Función nuestra para ignorar mayúsculas y tildes en el buscador
const limpiarTexto = (texto) => {
  if (!texto) return "";
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

document.addEventListener("DOMContentLoaded", () => {
  cargarPerfiles();
  iniciarBuscador();
  iniciarFiltroRol();
  iniciarMenuMovil();
});

async function cargarPerfiles() {
  const contenedor = document.getElementById("lista-perfiles");
  if (!contenedor) return;

  try {
    const rutaJSON = new URL("../data/datos.json", document.currentScript?.src || document.querySelector('script[src*="main.js"]').src);
    const respuesta = await fetch(rutaJSON);

    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON");

    const datos = await respuesta.json();
    if (!Array.isArray(datos.perfiles)) throw new Error("El JSON no contiene una lista de perfiles");

    perfiles = datos.perfiles;
    console.log("Perfiles guardados:", perfiles);

    const parametros = new URLSearchParams(window.location.search);
    const busqueda = parametros.get("q");

    if (busqueda) {
      const texto = limpiarTexto(busqueda.trim());
      const resultados = perfiles.filter((perfil) => {
        return (
          limpiarTexto(perfil.nombre).includes(texto) ||
          limpiarTexto(perfil.rol).includes(texto) ||
          limpiarTexto(perfil.club).includes(texto) ||
          (perfil.ciudad && limpiarTexto(perfil.ciudad).includes(texto))
        );
      });
      mostrarPerfiles(resultados);
    } else {
      mostrarPerfiles(perfiles);
    }
  } catch (error) {
    console.error("Error al cargar perfiles:", error);
    contenedor.textContent = "No se pudieron cargar los perfiles";
  }
}

function mostrarPerfiles(lista) {
  const contenedor = document.getElementById("lista-perfiles");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.textContent = "No se encontraron perfiles";
    return;
  }

  lista.forEach((perfil) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "perfil-card";

    const avatar = document.createElement("div");
    avatar.className = "perfil-card__avatar";
    avatar.setAttribute("aria-hidden", "true");

    const nombre = document.createElement("h3");
    nombre.textContent = perfil.nombre;

    const rol = document.createElement("p");
    rol.className = "perfil-card__rol";
    rol.textContent = perfil.rol;

    const club = document.createElement("p");
    club.className = "perfil-card__club";
    club.textContent = perfil.club;

    tarjeta.append(avatar, nombre, rol, club);

    if (perfil.verificado) {
      const sello = document.createElement("p");
      sello.className = "sello"; /* Usamos la clase de nuestro CSS */
      sello.textContent = "Perfil verificado";
      tarjeta.appendChild(sello);
    }

    contenedor.appendChild(tarjeta);
  });
}

function iniciarBuscador() {
  const formulario = document.getElementById("form-buscador");
  const input = document.getElementById("buscar");

  if (!formulario || !input) return;

  function filtrarPerfiles() {
    const texto = limpiarTexto(input.value.trim());

    const resultados = perfiles.filter((perfil) => {
      return (
        limpiarTexto(perfil.nombre).includes(texto) ||
        limpiarTexto(perfil.rol).includes(texto) ||
        limpiarTexto(perfil.club).includes(texto) ||
        (perfil.ciudad && limpiarTexto(perfil.ciudad).includes(texto))
      );
    });

    mostrarPerfiles(resultados);
  }

  input.addEventListener("input", filtrarPerfiles);

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    filtrarPerfiles();
  });
}

function iniciarFiltroRol() {
  const selector = document.getElementById("filtro-rol");
  if (!selector) return;

  selector.addEventListener("change", () => {
    const rolSeleccionado = selector.value;
    const parametros = new URLSearchParams(window.location.search);
    const texto = limpiarTexto(parametros.get("q") || "".trim());

    const resultados = perfiles.filter((perfil) => {
      const coincideRol = rolSeleccionado === "todos" || perfil.rol === rolSeleccionado;
      const coincideTexto =
        limpiarTexto(perfil.nombre).includes(texto) ||
        limpiarTexto(perfil.rol).includes(texto) ||
        limpiarTexto(perfil.club).includes(texto) ||
        (perfil.ciudad && limpiarTexto(perfil.ciudad).includes(texto));

      return coincideRol && coincideTexto;
    });
    mostrarPerfiles(resultados);
  });
}

function iniciarMenuMovil() {
  const boton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu-principal");

  if (!boton || !menu) return;

  function cambiarEstado(abierto) {
    boton.setAttribute("aria-expanded", String(abierto));
    menu.classList.toggle("menu-abierto", abierto);
    boton.textContent = abierto ? "✕" : "☰";
    boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  }

  boton.addEventListener("click", () => {
    const abierto = boton.getAttribute("aria-expanded") === "true";
    cambiarEstado(!abierto);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") cambiarEstado(false);
  });

  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => cambiarEstado(false));
  });
}