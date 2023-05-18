import React, { useEffect, useState } from 'react';
import { colorIdents } from './colorIdents';
import createThousandObjects from './dataCreation';
import { MyObject, Params } from './types'
import TableHeader from './TableHeader';
import './App.css';

function App() {
  // Initilizes with 1000 desired objects
  const [data, setData] = useState<MyObject[]>(createThousandObjects()); 

  // Stores clicked rows
  const [clickedRows, setClickedRows] = useState<string[]>([]);

  // Stores untouched original data 
  const [backup, setBackup] = useState<MyObject[]>([]);

  // Stores text of search input
  const [inputValue, setInputValue] = useState<string>('');

  // CREATES BACKUP DURING INITILIZATION (original data for preservation)
  useEffect(() => {
    setBackup(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // SORTING 
  function sortData(param: Params): MyObject[] {
    if (param === 'id') {
      return [...data].sort((a, b) => Number(a[param]) - Number(b[param])) // sorts in ascending order
    } else if (param === 'colorIdent') {
      return [...data].sort((a, b) => {
        const order = { un: 1, deux: 2, trois: 3 };
        return order[a.colorIdent] - order[b.colorIdent]; //sorts by values of french numbers ascending
      });
    } else {
      return [...data].sort((a, b) => a[param].localeCompare(b[param])) // sorts name or desc alphabetically
    }
  }

  // UPDATES SORTED DATA
  const updateData = (param: Params) => {
    const sortedData = sortData(param);
    setData(sortedData);
  };

  // ACTIVATING ROW
  const handleRowToggle = (id: string): void => {
    const clicked = clickedRows.includes(id); // checking if clicked
    let newClickedRows: string[];

    if (clicked) {
      newClickedRows = clickedRows.filter(v => v !== id); // removing from clickedRows
    } else {
      newClickedRows = [...clickedRows, id]; // adding new row and copied already clicked rows
    }
    setClickedRows(newClickedRows);
  }

  // FILTERING
  const handleFilter = (): void => {
    let searched = inputValue.trim() // removing unneccessary spaces

    if (searched === '') {
      // In case of empty input getting back all original data
      setData(backup)
    } else {
      // filtering original data 
      const filteredData = [...backup].filter(row => row.id === searched || row.name === searched || row.name === searched || row.colorIdent === searched)
      setData(filteredData)
    }
  }

  // SECURING INPUT VALUE
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className='container'>

        {/* Filtering based on input */}
        <div id='filter' className='filter-container'>
          <label>Filter </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleFilter}>Search</button>
        </div>

        {/* Area for displaying clicked rows divided with ', ' */}
        <div id='clickedRows' className='clicked-rows'>
          <span>Clicked Rows: </span>
          {clickedRows.map((row, index) => (
            <span key={index}>
              {row}{index !== clickedRows.length - 1 && ', '}
            </span>
          ))}
        </div>

        {/* Table which shows all objects */}
        <div className='table-container'>
          <table >
            <TableHeader handleSort={updateData} /> {/* Pass func to sort by columns */}
            <tbody className='main-table'>
              {/* Table rows created without own component */}
              {data.map(e =>
                <tr key={e.id}
                  className={clickedRows.includes(e.id) ? colorIdents.filter(colorIdent => colorIdent.ident === e.colorIdent)[0].props.color : ''}
                  onClick={() => handleRowToggle(e.id)}
                >
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.description}</td>
                  <td>{e.colorIdent}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default App;