type Sesion = {
  title: string
  start: string
  tasks: string[]
  check: string
  visual: string
  docs: [label: string, path: string][]
  styles?: { label: string; goal: string; docs: Sesion["docs"] }[]
}

export const sesiones: Sesion[] = [
  {
    title: 'Crea la cabecera de BikeStore',
    start: 'Abre src/Proyecto.tsx. Convierte el bloque de prueba de «Tu escaparate» en la primera cabecera del catálogo.',
    tasks: [
      'Localiza el plugin de Tailwind en vite.config.ts y la importación de Tailwind en src/styles/global.css.',
      'Estructura. Sustituye el párrafo de prueba por un <header> que contenga un <h3> con el texto «BikeStore».',
      'Fondo. Pon un verde esmeralda oscuro en la cabecera.',
      'Esquinas. Redondea las esquinas de la cabecera.',
      'Espacio interior. Da a la cabecera 24 px por los cuatro lados.',
      'Color del texto. Haz que el título se lea en blanco. Puedes aplicar el color a la cabecera para que el título lo herede.',
      'Tipografía. Aumenta el tamaño del título y ponlo en negrita. Guarda y comprueba los cambios en «Tu escaparate».',
    ],
    check: '«BikeStore» aparece como encabezado de nivel 3, en blanco y negrita sobre un fondo verde oscuro. En DevTools, comprueba que el bloque tiene 24 px de espacio interior por cada lado.',
    visual: 'Cabecera esmeralda con esquinas redondeadas, espacio interior y el título BikeStore en blanco.',
    docs: [['Instalación con Vite', 'installation/using-vite'], ['Clases de utilidad', 'styling-with-utility-classes']],
  },
  {
    title: 'Construye tu primera tarjeta',
    start: 'En src/Proyecto.tsx, añade un <article> debajo de la cabecera de BikeStore.',
    tasks: [
      'Consulta bicycles.ts y escribe a mano los datos de Aljibe City. Usa un <h3> para el nombre y párrafos para categoría, descripción y precio. Conectarás el servicio en la sesión 6.',
      'Carga la foto con una variable para su URL y añade texto alternativo.',
    ],
    check: 'Compara la ficha con la referencia. Prueba a 375 px de ancho y con zoom al 200 %. Comprueba que el nombre puede ocupar dos líneas, que no se corta el texto y que el precio se encuentra de un vistazo.',
    visual: 'Ficha de Aljibe City con foto, categoría, nombre, descripción y precio debajo de la cabecera.',
    docs: [],
    styles: [
      {"label": "Tarjeta", "goal": "24 px bajo la cabecera · máximo 384 px · fondo blanco · borde de 1 px en gris piedra (stone, tono 200), de la misma familia que el fondo del lab · radio de 12 px · sombra suave · recorta el contenido que sobresalga.", "docs": [["Margen", "margin"], ["Ancho máximo", "max-width"], ["Esquinas", "border-radius"], ["Sombra", "box-shadow"], ["Paleta de colores", "colors"], ["Recorte (Overflow)", "overflow#hiding-content-that-overflows"]]},
      {"label": "Foto", "goal": "Ancho completo · marco 3:2. La foto debe llenar todo el marco, sin franjas vacías ni deformación. Si hace falta, recorta los bordes. Comprueba que se ven las dos ruedas.", "docs": [["Ancho", "width#using-a-percentage"], ["Proporción", "aspect-ratio#using-a-custom-value"], ["Ajuste de imagen", "object-fit#covering-a-container"]]},
      {"label": "Bloque de textos", "goal": "16 px de espacio interior por cada lado.", "docs": [["Padding", "padding"]]},
      {"label": "Categoría", "goal": "14 px · seminegrita · verde esmeralda oscuro.", "docs": [["Tamaño", "font-size"], ["Peso", "font-weight"], ["Color", "colors"]]},
      {"label": "Nombre <h3>", "goal": "20 px · negrita · gris piedra muy oscuro · margen superior de 4 px.", "docs": [["Tamaño", "font-size"], ["Peso", "font-weight"], ["Margen", "margin"]]},
      {"label": "Descripción", "goal": "14 px · gris piedra medio oscuro · margen superior de 8 px.", "docs": [["Tamaño", "font-size"], ["Margen", "margin"]]},
      {"label": "Precio", "goal": "16 px · seminegrita · gris piedra muy oscuro · margen superior de 16 px.", "docs": [["Peso", "font-weight"], ["Margen", "margin"]]},
    ],
  },
  {
    title: 'De una ficha a una cuadrícula',
    start: 'Continúa en src/Proyecto.tsx. Conserva la cabecera y la ficha de Aljibe City.',
    tasks: [
      'Añade un <ul> bajo la cabecera. Mueve la ficha de Aljibe City a un <li> y crea dos <li> más, uno por bicicleta.',
      'Duplica la estructura de la ficha y cambia los datos, la foto y su alt para Caldera Gravel y Pinar Trail.',
      'Empieza por Aljibe City. Dentro del bloque de textos, localiza el párrafo de 549 €, justo debajo de la descripción.',
      'Envuelve solo ese párrafo en un <div> nuevo. Dentro del mismo <div>, después del </p> del precio, añade otro párrafo que diga «Disponible». Guarda y comprueba que aparecen los dos textos.',
      'Quita mt-4 del párrafo del precio y ponlo en el <div> nuevo. Así los 16 px separan de la descripción el precio y el estado juntos.',
      'Aplica Flexbox al <div> nuevo. Alinea el precio a la izquierda y «Disponible» a la derecha cuando quepan en la misma fila.',
      'Cuando funcione en Aljibe City, repite la fila en Caldera Gravel (989 €, «Disponible») y Pinar Trail (749 €, «Agotada»).',
    ],
    check: 'En «Tu escaparate», comprueba que hay dos fichas arriba y una debajo, con las tres fotos y el estado correcto. Revisa que el precio y la disponibilidad sigan legibles al estrechar la ventana.',
    visual: 'Tres fichas en dos columnas. Cada ficha muestra el precio a la izquierda y el estado a la derecha.',
    docs: [],
    styles: [
      {"label": "Cuadrícula <ul>", "goal": "Grid organiza los <li> de la lista en filas y columnas. Actívalo en el <ul>: dos columnas iguales, 16 px entre fichas y 24 px bajo la cabecera. Mueve el margen superior de las fichas a la lista.", "docs": [["Columnas de Grid", "grid-template-columns"], ["Separación", "gap"], ["Margen", "margin"]]},
      {"label": "Ficha dentro de <li>", "goal": "Conserva la estructura y los estilos de la sesión 2. Deja que la ficha llene su columna.", "docs": [["Ancho máximo", "max-width"]]},
      {"label": "Fila de precio y estado", "goal": "Flexbox alinea los dos <p> hijos del <div>. En la fila, el eje principal es horizontal y el transversal es vertical. Centra los textos verticalmente, deja 8 px entre ellos y permite que salten de línea si falta espacio.", "docs": [["Distribución", "justify-content"], ["Alineación", "align-items"], ["Salto de línea", "flex-wrap"], ["Separación", "gap"]]},
      {"label": "Disponibilidad", "goal": "14 px y seminegrita en ambos estados. Usa verde esmeralda oscuro (emerald 800) para «Disponible» y rojo rosado oscuro (rose 800) para «Agotada». Conserva el texto visible en los dos casos.", "docs": [["Tamaño", "font-size"], ["Peso", "font-weight"], ["Paleta de colores", "colors"]]},
    ],
  },
  {
    title: 'Adapta el escaparate a la pantalla',
    start: 'Continúa en src/Proyecto.tsx con la cabecera de BikeStore y las tres fichas de la sesión 3.',
    tasks: [
      'Primero, cambia las columnas del <ul> que contiene las fichas. Prueba los tres anchos antes de seguir.',
      'Después, construye la cabecera con los dos enlaces visibles a cualquier ancho. Pruébalos antes de añadir el botón.',
      'Por último, usa estado de React para abrir y cerrar el menú en móvil.',
    ],
    check: 'En DevTools, prueba 375, 640 y 1024 px. En móvil, llega al botón con Tab y ábrelo o ciérralo con Enter o espacio. Prueba el enlace Bicicletas. Desde 640 px, comprueba que los enlaces siguen visibles sin pulsar el botón. Revisa que no haya desplazamiento horizontal.',
    visual: 'En móvil se muestra una columna con el menú cerrado y abierto. Al abrirlo se ven Inicio y Bicicletas. En tableta y escritorio ambos enlaces aparecen en la cabecera, junto a dos o tres columnas.',
    docs: [],
    styles: [
      {"label": "Cuadrícula <ul>", "goal": "De 0 a 639 px, 1 columna. Desde 640 px, 2. Desde 1024 px, 3. Mantén los 16 px entre fichas y los 24 px bajo la cabecera.", "docs": [["Puntos de corte", "responsive-design"], ["Columnas de Grid", "grid-template-columns"]]},
      {"label": "Cabecera y navegación", "goal": "Conserva el <header> verde. Debajo del título, añade un <nav> con aria-label=\"Navegación del escaparate\". El nombre accesible distingue este menú del de sesiones.", "docs": []},
      {"label": "Lista de enlaces <ul>", "goal": "Usa un <li> para cada enlace. Separa la lista 12 px del título con mt-3. Usa flex-col para apilar los enlaces en móvil, sm:flex-row para ponerlos en fila desde 640 px y gap-4 para dejar 16 px entre ellos. Quita el margen superior desde 640 px con sm:mt-0.", "docs": [["Margen", "margin"], ["Dirección de Flexbox", "flex-direction"], ["Separación", "gap"]]},
      {"label": "Enlaces <a>", "goal": "Subraya ambos enlaces. «Inicio» usa href=\"#inicio\" y «Bicicletas» usa href=\"#bicicletas\". Pon los id correspondientes en la cabecera y en la lista de fichas. Prueba los dos enlaces antes de crear el menú móvil.", "docs": []},
      {"label": "Menú móvil · menos de 640 px", "goal": "Coloca un botón hamburguesa a la derecha de BikeStore, entre el título y el <nav> en el código. Usa dos columnas en la cabecera y deja que la navegación ocupe ambas debajo. Los enlaces empiezan ocultos; al pulsar se muestran dentro de la cabecera verde. Da al botón el nombre accesible «Menú del escaparate» y usa aria-expanded y aria-controls.", "docs": [["Mostrar y ocultar elementos", "display"], ["Puntos de corte", "responsive-design"]]},
      {"label": "Navegación · desde 640 px", "goal": "Muestra el título a la izquierda y ambos enlaces en fila a la derecha. Oculta el botón hamburguesa. Los enlaces deben verse aunque el menú móvil estuviera cerrado.", "docs": [["Mostrar y ocultar elementos", "display"], ["Puntos de corte", "responsive-design"]]},
    ],
  },
  {
    title: 'Diseña los estados y el tema oscuro',
    start: 'Continúa en src/Proyecto.tsx. Trabaja primero en los botones de las fichas y después en el tema de la cabecera.',
    tasks: [
      'Añade un botón debajo de la fila de precio y disponibilidad de cada ficha. Escribe «Ver ficha» en Aljibe City y Caldera Gravel y «Agotada» en Pinar Trail.',
      'Aplica los estados del botón y pruébalos con ratón y teclado antes de añadir el selector de tema.',
      'Cuando funcione el selector, activa el tema oscuro y adapta primero la ficha de Aljibe City siguiendo las indicaciones de cada elemento. Vuelve al tema claro para comprobar que conserva su aspecto. Después aplica el mismo criterio a las otras fichas.',
    ],
    check: 'Comprueba el cambio al pasar el ratón y el foco visible al usar Tab. El botón agotado debe permanecer inactivo. Alterna ambos temas y revisa que textos, fichas y botones se puedan leer.',
    visual: 'La ficha de Aljibe City en modo claro y oscuro. Debajo se comparan cuatro botones: normal, con puntero encima, con foco de teclado y deshabilitado.',
    docs: [],
    styles: [
      {"label": "Botón normal", "goal": "Colócalo 16 px debajo de la fila de precio y estado. Usa fondo emerald 800, texto blanco en seminegrita, esquinas de 8 px y espacio interior de 16 px a los lados y 8 px arriba y abajo.", "docs": [["Colores", "colors"], ["Espacio interior", "padding"], ["Esquinas", "border-radius"]]},
      {"label": "Al pasar el ratón", "goal": "En «Ver ficha», oscurece el fondo a emerald 900 cuando el puntero esté encima. El botón agotado debe conservar su estilo.", "docs": [["Estados de interacción", "hover-focus-and-other-states"]]},
      {"label": "Foco con teclado", "goal": "Al llegar con Tab a «Ver ficha», muestra un contorno de 2 px en emerald 700, separado 2 px del borde. Comprueba que se ve claramente.", "docs": [["Estados de interacción", "hover-focus-and-other-states"]]},
      {"label": "Botón agotado", "goal": "En Pinar Trail, añade disabled. Usa fondo stone 200, texto stone 700 y un cursor que indique que el botón no está disponible.", "docs": [["Estados de interacción", "hover-focus-and-other-states"]]},
      {"label": "Selector de tema", "goal": "Añade un botón con luna para pasar a oscuro y sol para volver a claro. Dale un nombre accesible y empieza en claro. Cuando se pulse, cambia data-theme en <html>.", "docs": [["Modo oscuro", "dark-mode"]]},
      {"label": "Ficha · fondo y borde", "goal": "En el <article> de Aljibe City, conserva el fondo blanco en claro y usa stone 900 de fondo y stone 700 de borde en oscuro.", "docs": [["Modo oscuro", "dark-mode"], ["Paleta", "colors"]]},
      {"label": "Ficha · nombre y precio", "goal": "En modo oscuro, cambia ambos textos a stone 100. Conserva sus tamaños y pesos.", "docs": [["Colores", "colors"]]},
      {"label": "Ficha · descripción", "goal": "En modo oscuro, usa stone 300 para el texto de la descripción.", "docs": [["Colores", "colors"]]},
      {"label": "Ficha · categoría y disponibilidad", "goal": "En modo oscuro, usa emerald 300 para «Urbana» y «Disponible». Al repetir en Pinar Trail, usa rose 300 para «Agotada».", "docs": [["Colores", "colors"]]},
      {"label": "Ficha · botón Ver ficha", "goal": "En oscuro, usa fondo emerald 700 y conserva el texto blanco. Al pasar el puntero, cambia el fondo a emerald 800. Con Tab, el contorno debe aparecer en emerald 300.", "docs": [["Estados de interacción", "hover-focus-and-other-states"], ["Modo oscuro", "dark-mode"]]},
      {"label": "Ficha · botón agotado", "goal": "En Pinar Trail, conserva disabled. En oscuro, usa fondo stone 700 y texto stone 200, sin cambio de color al pasar el puntero.", "docs": [["Estados de interacción", "hover-focus-and-other-states"]]},
    ],
  },
  {
    title: 'Reutiliza tu tarjeta',
    start: 'Parte de Aljibe City. BikeCard será un componente React nuevo: una función que devuelve el JSX de una ficha y que podrás usar varias veces.',
    tasks: [
      'Trabaja por etapas: extrae primero la ficha de Aljibe City, después haz que acepte datos y al final genera la lista completa.',
      'Conserva el menú, el selector de tema y la cuadrícula de las sesiones anteriores.',
    ],
    check: 'La cuarta ficha aparece al añadir sus datos. Comprueba una, dos y tres columnas, el modo oscuro y el botón deshabilitado de Pinar Trail. Ejecuta npm run build.',
    visual: 'Catálogo en escritorio con tres fichas originales completas, enlaces, selector de tema y una cuarta ficha de prueba sin foto.',
    docs: [],
    styles: [
      {"label": "1. Extrae la ficha", "goal": "Crea src/features/bicycles/components/BikeCard.tsx. Exporta una función BikeCard que devuelva el <article> de Aljibe City. Mueve también la constante de su foto y ajusta la ruta a ../images/aljibe.jpg. Importa BikeCard en Proyecto.tsx y pon <BikeCard /> en el primer <li>. Comprueba que Aljibe se ve igual en ambos temas.", "docs": []},
      {"label": "2. Pasa los datos con props", "goal": "Una prop es un dato que recibe el componente. Haz que BikeCard reciba un objeto bicycle de tipo Bicycle. Lee de él la foto, la categoría, el nombre, la descripción y el precio. Usa formatPrice para mostrar los euros. Muestra la imagen solo si existe.", "docs": [["Props en React", "https://react.dev/learn/passing-props-to-a-component"]]},
      {"label": "3. Conserva los estados", "goal": "Usa available para mostrar «Disponible» o «Agotada» y para deshabilitar el botón si la bicicleta está agotada. Conserva hover, foco y tema oscuro. Para elegir estilos según el estado, usa clases de Tailwind completas.", "docs": [["Detección de clases", "detecting-classes-in-source-files"]]},
      {"label": "4. Genera el catálogo", "goal": "En Proyecto.tsx, conserva el <ul> responsive y la cabecera. Usa getBicycles() para obtener los datos y map para generar un <li> con un BikeCard por bicicleta. Pon el id de cada bicicleta como key en su <li>.", "docs": [["Listas y claves en React", "https://react.dev/learn/rendering-lists"]]},
      {"label": "5. Comprueba la reutilización", "goal": "Añade una cuarta bicicleta en bicycles.ts con un id distinto. Si omites su imagen, comprueba que aparece una ficha sin foto y sin un icono de imagen rota. No hace falta copiar otro artículo.", "docs": []},
    ],
  },
]
