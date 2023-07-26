import React, { useState } from 'react';

const FetchComponent = () => {
  const [userData, setUserData] = useState(null);

  const handleFetchButtonClick = () => {
    fetch('http://localhost:5000/getuser')
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
  };

  return (
    <div>
      <button onClick={handleFetchButtonClick}>Click to get user data</button>
      {userData && (
        <div>
          <p>ID: {userData.user_id}</p>
          <p>First Name: {userData.first_name}</p>
          <p>Last Name: {userData.last_name}</p>
          <p>Email: {userData.email_address}</p>
        </div>
      )}
    </div>
  );
};

export default FetchComponent;