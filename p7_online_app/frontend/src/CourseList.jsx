import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses').then((res) => setCourses(res.data));
  }, []);

  const deleteCourse = (id) => {
    axios.delete(`http://localhost:5000/api/courses/${id}`).then(() => {
      setCourses(courses.filter((course) => course._id !== id));
    });
  };

  return (
    <div>
      <h1>Course List</h1>
      <Link to="/add-course">Add Course</Link>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor}</p>
            {course.imageUrl && <img src={`http://localhost:5000${course.imageUrl}`} alt="Course" width="100" />}
            <button onClick={() => deleteCourse(course._id)}>Delete</button>
            <Link to={`/edit-course/${course._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;