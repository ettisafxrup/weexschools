import React from 'react';
import logo from '../../../../../assets/icon.png';
import env from '../../.env';

const Home = () => {
  return (
    <div
      style={{
        marginTop: '17%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        className="logo"
        style={{
          width: '130px',
          borderRadius: '50%',
        }}
        src={logo}
        alt=""
      />

      <h1 className="text-4xl">
        {env.appName} - {env.slogan}
      </h1>
    </div>
  );
};
export default Home;
