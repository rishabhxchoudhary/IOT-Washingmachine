"use client"
import Image from "next/image";

import React, { useState, useEffect } from 'react';
import { database } from './firebaseConfig';
import { get, ref } from "firebase/database";

export default function Home() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const dbRef = ref(database,'test');
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
  },[])

  return (
    <div>
      <h1>Aryabhatta Hostel Washing Machine Status</h1>

      {data ? <>
      
      <h3>Machine 1 Status</h3>
      {data.machine1.value==1 ? 
      <p>Machine is running from {data.machine1.time}</p> : 
      <p>Machine is not running</p>}
      
      </> : <>
      
      <p>Fetching data from server....</p>
      </>}
    </div>
  );
}
