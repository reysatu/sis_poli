import React, { useState, useEffect, useRef } from 'react';
import { geocodeByAddress,geocodeByPlaceId,getLatLng } from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';

function AutoCompleteMap () {
    const [address, setAdress] = useState("")
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0])
        console.log(ll)
        setAdress(value)
        setCoordinates(ll)
    }

  return (
    // Important! Always set the container height explicitly
    <div >

<PlacesAutocomplete
                value={address}
                onChange={setAdress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div
                        key={suggestions.description}

                    >
                        <input
                            {...getInputProps({
                                placeholder: 'Buscar Ubicacion ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div key={suggestion.index}
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                
            </PlacesAutocomplete>
            
          
            
        </div>
  );
}
export default AutoCompleteMap;