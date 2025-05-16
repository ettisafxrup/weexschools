import React, { useEffect, useState } from 'react';
import logo from '../../../../../assets/icon.png';

const Whiteboard = () => {
  if (!navigator.onLine) {
    return (
      <div
        style={{
          textAlign: 'center',

          marginTop: '25%',
        }}
      >
        <h1>Please check out your Internet Connection</h1>
        <p>
          It is necessary to get an internet connection to access this feature!
        </p>
      </div>
    );
  }
  const [iframeSize, setIframeSize] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    setIframeSize({
      height: window.innerHeight - 35,
      width: window.innerWidth - 200,
    });
  }, [iframeSize]);
  return (
    <div>
      <>
        {navigator.onLine === true ? (
          <div className="iframe-div">
            <div
              style={{
                backgroundColor: '#121212',
                position: 'absolute',
                zIndex: 9999999,
                display: 'flex',
                right: 5,
                width: '50%',
                height: '40px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: 5,
                }}
              >
                <img
                  className="logo"
                  style={{
                    width: '30px',
                    borderRadius: '50%',
                  }}
                  src={logo}
                  alt=""
                />{' '}
              </div>
              <small style={{ marginLeft: '5%' }}>
                weexSchools - Black Board
              </small>
            </div>
            {/* Using a free whiteboard named "Perfect Freehand Vercel" 
              All credit goes to the owner, I do not own this.
              Github repo: https://github.com/steveruizok/perfect-freehand
            */}
            <iframe
              className="no-drag iframe"
              height={iframeSize.height}
              width={iframeSize.width}
              src="https://perfect-freehand-example.vercel.app/"
            ></iframe>
          </div>
        ) : (
          <h1>Internet Connection is nedded in order to use Whiteboard 🥺</h1>
        )}
      </>
    </div>
  );
};

export default Whiteboard;
