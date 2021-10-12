# Software para control de aforo para la parroquia St Martín De Tours
Esta aplicación web tiene como objetivo llevar un registro de las personas que asisten a los eventos presenciales en la parroquia. El usuario administrador será capaz de crear los servicios en los cuales las personas se inscriben y gestionar el aforo  del templo. Para poder ser registrado satisfactoriamente el usuario deberá llenar una encuesta para validar si es apto su ingreso.

## Instalación
Para instalar la aplicación es necesario tener instalado *node.js* para poder trabajar con los archivos de este repositorio. Este repositorio solamente incluye la interfaz de usuario de la aplicación, si deseas ejecutar el programa por completo en tu máquina local puedes pasarte por el repositorio que contiene el backend, haciendo clic [aquí](https://github.com/AlbertDeHoz/Control-de-aforo-St-Martin-De-Tour-Backend).
```
npm install
```

### Compilación
```
npm run build
```
## Casos de Uso
![Casos de uso](/documentation/casos_de_uso.svg)

## Descripción de la funcionalidad

![Casos de uso](/documentation/registroUsuario-flowchart.svg)
![Casos de uso](/documentation/manejoServicios-flowchart.svg)
## Gestión de la Configuración
Para este proyecto se utiliza Vue.js para desarrollar la interfaz de usuario. Además se hece uso de vuetify para gestionar los estilos.
### Node
Es importante tener instalado Node y npm
