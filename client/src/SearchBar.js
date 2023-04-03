import { useState, useContext } from "react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import GlobalContext from './GlobalContext';

function SearchBar (props) {

  const contextInfo = useContext(GlobalContext);
  const {dateRange, setDateRange, dateRangeArray, setDateRangeArray} = contextInfo;

  const {allPlanets, 
    setSearchResultsReady,
    setIsLoading,
    chosenPlanetState,
    setChosenPlanetState
  } = props;

  function getDatesInRange (startDate, endDate) {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    for (let i in dates) {
      dates[i] = dates[i].toDateString();
    }
    return dates;
  }

  function applySearchFilters () {
    if (dateRange.some((date) => {
      return date === null;
    })) {
      alert("Date's can't be blank!");
    } else {


      setIsLoading(true);
      setSearchResultsReady(false);
      setTimeout(() => {
        setIsLoading(false);
        setSearchResultsReady(true);
      }, 1000)


    }
  }

  function setPlanetFilter (e) {
    setChosenPlanetState(e.target.value)
  }

  function handleSetDateRange (value) {
    setDateRange([value[0], value[1]]); 
    setDateRangeArray(getDatesInRange(value[0], value[1]));
  }

  return (
    <div className="search-bar-container">

        <div>
          <DateRangePicker clearIcon={null} format='MM/dd/y'className={'date-picker'} onChange={ (value) => {handleSetDateRange(value)} } value={dateRange} />
        </div>

        <select id='planet' onChange={(e) => {setPlanetFilter(e)}}>
          <option disabled selected value>Planet</option>
          <option>None</option>
          {allPlanets.map((planet, i) => <option key={planet+i}value={planet}>{planet}</option>)}
        </select>

        <button onClick={applySearchFilters}
          className='btn btn-primary'
          >Search
        </button>
    </div>

  );


}

export default SearchBar;