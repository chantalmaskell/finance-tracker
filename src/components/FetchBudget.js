import React, { useState, useEffect } from 'react';

const FetchComponent = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/getbudget')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Assuming you have an array with a single object
          setUserData(data[0]);
        } else {
          // Handle empty data or unexpected response format
          console.error('Unexpected response data:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data from backend:', error);
      });
  }, []);

  return (
    <div>
      {userData && (
        <div>
          <p>Budget: {userData.budget}</p>
        </div>
      )}
    </div>
  );
};

export default FetchComponent;
