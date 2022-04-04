import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './views/Home';
import BreedDetails from './views/BreedDetails';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" >
            <Route index element={<HomePage />} />
            <Route path="/:breedId" element={<HomePage />} />
          </Route>
          <Route path="/breed/:imageId" element={<BreedDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
