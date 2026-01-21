# Crumble Pastelería

Una aplicación web moderna y responsiva diseñada para una pastelería artesanal, desarrollada utilizando React, Vite y Tailwind CSS. Este proyecto se centra en ofrecer una experiencia de usuario optimizada, con transiciones fluidas y un flujo de compra integrado con WhatsApp.

## Tecnologías Utilizadas

- **React:** Biblioteca principal para la construcción de la interfaz de usuario.
- **Vite:** Entorno de desarrollo para una compilación rápida y eficiente.
- **Tailwind CSS:** Framework de diseño para estilos rápidos y consistentes.
- **Framer Motion:** Biblioteca especializada en animaciones y transiciones de componentes.
- **React Router:** Manejo de rutas y navegación de la aplicación.
- **Zustand / Context API:** Gestión del estado global, específicamente para el carrito de compras.

## Características Principales

- **Diseño Responsivo:** Interfaz adaptable a dispositivos móviles, tablets y escritorio.
- **Catálogo de Productos:** Sistema de filtrado por categorías y búsqueda en tiempo real.
- **Gestión de Carrito:**
  - Persistencia de datos local para mantener la sesión del usuario.
  - Interfaz de cajón lateral (Drawer) con animaciones de entrada y salida.
- **Proceso de Checkout:**
  - Selección de método de entrega (Delivery o Recojo).
  - **Emisión de Comprobantes:** Opción para elegir entre Boleta Simple, Boleta con DNI o Factura, incluyendo validación de formatos.
  - **Integración WhatsApp:** Generación automática de mensajes detallados con número de orden único.
- **Experiencia de Usuario (UX):**
  - Transiciones suaves entre páginas.
  - Animaciones interactivas en elementos de la interfaz.
- **Páginas Informativas:**
  - Sección "Nosotros" con detalles históricos y del equipo.
  - Sección "Tiendas" con integración de mapas.

## Instalación y Configuración

Instrucciones para desplegar el proyecto en un entorno local:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/Ariannn23/crumble-pasteleria.git
    cd crumble-pasteleria
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    La aplicación se iniciará en `http://localhost:5173`.

4.  **Verificación de Código (Linting):**
    Para ejecutar el análisis estático de código:
    ```bash
    npm run lint
    ```

## Estructura del Proyecto

- **src/assets:** Recursos estáticos como imágenes y fuentes.
- **src/components:** Componentes reutilizables de la interfaz (Botones, Inputs, Layouts).
- **src/context:** Lógica de estado global (ej. CartContext).
- **src/data:** Archivos de datos estáticos (catálogo de productos).
- **src/hooks:** Hooks personalizados para lógica compartida.
- **src/pages:** Vistas principales de la aplicación.
- **tailwind.config.js:** Archivo de configuración para temas, colores y fuentes.

---

Proyecto desarrollado para Crumble Pastelería.
