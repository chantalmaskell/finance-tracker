import React, { useState } from 'react';

const FetchComponent = () => {
  const [userData, setUserData] = useState(null);
  const [isDataVisible, setIsDataVisible] = useState(false);

  const handleFetchButtonClick = () => {
    if (!isDataVisible) {
      fetch('http://localhost:5000/getuser')
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            // Assuming you have an array with a single object
            setUserData(data[0]);
            setIsDataVisible(true);
          } else {
            // Handle empty data or unexpected response format
            console.error('Unexpected response data:', data);
          }
        })
        .catch((error) => {
          console.error('Error fetching data from backend:', error);
        });
    } else {
      // Hide the data by setting the state to false
      setIsDataVisible(false);
    }
  };

  return (
    <div>
      <button onClick={handleFetchButtonClick}>
        {isDataVisible ? 'Hide account details' : 'View account details'}
      </button>
      {isDataVisible && (
        <div>
          <br></br>
          <p>Your unique user ID: <b>{userData?.user_id}</b></p>
          <p>First name: <b>{userData?.first_name}</b></p>
          <p>Last name: <b>{userData?.last_name}</b></p>
          <p>Email: <b>{userData?.email_address}</b></p>
        </div>
      )}
    </div>
  );
};

export default FetchComponent;
