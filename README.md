
## Descripción del Proyecto

Este proyecto implementa un sistema de inicio de sesión seguro utilizando Angular e integra APIs externas. Demuestra las mejores prácticas para la autenticación y el consumo de APIs en una aplicación Angular.

A continuación, se muestra una captura de pantalla del proyecto en funcionamiento:

![Captura de pantalla del proyecto LOGIN-APIS-REACT](https://github.com/K451AKM/Angular-apis-login/blob/main/login-apis.jpg)

## Componente de Login

El componente de login (`LoginComponent`) maneja la autenticación del usuario. Aquí hay una descripción general de su funcionalidad:

- Utiliza el `FormsModule` de Angular para manejar los inputs del formulario
- Se integra con `AuthService` para la lógica de inicio de sesión
- Proporciona manejo de errores para credenciales incorrectas y problemas de conexión
- Redirige al dashboard después de un inicio de sesión exitoso

### Características Principales:

- Campos de entrada para email y contraseña
- Manejo de envío del formulario
- Visualización de mensajes de error
- Navegación al dashboard tras un inicio de sesión exitoso

## Servicios

### AuthService

El `AuthService` es responsable de manejar las operaciones relacionadas con la autenticación:

- Envía solicitudes de inicio de sesión a la API del backend
- Gestiona la sesión del usuario (por ejemplo, almacenando tokens)
- Proporciona métodos para verificar el estado de autenticación

### UserService

El `UserService` interactúa con los endpoints de la API relacionados con el usuario:

- Obtiene datos de usuario de la API
- Actualmente utiliza una API pública (https://api.escuelajs.co) con fines de demostración
- En un entorno de producción, esto debe reemplazarse con una API privada y segura

## Recomendaciones y Limitaciones de la API Educativa

Es importante tener en cuenta que la API utilizada en este proyecto (https://api.escuelajs.co) es una API educativa y tiene ciertas limitaciones:

1. **Obtención de todos los usuarios**: La API actual permite obtener todos los usuarios de una sola vez. Esto no es una práctica recomendada en un entorno de producción real, ya que puede causar problemas de rendimiento y seguridad.

2. **Falta de endpoints específicos**: Al ser una API educativa, no proporciona endpoints específicos para operaciones comunes como la paginación de usuarios o la búsqueda por criterios específicos.

3. **Seguridad limitada**: Esta API no implementa todas las medidas de seguridad que se esperarían en una API de producción.

4. **Uso educativo**: El propósito principal de esta API es el aprendizaje y la práctica. No debe utilizarse en un entorno de producción real.

**Recomendaciones para un escenario de producción:**

- Implementar una API propia con endpoints seguros y específicos.
- Utilizar paginación para la obtención de usuarios.
- Implementar autenticación robusta y manejo de permisos.
- Asegurar que todas las comunicaciones se realicen a través de HTTPS.
- Implementar rate limiting y otras medidas de seguridad.
