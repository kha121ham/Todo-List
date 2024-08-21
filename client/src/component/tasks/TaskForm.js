import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteTask } from '../../actions/task';

const TaskForm = ({ task: {
    name,
    text,
    _id,
    date
}, deleteTask }) => {
  return (
    <Fragment>
    <ul className="list-group todos mx-auto text-light delete">
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{text}</span>
          <i className="far fa-trash-alt delete" onClick={()=>deleteTask(_id)}></i>
        </li>
        </ul>
    </Fragment>
  )
}

TaskForm.propTypes = {
    task:PropTypes.object.isRequired,
    deleteTask:PropTypes.func.isRequired
}

export default connect(null, { deleteTask }) (TaskForm)
