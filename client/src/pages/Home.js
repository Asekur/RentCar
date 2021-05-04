import React, { Suspense } from 'react'
import {Canvas} from 'react-three-fiber'
import Model from '../components/Scene'
import Ligths from '../components/Lights'
import {OrbitControls} from '@react-three/drei'
import DirectionsRun from '@material-ui/icons/DirectionsRun'
import AssignmentInd from '@material-ui/icons/AssignmentInd'
import DirectionsCar from '@material-ui/icons/DirectionsCar'
import Message from '@material-ui/icons/Message'
import TrendingFlat from '@material-ui/icons/TrendingFlat'

export const Home = () => {
    return (
        <div>
            <Canvas
                colorManagement
                shadowMap
                camera={{position: [5,4,-4], fov: 30}}
            >
                <Ligths/>
                <Suspense fallback={null}>
                    <Model/>
                    <OrbitControls 
                        enableZoom={false}
                        enablePan={false}
                    />
                </Suspense>
            </Canvas>
            <div className="aboutUs">
                <div className="whyRent">
                    <p>WHY RENT A CAR?</p>
                    <span>&#10003; For a test drive. Not sure which personal car you want: smart, hatchback or station wagon? With the help of car rental, you can test different formats and classes in practice, feel the advantages and disadvantages and make the right choice.</span><br/>
                    <span>&#10003; Status. A quality car raises self-esteem and demonstrates your position in front of partners. With it, you will gain extra confidence and make the right impression.</span><br/>
                    <span>&#10003; For traveling. For travelers and city guests, this is the most convenient way to get to the sights on time, conveniently and quickly.</span><br/>
                    <span>&#10003; Wedding procession. Rent the required number of cars to surprise your guests and ensure their comfortable arrival at the place of celebration.</span><br/>
                    <span>&#10003; Unexpected situations. Business trip, friends arrival, vacation? Car rental will help out in any situation.</span>
                </div>
                <div className="rools">
                    <div className="run">
                        <i><DirectionsRun /></i>
                    </div>
                    <div className="arrow1">
                        <i><TrendingFlat /></i>
                    </div>
                    <div className="doc">
                        <i><AssignmentInd /></i>
                    </div>
                    <div className="arrow2">
                        <i><TrendingFlat /></i>
                    </div>
                    <div className="car">
                        <i><DirectionsCar /></i>
                    </div>
                    <div className="arrow3">
                        <i><TrendingFlat /></i>
                    </div>
                    <div className="exc">
                        <i><Message /></i>
                    </div>
                </div>
            </div>
        </div>
    )
}