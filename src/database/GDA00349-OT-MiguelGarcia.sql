CREATE DATABASE [GDA00349-OT-MiguelGarcia];
GO

USE [GDA00349-OT-MiguelGarcia];
GO

-- DEFINICIÓN DE TABLAS

CREATE TABLE roles (
    rol_id INT IDENTITY(1,1) PRIMARY KEY,
    rol NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE estados (
    estado_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
    usuario_id INT IDENTITY(1,1) PRIMARY KEY,
    rol_id INT NOT NULL,
    estado_id INT NOT NULL,
    correo_electronico NVARCHAR(255) NOT NULL UNIQUE,
    nombre NVARCHAR(255) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (rol_id) REFERENCES roles(rol_id),
    FOREIGN KEY (estado_id) REFERENCES estados(estado_id)
);

CREATE TABLE clientes (
    cliente_id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    nombre_completo NVARCHAR(255) NOT NULL,
    direccion NVARCHAR(255) NOT NULL,
    telefono NVARCHAR(50),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

CREATE TABLE categorias_productos (
    categoria_producto_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE,
    estado_id INT NOT NULL,
    FOREIGN KEY (estado_id) REFERENCES estados(estado_id)
);

CREATE TABLE productos (
    producto_id INT IDENTITY(1,1) PRIMARY KEY,
    categoria_producto_id INT NOT NULL,
    estado_id INT NOT NULL,
    nombre NVARCHAR(100) NOT NULL,
    marca NVARCHAR(100),
    codigo NVARCHAR(100) UNIQUE,
    stock FLOAT DEFAULT 0,
    precio FLOAT NOT NULL,
    imagen VARBINARY(MAX),
    FOREIGN KEY (categoria_producto_id) REFERENCES categorias_productos(categoria_producto_id),
    FOREIGN KEY (estado_id) REFERENCES estados(estado_id)
);

CREATE TABLE ordenes (
    orden_id INT IDENTITY(1,1) PRIMARY KEY,
    cliente_id INT NOT NULL,
    estado_id INT NOT NULL,
    direccion NVARCHAR(255) NOT NULL,
    telefono NVARCHAR(50) NOT NULL,
    correo_electronico NVARCHAR(255),
    fecha_entrega DATE,
    total_orden FLOAT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id),
    FOREIGN KEY (estado_id) REFERENCES estados(estado_id)
);

CREATE TABLE orden_detalles (
    orden_detalle_id INT IDENTITY(1,1) PRIMARY KEY,
    orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio FLOAT NOT NULL,
    subtotal AS (CAST(cantidad AS FLOAT) * precio),
    FOREIGN KEY (orden_id) REFERENCES ordenes(orden_id),
    FOREIGN KEY (producto_id) REFERENCES productos(producto_id)
);
GO

-- DEFINICIÓN DE PROCESOS ALMACENADOS (SP)

-- SP de roles
CREATE PROCEDURE sp_rol_create
    @rol_nombre NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF EXISTS (
            SELECT 1 FROM roles WHERE rol = @rol_nombre
        )
        BEGIN
            THROW 50001, 'Ya existe un rol con ese nombre.', 1;
        END

        INSERT INTO roles (rol)
        VALUES (@rol_nombre);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

EXEC sp_rol_create @rol_nombre = 'Operador';
EXEC sp_rol_create @rol_nombre = 'Cliente';
GO

CREATE PROCEDURE sp_rol_update
    @rol_id INT,
    @nuevo_rol_nombre NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (
            SELECT 1 FROM roles WHERE rol_id = @rol_id
        )
        BEGIN
            THROW 50002, 'No existe un rol con ese id.', 1;
        END

        IF EXISTS (
            SELECT 1 FROM roles WHERE rol = @nuevo_rol_nombre AND rol_id <> @rol_id
        )
        BEGIN
            THROW 50003, 'Ya existe un rol con ese nombre.', 1;
        END

        UPDATE roles
        SET rol = @nuevo_rol_nombre
        WHERE rol_id = @rol_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

-- EXEC sp_rol_update @rol_id = 1, @nuevo_rol = 'test';
-- GO

-- SP de estados
CREATE PROCEDURE sp_estado_create
    @estado NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF EXISTS (
            SELECT 1 FROM estados WHERE nombre = @estado
        )
        BEGIN
            THROW 50001, 'Ya existe un estado con ese nombre.', 1;
        END

        INSERT INTO estados (nombre)
        VALUES (@estado );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

EXEC sp_estado_create @estado = 'Inactivo';
EXEC sp_estado_create @estado = 'Activo';
EXEC sp_estado_create @estado = 'Pendiente';
EXEC sp_estado_create @estado = 'Disponible';
EXEC sp_estado_create @estado = 'No Disponible';
EXEC sp_estado_create @estado = 'Sin Existencias';
EXEC sp_estado_create @estado = 'En Proceso';
EXEC sp_estado_create @estado = 'Cancelado';
EXEC sp_estado_create @estado = 'Completado';
EXEC sp_estado_create @estado = 'Aprobado';
EXEC sp_estado_create @estado = 'Rechazado';
EXEC sp_estado_create @estado = 'Bloqueado';
EXEC sp_estado_create @estado = 'Expirado';
EXEC sp_estado_create @estado = 'En Revisión';
EXEC sp_estado_create @estado = 'En Tránsito';
EXEC sp_estado_create @estado = 'Enviado';
EXEC sp_estado_create @estado = 'Recibido';
EXEC sp_estado_create @estado = 'Devuelto';
EXEC sp_estado_create @estado = 'Reembolsado';
EXEC sp_estado_create @estado = 'Pagado';
EXEC sp_estado_create @estado = 'No Pagado';
GO

CREATE PROCEDURE sp_estado_update
    @estado_id INT,
    @nuevo_estado NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (
            SELECT 1 FROM estados WHERE estado_id = @estado_id
        )
        BEGIN
            THROW 50002, 'No existe un estado con ese id.', 1;
        END

        IF EXISTS (
            SELECT 1 FROM estados WHERE nombre = @nuevo_estado AND estado_id <> @estado_id
        )
        BEGIN
            THROW 50003, 'Ya existe un estado con ese nombre.', 1;
        END

        UPDATE estados
        SET nombre = @nuevo_estado
        WHERE estado_id = @estado_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

-- EXEC sp_estado_update @estado_id = 1, @nuevo_estado = 'Inactivo';
-- GO

CREATE PROCEDURE sp_estados_list
AS
BEGIN
    BEGIN TRY
        SELECT
            estado_id,
            nombre
        FROM estados
        ORDER BY estado_id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_estado_list_by_id
    @estado_id INT
AS
BEGIN
    BEGIN TRY
        SELECT
            estado_id,
            nombre
        FROM estados
        WHERE estado_id = @estado_id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO

-- SP de categorias

CREATE PROCEDURE sp_categoria_producto_create
    @categoria NVARCHAR(100)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF EXISTS (
            SELECT 1 FROM categorias_productos WHERE nombre = @categoria
        )
        BEGIN
            THROW 60001, 'Ya existe una categoria con ese nombre.', 1;
        END

        DECLARE @estado_id INT;

        SELECT @estado_id = estado_id FROM estados WHERE nombre = 'Activo';

        INSERT INTO categorias_productos (nombre, estado_id)
        VALUES (@categoria, @estado_id);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

EXEC sp_categoria_producto_create @categoria = 'Electrodomésticos';
EXEC sp_categoria_producto_create @categoria = 'Tecnología';
EXEC sp_categoria_producto_create @categoria = 'Muebles';
EXEC sp_categoria_producto_create @categoria = 'Ropa';
EXEC sp_categoria_producto_create @categoria = 'Juguetes';
GO

CREATE PROCEDURE sp_categoria_producto_update
    @categoria_producto_id INT,
    @nueva_categoria NVARCHAR(100) = NULL,
    @estado_id INT = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (
            SELECT 1 FROM estados WHERE estado_id = @estado_id
        )
        BEGIN
            THROW 50002, 'No existe un estado con ese id.', 1;
        END

        IF NOT EXISTS (
            SELECT 1 FROM categorias_productos WHERE categoria_producto_id = @categoria_producto_id
        )
        BEGIN
            THROW 60002, 'No existe una categoría con ese ID.', 1;
        END

        IF @nueva_categoria IS NOT NULL
        BEGIN
            IF EXISTS (
                SELECT 1 FROM categorias_productos WHERE nombre = @nueva_categoria AND categoria_producto_id <> @categoria_producto_id
            )
            BEGIN
                THROW 60003, 'Ya existe una categoría con ese nombre.', 1;
            END

            UPDATE categorias_productos
            SET nombre = @nueva_categoria
            WHERE categoria_producto_id = @categoria_producto_id;
        END

        IF @estado_id IS NOT NULL
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM estados WHERE estado_id = @estado_id
            )
            BEGIN
                THROW 70005, 'No existe un estado con ese ID.', 1;
            END

            UPDATE categorias_productos
            SET estado_id = @estado_id
            WHERE categoria_producto_id = @categoria_producto_id;
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_categoria_producto_inactivar
    @categoria_producto_id INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (
            SELECT 1 FROM categorias_productos WHERE categoria_producto_id = @categoria_producto_id
        )
        BEGIN
            THROW 60002, 'No existe una categoría con ese ID.', 1;
        END

        DECLARE @estado_inactivo_id INT;
        SELECT @estado_inactivo_id = estado_id FROM estados WHERE nombre = 'Inactivo';

        IF @estado_inactivo_id IS NULL
        BEGIN
            THROW 50003, 'No existe un estado llamado "Inactivo".', 1;
        END

        UPDATE categorias_productos
        SET estado_id = @estado_inactivo_id
        WHERE categoria_producto_id = @categoria_producto_id;

        UPDATE productos
        SET estado_id = @estado_inactivo_id
        WHERE categoria_producto_id = @categoria_producto_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_categorias_productos_list
