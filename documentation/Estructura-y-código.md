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
Descripción de las vistas del proyecto
- **Home:** Vista inicial del usuario logueado.
- **Login:** Vista para que el usuario pueda ingresar a la aplicación.
- **Usuarios:** Vista para gestionar usuarios *Solo para usuario **Administrador***
- **Catequizado:** Vista para gestionar catequizados.
- **Eps:** Vista para gestionar EPS  *Solo para usuario **Administrador***
