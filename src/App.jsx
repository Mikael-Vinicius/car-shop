import React, { useState } from "react";
import {QRCodeSVG} from 'qrcode.react';
import { useEffect } from "react";

import './App.css'
import Header from "./components/Header";
import logo from '../src/images/Logo Nova-04.png'

const Workshop = () => {
  const [customerData, setCustomerData] = useState(null);
  const [serviceData, setServiceData] = useState({
    responsiblePerson: "",
    part: "",
    partValue: 0,
    serviceStart: null,
    serviceEnd: null
  });
  const mockCustomerData = { nome: "John Doe", veiculo: "Carro" };


  const handleResponsiblePersonChange = (e) => {
   
    setServiceData({ ...serviceData, responsiblePerson: e.target.value });
  };

  const handlePartChange = (e) => {
   
    const part = e.target.value;
    const partValue = getPartValue(part); 
    setServiceData({ ...serviceData, part: part, partValue: partValue });
  };

  const handleServiceStart = () => {
    
    const serviceStart = new Date();
    setServiceData({ ...serviceData, serviceStart: serviceStart });
  };

  const handleServiceEnd = () => {
   
    const serviceEnd = new Date();
    setServiceData({ ...serviceData, serviceEnd: serviceEnd });
  };

  useEffect(() => {
    setTimeout(() => {
      
      setCustomerData(mockCustomerData);
    }, 1000);
  }, []);


  const getPartValue = (part) => {
   
    let partValue = 0;
    switch (part) {
      case "peca1":
        partValue = 10; 
        break;
      case "peca2":
        partValue = 20; 
        break;
      case "peca3":
        partValue = 30; 
        break;
     
      default:
        partValue = 0; 
        break;
    }
    return partValue;
  };
  return (
    <div>
    <Header />

      <QRCodeSVG value={mockCustomerData} width='100%'/>
      


      <form>
       
        {customerData && (
          <div>
            <h2>Dados do Cliente/Veículo</h2>
            <p>Nome: {customerData.nome}</p>
            <p>Veículo: {customerData.veiculo}</p>
            
          </div>

        )}
        <div className="logo-container">
          <img className='logo' src={logo}/>
        </div>
        <label>
          Nome da pessoa responsável pelo serviço:
          <input
            type="text"
            value={serviceData.responsiblePerson}
            onChange={handleResponsiblePersonChange}
          />
        </label>

       
        <label>
          Peça:
          <select value={serviceData.part} onChange={handlePartChange}>
            <option value="">Selecione</option>
            <option value="peca1">Peça 1</option>
            <option value="peca2">Peça 2</option>
            <option value="peca3">Peça 3</option>
            
          </select>
        </label>

      
        {serviceData.part && (
          <p>Valor da peça: R$ {serviceData.partValue.toFixed(2)}</p>
        )}

       
        {!serviceData.serviceStart && (
          <button type="button" onClick={handleServiceStart}>
            Iniciar Serviço
         
            </button>
        )}

        {serviceData.serviceStart && !serviceData.serviceEnd && (
          <button type="button" onClick={handleServiceEnd}>
            Finalizar Serviço
          </button>
        )}

       
        {serviceData.serviceStart && serviceData.serviceEnd && (
          <div>
            <h2>Informações do Serviço</h2>
            <p>Data/Hora de Início: {serviceData.serviceStart.toString()}</p>
            <p>Data/Hora de Término: {serviceData.serviceEnd.toString()}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Workshop;