AS
BEGIN
    BEGIN TRY
        SELECT
            cp.categoria_producto_id,
            cp.nombre,
            e.nombre AS estado_nombre,
            e.estado_id
        FROM categorias_productos cp
        INNER JOIN estados e ON cp.estado_id = e.estado_id
        ORDER BY cp.categoria_producto_id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_categoria_producto_list_by_id
    @categoria_producto_id INT
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (
            SELECT 1 FROM categorias_productos WHERE categoria_producto_id = @categoria_producto_id
        )
        BEGIN
            THROW 60002, 'No existe una categoría con ese ID.', 1;
        END

        SELECT
            cp.categoria_producto_id,
            cp.nombre,
            e.nombre AS estado_nombre,
            e.estado_id
        FROM categorias_productos cp
        INNER JOIN estados e ON cp.estado_id = e.estado_id
        WHERE cp.categoria_producto_id = @categoria_producto_id;

    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO

-- SP de productos

CREATE PROCEDURE sp_producto_create
    @categoria_producto_id INT,
    @estado_id INT,
    @nombre NVARCHAR(100),
    @marca NVARCHAR(100) = NULL,
    @codigo NVARCHAR(100) = NULL,
    @stock FLOAT = 0,
    @precio FLOAT,
    @imagen VARBINARY(MAX) = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (
            SELECT 1 FROM estados WHERE estado_id = @estado_id
        )
        BEGIN
            THROW 50002, 'No existe un estado con ese id.', 1;
        END

        IF NOT EXISTS (
            SELECT 1 FROM categorias_productos WHERE categoria_producto_id = @categoria_producto_id
        )
        BEGIN
            THROW 50002, 'No existe una categoria con ese id.', 1;
        END

        IF EXISTS (
            SELECT 1 FROM productos WHERE codigo = @codigo
        )
        BEGIN
            THROW 70001, 'Ya existe un producto con ese código.', 1;
        END

        INSERT INTO productos (
            categoria_producto_id, estado_id, nombre, marca, codigo, stock, precio, imagen
        )
        VALUES (
            @categoria_producto_id, @estado_id, @nombre, @marca, @codigo, @stock, @precio, @imagen
        );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_producto_update
    @producto_id INT,
    @categoria_producto_id INT,
    @estado_id INT,
    @nombre NVARCHAR(100),
    @marca NVARCHAR(100) = NULL,
    @codigo NVARCHAR(100) = NULL,
    @stock FLOAT = 0,
    @precio FLOAT,
    @imagen VARBINARY(MAX) = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (
            SELECT 1 FROM productos WHERE producto_id = @producto_id
        )
        BEGIN
            THROW 70002, 'No existe un producto con ese ID.', 1;
        END

        IF NOT EXISTS (
            SELECT 1 FROM estados WHERE estado_id = @estado_id
        )
        BEGIN
            THROW 50002, 'No existe un estado con ese id.', 1;
        END

        IF NOT EXISTS (
            SELECT 1 FROM categorias_productos WHERE categoria_producto_id = @categoria_producto_id
        )
        BEGIN
            THROW 50002, 'No existe una categoria con ese id.', 1;
        END

        IF EXISTS (
            SELECT 1 FROM productos WHERE nombre = @nombre AND producto_id <> @producto_id
        )
        BEGIN
            THROW 70003, 'Ya existe un producto con ese nombre.', 1;
        END

        UPDATE productos
        SET
            categoria_producto_id = @categoria_producto_id,
            estado_id = @estado_id,
            nombre = @nombre,
            marca = @marca,
            codigo = @codigo,
            stock = @stock,
            precio = @precio,
            imagen = @imagen
        WHERE producto_id = @producto_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_producto_list_by_estado
    @estado_id INT = NULL
