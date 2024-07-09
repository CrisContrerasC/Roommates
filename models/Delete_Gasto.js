import fs from 'fs';

import { fileURLToPath } from 'url'
import { dirname } from "path";


// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Path para crear en la raiz del proyecto la carpeta db
const dirPath = `${__dirname}/../db`;
const path = `${dirPath}/gastos.json`;
const roommatesPath = `${dirPath}/roommates.json`;

const Delete_Gasto = (id) => {

  console.log("salida id: ", id);
  try {
    const database = JSON.parse(fs.readFileSync(path, "utf-8"));
    console.log("salida database: ", database);
    if (id === -1) {
      throw new Error('No se encontro gasto')
    }
    else {
      //Buscar el gasto asociado al id y obtener el monto del gasto
      database.forEach(element => {
        if (element.id === id) {
          const monto = element.monto
          const nombre = element.roommate
           //Obtener roomates.json para luego eliminar el gasto
      const roommates = fs.readFileSync(roommatesPath, "utf-8")
      
      const roommatesJSON = JSON.parse(roommates);
     
      const montoADividir = monto / roommatesJSON.length;
      console.log("salida montoADividir: ", montoADividir);
      //Eliminar gasto a roommates.json
      roommatesJSON.forEach(roommate => {
        if (roommate.nombre === nombre) {
          if (!roommate.recibe) {
            roommate.recibe = 0
          }
          roommate.recibe -= montoADividir;
         
        } else {
          if (!roommate.debe) {
            roommate.debe = 0
          }
          roommate.debe -= montoADividir;
        }

      })
      console.log("Salida roommatesJSON: ", roommatesJSON);
      fs.writeFileSync(roommatesPath, JSON.stringify(roommatesJSON)); 
      console.log("roommates.json updated successfully");
           
      }
      });
      
    }
    database.splice(id, 1)
    console.log("Salida database actualizada", database)
    fs.writeFileSync(path, JSON.stringify(database))
    console.log("gastos.json updated successfully");
    return database

  }
 

  catch (error) {
    res.status(400).json({ error: error.message })
  }
}



export default Delete_Gasto