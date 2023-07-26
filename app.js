const axios = require('axios');

const base_url = 'https://cluster.apigratis.com/api/v1';
const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3BsYXRhZm9ybWEuYXBpYnJhc2lsLmNvbS5ici9zb2NpYWwvZ29vZ2xlL2NhbGxiYWNrIiwiaWF0IjoxNjkwMDcwMzE4LCJleHAiOjE3MjE2MDYzMTgsIm5iZiI6MTY5MDA3MDMxOCwianRpIjoiSjVHNVlPc1VtS1M3WXBXQSIsInN1YiI6IjQxODEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ICUxceGZRIlX38kN_2ubya3vtF0eWNoSZ1v5goFEvJY'; // Substitua esta linha pelo seu token real
// Variáveis para controle do limite de requisições
let requestCount = 0;
const maxRequests = 1; // Defina o número máximo de requisições que deseja fazer

// Função para obter informações completas do veículo
async function getVehicleInfo(placa) {
    if (requestCount >= maxRequests) {
        throw new Error("Limite máximo de requisições atingido. Aguarde um momento e tente novamente.");
    }
  const dados_url = `${base_url}/vehicles/dados`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`,
    'SecretKey': 'fd783073-911f-411a-8668-8658173146c3',
    'PublicToken': '672ABC94262CVF7CE8262O0ZF35C46F0651A7',
    'DeviceToken': 'd9c49c44-7c94-46bd-bc80-bdaf1f3399ca'
  };
  const data = {
    "placa": placa
  };

  try {
    const response = await axios.post(dados_url, data, { headers });
    console.log("Resposta do endpoint de informações do veículo:", response.data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Falha na obtenção das informações do veículo.");
    }
  } catch (error) {
    console.log("Erro na chamada ao endpoint de informações do veículo:", error.response.data);
    throw new Error("Erro ao obter informações do veículo: " + error.message);
  }
}

// Função para obter informações de valores FIPE do veículo
async function getFipeValues(placa) {
      // Restrição para o limite de requisições
  if (requestCount >= maxRequests) {
    throw new Error("Limite máximo de requisições atingido. Aguarde um momento e tente novamente.");
  }
  const fipe_url = `${base_url}/vehicles/fipe`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`,
    'SecretKey': 'fd783073-911f-411a-8668-8658173146c3',
    'PublicToken': '672ABC94262CVF7CE8262O0ZF35C46F0651A7',
    'DeviceToken': 'd9c49c44-7c94-46bd-bc80-bdaf1f3399ca'
  };
  const data = {
    "placa": placa
  };

  try {
    const response = await axios.post(fipe_url, data, { headers });
    console.log("Resposta do endpoint de valores FIPE:", response.data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Falha na obtenção das informações de valores FIPE do veículo.");
    }
  } catch (error) {
    console.log("Erro na chamada ao endpoint de valores FIPE:", error.response.data);
    throw new Error("Erro ao obter valores FIPE do veículo: " + error.message);
  }
}

// Função para iniciar o processo de consumo da API
async function start() {
  try {
    const placa_veiculo = "FRP6677";

    // Obter informações completas do veículo
    const vehicle_info = await getVehicleInfo(placa_veiculo);
    console.log("Informações do veículo:");
    console.log(vehicle_info);

    // Obter informações de valores FIPE do veículo
    const fipe_values = await getFipeValues(placa_veiculo);
    console.log("Valores FIPE do veículo:");
    console.log(fipe_values);
  } catch (error) {
    console.error(error.message);
  }
}

start();