AS
BEGIN
    BEGIN TRY
        SELECT
            p.producto_id,
            p.categoria_producto_id,
            p.estado_id,
            p.nombre,
            p.marca,
            p.codigo,
            p.stock,
            p.precio,
            p.imagen,
            e.nombre AS nombre_estado,
            c.nombre AS nombre_categoria
        FROM
            productos p
        INNER JOIN
            estados e ON p.estado_id = e.estado_id
        INNER JOIN
            categorias_productos c ON p.categoria_producto_id = c.categoria_producto_id
        WHERE
            (@estado_id IS NULL OR p.estado_id = @estado_id)
        ORDER BY
            p.nombre;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_producto_list_by_id
    @producto_id INT
AS
BEGIN
    BEGIN TRY
        SELECT
            p.producto_id,
            p.categoria_producto_id,
            p.estado_id,
            p.nombre,
            p.marca,
            p.codigo,
            p.stock,
            p.precio,
            p.imagen,
            e.nombre AS nombre_estado,
            c.nombre AS nombre_categoria
        FROM
            productos p
        INNER JOIN
            estados e ON p.estado_id = e.estado_id
        INNER JOIN
            categorias_productos c ON p.categoria_producto_id = c.categoria_producto_id
        WHERE
            p.producto_id = @producto_id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO

