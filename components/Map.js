import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";
function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const coordinates = searchResults.map((results) => ({
    longitude: results.long,
    latitude: results.lat,
  }));
  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
    width: "100%",
    height: "100%",
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jatin211/cksa7tuxbhp2g17plfyp1f2z5"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((results) => (
        <div key={results.long}>
          <Marker
            longitude={results.long}
            latitude={results.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(results)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push=pin"
            >
              📌
            </p>
          </Marker>
          {selectedLocation.long === results.long ? <div>
            <Popup
            onClick={() => setSelectedLocation({})}
            closeOnClick={true}
            latitude={results.lat}
            longitude={results.long}
            >
                {results.title}
            </Popup>
          </div> : false}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
