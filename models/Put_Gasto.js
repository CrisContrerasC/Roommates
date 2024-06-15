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

const Put_Gasto = async (id,{ roommate, descripcion, monto }) => {
 /* console.log("salida id: ", id);
try {
    //Lee datos de gastos y roommates
    let gastos = JSON.parse(fs.readFileSync(path, "utf-8"));
    let roommates = JSON.parse(fs.readFileSync(roommatesPath, "utf-8"));
    let gasto = gastos.find((gasto) => gasto.id === id);

    if (!gasto) {
        throw new Error('No se encontro gasto');
    }   
    else {
        
} 
}catch (error) {
    
}  */

}

export default Put_Gasto