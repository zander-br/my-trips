import { useRouter } from 'next/dist/client/router';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

type Place = {
  id: string;
  name: string;
  slug: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type MapProps = {
  places?: Place[];
};

const Map = ({ places }: MapProps) => {
  const router = useRouter();

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={3}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places?.map(({ id, slug, name, location }) => {
        const { latitude, longitude } = location;
        return (
          <Marker
            position={[latitude, longitude]}
            key={`place-${id}`}
            title={name}
            eventHandlers={{
              click: () => {
                router.push(`/place/${slug}`);
              }
            }}
          />
        );
      })}
    </MapContainer>
  );
};

export default Map;
