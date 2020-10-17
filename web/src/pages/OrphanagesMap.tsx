import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapicon'
import api from '../services/api'

import '../styles/pages/orphanages-map.css'
import Orphanage from './Orphanage'


interface Orphanage{
    id:number;
    latitude: number;
    longitude: number;
    name: string;
}


function OrphanagesMap() {
    
    const [orphanages, setOrphanages]  = useState<Orphanage[]>([])
    const [currentUserPosition, setCurrentUserPosition] = useState({latitude: 0, longitude: 0})

    useEffect(()=>{
        api.get('orphanages').then(response =>{
            setOrphanages(response.data)
            handleCurrentUserPosition()
        })
    }, [])

    function handleCurrentUserPosition(){
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(position=>{
                setCurrentUserPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            })
        }
    }

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Salvador</strong>
                    <span>Bahia</span>
                </footer>
            </aside>

            <Map
                center={[currentUserPosition.latitude, currentUserPosition.longitude]}
                style={{ width: '100%', height: '100%' }}
                zoom={16}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

               {orphanages.map(orphanage =>{

                   return(
                       <Marker
                       key={orphanage.id}
                       icon={mapIcon}
                       position={[orphanage.latitude, orphanage.longitude]}
                       >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF"/>
                            </Link>
                        </Popup>
                    </Marker>
                    )
               })}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>

    )
}

export default OrphanagesMap