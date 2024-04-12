const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

// Ruta de la carpeta que contiene los archivos .jfif
const carpeta = './jfiffiles';
// Ruta de la carpeta donde se guardarán los archivos convertidos
const carpetaConvertidos = './convertfiles';

// Leer el contenido de la carpeta
fs.readdir(carpeta, (error, archivos) => {
  if (error) {
    console.error('Error al leer la carpeta:', error);
    return;
  }

  // Filtrar los archivos .jfif
  const archivosJfif = archivos.filter(
    (archivo) => path.extname(archivo).toLowerCase() === '.jfif'
  );

  // Procesar cada archivo .jfif
  archivosJfif.forEach((archivo) => {
    const jfifImagePath = path.join(carpeta, archivo);
    const pngImagePath = path.join(
      carpetaConvertidos,
      path.basename(archivo, '.jfif') + '.png'
    );

    // Mostrar el archivo que se está procesando
    console.log(`Procesando archivo: ${archivo}`);

    // Convertir la imagen .jfif a .png
    Jimp.read(jfifImagePath)
      .then((image) => {
        return image.writeAsync(pngImagePath);
      })
      .then(() => {
        console.log(`Se ha convertido ${archivo} a PNG.`);
        // Eliminar el archivo .jfif después de la conversión
        fs.unlink(jfifImagePath, (err) => {
          if (err) {
            console.error(`Error al eliminar ${archivo}:`, err);
            return;
          }
          console.log(`Se ha eliminado ${archivo} correctamente.`);
        });
      })
      .catch((error) => {
        console.error(`Error al convertir ${archivo} a PNG:`, error);
      });
  });
});