-- SP de usuarios

CREATE PROCEDURE sp_usuario_create
    @rol_id INT,
    @correo_electronico NVARCHAR(255),
    @nombre NVARCHAR(255),
    @password NVARCHAR(255),
    @telefono NVARCHAR(50) = NULL,
    @direccion NVARCHAR(255) = NULL,
    @nombre_completo NVARCHAR(255) = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @estado_id INT;
        DECLARE @es_cliente BIT = 0;

        SELECT @estado_id = (SELECT estado_id FROM estados WHERE nombre = 'Activo'),
               @es_cliente = CASE
                   WHEN r.rol = 'Cliente' THEN 1
                   ELSE 0
               END
        FROM roles r
        WHERE r.rol_id = @rol_id;

        IF @estado_id IS NULL
        BEGIN
            THROW 80001, 'No existe un rol con ese id.', 1;
        END

        INSERT INTO usuarios (
            rol_id, estado_id, correo_electronico, nombre, password
        )
        VALUES (
            @rol_id, @estado_id, @correo_electronico, @nombre, @password
        );

        DECLARE @usuario_id INT = SCOPE_IDENTITY();

        IF @es_cliente = 1
        BEGIN

            INSERT INTO clientes (
                usuario_id, nombre_completo, direccion, telefono
            )
            VALUES (
                @usuario_id, @nombre_completo, @direccion, @telefono
            );
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

