import Get_Roommates from "../models/Get_Roommates.js";
import Post_Roommates from "../models/Post_Roommates.js";
//Get
export const getRoommates = async(req, res) => {
    try {
        
        const getData = await Get_Roommates();
       
        res.status(200).send(getData); // JSON.parse convierte un string a un objeto de JS (data);
        
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}  

export const postRoommate = async(req, res) => {
    try {
        
        const postData = await Post_Roommates();
        console.log("Salida nuevo roomate: ", postData)
        res.status(200).send(postData); // JSON.parse convierte un string a un objeto de JS (data);
        
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}