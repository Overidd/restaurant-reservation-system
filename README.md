# **La Canga 2**

## Pasos para iniciar el proyecto

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Overidd/restaurant-reservation-system
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```
3. Renombra el archivo `.env.example` a `.env`, para las viariables de entorno correspondientes solicita:

   ```bash
   cp .env.example .env
   ```

4. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

---

## Tecnologías utilizadas

* **React JS**
* **React Router DOM**
* **Redux Toolkit**
* **Tailwind CSS**
* **Radix UI**
* **Firebase**

---

## Arquitectura

### Basada en Layouts

* `AppLayout`
* `AuthLayout`
* `DashboardLayout`

---

### Arquitectura de Rutas

#### Rutas Públicas (sin login)

* `/home`: Página principal

* `/reserve`: Formulario de pasos para reservar (**multistep**)

  #### Sistema de reserva por pasos:

  1. **Paso 1**: Selección del restaurante, motivo de la reserva y número de comensales.
  2. **Paso 2**: Selección de fechas disponibles:

     * Visualización mediante **botones** o **calendario**.
  3. **Paso 3**: Selección de **horarios disponibles** para la fecha elegida.
  4. **Paso 4**: Visualización del **mapa de mesas**:

     * **Mesas disponibles**:

       * No están bloqueadas por el admin.
       * No superan el número de comensales seleccionados.
     * **Mesas ocupadas**: Ya fueron reservadas por otros usuarios para ese día y hora.
     * **Mesas no disponibles**: Están bloqueadas o superan el número de comensales al respecto al numero de sillas.
     * El usuario puede **seleccionar las mesas** o **previsualizar sus detalles**.
  5. **Paso 5**: Confirmación de reserva, con 3 posibles situaciones:

     * **1. Usuario no autenticado**: La reserva entra en estado **pendiente**.

       * Al autenticarse (registro o login con Google), si no tiene número telefónico registrado, se le solicitará antes de continuar.
     * **2. Usuario autenticado sin número telefónico registrado**: Se le solicitará el número antes de continuar.
     * **3. Usuario autenticado y con número telefónico registrado**: La reserva continúa normalmente.

* `/product`: Vista de productos del restaurante.

* `/location`: Muestra los restaurantes y sus ubicaciones en un **mapa**.

* `/search-reservation`: Permite buscar una reserva mediante el **código** asignado.

* `/login`: Solo accesible para **usuarios no autenticados**.

* `/register`: Solo accesible para **usuarios no autenticados**.

---

#### Rutas Protegidas para Admin (requieren login y rol admin)

* `/dashboard`:
  Ruta principal del panel administrativo.

  * Muestra un resumen de estadísticas de reservas.
  * Permite **exportar reportes**.

* `/dashboard/tables`:
  Visualización del **mapa de mesas**, con filtros por restaurante, fecha y hora.
  El mapa muestra las mesas y objetos del restaurante.

  #### Sistema de mapa de mesas funciona como panel de Administración y Editor:

  * **Modo administración**:
    * Editar estado de reservas (confirmar, cancelar total o parcialmente).
    * Marcar cliente como **"no presentado"** en su hora.
    * Completar reservas.
    * **Bloquear/desbloquear** mesas (bloqueo temporal según filtro).
    * Reservar una mesa desde el mapa (fecha y hora según el filtro).

  * **Modo editor** (disponible solo en desktop):

    * **Mesas**:

      * Crear, editar, eliminar.
      * Campos:

        * nombre
        * descripción
        * imagen
        * tamaño de la mesa
        * cantidad de sillas
        * posición (X, Y)
        * rotación
        * tamaño de ocupación (X, Y)
        * opción para bloquear la mesa para **todos los horarios**

    * **Objetos del restaurante**:

      * **Categorías**: agregar, editar, eliminar

        * Campo: nombre
      * **Items** de cada categoría: agregar, editar, eliminar

        * Campos: nombre, imagen, posiciónX, posiciónY, rotación, tamañoX, tamañoY

    * **Editar el mapa de mesas**:

      * Campos editables: **Filas** y **Columnas**

* `/dashboard/calendar`:
  Calendario de reservas.

  * Visualización de **reservas pendientes**.
  * Permite **editar reservas pendientes** o realizar nuevas.

* `/dashboard/details`:

  * Lista de todos los clientes registrados.
  * Visualización del **perfil individual** de cada cliente.
  * Permite **exportar informes**.

* `/dashboard/store`:

  * Gestión de restaurantes.
  * Permite **agregar, editar o eliminar** restaurantes.