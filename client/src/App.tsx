import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { AlertTest } from './components/notifications/AlertTest';
import { Dashboard } from "./components/Dashboard";
import { Authentification } from './components/Authentification';
function App() {
  return (
   <Router>
      <div>
        <Routes>
          <Route path="/" element={<Authentification/>} />
          <Route path="/tests" element={<AlertTest/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
