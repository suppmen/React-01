import React, { useState, useEffect } from 'react';
import api from '../modules/Apis'; 
import Title from './Title';

const Titles = () => {
  const [data, setData] = useState({ items: [], total: 0 });
  const [selectedTitleId, setSelectedTitleId] = useState(null);
  const [showTitleDetails, setShowTitleDetails] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  const fetchData = async (url) => {
    try {
      const result = await api.getTitles(url);
      setData(result);
      setNextPageUrl(result.next);
      setPrevPageUrl(result.prev);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData('http://localhost:5001/api/titles?pageSize=10&page=0');
  }, []);

  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchData(nextPageUrl);
    }
  };

  const handlePrevPage = () => {
    if (prevPageUrl) {
      fetchData(prevPageUrl);
    }
  };
    
  const handleTitleClick = (id) => {
    setSelectedTitleId(id);
    setShowTitleDetails(true); // Show title details view
  };

  const handleBack = () => {
    setShowTitleDetails(false); // Return to titles list view
    setSelectedTitleId(null); // Reset the selected title ID
  };

  if (showTitleDetails) {
    return <Title id={selectedTitleId} onBack={handleBack} />;
  }

  

  return (
    <div>
      <h3>Total Titles: {data.total}</h3>
      <ul>
        {data.items.map(item => (
          <li key={item.id} onClick={() => handleTitleClick(item.id)} style={{ cursor: 'pointer' }}>
            {item.primaryTitle}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={!prevPageUrl} style={{ cursor: 'pointer' }}>Previous</button>
        <button onClick={handleNextPage} disabled={!nextPageUrl} style={{ cursor: 'pointer' }}>Next</button>
      </div>
      {selectedTitleId && <Title id={selectedTitleId} />}
    </div>
  );
};

export default Titles;
