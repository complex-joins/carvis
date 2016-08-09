import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

export default props => (
  <section style={{ height: `80%` }}>
    <GoogleMapLoader
      query={{ libraries: 'geometry,drawing,places,visualization' }}
      containerElement={
        <div
          {...props.containerElementProps}
          style={{
            height: `100%`,
          }}
        />
      }
      googleMapElement={
        <GoogleMap
          ref={(map) => console.log(map)}
          defaultZoom={15}
          defaultCenter={{ lat: 37.7806521, lng: -122.4088319 }}
          onClick={props.onMapClick}
        >
          {props.markers.map((marker, index) => (
            <Marker
              {...marker}
              onRightclick={() => props.onMarkerRightclick(index)}
            />
          ))}
        </GoogleMap>
      }
    />
  </section>
);
