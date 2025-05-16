import { useState } from 'react';
import env from '../../.env';
import '../../../index.css';
import axios from 'axios';

const createData = () => {
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
  const [newUser, setNewUser] = useState({ email: '', password: '' });
  const [newMessage, setNewMessage] = useState('');
  const [serverStatus, setServerStatus] = useState(
    <p>
      Server might be <b>"Sleeping"</b>... 💤😴{' '}
    </p>
  );

  const createData = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      setNewMessage('It might take us a while, yeahh...');
      const result = await axios.post(env.back.server + '/create', {
        ...newUser,
        localStorage,
      });
      setNewMessage(result.data.msg);
    } catch (err) {
      setServerStatus(
        <div style={{ display: 'flex' }}>
          🔴 Server is _<span className="red-color"> Under Maintaince!</span>_
          Please try again later..
        </div>
      );
    }
  };

  const backupData = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      setNewMessage('It might take us a while, yeahh...');
      let myStorage;

      const { data } = await axios.post(env.back.server + '/backup', newUser);
      if (data.storage == undefined) {
        return setNewMessage(data.msg);
      } else {
        myStorage = JSON.parse(data.storage);
        localStorage.setItem('backUpValue', data.storage);
        const backupVal = localStorage.getItem('backUpValue');
        const parsedBackupVal = JSON.parse(backupVal);
        for (const key in parsedBackupVal) {
          localStorage.setItem(key, parsedBackupVal[key]);
        }
      }
      localStorage.removeItem('backUpValue');

      setNewMessage(data.msg);
    } catch (err) {
      console.log(err);
      setServerStatus(
        <div style={{ display: 'flex' }}>
          🔴 Server is _<span className="red-color"> Under Maintaince!</span>_
          Please try again later..
        </div>
      );
    }
  };

  async function wakeUpTheServer() {
    let x = document.querySelector('.wakeupButton');
    x.textContent = 'Working...';
    try {
      const { data } = await axios.get(env.back.server);
      data.greet
        ? setServerStatus(
            <div style={{ display: 'flex' }}>
              Server is 🟢 <span className="green-color"> Online</span>
            </div>
          )
        : setServerStatus(
            <div style={{ display: 'flex' }}>
              🔴 Server is _<span className="red-color"> Offline</span>! Waking
              him up...😴💢
            </div>
          );
    } catch (err) {
      setServerStatus(
        <div style={{ display: 'flex' }}>
          🔴 Server is _<span className="red-color"> Under Maintaince!</span>_
          Please try again later..
        </div>
      );
    }
    x.textContent = 'Ready to serve!!';
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: innerHeight * 0.2,
      }}
    >
      <div className="center-div">
        <h1>CloudData - {env.appName}</h1>
        <big style={{ margin: '10px 0px' }}>{newMessage}</big>
        <form
          style={{
            justifyContent: 'center',
          }}
        >
          <input
            className="weex-input"
            style={{
              height: '40px',
              width: '500px',
              fontSize: '16px',
            }}
            type="text"
            placeholder="weexStorage Name"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <p></p>
          <input
            className="weex-input"
            style={{
              height: '40px',
              width: '500px',
              fontSize: '16px',
            }}
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <p></p>
          <button
            onClick={(e) => createData(e)}
            id="submit"
            style={{ width: '250px', marginRight: '10px' }}
          >
            Create New Storage
          </button>
          <button
            onClick={(e) => backupData(e)}
            id="submit"
            style={{ width: '250px' }}
          >
            Backup Storage
          </button>
        </form>

        <div style={{ marginTop: '30px' }}></div>
        {serverStatus}
        <p>
          Sometimes your cloud data manager may fell asleep!
          <strong>Press the button</strong> to wake it up!{' '}
        </p>
        <button
          onClick={() => wakeUpTheServer()}
          id="submit"
          style={{
            borderRadius: '5px',
          }}
          className="wakeupButton"
        >
          Wake Up!!
        </button>

        {/* <small className="base-color">
          Please note that, the cloud storage you're writing, it will be expired
          automatically after 30 days.
        </small> */}
      </div>
    </div>
  );
};

export default createData;
