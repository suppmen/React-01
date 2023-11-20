import React, { useState, useEffect } from 'react';
import api from '../modules/Apis';

const Title = ({ id, onBack }) => {
  const [titleData, setTitleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const data = await api.getTitle(id);
          setTitleData(data);
          console.log(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching title:', error);
      }
    };

    if (id) {
      fetchTitle();
    }
    
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!titleData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h3>{titleData.primaryTitle}</h3>
          <p>{titleData.plot && titleData.plot !== "N/A" ? titleData.plot : "No Plot Avilable For This Item"}</p>


         {/* Display the poster image 
         A conditional rendering ({titleData.poster && ...}) 
         is used to ensure that the <img> tag is only rendered
          if the poster property is available in titleData.
         */}
        {titleData.poster && (
        <img src={titleData.poster} alt={`${titleData.primaryTitle} poster`} />
        )}  
        <div>
              <button onClick={onBack} style={{ cursor: 'pointer' }}>Back to Titles</button>
        </div>
        
    </div>
  );
};

export default Title;