EXEC sp_usuario_create
    @rol_id = 1,
    @correo_electronico = 'operador@example.com',
    @nombre = 'María López',
    @password = 'PasswordEncriptada123',
    @telefono = '12345678';

EXEC sp_usuario_create
    @rol_id = 2,
    @correo_electronico = 'cliente@example.com',
    @nombre = 'Juan Pérez',
    @password = 'PasswordEncriptada123',
    @telefono = '12345678',
    @nombre_completo = 'Juan Pérez Gaitán',
    @direccion = 'here';
GO;

CREATE PROCEDURE sp_usuario_update
    @usuario_id INT,
    @estado_id INT,
    @rol_id INT,
    @nombre NVARCHAR(255)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (
            SELECT 1 FROM estados WHERE estado_id = @estado_id
        )
        BEGIN
            THROW 70005, 'No existe un estado con ese ID.', 1;
        END

        IF NOT EXISTS (SELECT 1 FROM usuarios WHERE usuario_id = @usuario_id)
        BEGIN
            THROW 80001, 'No existe un usuario con ese ID.', 1;
        END;

        UPDATE usuarios
        SET
            nombre = @nombre,
            estado_id = @estado_id,
            rol_id = @rol_id
        WHERE usuario_id = @usuario_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO;

CREATE PROCEDURE sp_cliente_update
    @cliente_id INT,
    @nombre_completo NVARCHAR(255),
    @direccion NVARCHAR(255),
    @telefono NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT 1 FROM clientes WHERE cliente_id = @cliente_id)
        BEGIN
            THROW 80001, 'No existe un cliente con ese ID.', 1;
        END;

        UPDATE clientes
        SET
            nombre_completo = @nombre_completo,
            direccion = @direccion,
            telefono = @telefono
        WHERE cliente_id = @cliente_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_usuario_inactivar_por_cliente
    @cliente_id INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT 1 FROM clientes WHERE cliente_id = @cliente_id)
        BEGIN
            THROW 80001, 'No existe un cliente con ese ID.', 1;
        END

        DECLARE @usuario_id INT;
        SELECT @usuario_id = usuario_id FROM clientes WHERE cliente_id = @cliente_id;

        IF NOT EXISTS (SELECT 1 FROM usuarios WHERE usuario_id = @usuario_id)
        BEGIN
            THROW 80002, 'No existe un usuario asociado al cliente.', 1;
        END

        DECLARE @estado_inactivo_id INT;
        SELECT @estado_inactivo_id = estado_id FROM estados WHERE nombre = 'Inactivo';

        IF @estado_inactivo_id IS NULL
        BEGIN
            THROW 80003, 'No existe un estado llamado "Inactivo".', 1;
        END

        UPDATE usuarios
        SET estado_id = @estado_inactivo_id
        WHERE usuario_id = @usuario_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_usuario_login
    @correo_electronico NVARCHAR(255)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @estado_activo INT;

        SELECT @estado_activo = estado_id FROM estados WHERE nombre = 'Activo';

        IF @estado_activo IS NULL
        BEGIN
            THROW 70007, 'No se encontró el estado Activo.', 1;
        END;

        IF NOT EXISTS (
            SELECT 1
            FROM usuarios
            WHERE correo_electronico = @correo_electronico
              AND estado_id = @estado_activo
        )
        BEGIN
            THROW 70008, 'No se encontro un usuario activo con ese correo.', 1;
        END;

        SELECT
            u.usuario_id,
            u.rol_id,
            u.estado_id,
            u.correo_electronico,
            u.nombre,
            u.password,
                r.rol AS rol_nombre,
            e.nombre AS estado_nombre
        FROM usuarios u
        INNER JOIN roles r ON u.rol_id = r.rol_id
        INNER JOIN estados e ON u.estado_id = e.estado_id
        WHERE u.correo_electronico = @correo_electronico
          AND u.estado_id = @estado_activo;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_usuarios_list
    @estado_id INT = NULL,
    @rol_id INT = NULL
