# Estructura del proyecto
Este proyecto utiliza el patrón modelo-vista-controlador. Se consideran dos elementos importantes en la construcción de esta interfaz

## Estructuras
En la guia para nombrar los archivos se describe la forma en como están nombrados los archivos, así como la forma de nombrarlos al crear alguno nuevo.
### Estructura de las vistas
Las vistas deben utilizar formato `Capitalize` e intentar utilizar una sola palabra. Estos ficheros deben estar almacenados en el directorio `views`.
```
Archivo.vue
```
#### Métodos
<!-- TODO:metodos, tipo de case general-->
<!-- TODO:metodos para CRUD-->
<!-- TODO:eventos recibidos de los componentes-->

### Estructura de los componentes
Estos ficheros deben estar en formato 'PascalCase' si es un componente general de la aplicación, es decir, si es utilizado por más de una vista y ubicados en el directorio `components`.
```
ArchivoLogin.vue
```
En caso de que el componente sea de uso exclusivo por una vista, este tiene que ser nombrado con el nombre de la vista `Capitalise` seguido de un punto y el nombre del componente de igual forma en formato `Capitalise`
"
## Vistas
Todos estos archivos deben almacenarse en la carpeta `/views`
### Home
Esta es la vista principal para los registradores y administradores

### User
Esta vista es para manejar el CRUD de los usuarios en la aplicación

### Service
Esta vista es para manejar el CRUD de los servicios

### Login
Esta vista para que el registrador pueda ingresar a la parte administrativa de la aplicación

### Signin
Esta vista es para que el usuario pueda validar si está registrado, para que sea redirigido a registro o a las preguntas

### Signup
Esta vista es sólo si el usuario no está registrado, para que se registre

### Question
Aparecen las preguntas para saber estado de salud básicos del posible asistente

### Resume
Presenta el estado del usuario, es decir, en cuantos servicios está registrado, o si no puede entrar

