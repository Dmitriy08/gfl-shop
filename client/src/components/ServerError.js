import React from 'react';

const ServerError = ({message}) => {

    return (
        <>
            {message ?
            <div className='alert alert-danger' role='alert'>
                {message}
            </div>
                :
                <div className='alert alert-danger' role='alert'>
                    Service Temporary Unavailable. <br/>
                    Try Again Later.
                </div>
            }
        </>

    );
};

export default ServerError;
