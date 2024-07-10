import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { Dashboard } from "./components/Dashboard";
import { Authentification } from './components/Authentification';
function App() {
  return (
   <Router>
      <div>
        <Routes>
          <Route path="/" element={<Authentification/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
