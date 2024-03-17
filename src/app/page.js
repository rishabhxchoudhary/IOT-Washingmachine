"use client"
import Image from "next/image";


import React, { useState, useEffect } from 'react';
import { database } from './firebaseConfig';
import { get, ref } from "firebase/database";

export default function Home() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, 'test');
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setData(snapshot.val());
        console.log(data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [])

// Function to add 1 hour to the starting time
const getExpectedStopTime = (startTime) => {
  // Parse the start time into hours, minutes, and seconds
  const [hours, minutes, seconds] = startTime.split(':').map(Number);

  // Add 1 hour
  let newHours = hours + 1;

  // Handle cases where new hour exceeds 24
  if (newHours >= 24) {
    newHours -= 24;
  }

  // Format the expected stop time
  const expectedStopTime = `${newHours < 10 ? '0' : ''}${newHours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return expectedStopTime;
};


  return (
    <div className="container">
      <div className="home-container">
        <h1>Aryabhatta Hostel Washing Machine Status</h1>

        {data ? (
          <div className="status-section">
            <h3>Machine 1 Status</h3>
            <p className={data.machine1.value === 1 ? 'running-status' : 'stopped-status'}>
              {data.machine1.value === 1 ?
                <div>
                  <p>{`Machine is running from ${data.machine1.time}`}</p>
                  <p>{`Expected Stop Time : ${getExpectedStopTime(data.machine1.time)}`}</p>
                </div>
                :
                'Machine is not running'}

            </p>
          </div>
        ) : (
          <p className="loading-message">Fetching data from server....</p>
        )}
      </div>
    </div>
  );
}
