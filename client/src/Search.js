import { useLocation, useNavigate, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from 'axios';
import SearchBar from "./SearchBar";
import Loader from './Loader';

function Search () {

    const location = useLocation();
    const navigate = useNavigate();
    const [allHotelsState, setAllHotelsState] = useState(null);
    const [searchResultsReady, setSearchResultsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
 
    var allPlanets = [];
    if (allHotelsState) {
        for (let i in allHotelsState) {
            if (!allPlanets.includes(allHotelsState[i].planet)) {
                allPlanets.push(allHotelsState[i].planet);
            }
        }
    }

    useEffect(() => {
        Axios.get(`http://localhost:8800/api/hotels/`)
            .then((response) => {
                setAllHotelsState(response.data)
            })
    }, [])

    function navigateToHotelShowPage (hotel) {
        navigate(`/hotel/${hotel._id}`, {state: {hotel: hotel} } );
    }

    function displayAllHotels () {
        if (allHotelsState) {
            var displayAllHotels = allHotelsState.map((hotel, index) => {
                return (
                    <div onClick={() => navigateToHotelShowPage(hotel)} 
                        className="single-hotel-displayed" 
                        key={hotel.name + index}>
                        <h1>{hotel.name}</h1>
                        <h1>Planet: {hotel.planet}</h1>
                        <img className="hotel-pic-in-search-page" src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}></img>
                    </div>
                )
            })
            return displayAllHotels;
        }
    }

    return (
        <div className="App">
       


            {/* search bar here */}
            <SearchBar 
                allPlanets={allPlanets}
                setSearchResultsReady={setSearchResultsReady}
                searchResultsReady={searchResultsReady}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
    
                    
            


            {/* display all hotels */}
            <div className="search-hotels-container">

                {isLoading ?
                    <Loader/> 
                    :
                    <div></div>
                }

                { searchResultsReady?
                    displayAllHotels()
                    :
                    <div></div>
                }

            </div>


      </div>
    )
}

export default Search;