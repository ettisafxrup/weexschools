import React, { useState } from 'react';
import AddStudents from './common/AddStudents';
import Settings from './common/Settings';
import logo from '../../../assets/icon.png';
import Welcome from './common/__one_a_time__/Logo_Slogan';
import Notice from './common/Notice';
import Payment from './common/Payments';
import env from './.env';
import Whiteboard from './common/online/Whiteboard';
import Attendance from './common/Attendance';
import StudentSheet from './common/StudentDataCollection';
import CreateData from './common/online/CloudData';

const Index = () => {
  const [renderMenu, setRenderMenu] = useState(<Welcome />);

  const renderMenuFunction = (str: string) => {
    switch (str) {
      case 'settings':
        setRenderMenu(<Settings />);
        break;
      case 'students':
        setRenderMenu(<AddStudents />);
        break;
      case 'notice':
        setRenderMenu(<Notice />);
        break;
      case 'attendance':
        setRenderMenu(<Attendance />);
        break;
      case 'payment':
        setRenderMenu(<Payment />);
        break;
      case 'whiteboard':
        setRenderMenu(<Whiteboard />);
        break;
      case 'createData':
        setRenderMenu(<CreateData />);
        break;
      case 'studentsheet':
        setRenderMenu(<StudentSheet />);
        break;
      case 'createData':
        setRenderMenu(<CreateData />);
        break;
      default:
        setRenderMenu(<Welcome />);
        break;
    }
  };

  return (
    <>
      <div>
        <div
          className="left-bar no-drag"
          style={{
            height: '100vh',
            zIndex: 99,
            overflow: 'scroll',
          }}
        >
          <img
            className="logo"
            style={{
              width: '70px',
              borderRadius: '50%',
            }}
            src={logo}
          />
          <strong style={{ fontSize: '13px' }}>{env.appName}</strong>
          <p style={{ marginTop: '-15px' }}></p>
          <button
            id="submit"
            style={{ fontSize: '12px', width: '40px', borderRadius: '50%' }}
            onClick={() =>
              window.electron.ipcRenderer.sendMessage('screenshot', [
                {
                  innerWidth,
                  innerHeight,
                },
              ])
            }
          >
            {' '}
            📸
          </button>
          <div>
            <p style={{ marginTop: '3px' }}></p>
            <small style={{ color: '#00d9ff' }}>General Profile</small>
            <li onClick={() => renderMenuFunction(null)}>Home</li>
            <li onClick={() => renderMenuFunction('settings')}>
              General Settings
            </li>
            <p style={{ marginTop: '3px' }}></p>
            <small style={{ color: '#00d9ff' }}>Data Collections</small>
            <li onClick={() => renderMenuFunction('students')}>
              Students List
            </li>
            <li onClick={() => renderMenuFunction('attendance')}>
              Attendance Sheet
            </li>
            <li onClick={() => renderMenuFunction('payment')}>Fee/Payments</li>

            <p style={{ marginTop: '3px' }}></p>
            <small style={{ color: '#00d9ff' }}>Class Templates</small>
            <li onClick={() => renderMenuFunction('notice')}>
              Notice Generator
            </li>

            <p style={{ marginTop: '3px' }}></p>
            <small style={{ color: '#00d9ff' }}>Class Features</small>
            <li onClick={() => renderMenuFunction('whiteboard')}>
              Sketch Board
            </li>
            {/* <li onClick={() => renderMenuFunction(null)}>PDF Note Maker</li>
            <li onClick={() => renderMenuFunction(null)}>Result Maker</li> */}
            <p style={{ marginTop: '3px' }}></p>
            <small style={{ color: '#00d9ff' }}>Storage & Records</small>

            <li onClick={() => renderMenuFunction('studentsheet')}>
              Student Records
            </li>
            <li onClick={() => renderMenuFunction('createData')}>Cloud Data</li>

            <p style={{ marginTop: '3px' }}></p>
            <small style={{ color: '#00d9ff' }}>Updates</small>

            <li onClick={() => renderMenuFunction(null)}>Newest Updates</li>

            <p style={{ marginTop: '30px' }}></p>
          </div>
        </div>
      </div>

      <div className="content-menu">{renderMenu}</div>
    </>
  );
};

export default Index;
