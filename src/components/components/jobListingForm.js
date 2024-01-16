// src/components/JobListingForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './jobListingForm.css';

const JobListingForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jobRef = await db.collection('jobListings').add({
        jobTitle,
        jobDescription,
      });

      console.log('Job listing created with ID:', jobRef.id);

      setJobTitle('');
      setJobDescription('');

      // Redirect to job details page after job creation
      navigate(`/job/${jobRef.id}`);
    } catch (error) {
      console.error('Error creating job listing:', error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Job Listing</h2>
      <form onSubmit={handleSubmit} className="job-listing-form">
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobDescription">Job Description:</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            className="form-input"
          ></textarea>
        </div>

        <button type="submit" className="form-button">
          Create Job Listing
        </button>
      </form>
    </div>
  );
};

export default JobListingForm;
