const express = require("express");
const app = express();

app.use(express.json());

let data = [
  {
    id: 1,
    valor: 1500.0,
    tipoIngreso: "efectivo",
    fechaCargado: "2024-10-25",
    cargadoPor: "Juan Pérez",
  },
  {
    id: 2,
    valor: 2500.0,
    tipoIngreso: "digital",
    fechaCargado: "2024-10-25",
    cargadoPor: "María López",
  },
  {
    id: 3,
    valor: 1000.0,
    tipoIngreso: "efectivo",
    fechaCargado: "2024-10-24",
    cargadoPor: "Carlos Sánchez",
  },
  {
    id: 4,
    valor: 3000.0,
    tipoIngreso: "digital",
    fechaCargado: "2024-10-24",
    cargadoPor: "Ana Martínez",
  },
  {
    id: 5,
    valor: 500.0,
    tipoIngreso: "efectivo",
    fechaCargado: "2024-10-23",
    cargadoPor: "Luis Rodríguez",
  },
];

app.get("/api/data/", (request, response) => {
  response.json(data);
});

app.get("/api/data/:id", (request, response) => {
  const id = Number(request.params.id);
  const ingreso = data.find((data) => data.id === id);
  if (ingreso) {
    return response.json(ingreso);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/data/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((dato) => dato.id !== id);

  response.status(204).end();
});

const generateId = () => {
    const dataIds = data.map(n => n.id)
    const maxId = dataIds.length ? Math.max(...dataIds) : 0
    const newId = maxId + 1
    return newId
  }

app.post("/api/data", (request, response) => {
    const info = request.body
    console.log(info);
    
    /* if (!data.valor) {
        return response.status(400).json({
          error: 'required "valor" field is missing'
        })
      } */
      const newData = {
        id: generateId(),
        valor: info.valor,
        fechaCargado: new Date(),
        tipoIngreso: info.tipoIngreso,
        cargadoPor: info.cargadoPor
      }
    
      data = [...data, newData]
    
      response.json(newData)

});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
