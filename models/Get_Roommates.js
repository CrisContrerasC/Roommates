import fs from 'fs';

import { fileURLToPath } from 'url'
import { dirname } from "path";


// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

//Path para crear en la raiz del proyecto la carpeta db
const path = `${__dirname}/../db/roommates.json`

const Get_Roommates = async () => {
try {
    const database = fs.readFileSync(path, 'utf-8');
    return JSON.parse(database);
    
} catch (error) {
    return console.error('Error al obtener los roommates', error.code, error.stack, error.message);
}
    
}

export default Get_Roommates