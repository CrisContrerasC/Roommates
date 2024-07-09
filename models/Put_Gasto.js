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

const Put_Gasto = async (id, roommate, descripcion, monto) => {
    //console.log("salida id en put_gasto: ", id);
    //console.log("salida roommate en put_gasto: ", roommate);
    //console.log("salida descripcion en put_gasto: ", descripcion);
    //console.log("salida monto en put_gasto: ", monto);
    try {
        //Lee datos de gastos y roommates
        const gastosDb = fs.readFileSync(path, "utf-8");
        const gastos = JSON.parse(gastosDb);       
        const roommatesDb = fs.readFileSync(roommatesPath, "utf-8")
        const roommates = JSON.parse(roommatesDb);
        
        //console.log("Salida gastos en PutGasto", gastos)
       // console.log("Salida roommates en PutGasto", roommates)
        let gasto = gastos.find((gasto) => gasto.id === id);
        //console.log("Salida gasto inicial",gasto)
        if (!gasto) {
            throw new Error('No se encontro gasto');
        }
        else {
            const montoOriginal = gasto.monto
           // console.log("monto original", montoOriginal)
           // console.log("nuevo monto", monto)


            //valor a reajustar
            const reajuste = monto - montoOriginal
            //console.log("reajuste", reajuste)
            //reajuste para roommates
            const reajusteRoommates = reajuste / roommates.length
            //console.log("reajusteRoommates", reajusteRoommates)

            //Actualizar valores en roommates recibe y debe
            
            roommates.forEach(e => {
                if (e.nombre === roommate) {
                    e.recibe = (e.recibe || 0) + reajusteRoommates;
                  
                } else {
                    e.debe = (e.debe || 0) + reajusteRoommates;
                }
            });
            //console.log("Salida roommates actualizado", roommates)

            //Guardar cambio en roommates
            fs.writeFileSync(roommatesPath, JSON.stringify(roommates, null, 2), 'utf8');

            //actualizar gastos             
            if (gasto.id === id) {
                    gasto.monto = monto
                }
            
            //console.log("Salida gasto reajustado", gastos)
            fs.writeFileSync(path, JSON.stringify(gastos, null, 2), 'utf8');

        }
        return gastos

    } catch (error) {
        res.status(500).send({ message: "Error al procesar la solicitud" });
    }

}

export default Put_Gasto