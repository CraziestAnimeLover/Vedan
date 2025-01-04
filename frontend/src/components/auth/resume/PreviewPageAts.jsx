import React from 'react';
import { useLocation } from 'react-router-dom';

import ResumePreview from './ResumePreview';
import ResumePreviewAts from './ResumePreviewAts';

const PreviewPageAts = () => {
  const location = useLocation();
  const { input } = location.state || {}; // Retrieve the input data from location state

  if (!input) {
    return <p>No data to preview.</p>; // Show a message if no data is passed
  }

  return <ResumePreviewAts input={input} />; // Pass the input data to the ATSResumePreview component
};

export default PreviewPageAts;



