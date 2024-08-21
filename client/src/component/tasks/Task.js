import React, { Fragment, useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTask } from '../../actions/task';
import { getTasks } from '../../actions/task';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import TaskForm from './TaskForm';
import { loadUser } from '../../actions/auth';
const Task = ({ addTask, profile: { profile }, getTasks, task: { tasks, loading } , auth, }) => {
const [text,setText] = useState('');
const onChange = e => setText(e.target.value);
const onSubmit = e =>{
  e.preventDefault();
  addTask({ text });
  setText('');
}
useEffect(()=>{
getTasks();
},[getTasks]);
// eslint-disable-next-line no-lone-blocks
  return  (
    <Fragment>
    {loading ? <Spinner /> : 
      <Fragment>
      <header className="text-center text-light my-4">
      </header>
      <h1 className='user-name'>{auth.user.name}</h1>
      <h2 className="mb-4">Todo List</h2>
     {tasks === null ? 'No tasks found' : tasks.map(task=>(<TaskForm key={task._id} task={task}/>))}
    <form className="add text-center my-4" onSubmit={e=>onSubmit(e)}>
        <label className="text-light">Add a new todo...</label>
        <input className="form-control m-auto " type="text" name="text" placeholder='Add New Task' value={text} onChange={e=>onChange(e)}/>
        <br />
        <div className="text-center">
          <input type="submit" className="btn btn-primary my-1" />
        </div>
      </form>
    </Fragment> }
    
   
    </Fragment>
  )
}

Task.propTypes = {
  addTask:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired,
  getTasks:PropTypes.func.isRequired,
  task:PropTypes.object.isRequired,
  getCurrentProfile:PropTypes.func.isRequired,
  loadUser:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth:state.auth,
  profile:state.profile,
  task:state.task
})
export default connect(mapStateToProps, { addTask, getTasks, getCurrentProfile, loadUser }) (Task)
