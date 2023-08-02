import './styles/App.css';
import {DisplayIP} from "./DisplayIP";
import {DisplayMap} from "./DisplayMap";
import {useState, createContext} from "react";

export const LLContext = createContext();
function App() {
  const [LL, setLL] = useState(
    {
      Lat: 0,
      Lon: 0
    }
  );
  return (
    <LLContext.Provider value = {{LL, setLL}}>
      <div className="container" >
        <DisplayIP />
        <DisplayMap />
      </div>
    </LLContext.Provider>
  );
}

export default App;
