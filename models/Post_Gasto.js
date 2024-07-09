import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

import { fileURLToPath } from 'url'
import { dirname } from "path";


// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Path para crear en la raiz del proyecto la carpeta db

const dirPath =  `${__dirname}/../db`;
const path = `${dirPath}/gastos.json`;
const roommatesPath = `${dirPath}/roommates.json`;

const Post_Gasto = async (roommate) => {
    
    try {
        if (!fs.existsSync(path)) {

            const emptyData = []; 

            fs.writeFileSync(path, JSON.stringify(emptyData, null, 2), 'utf8');


        } 
            const database = fs.readFileSync(path, "utf-8")
            const databaseJSON = JSON.parse(database);
            const id = uuidv4().slice(0, 6);
            const gasto = {
                id: id,
                roommate: roommate.roommate,
                descripcion: roommate.descripcion,
                monto: roommate.monto
            }

            databaseJSON.push(gasto);
            fs.writeFileSync(path, JSON.stringify(databaseJSON));
            
            //Obtener roomates.json para luego distribuir el gasto
            const roommates = fs.readFileSync(roommatesPath, "utf-8")
            const roommatesJSON = JSON.parse(roommates);
            const montoADividir = gasto.monto/roommatesJSON.length;
            
            //Agregar gasto a roommates.json
            roommatesJSON.forEach(roommate => {
                if(roommate.nombre === gasto.roommate){
                    if(!roommate.recibe){
                        roommate.recibe = 0
                    }
                    roommate.recibe += montoADividir;
                   
                } else {
                    if(!roommate.debe){
                        roommate.debe = 0
                    }
                    roommate.debe += montoADividir;
                }
            
            })
            fs.writeFileSync(roommatesPath, JSON.stringify(roommatesJSON));
           
            return gasto
        
    }  
    
catch (error) {
    return console.error('Error al insertar nuevo gasto', error.code, error.stack, error.message);
}
}


export default Post_Gasto