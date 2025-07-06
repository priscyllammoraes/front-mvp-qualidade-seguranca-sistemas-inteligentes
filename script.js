/* -------------------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
  console.log("✅ [DOMContentLoaded] DOM carregado");
  getList();

  const form = document.getElementById('prediction-form');
  if (form) {
    form.addEventListener('submit', newItem);
    console.log("📌 [DOMContentLoaded] Evento de submit adicionado ao formulário");
  }
});

/* -------------------------------------------------------------------------------------- */
const getList = async () => {
  console.log("🔁 [getList] Iniciando requisição GET para /pessoas");

  const url = 'http://127.0.0.1:5000/pessoas';

  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao buscar dados: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`📋 [getList] Total de pessoas retornadas: ${data.pessoas.length}`);
    
    data.pessoas.forEach((item, index) => {
      /*console.log(`\n👤 [getList] Pessoa ${index + 1}:`);
      console.log(item);*/

      insertList(
        item.id, item.Age, item.Gender, item.FHWO, item.FAVC,
        item.FCVC, item.NCP, item.CAEC, item.SMOKE, item.CH2O,
        item.SCC, item.FAF, item.TUE, item.CALC, item.MTRANS,
        item.prediction
      );
    });

  } catch (error) {
    console.error("❌ [getList] Erro:", error.message);
  }
};

/* -------------------------------------------------------------------------------------- */
const insertList = (id, age, gender, fhwo, favc, fcvc, ncp, caec, smoke, ch2o, scc, faf, tue, calc, mtrans, predicao) => {
  /*console.log("📥 [insertList] Inserindo item na tabela");
  
  console.table({
    id, age, gender, fhwo, favc, fcvc, ncp, caec, smoke, ch2o, scc, faf, tue, calc, mtrans, predicao
  });*/

  const item = [id, age, gender, fhwo, favc, fcvc, ncp, caec, smoke, ch2o, scc, faf, tue, calc, mtrans, predicao];
  const valueMap = {
    yes: "Sim",
    no: "Não",
    Female: "Feminino",
    Male: "Masculino",
    Frequently: "Frequentemente",
    Sometimes: "Às vezes",
    Always: "Sempre",
    Walking: "Caminhada",
    Automobile: "Carro",
    Public_Transportation: "Transporte Público",
    Motorbike: "Moto",
    Bike: "Bicicleta"
  };



  const tableBody = document.getElementById('tabela-historico')?.getElementsByTagName('tbody')[0];
  if (!tableBody) {
    console.error("❌ [insertList] Tabela não encontrada no DOM.");
    return;
  }

  const row = tableBody.insertRow();
  item.forEach((valor, index) => {

    const cell = row.insertCell(); 
    const traduzido = valueMap[valor] ?? valor ?? "-";
    cell.textContent = traduzido;
    
    /*const cell = row.insertCell();
    cell.textContent = valor ?? "-";
    console.log(`📍 [insertList] Coluna ${index + 1}:`, valor);*/
  });

  const deleteCell = row.insertCell();
  insertDeleteButton(deleteCell, id);

  removeElement();
};



const insertDeleteButton = (parent, id) => {
  const span = document.createElement("span");
  span.className = "close";
  span.setAttribute("data-id", id);

  const icon = document.createElement("i");
  icon.className = "fas fa-trash";  // ícone de lixeira do Font Awesome

  span.appendChild(icon);
  parent.appendChild(span);
};

/* -------------------------------------------------------------------------------------- */
const removeElement = () => {
  /*console.log("🧯 [removeElement] Ativando eventos de exclusão");*/
  let close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      const id = this.getAttribute("data-id");
      const row = this.parentElement.parentElement;

      console.log(`🚮 [removeElement] Solicitando remoção da linha com ID ${id}`);

      if (confirm("Você tem certeza?")) {
        row.remove();
        deleteItem(id);
        alert("Removido!");
      }
    };
  }
};

/* -------------------------------------------------------------------------------------- */
const clearTable = () => {
  console.log("🧹 [clearTable] Limpando tabela");
  var table = document.getElementById('tabela-historico').getElementsByTagName('tbody')[0];
  while(table.rows.length > 0) {
    table.deleteRow(0);
  }
};

/* -------------------------------------------------------------------------------------- */
const refreshList = async () => {
  console.log("🔄 [refreshList] Atualizando lista");
  clearTable();
  await getList();
};

