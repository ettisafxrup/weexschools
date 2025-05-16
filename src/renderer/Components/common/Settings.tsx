import React, { useState } from 'react';
import env from '../.env';
import { deleteInstitute } from '../reuseable/deleteInstitue';
import { renameInstitue } from '../reuseable/deleteInstitue';
const Home = () => {
  const [generalHook, setGeneralHook] = useState({
    institutionName: localStorage.getItem('institution'),
  });

  return (
    <div className="no-drag">
      <div style={{ textAlign: 'center' }}>
        <h1>{env.appName} - Home</h1>
        <small style={{ marginTop: '10px', fontSize: '30px' }}>
          {localStorage.getItem('institution')}
        </small>
      </div>
      <div className="container general-container">
        <label>Institution : {localStorage.getItem('institution')} </label>
        <label>Joined On : {localStorage.getItem('joinDate')} </label>

        <label>
          Connection :{' '}
          <span style={{ color: '#00ff4c' }}>
            {navigator.onLine === true ? (
              <span style={{ color: '#00ff4c' }}> Online</span>
            ) : (
              <span style={{ color: '#fff' }}>Offline</span>
            )}
          </span>{' '}
        </label>
      </div>
      <div className="container information-container"></div>
      <div className="profile no-drag">
        <details>
          <input
            style={{
              marginTop: '20px',
              height: '30px',
              width: '270px',
              fontSize: '17px',
            }}
            className="weex-input"
            value={generalHook.institutionName}
            onChange={(e) =>
              setGeneralHook({
                ...generalHook,
                institutionName: e.target.value,
              })
            }
          ></input>
          <p></p>
          <summary>Rename Institution</summary>
          <button
            style={{
              height: '5%',
              width: '270px',
            }}
            id="submit"
            type="submit"
            onClick={(e) => renameInstitue(e, generalHook.institutionName)}
          >
            Rename {localStorage.getItem('institution')}
          </button>
        </details>
      </div>

      <div
        style={{
          marginTop: '10px',
        }}
      >
        <h2>Functionalities and Shortcuts</h2>
        <strong>Zoom In</strong>: <code>CTRL +</code>
        <p style={{ marginTop: '-10px' }}></p>
        <strong>Zoom Out</strong>: <code>CTRL -</code>
        <p style={{ marginTop: '-10px' }}></p>
        <strong>Reset Zoom</strong>: <code>CTRL 0</code>
      </div>

      <footer className="no-drag">
        <details>
          <summary>Account Deletation</summary>
          <div className="account">
            <button
              style={{
                height: '5%',
                width: '250px',
                backgroundColor: 'red',
              }}
              id="submit"
              type="submit"
              onClick={deleteInstitute}
            >
              Delete {localStorage.getItem('institution')}
            </button>
          </div>
        </details>
      </footer>
    </div>
  );
};

export default Home;
