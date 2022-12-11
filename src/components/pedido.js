import React, { useContext, useRef } from "react";

const Pedido = ({ pedido }) => {
  //const { id } = pedido;

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
              {pedido.estado}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
