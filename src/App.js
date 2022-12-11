import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

import Pedido from "./components/pedido";

function App() {
  //UseState
  const [cargando, setCargando] = useState(true);
  const [arrayFacturas, setArrayFacturas] = useState([]);

  //Url usadas
  const baseUrl = "http://127.0.0.1:8000";
  const urlFacturas = `${baseUrl}/api/facturas`;

  //UseEfect
  useEffect(() => {
    (async () => {
      await fetchAllAxios();
    })();
  }, []);

  //Llamado GET a api
  const fetchAllAxios = async () => {
    let api = [urlFacturas];
    try {
      await Promise.all(api.map(async (api) => await axios.get(api))).then(
        async ([{ data: facturas }]) => {
          setArrayFacturas(await facturas);
          console.log(await arrayFacturas);
          setCargando(false)
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  let pedido = {
    idFactura: 1,
  };

  const DesplegarPedidos = () =>{
    if(cargando){
      return(<h2>Cargando</h2>)
    }else{
      return(
        arrayFacturas.map( factura => (
          <Pedido
              key={factura.id}
              pedido={factura}
          />
      ))
      )
    }
  }
  
  return (
    <div>
      <div className="md:w-6/6 xl:w-5/5 bg-gray-800">
        <div className="p-6">
          <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
            RestaurantApp
          </p>
        </div>
      </div>
      {DesplegarPedidos()}
    </div>
  );
}

export default App;
