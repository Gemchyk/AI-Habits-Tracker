import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import {useDispatch} from 'react-redux'
import HabitsPage from './Components/HabitsPage/HabitsPage';
import DashboardPage from './Components/Dashboard/DashBoard';
import Sidebar from './Components/SideBar/SideBar';
import AIChatPage from './pages/AIChatPage';
import './App.css';

import { resetHabitsAndStreak } from './store/habitsSlice';
import { moveForward } from './store/dashboardSlice';


function App() {

  const today = new Date();
  const [currentHour, setCurrentHour] = useState(today.getHours());
  const [currentMinutes, setCurrentMinutes] = useState(today.getMinutes());

  const dispatch = useDispatch();

  useEffect(() => {
      const timeInterval = setInterval(() => {
        setCurrentHour(new Date().getHours());
        setCurrentMinutes(new Date().getMinutes());
      }, 1000);
      return () => clearInterval(timeInterval);
    });
  
    useEffect(() => {
      if (!currentHour && !currentMinutes){
        dispatch(resetHabitsAndStreak());
        dispatch(moveForward(0));
      }
    }, [currentMinutes]);
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HabitsPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/ai" element={<AIChatPage wid={600} hei={750} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;