=============================================
 TechLab Portfolio — README.txt
 Creación de una Página Web Responsiva con CSS, Bootstrap y JavaScript
=============================================

Autor:    Alexis Negrón Rodríguez
Curso:    Desarrollo Web
Fecha:    Junio 2026

---------------------------------------------
DESCRIPCIÓN DEL PROYECTO
---------------------------------------------

Este proyecto es un sitio web de portafolio personal (ficticio) llamado
"TechLab", dedicado al desarrollo tecnológico en las áreas de:

  - Inteligencia Artificial (IA)
  - Robótica
  - Linux y Windows (sistemas operativos)
  - Optimización de hardware
  - Desarrollo Web

El sitio fue construido con HTML5, CSS3, Bootstrap 5 y JavaScript,
cumpliendo los requisitos de estructura semántica, diseño responsivo,
componentes interactivos (carrusel, modal, hover), validación de
formularios en tiempo real y personalización completa de estilos.

---------------------------------------------
TECNOLOGÍAS UTILIZADAS
---------------------------------------------

  - HTML5 (estructura semántica con header, nav, main, section,
    article, aside, footer, form, etc.)
  - CSS3 personalizado (variables CSS, animaciones keyframe,
    Flexbox, media queries, modelo de caja)
  - Bootstrap 5.3 (navbar, cards, grid responsivo, carrusel,
    modal, validación de formularios, clases utilitarias)
  - JavaScript (js/app.js) — carrusel, interacciones hover/clic,
    modal de detalles y validación de formulario en tiempo real
  - Bootstrap Icons 1.11 (iconografía vectorial)
  - Google Fonts: Orbitron + Exo 2

---------------------------------------------
ESTRUCTURA DE ARCHIVOS
---------------------------------------------

TechLab-Portfolio/
├── index.html                      Página de inicio (carrusel hero)
├── portfolio.html                  Portafolio de proyectos (9 cards)
├── contacto.html                   Formulario de contacto
├── detalle-robonexis-n1.html       Detalle: RoboNexis
├── detalle-thunderdeck.html        Detalle: Thunderdeck
├── detalle-P51.html                Detalle: P51
├── detalle-NexCore.html            Detalle: NexCore
├── detalle-asus-e210m.html         Detalle: AsusE210M
├── detalle-mainframe.html          Detalle: EGPU Mainframe
├── detalle-micromainframe.html     Detalle: Miniframe
├── detalle-touchpi.html            Detalle: TouchPi
├── detalles-HydraPrometheus-X2.html Detalle: Hydra Prometheus-X2
├── css/
│   └── style.css                  Estilos CSS personalizados
├── js/
│   └── app.js                     Carrusel, hover, modal, validación
├── img/
│   ├── hero.jpg                   Imagen del hero principal
│   ├── robonexis.jpg              Imagen del proyecto RoboNexis
│   ├── thunderdeck.jpg            Imagen del proyecto Thunderdeck
│   ├── p51.jpg                    Imagen del proyecto P51
│   ├── Crystorm.jpg               Imagen del proyecto CryoStorm
│   ├── laboratorio.jpg            Imagen del proyecto EGPU Mainframe
│   ├── Nexcore.jpg                Imagen del proyecto NexCore
│   ├── Asus.jpg                   Imagen del proyecto AsusE210M
│   ├── miniframe.jpg              Imagen del proyecto Miniframe
│   ├── Micromainframe.jpg         Imagen del proyecto Miniframe (detalle)
│   ├── Hydra.jpg                  Imagen del proyecto Hydra Prometheus-X2
│   └── touchpi.jpg                Imagen del proyecto TouchPi
├── README.txt                     Este archivo
├── enlace_github.docx             Enlace al repositorio GitHub
└── video_demostracion.mp4         Video de demostración (screen recording)

