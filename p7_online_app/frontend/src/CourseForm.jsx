import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CourseForm = ({ isEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    image: null,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/api/courses/${id}`).then((res) => setFormData(res.data));
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('instructor', formData.instructor);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    if (isEdit) {
      axios.put(`http://localhost:5000/api/courses/${id}`, formDataToSend).then(() => navigate('/'));
    } else {
      axios.post('http://localhost:5000/api/courses', formDataToSend).then(() => navigate('/'));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{isEdit ? 'Edit Course' : 'Add Course'}</h1>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="instructor"
        value={formData.instructor}
        onChange={handleChange}
        placeholder="Instructor"
        required
      />
      <input type="file" name="image" onChange={handleChange} />
      {formData.image && <p>{formData.image.name}</p>}
      <button type="submit">{isEdit ? 'Update' : 'Add'} Course</button>
    </form>
  );
};

export default CourseForm;