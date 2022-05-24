import "./App.css";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import Iterator from "./data/utils/iterator.js";
import testData from "./data/data/testData";
import { formatData } from "./data/utils/utils";
import { useState, useEffect } from "react";

const fullData = require("./data/data/input");

const lights = new Iterator(formatData(fullData));
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      suggestedMin: 100,
      suggestedMax: 100,
      beginAtZero: false,
    },
    x: {
      suggestedMin: 100,
      suggestedMax: 100,
      beginAtZero: false,
    },
  },
  responsive: true,
};

export const data = {
  datasets: [
    {
      label: "LIGHTS",
      data: [],
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

function App() {
  const [currentData, setCurrentData] = useState({
    datasets: [
      {
        key: Date.now(),
        label: "LIGHTS ",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  });

  const [amountOfSteps, setAmountOfSteps] = useState(lights.getCurrentStep());

  const [step, setStep] = useState(1);

  useEffect(() => {
    setAmountOfSteps(lights.getCurrentStep());
  }, [currentData]);

  const callNextLights = () => {
    console.log("not set yet");

    setCurrentData((prevData) => {
      const newDataSet = lights.next(step).map((light) => {
        return { x: light.position[0], y: light.position[1] };
      });

      const copyDataSet = JSON.parse(JSON.stringify(prevData));
      console.log(newDataSet);
      copyDataSet.datasets[0].data = newDataSet;

      return copyDataSet;
    });
  };
  const callPrevLights = () => {
    console.log("not set yet");
    setCurrentData((prevData) => {
      const newDataSet = lights.prev(step).map((light) => {
        return { x: light.position[0], y: light.position[1] };
      });

      const copyDataSet = JSON.parse(JSON.stringify(prevData));
      console.log(newDataSet);
      copyDataSet.datasets[0].data = newDataSet;

      return copyDataSet;
    });
  };

  return (
    <div className="App">
      <Scatter options={options} data={currentData}></Scatter>
      <button
        onClick={(e) => {
          console.log(`pressed ${Date.now()}`);
          e.preventDefault();
          callPrevLights();
        }}
      >
        prev
      </button>
      <button
        onClick={(e) => {
          console.log(`pressed ${Date.now()}`);
          e.preventDefault();
          callNextLights();
        }}
      >
        next
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setStep((curStep) => {
            return (curStep -= 1);
          });
        }}
      >
        decrease step
      </button>

      <input
        type="text"
        value={step}
        onChange={(e) => {
          setStep(Number(e.target.value));
        }}
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault();
          setStep((curStep) => {
            return (curStep += 1);
          });
        }}
      >
        increase step
      </button>

      <p>{amountOfSteps}</p>
      <p>The target amount to read the message is 10011</p>
    </div>
  );
}

export default App;
