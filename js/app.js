/* =================================================================
   TechLab Portfolio — js/app.js
   Autor: Alexis Negrón Rodríguez

   Este archivo centraliza TODA la interacción JavaScript del sitio,
   enlazado desde cada página HTML con:
     <script src="js/app.js"></script>

   Contenido (Rúbrica 7.1 — Interacción con JavaScript):
     1. Carrusel de imágenes en la página de inicio (Bootstrap + JS)
     2. Hover para resaltar tarjetas de proyectos (mouseenter/mouseleave)
     3. Modal con detalles del proyecto al hacer clic en una tarjeta
     4. Validación de formulario de contacto con retroalimentación
        en tiempo real (input en vivo, no solo al enviar)

   Buenas prácticas aplicadas:
     - Código organizado en funciones con un solo propósito
     - Comentarios explicando el "qué" y el "por qué"
     - Verificación de existencia de elementos antes de manipularlos
       (para que este mismo archivo pueda enlazarse en cualquier
       página sin lanzar errores si una sección no existe ahí)
     - "use strict" para evitar errores silenciosos
   ================================================================= */

"use strict";

/* -----------------------------------------------------------------
   Punto de entrada único: se ejecuta cuando el DOM está listo,
   y cada módulo decide internamente si tiene trabajo que hacer
   en la página actual.
----------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  initHeroCarousel();
  initProjectCardInteractions();
  initContactFormValidation();
});


/* ===================================================================
   1. CARRUSEL DE IMÁGENES — Página de Inicio (index.html)
   ===================================================================
   Bootstrap ya provee la mecánica base del carrusel mediante
   data-bs-* attributes, pero aquí lo inicializamos y controlamos
   explícitamente vía JavaScript (new bootstrap.Carousel) para
   cumplir con el requisito de "implementar el carrusel utilizando
   JavaScript", y le añadimos un indicador de progreso personalizado
   que no viene de fábrica con Bootstrap.
=================================================================== */
function initHeroCarousel() {
  const carouselEl = document.getElementById("heroCarousel");
  if (!carouselEl) return; // Esta página no tiene carrusel — salir

  // Inicialización explícita vía JS (no solo data-attributes)
  const carousel = new bootstrap.Carousel(carouselEl, {
    interval: 4500,   // tiempo entre transiciones (ms)
    wrap: true,        // vuelve a la primera imagen al llegar al final
    keyboard: true,    // permite controlar con flechas del teclado
    pause: "hover"      // pausa al pasar el mouse por encima
  });

  // --- Barra de progreso personalizada sincronizada con el carrusel ---
  const progressBar = document.getElementById("carouselProgress");
  const slides = carouselEl.querySelectorAll(".carousel-item");
  const totalSlides = slides.length;

  function updateProgress(activeIndex) {
    if (!progressBar) return;
    const pct = ((activeIndex + 1) / totalSlides) * 100;
    progressBar.style.width = pct + "%";
  }

  // Detecta el índice de la diapositiva activa al cargar
  slides.forEach((slide, idx) => {
    if (slide.classList.contains("active")) updateProgress(idx);
  });

  // Bootstrap dispara este evento cada vez que termina una transición
  carouselEl.addEventListener("slid.bs.carousel", function (event) {
    updateProgress(event.to);
  });
}


/* ===================================================================
   2 y 3. INTERACCIÓN CON TARJETAS DE PROYECTOS
   ===================================================================
   - HOVER (mouseenter / mouseleave): resalta la tarjeta agregando
     una clase CSS que intensifica el brillo y eleva la tarjeta.
   - CLICK: abre un modal Bootstrap con los detalles ampliados del
     proyecto, leyendo la información desde un objeto de datos
     (en vez de duplicar HTML por cada proyecto).
=================================================================== */

