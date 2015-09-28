# Automatizar tareas en frontend usando Gulp

Por lo general cuando estamos trabajando en el Frontend necesitamos realizar tareas comunes como: Minificar CSS y JS, Concatenar varios archivos JS en un solo archivo, crear un carpeta para producción con todos estos cambios, aplicar inyección de dependencias, etc. Por lo general este puede ser un trabajo tedioso. Pero para salvarnos de este mal tenemos Gulp que es un proyecto que nos permite manejar la ejecución de este tipo de tareas.

[GulpJS](http://gulpjs.com/) es un proyecto similar al que se explicó en un artículo anterior llamado Grunt, la diferencia es que intenta manejar una sintaxis más amigable y sencilla de comprender.

Para instalar Gulp debemos tener instalado Node y NPM ([hablamos de esto en el post sobre Bower](http://blog.escuelaweb.net/manejar-paquetes-cliente-con-bower/)). Asumiendo que ya contamos con NODE y NPM para instalar Gulp solo necesitamos hacer:

```bash
npm install -g gulp
```

### Sintaxis y manejo de tareas

Gulp es una herramienta escrita en JS (node) que maneja las tareas a través de un Pipeline (textualmente sería tubería, pero es más como una cinta de producción), en donde una tarea retorna un resultado y dicho resultado puede ser pasado directamente a la siguiente tarea. De manera tal que realiza un poco de trabajo directo en memoria. Para probar la sintaxis voy a crear un proyecto nuevo y sobre él probar alguna de las funciones de GulpJS, tomando en cuenta su documentación ([getting started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) y [API doc](https://github.com/gulpjs/gulp/blob/master/docs/API.md))

#### Iniciando el proyecto

Primero crearemos una carpeta con la siguiente estructura

```bash

├── dist
│   ├── css
│   └── js
└── source
    ├── html
    │   └── index.html
    ├── js
    │   ├── app.js
    │   └── z.js
    └── sass
        └── app.scss


```

Creamos nuestro archivo package.js

```js
npm init
```
El resultado de dicho comando será una serie de preguntas en el terminal, en caso que tomemos todas las opciones por default (haciendo Enter en cada pregunta), tendremos un resultado como este:

```bash
name: (prueba) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /home/sergio/Desktop/prueba/package.json:

{
  "name": "prueba",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "gulp": "^3.9.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes) yes
```

Luego agregamos gulp con 

```js
npm install --save-dev gulp
```

Y debemos crear un archivo llamado gulpfile.js en donde guardaremos nuestras tareas Gulp (luego podemos escribirlas en archivos separados)

```bash
touch gulpfile.js
```

En este caso, vamos a usar dos plugins de Gulp uno llamado gulp-sass que es para preprocesar los archivos sass y gulp-concat que es para concatenar archivos. Por lo tanto vamos a instalarlos y agregarlos a las dependencias del package.js

```bash
npm install gulp-sass --save-dev
npm install gulp-concat --save-dev
```

La estructura básica del documento comienza por requerir las dependencias necesarias, a medida que vayamos agregando plugins.

```js
'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');
```

#### El API básico de Gulp

Gulpjs tiene un api relativamente básico, el cual nos permite crear tareas, leer uno o más archivos desde el disco duro, escribir archivos y escuchar cambios sobre un archivo.

**Para crear una tarea** debemos usar el método task:

```js
gulp.task('nombre_de_la_tarea', ['dependencia1', 'dependencia2'], function() {
	// codigo de la tarea propiamente dicha
})
```

El segundo parámetro el cual es un array de dependencias, simplemente define si nuestra tarea necesita que primero se ejecute otra gulp.task antes para que ella funcione. En caso de no ser necesario se puede dejar un array vacío o simplemente colocar el código de la tarea como segundo parámetro.

**Leer archivos** desde el disco para usarlos en alguna tarea, para esto utilizamos el método src el cual recibe un parámetro que es la ruta a un archivo o varios por medio de GLOBS

```js
// ruta de un archivo
gulp.src('directorio/otro_directorio/archivo.js');

// ruta de un grupo de archivos
gulp.src('directorio/*js); // en este caso serian todos los archivos js dentro de directorio
```
**Escribir archivos** en el disco duro utilizando el método dest. El cual puede recibir la ruta de una carpeta (en caso de escribir muchos archivos) o la ruta de un archivo.

```js
gulp.dest('./carpeta/')
```

Y por último el **watch que permite observar cambios en uno o muchos archivos** y realizar una tarea en caso que eso suceda.

```js
gulp.watch('js/*.js', ['tarea']);
```

Una función importante también a destacar es el **.pipe** la cual nos permite pasar el resultado de una tarea o función como parámetro a la siguiente, al más puro estilo Unix.

