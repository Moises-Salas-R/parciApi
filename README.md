E-Commerce App con Ionic

Este es un proyecto de una aplicación de comercio electrónico desarrollada con Ionic y Angular. La aplicación permite a los usuarios navegar por productos, agregarlos al carrito, completar un proceso de pago simulado y ver un resumen de la compra.

📌 Características

🔍 Listado de productos obtenidos desde la API de FakeStore.

🛒 Carrito de compras con opción de agregar y eliminar productos.

✅ Validaciones en el formulario de checkout para garantizar datos correctos.

💾 Persistencia de datos con LocalStorage para el proceso de pago.

📄 Resumen de compra con detalle del cliente y productos adquiridos.

🎨 Diseño basado en un prototipo de Figma.

🚀 Instalación y ejecución

1️⃣ Clonar el repositorio

    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio

2️⃣ Instalar dependencias

    npm install

3️⃣ Ejecutar la aplicación en modo desarrollo

    ionic serve

🔧 Estructura del proyecto

📦 e-commerce-app
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 pages
│   │   │   ├── 📂 home (Lista de productos)
│   │   │   ├── 📂 cart (Carrito de compras)
│   │   │   ├── 📂 checkout (Formulario de pago)
│   │   │   ├── 📂 summary (Resumen de compra)
│   │   ├── 📂 services (Lógica de productos y carrito)
│   ├── 📂 assets (Imágenes y recursos)
│   ├── 📂 theme (Estilos personalizados)
├── 📜 README.md (Este archivo)
├── 📜 package.json
└── 📜 ionic.config.json

🛠 Tecnologías utilizadas

Ionic Framework ⚡

Angular 🅰️

TypeScript 📝

FakeStore API 🛍️

LocalStorage 💾

📌 Funcionalidades principales

🔹 Pantalla de Inicio (HomePage)

Muestra una lista de productos obtenidos de FakeStore API.

Permite agregar productos al carrito.

🔹 Carrito (CartPage)

Lista los productos agregados con su cantidad y precio.

Permite eliminar productos del carrito.

🔹 Checkout (CheckoutPage)

Formulario de pago con validaciones de nombre, email, dirección y datos de tarjeta.

Guarda los datos en LocalStorage para persistencia.

🔹 Resumen de Compra (SummaryPage)

Muestra los datos del cliente y los productos comprados.

Confirma el total de la compra y permite finalizar el proceso.

🎯 Próximas mejoras

✅ Integrar una API de pagos reales.

🎨 Mejorar la UI con animaciones y estilos avanzados.

📲 Hacer la aplicación PWA para su instalación en dispositivos móviles.

📄 Licencia

Este proyecto está bajo la licencia MIT.

Desarrollado con ❤️ y Ionic. 🚀
