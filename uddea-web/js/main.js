console.log("UDDEA: JavaScript funciona correctamente");
/* ==========================================================
   main.js — Comportamiento de la página
   Se carga con "defer" en todas las páginas, así que el HTML
   ya existe cuando se ejecuta.
   Ideas para más adelante: menú móvil, buscador, filtros del
   directorio de perfiles, contador de progreso del reto.
   ========================================================== */

let perfiles = []; // Variable global para almacenar los perfiles

document.addEventListener("DOMContentLoaded", () => {
  // Punto de entrada: aquí iremos inicializando cada función.
  cargarPerfiles();
  iniciarBuscador();
  iniciarFiltroRol();
  iniciarMenuMovil();
});

async function cargarPerfiles() {
    const contenedor = document.getElementById("lista-perfiles")

      //Esta función solo de va a ejecutar donde exista la lista
      if(!contenedor) return;

      try{
        // Lee el archivo JSON
        const rutaJSON = new URL("../data/datos.json", document.currentScript?.src || document.querySelector('script[src*="main.js"]').src);
        const respuesta = await fetch(rutaJSON);

        if(!respuesta.ok){
          throw new Error("No se pudo cargar el archivo JSON");
        }

        // Convierte el JSON en un objeto JavaScript
        const datos = await respuesta.json();

        //Comprueba que los perfiles sean una lista
        if(!Array.isArray(datos.perfiles)){
          throw new Error("El JSON no contiene una lista de perfiles");
        }

        // Guardamos los perfiles para poder usarlos en el buscador
        perfiles = datos.perfiles; // Almacena los perfiles en la variable global
        console.log("Perfiles guardados:", perfiles);

        
        const parametros = new URLSearchParams(window.location.search);
        const busqueda = parametros.get("q");

        if (busqueda) {
          const texto = busqueda.trim().toLowerCase();
          const resultados = perfiles.filter((perfil) => {
            return (perfil.nombre.toLowerCase().includes(texto) ||
                    perfil.rol.toLowerCase().includes(texto) ||
                    perfil.club.toLowerCase().includes(texto) ||
                    perfil.ciudad.toLowerCase().includes(texto));
          });

        mostrarPerfiles(resultados);
        } else {
        mostrarPerfiles(perfiles);
        }
      }catch (error){
        console.error("Error al cargar perfiles:", error);
        contenedor.textContent = "No se pudieron cargar los perfiles"
      }
  }

  function mostrarPerfiles(lista){
    const contenedor = document.getElementById("lista-perfiles");

    if (!contenedor) return;

    //Limpia el contenedor
    contenedor.innerHTML = "";

    if(lista.length === 0){
      contenedor.textContent = "No se encontraron perfiles";
      return;
    }

        // Se crea una tarjeta por cada perfil
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

          if(perfil.verificado){
            const sello = document.createElement("p");
            sello.className = "perfil-card__sello";
            sello.textContent = "Perfil de prueba";
            tarjeta.appendChild(sello);
          }

          contenedor.appendChild(tarjeta);
        });
  }

  
  function iniciarBuscador() {
    const formulario = document.getElementById("form-buscador");
    const input = document.getElementById("buscar");

    if (!formulario || !input) return;

    // Función que realiza la búsqueda
    function filtrarPerfiles() {
      const texto = input.value.trim().toLowerCase();

      const resultados = perfiles.filter((perfil) => {
        return (perfil.nombre.toLowerCase().includes(texto) ||
                perfil.rol.toLowerCase().includes(texto) ||
                perfil.club.toLowerCase().includes(texto) ||
                perfil.ciudad.toLowerCase().includes(texto)
      );
    });

     mostrarPerfiles(resultados);
    }

    // Buscar automáticamente mientras escribimos
    input.addEventListener("input", filtrarPerfiles);

    // Buscar al pulsar el botón o Enter
    formulario.addEventListener("submit", (event) => {
      event.preventDefault();
      filtrarPerfiles();
    });
  }

      
  function iniciarFiltroRol() {
    const selector = document.getElementById("filtro-rol");

    // Si la página no tiene filtro, terminamos.
    if (!selector) return;

    selector.addEventListener("change", () => {
      const rolSeleccionado = selector.value;
      const parametros = new URLSearchParams(window.location.search);
      const texto = (parametros.get("q") || "").trim().toLowerCase();

      const resultados = perfiles.filter((perfil) => {
        if (perfil.nombre === "Carlos Martínez") {
      } 
      const coincideRol = rolSeleccionado === "todos" || perfil.rol === rolSeleccionado;
      const coincideTexto = perfil.nombre.toLowerCase().includes(texto) ||
                            perfil.rol.toLowerCase().includes(texto) ||
                            perfil.club.toLowerCase().includes(texto) ||
                            perfil.ciudad.toLowerCase().includes(texto);

      return coincideRol && coincideTexto;
    });
    console.log("Resultados finales:", resultados);
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

    boton.setAttribute(
      "aria-label",
      abierto
        ? "Cerrar menú de navegación"
        : "Abrir menú de navegación"
    );
  }

  // Abrir y cerrar al pulsar el botón
  boton.addEventListener("click", () => {
    const abierto =
      boton.getAttribute("aria-expanded") === "true";

    cambiarEstado(!abierto);
  });

  // Cerrar al pulsar Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cambiarEstado(false);
    }
  });

  // Cerrar al pulsar un enlace
  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      cambiarEstado(false);
    });
  });
}


