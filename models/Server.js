/* EL PUT NO FUNCIONA LA CONEXIÓN DE LA RUTA PUT*/

// Importamos express
import express from 'express';


// Creación de variables de entorno
import { fileURLToPath } from 'url'
import { dirname } from "path";


// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

//Path para crear en la raiz del proyecto la carpeta db


//const path = `${__dirname}/../db/roommates.json`


// IMPORTAMOS NUESTRAS VISTAS
import rutaHome from '../routes/vistaHome.routes.js'
import rutaGetRoommates from '../routes/vistaGetRoommates.routes.js'
import rutaPostRoommate from '../routes/vistaPostRoommate.routes.js'
import rutaGetGastos from '../routes/vistaGetGastos.routes.js'
import rutaPostGasto from '../routes/vistaPostGasto.routes.js'
import rutaDelete from '../routes/vistaDelete.routes.js'
import rutaPut from '../routes/vistaPutGasto.routes.js'


  

// Creamos nuestro modelo o clase de servidor

class Server {

    // Vamos a crear nuestro constructor para que ejecute 
    // Middleware
    // Rutas o Routes
    constructor(){
        // Cramos la app  de express
        this.app = express();
        this.port = process.env.PORT || 8000;

        this.Paths = {
            rootHome:'/',
            rootPostRoommate:'/roommate',
            rootGetRoommates: '/roommates',
            rootGetGastos:'/gastos',
            rootPostGasto: '/gasto',
            rootDelete:'/gasto',
            rootPut:'/gasto'
             
            
            
        }

        // Iniciamos nuestros metodos iniciales
        this.middlewares();
        this.routes()
    }


    middlewares(){
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        this.app.use( express.urlencoded({ extended: true }));
        this.app.use('/jquery',express.static(  `${__dirname}/../node_modules/jquery/dist`  ));
    }


    routes(){
        this.app.use( this.Paths.rootHome , rutaHome);
        this.app.use( this.Paths.rootPostRoommate, rutaPostRoommate);
        this.app.use( this.Paths.rootGetRoommates, rutaGetRoommates );
        this.app.use( this.Paths.rootGetGastos, rutaGetGastos );
        this.app.use( this.Paths.rootPostGasto, rutaPostGasto );
        this.app.use( this.Paths.rootDelete , rutaDelete );        
        this.app.use( this.Paths.rootPut , rutaPut);
                             
            
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        } )
    } 

    

}

export default Server;