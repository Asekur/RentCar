import React from 'react'

export const Carusel = ({ comments }) => {
    if (!comments) {
        return <p className="center">No items</p>
    }

    return (
        <div className="items">
            {comments.map(comment => {
                return (
                    <div key={comment.lastId} className="opinionItem">
                        <p>{comment.userName}</p>
                        <span>{comment.comment}</span>
                    </div>    
                )
            })}
        </div>
    )
}