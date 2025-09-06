import { useSelector, useDispatch } from 'react-redux';
import { moveForward } from '../../store/dashboardSlice';
import CaloriesGraphic from '../Graphics/CaloriesGraphic'
import './DashboardPage.scss';

function DashboardPage() {
  const streak = useSelector((state) => state.streak.streak);
  const habits = useSelector((state) => state.habits.habitsData);

  const completedHabitsAmount = habits.reduce((acc, cur) => (cur.completed ? acc + 1 : acc),
    0
  );
  const completedHabitsPercent = habits.length
    ? Math.round((completedHabitsAmount / habits.length) * 100)
    : 0;

  const dispatch = useDispatch();

  const handleTest = () => {
    dispatch(moveForward(0));
  }

  return (
    <div className="dashboard">
      <button onClick={() => {handleTest()}}>Test</button>
      <h2 className="dashboard-title">Activity Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Habits Tracked</h3>
          <p>{completedHabitsAmount} / {habits.length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Streak</h3>
          <p>{streak}</p>
        </div>
        <div className="dashboard-card">
          <h3>Completion Rate</h3>
          <p>{completedHabitsPercent}%</p>
        </div>
      </div>
      <div className="dashboard-chart-placeholder">
        <CaloriesGraphic />
      </div>
    </div>
  );
}

export default DashboardPage;
