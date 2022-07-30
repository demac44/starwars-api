import Homepage from "./components/Homepage/Homepage";
import { Routes, Route } from "react-router-dom"
import Characters from "./components/CharactersPage/Characters";
import Planets from "./components/PlanetsPage/Planets";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/movies/:query" element={<Characters/>}/>
      <Route path="/planets/:climate" element={<Planets/>}/>
    </Routes>
  );
}

export default App;