AS
BEGIN
    SELECT
        u.usuario_id,
        u.nombre,
        u.correo_electronico,
        u.created_at,
        u.rol_id,
        r.rol,
        u.estado_id,
        e.nombre AS estado_nombre
    FROM usuarios u
    INNER JOIN roles r ON u.rol_id = r.rol_id
    INNER JOIN estados e ON u.estado_id = e.estado_id
    WHERE (@estado_id IS NULL OR u.estado_id = @estado_id)
      AND (@rol_id IS NULL OR u.rol_id = @rol_id);
END;
GO

CREATE PROCEDURE sp_clientes_list
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT
            c.cliente_id,
            c.usuario_id,
            c.nombre_completo,
            c.direccion,
            c.telefono,
            u.estado_id,
            e.nombre AS estado_nombre
        FROM clientes c
        INNER JOIN usuarios u ON u.usuario_id = c.usuario_id
        INNER JOIN estados e ON u.estado_id = e.estado_id
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_usuario_list_by_id
    @usuario_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT
            u.usuario_id,
            u.nombre,
            u.correo_electronico,
            u.created_at,
            u.rol_id,
            r.rol,
            u.estado_id,
            e.nombre AS estado_nombre
        FROM usuarios u
        INNER JOIN roles r ON u.rol_id = r.rol_id
        INNER JOIN estados e ON u.estado_id = e.estado_id
        WHERE u.usuario_id = @usuario_id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_clientes_list_by_usuario_id
    @usuario_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT
            c.cliente_id,
            c.usuario_id,
            c.nombre_completo,
            c.direccion,
            c.telefono,
            u.correo_electronico
        FROM clientes c
        INNER JOIN usuarios u ON c.usuario_id = u.usuario_id
        WHERE c.usuario_id = @usuario_id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_cliente_list_by_id
    @cliente_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT
            c.cliente_id,
            c.usuario_id,
            c.nombre_completo,
            c.direccion,
            c.telefono
        FROM clientes c
        WHERE c.cliente_id = @cliente_id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;
GO

