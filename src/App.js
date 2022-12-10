import "./App.css";

import Pedido from "./components/pedido";

function App() {
  let pedido = {
    idFactura:1
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
      <Pedido
        key={pedido.idFactura} 
        pedido={pedido} />
    </div>
  );
}

export default App;