// Base de datos de proyectos para el modal de detalles.
// Cada tarjeta en el HTML debe tener: data-project="clave"
const proyectosData = {
  robonexis: {
    titulo: "RoboNexis",
    categoria: "IA · Robótica",
    imagen: "img/robonexis.jpg",
    descripcion:
      "Sistema robótico modular que integra inteligencia artificial, " +
      "visión por computadora (OpenCV) y reconocimiento de voz (Vosk). " +
      "Diseñado para interpretar el entorno y ejecutar tareas mediante " +
      "actuadores físicos, optimizado para Raspberry Pi y Coral TPU.",
    tecnologias: ["Python", "OpenCV", "Vosk", "Raspberry Pi", "Coral TPU"],
    estado: "Activo"
  },
  p51: {
    titulo: "P51",
    categoria: "IA · Automatización",
    imagen: "img/p51.jpg",
    descripcion:
      "Sistema modular de asistencia basado en IA y automatización. " +
      "Permite comunicación en tiempo real entre múltiples dispositivos " +
      "mediante WebSockets y procesamiento de voz offline.",
    tecnologias: ["Python", "WebSockets", "Vosk"],
    estado: "En desarrollo"
  },
  cryostorm: {
    titulo: "CryoStorm",
    categoria: "Linux · Hardware",
    imagen: "img/Crystorm.jpg",
    descripcion:
      "Sistema operativo optimizado para alto rendimiento en hardware " +
      "de bajo consumo. Basado en Linux con kernel personalizado, " +
      "gestión de memoria avanzada y perfil térmico adaptativo.",
    tecnologias: ["Linux", "Kernel personalizado", "Optimización Térmica"],
    estado: "Próximamente"
  },
  mainframe: {
    titulo: "EGPU Mainframe",
    categoria: "Linux · Hardware",
    imagen: "img/laboratorio.jpg",
    descripcion:
      "Combina aceleración gráfica externa vía Thunderbolt con " +
      "almacenamiento redundante y control térmico activo en un " +
      "chasis S2200 modificado.",
    tecnologias: ["Linux", "eGPU", "Thunderbolt", "Hardware"],
    estado: "Activo"
  },
  nexcore: {
    titulo: "NexCore",
    categoria: "Linux · Hardware",
    imagen: "img/Nexcore.jpg",
    descripcion:
      "Robot diseñado para integrar sistemas físicos y digitales en " +
      "una unidad autónoma capaz de operar con reconocimiento, " +
      "comunicación, navegación y respuesta adaptativa en tiempo " +
      "real, sin depender de infraestructura externa ni conexión a la nube.",
    tecnologias: ["Linux", "Robótica", "Autonomía"],
    estado: "Activo"
  },
  asus: {
    titulo: "AsusE210M",
    categoria: "Windows · Hardware",
    imagen: "img/Asus.jpg",
    descripcion:
      "Sistema operativo optimizado para alto rendimiento en hardware " +
      "de bajo consumo. Basado en Windows con kernel personalizado, " +
      "gestión de memoria avanzada y perfil térmico adaptativo.",
    tecnologias: ["Windows", "Optimización", "Hardware"],
    estado: "Activo"
  },
  miniframe: {
    titulo: "Miniframe",
    categoria: "Linux · Hardware",
    imagen: "img/miniframe.jpg",
    descripcion:
      "Sistema operativo optimizado para alto rendimiento en hardware " +
      "de bajo consumo, con gestión de memoria avanzada y perfil " +
      "térmico adaptativo en un formato compacto.",
    tecnologias: ["Linux", "Hardware compacto", "Optimización"],
    estado: "Activo"
  },
  hydra: {
    titulo: "Hydra Prometheus-X2",
    categoria: "Linux · Hardware",
    imagen: "img/Hydra.jpg",
    descripcion:
      "RTX 3090 modificada para cargas extensas de inferencia de IA, " +
      "con disipación térmica reforzada y firmware ajustado para " +
      "máximo rendimiento sostenido.",
    tecnologias: ["RTX 3090", "AI Inference", "Hardware modificado"],
    estado: "Experimental"
  },
  touchpi: {
    titulo: "TouchPi",
    categoria: "IA · Automatización",
    imagen: "img/touchpi.jpg",
    descripcion:
      "Sistema modular HPC con integración entre Windows/Linux, " +
      "enfocado en inferencia de IA y automatización. Comunicación " +
      "en tiempo real mediante WebSockets, procesamiento de voz " +
      "offline e integración eGPU.",
    tecnologias: ["Windows", "Linux", "WebSockets", "eGPU"],
    estado: "Activo"
  }
};

function initProjectCardInteractions() {
  // Selecciona todas las tarjetas de proyecto que tengan data-project
  const cards = document.querySelectorAll("[data-project]");
  if (cards.length === 0) return; // No hay tarjetas en esta página

  const modalEl = document.getElementById("projectModal");
  const bsModal = modalEl ? new bootstrap.Modal(modalEl) : null;

  cards.forEach((card) => {

    /* --- HOVER: resaltar tarjeta con JavaScript ---------------------
       Aunque el CSS ya maneja :hover visualmente, aquí añadimos un
       comportamiento controlado por JS (clase + atributo aria) para
       cumplir explícitamente con el requisito de "resaltar productos
       al pasar el mouse por encima" mediante JavaScript. */
    card.addEventListener("mouseenter", function () {
      card.classList.add("card-resaltada");
    });

    card.addEventListener("mouseleave", function () {
      card.classList.remove("card-resaltada");
    });

    /* --- CLICK: abrir modal con detalles ----------------------------
       Al hacer clic (pero no si el clic fue directamente sobre el
       enlace "Leer más", que debe seguir navegando normalmente). */
    card.addEventListener("click", function (event) {
      const clickedLink = event.target.closest("a");
      if (clickedLink && clickedLink.hasAttribute("href")) {
        // Deja que el enlace "Leer más" funcione de forma normal
        return;
      }
      if (!bsModal) return;

      const key = card.getAttribute("data-project");
      mostrarDetalleProyecto(key);
      bsModal.show();
    });

    // Accesibilidad: también permite abrir el modal con teclado (Enter)
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const key = card.getAttribute("data-project");
        mostrarDetalleProyecto(key);
        if (bsModal) bsModal.show();
      }
    });
  });
}

