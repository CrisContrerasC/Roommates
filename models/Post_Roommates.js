//importamos uuid
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { fileURLToPath } from 'url'
import { dirname } from "path";


// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

//Path para crear en la raiz del proyecto la carpeta db
const path = `${__dirname}/../db/roommates.json`

const Post_Roommates = async() => {
    try {
        //Conectamos a la API Random user

        const dataAPI = await fetch("https://randomuser.me/api/?results=1");
        const { results: data } = await dataAPI.json();           
        const { first, last } = data[0].name;
        const roommateName = first + " " + last;
        const id = uuidv4().slice(0, 6);

        const roommate = {
            id,
            nombre: roommateName,
            debe : 0,
            recibe : 0
        }
        //agregar roommate en roommates.json
        const roommates = fs.readFileSync(path, "utf-8")
        if (roommates.trim() === "") {
            throw new Error("La cadena de texto roommates está vacía");
        }
        const arrayRoommates = JSON.parse(roommates);
        arrayRoommates.push(roommate);
        
        console.log(arrayRoommates)
        fs.writeFileSync(path, JSON.stringify(arrayRoommates), "utf8")
        return roommate;     

    } catch (error) {
        return console.error('Error al insertar nuevo usuario', error.code, error.stack, error.message);
    }
}

export default Post_Roommates