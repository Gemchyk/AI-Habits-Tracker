import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormComp from '../FormComponent/FormComp';
import { useDispatch } from 'react-redux';
import { addHabit } from '../../store/habitsSlice';
import './AddHabitModal.scss'


const AddHabitModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = ({name, frequency, description}) => {
    dispatch(addHabit({name, description, frequency}));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button className='form-call' type='primary'  onClick={showModal}>
        Add Habit
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={null}  
        className="modal"
      >
        <FormComp onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};
export default AddHabitModal;