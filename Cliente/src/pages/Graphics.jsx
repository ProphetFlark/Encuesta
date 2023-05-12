import { useUser } from "../context/UserContext";
import { VictoryBar, VictoryPie, VictoryLabel } from "victory";

const Graphics = () => {
  const { unicaencuesta } = useUser();

  if (unicaencuesta !== undefined) {
    const { preguntas, respuestas } = unicaencuesta;

    const colors = [
      "#8884d8",
      "#83a6ed",
      "#8dd1e1",
      "#82ca9d",
      "#ffcc5c",
      "#fe8a71",
      "#f6c4e1",
      "#c2c2f0",
    ];

    const colors2 = [
      "#8884d84d",
      "#83a6ed4d",
      "#8dd1e14d",
      "#82ca9d4d",
      "#ffcc5c4d",
      "#fe8a714d",
      "#f6c4e14d",
      "#c2c2f04d",
    ];

    const optionsData = preguntas
      .filter((pregunta) => pregunta.tipo === "opciones")
      .map((pregunta, index) => {
        const respuestasPregunta = respuestas.map(
          (respuesta) => respuesta.respuestas[index]
        );

        const countRespuestas = pregunta.opciones.map((opcion, i) =>
          respuestasPregunta.reduce(
            (count, respuesta) => count + (respuesta[i] ? 1 : 0),
            0
          )
        );

        const data = pregunta.opciones.map((opcion, i) => ({
          x: opcion,
          y: countRespuestas[i],
        }));

        return {
          pregunta: pregunta.texto,
          data: data,
        };
      });

    const vfData = preguntas
      .filter((pregunta) => pregunta.tipo === "vf")
      .map((pregunta, index) => {
        const respuestasPregunta = respuestas.map(
          (respuesta) => respuesta.respuestas[index]
        );

        const countVerdadero = respuestasPregunta.filter(
          (respuesta) => respuesta[0]
        ).length;
        const countFalso = respuestasPregunta.length - countVerdadero;

        const data = [
          { x: "Verdadero", y: countVerdadero },
          { x: "Falso", y: countFalso },
        ];

        return {
          pregunta: pregunta.texto,
          data: data,
        };
      });

    return (
      <div>
        {optionsData.map((opcion, index) => (
          <div
            key={index}
            style={{
              backgroundColor: `${colors2[index % colors2.length]}`,
              borderRadius: "10px",
            }}
          >
            <h3>{opcion.pregunta}</h3>
            <VictoryBar
              data={opcion.data}
              style={{
                data: { fill: colors[index % colors.length] },
                parent: { maxWidth: "300px" },
              }}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              labelComponent={<VictoryLabel dy={-20} />}
              animate={{ duration: 200 }}
              height={250}
              width={300}
            />
          </div>
        ))}

        {vfData.map((vf, index) => (
          <div
            key={index}
            style={{
              backgroundColor: `${colors2[index % colors2.length]}`,
              borderRadius: "10px",
            }}
          >
            <h3>{vf.pregunta}</h3>
            <VictoryPie
              data={vf.data}
              padding={0}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              labelRadius={10}
              height={30}
              width={200}
              animate={{
                duration: 200,
              }}
              colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
              style={{
                labels: {
                  fontSize: 2,
                  fill: "#000",
                },
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default Graphics;
