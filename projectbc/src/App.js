// App.js (React frontend)

import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  const [data, setData] = useState([]);
  const [sortedData,setSorteddata]=useState({
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000");
        const jsonData = await response.json();
        // console.log(jsonData)
        setData(jsonData);
        ;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []); // Empty dependency array to run the effect only once on component mount


  useEffect(() => {
    if (data && data.length > 0) {
      function transformData(data) {
        const transformedData = {};
  
        data.forEach((item) => {
          const region = item.region || 'Unknown Region';
          const country = item.country || 'Unknown Country';
        
  
          if (!transformedData[region]) {
            transformedData[region] = {};
          }
  
          if (!transformedData[region][country]) {
            transformedData[region][country] = { year: [] }; // Initialize 'year' as an object
          }
  
  
          transformedData[region][country].year.push({
            start_year:item.start_year,
            end_year:item.end_year,
            intensity: item.intensity,
            sector: item.sector,
            topic: item.topic,
            insight: item.insight,
            url: item.url,
            impact: item.impact,
            added: item.added,
            published: item.published,
            relevance: item.relevance,
            pestle: item.pestle,
            source: item.source,
            title: item.title,
            likelihood: item.likelihood,
          });
        });
  
        setSorteddata(transformedData);
        console.log(sortedData)

      }
  
      transformData(data);
    }
  }, [data]);
  
  
  
  

  return (
    <div className="App">
      <div style={{backgroundColor:"black",color:"white",textAlign:"center",padding:"15px"}}>
      <h1>Black Coffer Assessment</h1>
      </div>
 
      <Dashboard data={data}/>
  
      
    </div>
  );
}

export default App;
