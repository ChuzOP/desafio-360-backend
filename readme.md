# 🚀 Desafío Web 360 - Backend

Este es el backend del **Desafío Web 360**, una API diseñada para un e-commerce.

## 🛠 Requisitos

Antes de levantar el proyecto, asegúrate de contar con los siguientes elementos instalados:

- [Yarn](https://yarnpkg.com/)
- Un servidor de base de datos compatible con SQL Server.

## ⚙️ Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido, ajustando las credenciales según tu configuración:

```env
PORT=4000
JWT_SECRET='4c53dd08d522259f253c41de1a0fd492'
DB_SERVER='localhost'
DB_DATABASE='GDA00349-OT-MiguelGarcia'
DB_USER='tu-user'
DB_PASSWORD='tu-pwd'
DB_PORT=1433
ENVIROMENT='DEV'
```

## 🚀 Levantar el Proyecto
En tu terminal ejecuta los siguientes comandos:

1. Instala las dependencias ejecutando:

   ```bash
   yarn install

2. Levanta el servidor de desarrollo con:

    ```bash
    yarn dev

¡Y listo! El servidor estará corriendo en el puerto 4000.