import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { Dashboard } from "./components/Dashboard";
import { Authentification } from './components/Authentification';
import { ServerCard } from './components/ServerCard'; 
import { CommandsManage } from './components/CommandsManage';
function App() {
  return (
   <Router>
      <div>
        <Routes>

          <Route path="/" element={<Authentification/>} />
          <Route path="/tests" element={<CommandsManage/>} />
          <Route path="/servers" element={<ServerCard/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
