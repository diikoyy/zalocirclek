import React from 'react'

// It will hold a higher-order component that will be displayed when the Fetch request
function withListLoading (Component) {
  return function withLoadingComponent({ isLoading, ...props}) {
    if (!isLoading) return <Component {...props} />;
    return (
        <p style={{textAlign: 'center', fontSize: '30px'}}>
            Hold on, fetching data may take few minutes !!!
        </p>
    );
  };
}

export default withListLoading;