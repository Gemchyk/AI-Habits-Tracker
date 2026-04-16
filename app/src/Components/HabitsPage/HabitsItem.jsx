import { useDispatch } from 'react-redux';
import { removeHabit, toggleIsCompletedAndUpdateStreak } from '../../store/habitsSlice'; 
import './HabitsItem.scss';

const HabitsItem = ({ habit }) => {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeHabit(id));
  };

  const handleChange = (id) => {
    dispatch(toggleIsCompletedAndUpdateStreak({ id }));
  };

  return (
    <div className={`habit-card ${habit.completed ? 'completed' : ''}`}>
      <div className="habit-card-header">
        <h3>{habit.name}</h3>
        <span className="habit-tag">{habit.frequency}</span>
      </div>
      <p className="habit-description">{habit.description}</p>
      <div className="habit-actions">
        <label className="habit-toggle">
          <input
            type="checkbox"
            checked={habit.completed}
            onChange={() => handleChange(habit.id)}
          />
          <span>{habit.completed ? 'Completed' : 'Pending'}</span>
        </label>
        <button className="habit-remove" onClick={() => handleRemove(habit.id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default HabitsItem;