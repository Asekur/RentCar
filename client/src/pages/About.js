import React, {useState, useContext, useEffect, useCallback} from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/hookHTTP'
import { useMessage } from '../hooks/hookMsg'
import { ContextAuth } from '../context/ContextAuth'
import { Carusel } from '../components/Carusel'
import { Loader } from '../components/Loader'
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps'
import * as carCenters from '../carcenters.json'

const svgMarker = {
    path:
      "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "#f44336",
    fillOpacity: 0.9,
    strokeWeight: 0.3,
    rotation: 0,
    scale: 2
}

function Map() {
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: 53.914187, lng: 27.591023}}
        >
            {carCenters.features.map((center) => {
                return (
                    <Marker
                        icon={svgMarker}
                        position={{
                            lat: center.geometry.coordinates[1], lng: center.geometry.coordinates[0]
                        }}
                    />
                )
            })}
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export const About = () => {
    const history = useHistory()
    const authorize = useContext(ContextAuth)
    const message = useMessage()
    const { loading, request } = useHttp()
    const [comment, setComment] = useState()
    const [comments, setComments] = useState()

    const fetchComments = useCallback(async () => {
        try {
            const fetched = await request('/about', 'GET', null, {
                Authorization: `Bearer ${authorize.token}`
            })
            setComments(fetched)
        } catch (err) { }
    }, [authorize.token, request])


    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    if (loading) {
        return <Loader />
    }
    
    const pressHandler = async event => {
        try {
            if (authorize.token === null) {
                message('You are not authorize')
                return
            }
            await request('/about/sendopinion', 'POST', { userName: authorize.userName, comment: comment}, {
                Authorization: `Bearer ${authorize.token}`
            })
            history.push(`/about`)
            fetchComments()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="about">
            <div className="history">
                <div className="whatAbout">
                    <p>WHY CHOOSE US?</p>
                    <div className="columns">
                        <div className="column1">
                            <span>&#10003; The cars are insured. The rental price includes insurance.</span><br/>
                            <span>&#10003; Machines in good technical condition and seasonally serviced.</span><br/>
                            <span>&#10003; Large selection of cars of any class.</span><br/>
                            <span>&#10003; Necessary additional equipment on request.</span>
                        </div>
                        <div className="column2">
                            <span>&#10003; Excellent condition of all vehicles in the fleet.</span><br/>
                            <span>&#10003; Possibility to rent a car both without a driver and with a driver.</span><br/>
                            <span>&#10003; Providing all necessary accounting documents.</span><br/>
                            <span>&#10003; You can rent and return a car wherever it suits you.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opinion">
                <div className="usersOpinion">
                    {!loading && <Carusel comments={comments} />}
                </div>
                <div className="card">
                    <div className="card-content white-text">
                        <span className="card-title">YOUR OPINION</span>
                        <div>
                            <div className="addOpinion">
                                <div className="input-field">
                                    <input
                                        placeholder="Only authorized"
                                        id="comment"
                                        type="text"
                                        value={comment}
                                        className="orange-input"
                                        autocomplete="off"
                                        autoFocus="true"
                                        onChange={e => setComment(e.target.value)}
                                    />
                                    <label htmlFor="about">Comment</label>
                                </div>
                                <div className="card-action">
                                    <button
                                        className="btn red"
                                        onClick={pressHandler}
                                    >Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <WrappedMap 
                className="mapCenters"
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"process.env.GOOGLE_API_KEY"}`}
                loadingElement={<div style={{height: "95%"}}/>}   
                containerElement={<div className="mapLoading" style={{height: "95%"}}/>} 
                mapElement={<div style={{height: "95%"}}/>}
            />
        </div>
    )
}