import React from 'react';

const Loader = () => {
    return (
        <div className='text-center'>
            <div className='loader'>
                <p>Loading...</p>
                <div className='loader-inner'></div>
                <div className='loader-inner'></div>
                <div className='loader-inner'></div>
            </div>
        </div>
    );
};

export default Loader;
