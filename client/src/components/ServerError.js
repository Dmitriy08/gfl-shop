import React from 'react';

const ServerError = () => {
    return (
        <div className='alert alert-danger' role='alert'>
            Service Temporary Unavailable. <br />
            Try Again Later.
        </div>
    );
};

export default ServerError;