-- SP de Ordenes
CREATE PROCEDURE sp_orden_create
    @cliente_id INT,
    @direccion NVARCHAR(255),
    @telefono NVARCHAR(50),
    @correo_electronico NVARCHAR(255),
    @fecha_entrega DATE,
    @detalles NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT 1 FROM clientes WHERE cliente_id = @cliente_id)
        BEGIN
            THROW 80001, 'No existe un cliente con ese ID.', 1;
        END;

        DECLARE @estado_id INT;
        SELECT @estado_id = estado_id FROM estados WHERE nombre = 'En Proceso';

        IF @estado_id IS NULL
        BEGIN
            THROW 80002, 'No existe un estado llamado "En Proceso".', 1;
        END;

        DECLARE @detallesTable TABLE (
            producto_id INT NOT NULL,
            cantidad INT NOT NULL,
            precio FLOAT NOT NULL
        );

        INSERT INTO @detallesTable (producto_id, cantidad, precio)
        SELECT producto_id, cantidad, precio
        FROM OPENJSON(@detalles)
        WITH (
            producto_id INT,
            cantidad INT,
            precio FLOAT
        );

        IF EXISTS (
            SELECT 1
            FROM @detallesTable d
            LEFT JOIN productos p ON d.producto_id = p.producto_id
            WHERE p.producto_id IS NULL
        )
        BEGIN
            THROW 80003, 'Uno o más productos especificados en los detalles no existen.', 1;
        END;

        IF EXISTS (
            SELECT 1
            FROM @detallesTable d
            INNER JOIN productos p ON d.producto_id = p.producto_id
            WHERE d.cantidad > p.stock
        )
        BEGIN
            THROW 80004, 'No hay suficiente stock para uno o más productos.', 1;
        END;

        DECLARE @orden_id INT;
        INSERT INTO ordenes (cliente_id, estado_id, direccion, telefono, correo_electronico, fecha_entrega, total_orden)
        VALUES (@cliente_id, @estado_id, @direccion, @telefono, @correo_electronico, @fecha_entrega, 0);

        SET @orden_id = SCOPE_IDENTITY();

        INSERT INTO orden_detalles (orden_id, producto_id, cantidad, precio)
        SELECT @orden_id, producto_id, cantidad, precio
        FROM @detallesTable;

        DECLARE @total FLOAT;
        SELECT @total = SUM(cantidad * precio) FROM @detallesTable;

        UPDATE ordenes
        SET total_orden = @total
        WHERE orden_id = @orden_id;

        UPDATE productos
        SET stock = stock - d.cantidad
        FROM productos p
        INNER JOIN @detallesTable d ON p.producto_id = d.producto_id;

        COMMIT TRANSACTION;

        SELECT @orden_id AS orden_id;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_orden_aprobar
    @orden_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @estado_proceso_id INT;
        DECLARE @estado_aprobado_id INT;

        SELECT @estado_proceso_id = estado_id FROM estados WHERE nombre = 'En Proceso';
        SELECT @estado_aprobado_id = estado_id FROM estados WHERE nombre = 'Aprobado';

        IF @estado_proceso_id IS NULL OR @estado_aprobado_id IS NULL
        BEGIN
            THROW 80001, 'No existen los estados requeridos ("En Proceso" o "Aprobado").', 1;
        END;

        IF NOT EXISTS (SELECT 1 FROM ordenes WHERE orden_id = @orden_id AND estado_id = @estado_proceso_id)
        BEGIN
            THROW 80002, 'La orden no existe o no está en estado "En Proceso".', 1;
        END;

        UPDATE ordenes
        SET estado_id = @estado_aprobado_id
        WHERE orden_id = @orden_id;

        COMMIT TRANSACTION;

        SELECT 'La orden ha sido aprobada exitosamente.' AS mensaje;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_orden_cancelar
    @orden_id INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @estado_proceso_id INT;
        DECLARE @estado_cancelado_id INT;

        SELECT @estado_proceso_id = estado_id FROM estados WHERE nombre = 'En Proceso';
        SELECT @estado_cancelado_id = estado_id FROM estados WHERE nombre = 'Cancelado';

        IF @estado_proceso_id IS NULL OR @estado_cancelado_id IS NULL
        BEGIN
            THROW 80001, 'No existen los estados requeridos ("En Proceso" o "Cancelado").', 1;
        END;

        IF NOT EXISTS (SELECT 1 FROM ordenes WHERE orden_id = @orden_id AND estado_id = @estado_proceso_id)
        BEGIN
            THROW 80002, 'No existe una orden con ese ID que se pueda cancelar.', 1;
        END;

        UPDATE productos
        SET stock = stock + od.cantidad
        FROM productos p
        INNER JOIN orden_detalles od ON p.producto_id = od.producto_id
        WHERE od.orden_id = @orden_id;

        UPDATE ordenes
        SET estado_id = @estado_cancelado_id
        WHERE orden_id = @orden_id;

        COMMIT TRANSACTION;

        SELECT 'La orden ha sido cancelada exitosamente.' AS mensaje;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE sp_ordenes_list
    @cliente_id INT = NULL,
    @estado_id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        o.orden_id,
        o.cliente_id,
        o.estado_id,
        o.direccion,
        o.telefono,
        o.correo_electronico,
        o.fecha_entrega,
        o.created_at,
        o.updated_at,
        o.total_orden,
        e.nombre AS estado,
        c.nombre_completo AS cliente_nombre,
        (
            SELECT
                od.orden_detalle_id,
                od.producto_id,
                od.cantidad,
                od.precio,
                od.subtotal
            FROM
                orden_detalles od
            WHERE
                od.orden_id = o.orden_id
            FOR JSON PATH
        ) AS detalle_orden
    FROM
        ordenes o
    LEFT JOIN
        estados e ON o.estado_id = e.estado_id
    LEFT JOIN
        clientes c ON o.cliente_id = c.cliente_id
    WHERE
        (@cliente_id IS NULL OR o.cliente_id = @cliente_id) AND
        (@estado_id IS NULL OR o.estado_id = @estado_id)
    ORDER BY
        o.orden_id;
