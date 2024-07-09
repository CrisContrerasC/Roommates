import Get_Gastos from "../models/Get_Gastos.js";
import Post_Gasto from "../models/Post_Gasto.js";
import Delete_Gasto from "../models/Delete_Gasto.js";
import Put_Gasto from "../models/Put_Gasto.js";
//import Post_Roommates from "../models/Post_Roommates.js";
//Get
export const getGastos = async (req, res) => {
  try {

    const getData = await Get_Gastos();

    res.status(200).send(getData); // JSON.parse convierte un string a un objeto de JS (data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const postGasto = async (req, res) => {
  const { roommate, descripcion, monto } = req.body;

  try {


    const insertData = await Post_Gasto({ roommate, descripcion, monto });

    res.status(200).json({ estado: 'OK', insert: insertData.rows }); // JSON.parse convierte un string a un objeto de JS (data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

export const deleteGasto = async (req, res) => {

  try {
    const { id } = req.query;
    console.log("Id recibido en el controlador:", id);
    const response = await Delete_Gasto(id);
    res.status(200).send(response.rows);

  }
  catch (error) {
    res.status(500).json({ error: "Error al borrar el gasto" });

  }
}

export const putGasto = async (req, res) => {
  //console.log("Salida req body: ", req);
  // console.log("Salida req body: ", req.body);
  //console.log("Salida req query: ", req.query);

  try {
    const { id } = req.query;
    const { roommate, descripcion, monto } = req.body;
    //console.log("Id recibido en el controlador:", id);
    //console.log("roommate, descripcion, monto: ", roommate, descripcion, monto);
    const response = await Put_Gasto(id, roommate, descripcion, monto);
    console.log("response.rows: ", response.rows);
    res.status(200).send({
      message: "Gasto actualizado con éxito",
      gastos,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el gasto" });
  }
}