/**
 * Llena el modal #projectModal con los datos del proyecto solicitado.
 * @param {string} key - Clave del proyecto dentro de proyectosData
 */
function mostrarDetalleProyecto(key) {
  const data = proyectosData[key];
  const modalEl = document.getElementById("projectModal");
  if (!data || !modalEl) return;

  modalEl.querySelector("#projectModalTitulo").textContent = data.titulo;
  modalEl.querySelector("#projectModalCategoria").textContent = data.categoria;
  modalEl.querySelector("#projectModalDescripcion").textContent = data.descripcion;
  modalEl.querySelector("#projectModalEstado").textContent = data.estado;

  const img = modalEl.querySelector("#projectModalImagen");
  img.src = data.imagen;
  img.alt = data.titulo;

  // Limpia y reconstruye la lista de tecnologías (tags)
  const tagsContainer = modalEl.querySelector("#projectModalTags");
  tagsContainer.innerHTML = "";
  data.tecnologias.forEach((tech) => {
    const span = document.createElement("span");
    span.className = "tech-tag";
    span.textContent = tech;
    tagsContainer.appendChild(span);
  });
}


/* ===================================================================
   4. VALIDACIÓN DE FORMULARIO — Contacto (contacto.html)
   ===================================================================
   A diferencia de la validación básica de Bootstrap (que solo se
   activa al enviar), aquí agregamos retroalimentación EN TIEMPO REAL:
   cada campo se valida mientras el usuario escribe ("input"), y al
   perder el foco ("blur"), mostrando mensajes específicos según
   el tipo de error encontrado.
=================================================================== */
function initContactFormValidation() {
  const form = document.getElementById("contactoForm");
  if (!form) return; // Esta página no tiene formulario de contacto

  const successMsg = document.getElementById("successMsg");

  const campos = {
    nombre: {
      el: form.querySelector("#nombre"),
      validar: (valor) => valor.trim().length >= 2,
      mensajeError: "Por favor, ingresa tu nombre (mínimo 2 caracteres)."
    },
    email: {
      el: form.querySelector("#email"),
      validar: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),
      mensajeError: "Por favor, ingresa un correo electrónico válido."
    },
    mensaje: {
      el: form.querySelector("#mensaje"),
      validar: (valor) => valor.trim().length >= 10,
      mensajeError: "El mensaje debe tener al menos 10 caracteres."
    }
  };

  /**
   * Valida un campo individual y actualiza sus clases visuales
   * (is-valid / is-invalid) y su mensaje de error en tiempo real.
   * @param {string} nombreCampo - clave dentro de `campos`
   * @returns {boolean} true si el campo es válido
   */
  function validarCampo(nombreCampo) {
    const campo = campos[nombreCampo];
    if (!campo || !campo.el) return true;

    const esValido = campo.validar(campo.el.value);

    campo.el.classList.toggle("is-valid", esValido);
    campo.el.classList.toggle("is-invalid", !esValido);

    // Actualiza el texto de error dinámicamente si existe el mensaje
    const feedback = campo.el.parentElement.querySelector(".invalid-feedback");
    if (feedback && campo.mensajeError) {
      feedback.textContent = campo.mensajeError;
    }

    return esValido;
  }

  // Retroalimentación en tiempo real: valida mientras el usuario escribe
  Object.keys(campos).forEach((nombreCampo) => {
    const campo = campos[nombreCampo].el;
    if (!campo) return;

    // "input" se dispara con cada tecla — feedback inmediato
    campo.addEventListener("input", () => validarCampo(nombreCampo));

    // "blur" refuerza la validación al salir del campo
    campo.addEventListener("blur", () => validarCampo(nombreCampo));
  });

  // Validación final + envío del formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    form.classList.add("was-validated");

    // Valida todos los campos registrados, incluso si el usuario
    // nunca interactuó con alguno (por ejemplo, lo dejó vacío)
    const resultados = Object.keys(campos).map(validarCampo);
    const formularioValido = resultados.every(Boolean);

    if (formularioValido) {
      form.style.display = "none";
      if (successMsg) successMsg.style.display = "block";
    } else {
      // Lleva el foco al primer campo inválido para mejor UX
      const primerInvalido = form.querySelector(".is-invalid");
      if (primerInvalido) primerInvalido.focus();
    }
  });
}
