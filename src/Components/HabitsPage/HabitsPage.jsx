import { useDispatch, useSelector } from 'react-redux';
import HabitsItem from './HabitsItem';
import '../../App.css';
import AddHabitModal from '../ModalForms/AddHabitModal';
import AIWindow from './AIWindow';



function HabitsPage() {
  const habits = useSelector((state) => state.habits.habitsData);
  


  

  return (
    <div className="habits-dashboard">
      <header className="habits-header">
        <h2>Your Daily Habits</h2>
      </header>
      <section className="habits-main">
        <div className="habits-content">
          <ul className="habits-list">
            {habits.map((habit, index) => (
              <li key={index}>
                <HabitsItem habit={habit} />
              </li>
            ))}
          </ul>
          <AddHabitModal />
        </div>
        <aside className="habits-ai">
          <AIWindow habits={habits} />
        </aside>
      </section>
    </div>
  );
}

export default HabitsPage;