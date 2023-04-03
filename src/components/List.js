import React from 'react'

// It will handle the display of our API in the form of a list
const List = (props) => {
    const {apis} = props;
    if (!apis || apis.length === 0) return <p>No API, sorry!</p>
  return (
    <ul>
        <h2 className='list-head'>Available Public API!</h2>
        {apis.map((api) => {
            return (
                <li key={api.id} className='list'>
                    <span className='api-text'>{api.name} </span>
                    <span className='api-description'>{api.description}</span>
                </li>
            );
        })}
    </ul>
  );
}

export default List;