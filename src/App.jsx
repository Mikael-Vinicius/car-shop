import React, { useState } from "react";
import {QRCodeSVG} from 'qrcode.react';
import { useEffect } from "react";

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
    // Atualiza o state com o nome da pessoa responsável pelo serviço
    setServiceData({ ...serviceData, responsiblePerson: e.target.value });
  };

  const handlePartChange = (e) => {
    // Atualiza o state com a peça selecionada e seu valor
    const part = e.target.value;
    const partValue = getPartValue(part); // Função para obter o valor da peça
    setServiceData({ ...serviceData, part: part, partValue: partValue });
  };

  const handleServiceStart = () => {
    // Inicia o serviço e registra a data/hora de início
    const serviceStart = new Date();
    setServiceData({ ...serviceData, serviceStart: serviceStart });
  };

  const handleServiceEnd = () => {
    // Finaliza o serviço e registra a data/hora de término
    const serviceEnd = new Date();
    setServiceData({ ...serviceData, serviceEnd: serviceEnd });
  };

  useEffect(() => {
    setTimeout(() => {
      
      setCustomerData(mockCustomerData);
    }, 1000);
  }, []);


  const getPartValue = (part) => {
    // Lógica para obter o valor da peça com base na opção selecionada
    let partValue = 0;
    switch (part) {
      case "peca1":
        partValue = 10; // Valor da peça 1
        break;
      case "peca2":
        partValue = 20; // Valor da peça 2
        break;
      case "peca3":
        partValue = 30; // Valor da peça 3
        break;
      // Adicione mais casos para outras opções de peças aqui
      default:
        partValue = 0; // Valor padrão
        break;
    }
    return partValue;
  };
  return (
    <div>

      <QRCodeSVG value={mockCustomerData} width='100%'/>
      


      <form>
       
        {customerData && (
          <div>
            <h2>Dados do Cliente/Veículo</h2>
            <p>Nome: {customerData.nome}</p>
            <p>Veículo: {customerData.veiculo}</p>
          </div>
        )}

        {/* Campo para nome da pessoa responsável pelo serviço */}
        <label>
          Nome da pessoa responsável pelo serviço:
          <input
            type="text"
            value={serviceData.responsiblePerson}
            onChange={handleResponsiblePersonChange}
          />
        </label>

        {/* Campo para seleção da peça */}
        <label>
          Peça:
          <select value={serviceData.part} onChange={handlePartChange}>
            <option value="">Selecione</option>
            <option value="peca1">Peça 1</option>
            <option value="peca2">Peça 2</option>
            <option value="peca3">Peça 3</option>
            {/* Adicione mais opções de peças aqui */}
          </select>
        </label>

        {/* Mostra o valor da peça selecionada */}
        {serviceData.part && (
          <p>Valor da peça: R$ {serviceData.partValue.toFixed(2)}</p>
        )}

        {/* Botão para iniciar o serviço */}
        {!serviceData.serviceStart && (
          <button type="button" onClick={handleServiceStart}>
            Iniciar Serviço
         
            </button>
        )}

        {/* Botão para finalizar o serviço */}
        {serviceData.serviceStart && !serviceData.serviceEnd && (
          <button type="button" onClick={handleServiceEnd}>
            Finalizar Serviço
          </button>
        )}

        {/* Mostra a data/hora de início e término do serviço */}
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
