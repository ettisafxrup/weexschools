import React, { useCallback, useEffect } from 'react';
import Welcome from './common/__one_a_time__/Logo_Slogan';
import Search from './common/__one_a_time__/Institution';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const useNavigator = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('institution')) {
      useNavigator('/home');
    }
  }, []);

  return (
    <div className="center-div">
      <Welcome />
      <Search />
    </div>
  );
};

export default WelcomePage;
