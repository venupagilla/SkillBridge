import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage';
import SkillCheckPage from './pages/SkillCheckPage';
import RoadmapPage from './pages/RoadmapPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="parse" element={<SkillCheckPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="recruiter" element={<RecruiterDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
