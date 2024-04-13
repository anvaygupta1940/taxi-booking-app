import React from 'react'
import { Layer, Source } from 'react-map-gl'

const MapBoxRoute = (props: any) => {
    return (
        // whatever data we require to draw this route we will pass it to Source
        <Source type='geojson'
            data={{
                type: 'Feature',
                geometry: {
                    type: 'LineString', coordinates: props.coordinates
                }
            }}>
            <Layer
                type='line'
                layout={{ 'line-join': 'round', 'line-cap': 'square' }}
                paint={{ 'line-color': '#0462d4', 'line-width': 4 }}
            ></Layer>
        </Source>
    )
}

export default MapBoxRoute