Nota: la carpeta de imágenes debe llamarse exactamente "img" (sin
paréntesis ni texto adicional), ya que todo el código HTML referencia
las rutas como img/nombre.jpg. Cualquier otro nombre de carpeta
impedirá que las imágenes carguen en el navegador.

---------------------------------------------
PÁGINAS DEL SITIO WEB (12 EN TOTAL)
---------------------------------------------

1. INICIO (index.html)
   - Navbar Bootstrap con 3 enlaces (Inicio, Portafolio, Contacto)
   - HEADER convertido en carrusel Bootstrap (#heroCarousel) con
     3 diapositivas: presentación general, RoboNexis y Thunderdeck
   - Carrusel inicializado y controlado explícitamente vía
     JavaScript (new bootstrap.Carousel) con barra de progreso
     personalizada sincronizada a cada transición
   - Sección "Acerca de Mí" con perfil de Alexis Negrón
   - Sección de tecnologías favoritas con pills interactivos
   - Llamado a la acción (CTA) con botón hacia contacto

2. PORTAFOLIO (portfolio.html)
   - Navbar Bootstrap (consistente en todas las páginas)
   - Grid responsivo con 9 Bootstrap Cards:
       · RoboNexis              — IA y robótica
       · P51                    — IA y automatización
       · CryoStorm              — Linux y hardware
       · EGPU Mainframe         — Linux y hardware
       · NexCore                — Linux y hardware
       · AsusE210M              — Windows y hardware
       · Miniframe              — Linux y hardware
       · Hydra Prometheus-X2    — Hardware modificado para IA
       · TouchPi                — IA y automatización
   - Cada card tiene un atributo data-project enlazado a js/app.js:
       · HOVER (mouseenter/mouseleave): resalta la tarjeta
       · CLICK: abre un modal Bootstrap (#projectModal) con un
         resumen ampliado del proyecto (categoría, descripción,
         tecnologías y estado), sin salir de la página
   - Cada card incluye además botón "Leer Más" hacia su página
     de detalle individual
   - Diseño col-sm-6 / col-lg-4: 1 col móvil, 2 tablet, 3 escritorio

3. CONTACTO (contacto.html)
   - Formulario con validación EN TIEMPO REAL vía JavaScript
     (no solo al enviar): cada campo se valida en los eventos
     "input" y "blur", mostrando is-valid / is-invalid al instante
   - Campos: Nombre (type="text"), Correo (type="email"),
             Asunto (type="text"), Mensaje (textarea)
   - Mensajes de retroalimentación dinámicos: invalid-feedback /
     valid-feedback actualizados desde js/app.js
   - Información de contacto adicional: correo, teléfono, ubicación
   - Al enviar correctamente se muestra un mensaje de éxito

4-12. PÁGINAS DE DETALLE (9 páginas)
   - detalle-robonexis-n1.html, detalle-thunderdeck.html,
     detalle-P51.html, detalle-NexCore.html, detalle-asus-e210m.html,
     detalle-mainframe.html, detalle-micromainframe.html,
     detalle-touchpi.html, detalles-HydraPrometheus-X2.html
   - Cada una incluye: hero con su respectiva imagen de fondo del proyecto,
     descripción completa, tags de tecnologías utilizadas,
     panel con datos del proyecto (estado, plataforma) y
     navegación de regreso al portafolio

---------------------------------------------
INTERACCIÓN CON JAVASCRIPT (js/app.js)
---------------------------------------------

El archivo js/app.js contiene toda la lógica de interaccion del
sitio y este se enlaza desde las 12 páginas con <script src="js/app.js">.
Contiene 4 módulos, cada uno verifica si su sección existe en la
página actual antes de ejecutarse:

  1. initHeroCarousel()
     Inicializa el carrusel de index.html vía JavaScript
     (new bootstrap.Carousel) y sincroniza una barra de progreso
     personalizada con el evento "slid.bs.carousel".

  2. initProjectCardInteractions()
     - mouseenter / mouseleave: añade/quita la clase .card-resaltada
       para resaltar visualmente la tarjeta bajo el cursor.
     - click: abre #projectModal y lo llena dinámicamente con los
       datos del proyecto (objeto proyectosData), sin recargar
       la página. También funciona con teclado (tecla Enter).

  3. mostrarDetalleProyecto(key)
     Función auxiliar que inserta título, categoría, imagen,
     descripción, tecnologías y estado del proyecto dentro del
     modal de detalles.

  4. initContactFormValidation()
     Valida nombre, correo y mensaje en tiempo real (eventos
     "input" y "blur"), antes de que el usuario intente enviar
     el formulario, y revalida todo al hacer submit.

---------------------------------------------
CARACTERÍSTICAS DE HTML5 UTILIZADAS
---------------------------------------------

  - Elementos semánticos: <header>, <nav>, <main>, <section>,
    <footer>, <article>, <aside>
  - Atributos de accesibilidad: aria-label, aria-current, role,
    aria-controls, aria-expanded, aria-hidden, tabindex
  - Formularios HTML5: type="email", required, minlength,
    autocomplete, placeholder
  - Meta tags: charset, viewport, description
  - Comentarios explicativos en cada archivo HTML y en js/app.js

---------------------------------------------
DISEÑO RESPONSIVO
---------------------------------------------

  Bootstrap maneja la responsividad principal mediante su sistema
  de grid (col-sm-*, col-md-*, col-lg-*):

  - Móvil (< 576px):  1 columna apilada en todas las secciones
  - Tablet (≥ 576px): 2 columnas en el portafolio (col-sm-6)
  - Escritorio (≥ 992px): 3 columnas en portafolio (col-lg-4),
    layout de 2 columnas en contacto y páginas de detalle

  El CSS personalizado agrega:
  - Media queries adicionales para el carrusel, modal y secciones
    en pantallas menores a 768px
  - background-attachment: scroll en móvil (evita bug de iOS)
  - Tamaños de fuente fluidos con clamp()

---------------------------------------------
PERSONALIZACIÓN DE ESTILOS (css/style.css) Colores Utilizados En el Mismo
---------------------------------------------

  Paleta de colores (variables CSS :root):
    --azul:        #003366  (azul oscuro principal)
    --azul-medio:  #0a4fa6  (azul navegación)
    --azul-claro:  #1a73e8  (azul interactivo)
    --gris:        #f5f5f5  (gris claro)
    --oscuro:      #0d0d0d  (fondo oscuro principal)
    --blanco:      #ffffff  (texto blanco)
    --acento:      #00c8ff  (cian eléctrico — color distintivo)

  Fuentes:
    - Orbitron    títulos y navbar brand (estilo tech/futurista)
    - Exo 2       cuerpo del texto (legible y moderno)

  Modelo de caja aplicado explícitamente en .card, .modal-content
  y secciones (margin, padding, border).

  Animaciones:
    - fadeInUp        entrada suave del contenido del carrusel
    - transition      hover en cards (.card-resaltada)
    - transition      hover en nav-links (línea inferior cian)
    - carousel-progress barra de progreso sincronizada con JS
    - Scrollbar       personalizada con color de acento

---------------------------------------------
REPOSITORIO GITHUB
---------------------------------------------

https://github.com/SKULLGHOSTMONSTERCUPTEA/EvaluacionFinal

  (Ver también enlace_github.docx adjunto)

---------------------------------------------
NOTAS ADICIONALES
---------------------------------------------

  - Las imágenes deben colocarse en una carpeta llamada exactamente
    "img" (sin paréntesis ni texto adicional) en la raíz del
    proyecto, con los nombres de archivo indicados en la sección
    de estructura de archivos.
  - Si alguna imagen no está disponible, el sitio muestra
    automáticamente un placeholder con ícono y gradiente CSS
    (atributo onerror en cada <img>).
  - Todos los datos de contacto y la información personal son
    ficticios, creados únicamente con fines académicos.

=============================================
