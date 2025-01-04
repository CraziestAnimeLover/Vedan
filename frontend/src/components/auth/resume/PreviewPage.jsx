import React from 'react';
import { useLocation } from 'react-router-dom';
import ResumePreview from './ResumePreview';

const PreviewPage = () => {
  const location = useLocation();
  const { input } = location.state || {};

  if (!input) {
    return <p>No data to preview.</p>;
  }

  return <ResumePreview input={input} />;
};

export default PreviewPage;