END;
GO

CREATE OR ALTER PROCEDURE sp_ordenes_list_by_usuario_id
    @usuario_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        o.orden_id,
        o.cliente_id,
        o.estado_id,
        o.direccion,
        o.telefono,
        o.correo_electronico,
        o.fecha_entrega,
        o.created_at,
        o.updated_at,
        o.total_orden,
        e.nombre AS estado,
        c.nombre_completo AS cliente_nombre,
        (
            SELECT
                od.orden_detalle_id,
                od.producto_id,
                od.cantidad,
                od.precio,
                od.subtotal
            FROM
                orden_detalles od
            WHERE
                od.orden_id = o.orden_id
            FOR JSON PATH
        ) AS detalle_orden
    FROM
        ordenes o
    INNER JOIN
        clientes c ON o.cliente_id = c.cliente_id
    INNER JOIN
        usuarios u ON c.usuario_id = u.usuario_id
    LEFT JOIN
        estados e ON o.estado_id = e.estado_id
    WHERE
        u.usuario_id = @usuario_id
    ORDER BY
        o.orden_id;
END;
GO

-- DEFINICIÓN DE LAS VISTAS

CREATE VIEW vw_productos_disponibles_con_stock AS
SELECT
    p.producto_id,
    p.nombre AS producto,
    p.marca,
    p.codigo,
    p.stock,
    p.precio,
    p.imagen
FROM
    productos p
INNER JOIN
    estados e ON p.estado_id = e.estado_id
WHERE
    e.nombre = 'Disponible' AND p.stock > 0;
GO;

CREATE VIEW vw_total_ordenes_agosto_2024 AS
SELECT
    COUNT(o.orden_id) AS total_ordenes,
    SUM(o.total_orden) AS total_monto
FROM
    ordenes o
INNER JOIN
    estados e ON o.estado_id = e.estado_id
WHERE
    YEAR(o.fecha_entrega) = 2024 AND MONTH(o.fecha_entrega) = 8 AND e.nombre = 'Aprobado';
GO;

CREATE VIEW vw_top_10_clientes_consumo_historico AS
SELECT TOP 10
    c.cliente_id,
    c.nombre_completo AS cliente,
    SUM(o.total_orden) AS total_consumo
FROM
    clientes c
INNER JOIN
    ordenes o ON c.cliente_id = o.cliente_id
INNER JOIN
    estados e ON o.estado_id = e.estado_id
WHERE
    e.nombre = 'Aprobado'
GROUP BY
    c.cliente_id, c.nombre_completo
ORDER BY
    total_consumo DESC;
GO;

CREATE VIEW vw_top_10_productos_mas_vendidos AS
SELECT TOP 10
    p.producto_id,
    p.nombre AS producto,
    p.marca,
    SUM(od.cantidad) AS total_vendidos,
    SUM(od.subtotal) AS total_ingresos
FROM
    productos p
INNER JOIN
    orden_detalles od ON p.producto_id = od.producto_id
INNER JOIN
    ordenes o ON od.orden_id = o.orden_id
WHERE
    o.estado_id = (SELECT estado_id FROM estados WHERE nombre = 'Aprobado')
GROUP BY
    p.producto_id, p.nombre, p.marca
ORDER BY
    total_vendidos DESC;
GO