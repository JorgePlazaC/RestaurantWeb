import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import ReactModal from "react-modal";

//import Pedido from "./components/pedido";
import { Modal } from "react-native-web";

function App() {
  //UseState
  const [cargando, setCargando] = useState(true);
  const [arrayFacturas, setArrayFacturas] = useState([]);
  const [modalProductos, setModalProductos] = useState(false);
  const [modalTiempo, setModalTiempo] = useState(false);
  const [pedidoEdit, setPedidoEdit] = useState([]);
  const [pedidoEdit2, setPedidoEdit2] = useState([]);
  const [minutos, setMinutos] = useState(0)
  const [segundos, setSegundos] = useState(0)

  //Url usadas
  const baseUrl = "http://127.0.0.1:8000";
  const urlFacturas = `${baseUrl}/api/facturas`;

  //UseEfect
  useEffect(() => {
    (async () => {
      // await fetchAllAxios();
      fetchFirebase();
    })();
  }, []);

  //Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDUG_OZb0A9YEJQmCI1iqK4NIyIR8w5qp0",
    authDomain: "restaurant-22e6c.firebaseapp.com",
    projectId: "restaurant-22e6c",
    storageBucket: "restaurant-22e6c.appspot.com",
    messagingSenderId: "327222016651",
    appId: "1:327222016651:web:9da1b280e9e290307cb28e",
    measurementId: "G-XCGSTZWQY3",
  };

  const app = initializeApp(firebaseConfig);

  //Llamado GET a api
  const fetchAllAxios = async () => {
    let api = [urlFacturas];
    try {
      await Promise.all(api.map(async (api) => await axios.get(api))).then(
        async ([{ data: facturas }]) => {
          setArrayFacturas(await facturas);
          console.log(await arrayFacturas);
          setCargando(false);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  //Obtener tiempo
  const fetchFirebase = () => {
    const db = getDatabase();
    const reference = ref(db, "pedidos/");
    onValue(reference, async (snapshot) => {
      const data = await snapshot.val();
      console.log(await data.idFactura);
      setArrayFacturas(data);
      setCargando(false);
    });
  };

  //Actualizar tiempo
  const ActualizarPedido = () => {
    if (pedidoEdit !== undefined) {
      const db = getDatabase();
      const reference = ref(db, "pedidos/" + pedidoEdit2.idFactura);

      let tiempoSegundos = (minutos*60)+parseInt(segundos)

      console.log(tiempoSegundos)

      set(reference, {
        idFactura: pedidoEdit2.idFactura,
        productos: pedidoEdit2.productos,
        estado: "Tiempo asignado",
        mesa: pedidoEdit2.mesa,
        tiempo: tiempoSegundos,
      });

      console.log(pedidoEdit2);
    }
  };

  let pedido = {
    idFactura: 1,
  };

  const DesplegarPedidos = () => {
    if (cargando) {
      return <h2>Cargando</h2>;
    } else {
      return arrayFacturas.map((factura) => (
        <Pedido key={factura.idFactura} pedido={factura} />
      ));
    }
  };

  const DesplegarProductos = () => {
    if (pedidoEdit !== undefined) {
      console.log(pedidoEdit);
      return pedidoEdit.map((producto) => (
        <Productos key={producto.producto.id} producto={producto} />
      ));
    }
  };

  const modalProductosMetodo = (pedido) => {
    setPedidoEdit(pedido);
    setModalProductos(true);
  };

  const modalActualizarTiempo = (pedido, pedido2) => {
    setPedidoEdit(pedido);
    setPedidoEdit2(pedido2);
    setModalTiempo(true);
  };

  const Pedido = ({ pedido }) => {
    return (
      <div className="w-full px-3 mb-4">
        <div className="p-5 shadow-md bg-white">
          <div className="lg:flex">
            <div className="lg:w-1/24 xl:w-1/24 pl-5">
              <p className="font-bold text-2xl text-yellow-600 mb-4">
                {pedido.idFactura}{" "}
              </p>
            </div>
            <div className="lg:w-1/24 xl:w-1/24 pl-5">
              <p className="font-bold text-2xl text-yellow-600 mb-4">
                Estado: {pedido.estado}{" "}
              </p>
            </div>
            <div className="lg:w-1/24 xl:w-1/24 pl-5">
              <p className="font-bold text-2xl text-yellow-600 mb-4">
                Tiempo asignado: {pedido.tiempo}{" "}
              </p>
            </div>
            <div className="lg:w-1/24 xl:w-1/24 pl-5">
              <p className="font-bold text-2xl text-yellow-600 mb-4">
                Mesa: {pedido.mesa}{" "}
              </p>
            </div>
            <div className="lg:w-1/24 xl:w-1/24 pl-5">
              <button
                onClick={() => {
                  modalProductosMetodo(pedido.productos);
                }}
              >
                Ver productos
              </button>
            </div>
            <div className="lg:w-1/24 xl:w-1/24 pl-5">
              <button
                onClick={() => {
                  modalActualizarTiempo(pedido.productos, pedido);
                }}
              >
                Actualizar tiempo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Productos = ({ producto }) => {
    return (
      <div className="w-full px-3 mb-4">
        <div className="p-5 shadow-md bg-white">
          <div className="lg:flex">
            <div className="lg:w-1/24 xl:w-1/24 pl-5">
              <p className="font-bold text-2xl text-yellow-600 mb-4">
                {producto.cantidad}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <div className="md:w-6/6 xl:w-5/5 bg-gray-800">
          <div className="p-6">
            <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
              Administración de pedidos restaurant
            </p>
          </div>
        </div>
        {DesplegarPedidos()}
      </div>
      <ReactModal isOpen={modalProductos} contentLabel="Minimal Modal Example">
        <div>
          {DesplegarProductos()}
          <button
            onClick={() => {
              setModalProductos(false);
            }}
          >
            Close Modal
          </button>
        </div>
      </ReactModal>
      <ReactModal isOpen={modalTiempo} contentLabel="Minimal Modal Example">
        <div>
          <h2>Ingrese el tiempo:</h2>
          <h2>Minutos:</h2>
          <input type="text" value={minutos} onChange={(valor) => setMinutos(valor.target.value)} />
          <h2>Segundos:</h2>
          <input type="text" value={segundos} onChange={(valor) => setSegundos(valor.target.value)} />
          <button
            onClick={() => {
              ActualizarPedido();
            }}
          >
            Actualizar
          </button>
          <button
            onClick={() => {
              setModalTiempo(false);
            }}
          >
            Close Modal
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default App;
