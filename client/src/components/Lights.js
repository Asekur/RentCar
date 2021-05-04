import React from 'react'

const Lights = () => {
    return (
        <>
            <ambientLight intensity={.1}/>
            <directionalLight
                castShadow
                position={[1, -1, 1]}
                intensity={1}
            />
            <directionalLight
                castShadow
                position={[-1, 0, 1]}
                intensity={1}
            />
            <directionalLight
                castShadow
                position={[0, 1, 0]}
                intensity={.2}
            />
            <pointLight position={[1, 0, -1]} intensity={1}/>
        </>
    )
}

export default Lights