/* -------------------------------------------------------------------------------------- */
const postItem_json = async (formData) => {
  console.log("📤 [postItem] Enviando dados para /pessoa");
  const url = 'http://127.0.0.1:5000/pessoa';
  const jsonString = JSON.stringify(formData);

  console.log("📤 [postItem] JSON final enviado:", jsonString);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonString
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status} - ${response.statusText}: ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ [postItem] Resposta da API:", data);

    return data;
  } catch (error) {
    console.error("❌ [postItem] Erro:", error.message);
    throw error;
  }
};


const postItem = async (formDataObj) => {
  const url = 'http://127.0.0.1:5000/pessoa';

  // 🔁 Montar FormData (multipart/form-data)
  const formData = new FormData();
  for (const key in formDataObj) {
    formData.append(key, formDataObj[key]);
  }

  console.log("📤 [postItem] Enviando como FormData:");
  for (let pair of formData.entries()) {
    console.log(`${pair[0]} = ${pair[1]}`);
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData  // 👈 Envia como multipart/form-data automaticamente
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status} - ${response.statusText}: ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ [postItem] Resposta da API:", data);

    return data;
  } catch (error) {
    console.error("❌ [postItem] Erro ao enviar os dados:", error.message);
    throw error;
  }
};


/* -------------------------------------------------------------------------------------- */
const deleteItem = (id) => {
  console.log(`❌ [deleteItem] Enviando DELETE para ID ${id}`);
  let url = `http://127.0.0.1:5000/pessoa?id=${id}`;
  fetch(url, {
    method: 'DELETE'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('❌ [deleteItem] Erro:', error);
    });
};

export function processForm(form) {
  console.log("🧾 [processForm] Iniciando processamento do formulário");

  const getRadioValue = (name) => {
    const input = form.querySelector(`input[name="${name}"]:checked`);
    const valor = input ? input.value : "";
    console.log(`📥 [processForm] ${name} = ${valor}`);
    return valor;
  };

  const mapRadioToInt = (value, mapa, campo) => {
    const convertido = mapa[value] ?? 0;
    console.log(`🔄 [processForm] ${campo} convertido para ${convertido}`);
    return convertido;
  };

  const ncpMap = { "1": 1, "2": 2, "3": 3, ">4": 4 };
  const ch2oMap = { "<1": 1, "1-2": 2, ">2": 3 };
  const fafMap = { "0": 0, "1-2": 1, "2-4": 2, ">4": 3 };
  const tueMap = { "0-2": 0, "3-5": 1, ">5": 2 };

  const dados = {
    Age: parseInt(form.Age.value),
    FCVC: parseInt(getRadioValue("FCVC")),
    NCP: mapRadioToInt(getRadioValue("NCP"), ncpMap, "NCP"),
    CH2O: mapRadioToInt(getRadioValue("CH2O"), ch2oMap, "CH2O"),
    FAF: mapRadioToInt(getRadioValue("FAF"), fafMap, "FAF"),
    TUE: mapRadioToInt(getRadioValue("TUE"), tueMap, "TUE"),
    Gender: getRadioValue("Gender"),
    FHWO: getRadioValue("FHWO"),
    FAVC: getRadioValue("FAVC"),
    CAEC: getRadioValue("CAEC"),
    SMOKE: getRadioValue("SMOKE"),
    SCC: getRadioValue("SCC"),
    CALC: getRadioValue("CALC"),
    MTRANS: getRadioValue("MTRANS")
  };

  console.log("📦 [processForm] Dados finais:", dados);
  return dados;
}

/* -------------------------------------------------------------------------------------- */
const newItem = async (event) => {
  console.log("🆕 [newItem] Submissão de formulário iniciada");
  event.preventDefault();

  const form = document.getElementById('prediction-form');
  const formData = processForm(form);

  try {
    const result = await postItem(formData);
    console.log("🎉 [newItem] Inserção realizada, atualizando tabela");
    form.reset();
    await refreshList();
    alert(`Pessoa adicionada com sucesso!\nPredição: ${result.prediction}`);
  } catch (error) {
    console.error('❌ [newItem] Erro ao adicionar pessoa:', error);
    alert("Erro ao adicionar pessoa. Tente novamente.");
  }
};


