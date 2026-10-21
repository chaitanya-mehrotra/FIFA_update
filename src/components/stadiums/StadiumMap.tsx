import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Stadium } from '../../data/stadiums';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom FIFA icon for stadiums
const createCustomIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-stadium-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 rounded-full ${isSelected ? 'bg-[#C49E59] animate-ping opacity-75' : 'bg-transparent'}"></div>
        <div class="relative w-6 h-6 rounded-full border-2 ${isSelected ? 'border-white bg-[#C49E59] shadow-[0_0_15px_#C49E59]' : 'border-[#185399] bg-white'} flex items-center justify-center transition-all duration-300">
          <div class="w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-[#185399]'}"></div>
        </div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface StadiumMapProps {
  stadiums: Stadium[];
  selectedStadium: Stadium | null;
  onSelectStadium: (stadium: Stadium) => void;
}

// Component to handle map interactions like flying to selected marker and invalidating size
function MapEffects({ selectedStadium }: { selectedStadium: Stadium | null }) {
  const map = useMap();
  
  // Ensure Leaflet calculates accurate container dimensions upon load
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (selectedStadium) {
      map.flyTo(selectedStadium.coordinates, 6, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [selectedStadium, map]);

  return null;
}

export default function StadiumMap({ stadiums, selectedStadium, onSelectStadium }: StadiumMapProps) {
  // Center of North America approximately
  const defaultCenter: [number, number] = [39.8283, -98.5795];
  const defaultZoom = 4;

  return (
    <div className="w-full h-full min-h-[520px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        style={{ width: '100%', height: '100%', minHeight: '520px' }}
        className="w-full h-full min-h-[520px] bg-[#0b132b]"
        zoomControl={true}
      >
        {/* Unrestricted OpenStreetMap tiles with sleek dark mode filter */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles-dark"
          maxZoom={18}
        />
        
        {stadiums.map(stadium => (
          <Marker 
            key={stadium.id} 
            position={stadium.coordinates}
            icon={createCustomIcon(selectedStadium?.id === stadium.id)}
            eventHandlers={{
              click: () => onSelectStadium(stadium),
            }}
          />
        ))}

        <MapEffects selectedStadium={selectedStadium} />
      </MapContainer>
    </div>
  );
}
