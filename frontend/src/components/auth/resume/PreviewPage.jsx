import React from 'react';
import { useLocation } from 'react-router-dom';

import ResumePreview from './ResumePreview';

const PreviewPage = () => {
  const location = useLocation();
  const { input } = location.state || {}; // Retrieve the input data from location state

  if (!input) {
    return <p>No data to preview.</p>; // Show a message if no data is passed
  }

  return <ResumePreview input={input} />; // Pass the input data to the ATSResumePreview component
};

export default PreviewPage;



