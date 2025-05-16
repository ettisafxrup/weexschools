import React, { useEffect, useRef, useState } from 'react';
import deleteFromStorage from '../reuseable/deleteStorage';

const currentDate = new Date();
const formattedDate = currentDate.toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
});

const addNotice = () => {
  const [newNotice, setNewNotice] = useState({
    title: '',
    date: formattedDate,
    description: '',
    stronglyNeedToMention: '',
    ending: '',
    author: '',
    authorPosition: '',
    city: '',
  });

  const descDiv = useRef(null);

  function hideDiv() {
    descDiv.current.classList.toggle('hidden');
  }

  return (
    <div>
      <button className='hideButton'
        onClick={() => hideDiv()}
        id="submit"
      >
        ⚡
      </button>
      <div ref={descDiv}>
        <h1 style={{ textAlign: 'center' }}>
          {localStorage.getItem('institution')} - Notice Template Generator
        </h1>

        <small> - Boys, Stand up! Here comes an important notice..! 💛</small>
        <form className="add-students-form">
          <input
            type="text"
            className="weex-input"
            style={{ height: '40px', width: '220px' }}
            placeholder="Notice Title"
            value={newNotice.title}
            onChange={(e) =>
              setNewNotice({ ...newNotice, title: e.target.value })
            }
          />
          <input
            type="text"
            className="weex-input"
            style={{ height: '40px', width: '220px' }}
            value={newNotice.author}
            placeholder="Author"
            onChange={(e) =>
              setNewNotice({ ...newNotice, author: e.target.value })
            }
          />
          <input
            type="text"
            className="weex-input"
            style={{ height: '40px', width: '220px' }}
            value={newNotice.authorPosition}
            placeholder="Author Position"
            onChange={(e) =>
              setNewNotice({ ...newNotice, authorPosition: e.target.value })
            }
          />
          <input
            type="text"
            className="weex-input"
            style={{ height: '40px', width: '220px' }}
            value={newNotice.city}
            placeholder="Country/City/Town/Village Name"
            onChange={(e) =>
              setNewNotice({ ...newNotice, city: e.target.value })
            }
          />
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <textarea
              className="weex-input"
              style={{
                marginTop: '10px',
                height: '40px',
                width: '220px',
                transition: 'none',
                fontSize: '15px',
                fontFamily: 'Titillium Web',
              }}
              value={newNotice.stronglyNeedToMention}
              placeholder="Strong Mentions (Optional)"
              onChange={(e) =>
                setNewNotice({
                  ...newNotice,
                  stronglyNeedToMention: e.target.value,
                })
              }
            />
          </div>

          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <textarea
              className="weex-input"
              style={{
                height: '130px',
                width: '460px',
                transition: 'none',
                fontSize: '15px',
                fontFamily: 'Titillium Web',
              }}
              value={newNotice.description}
              placeholder="Description"
              onChange={(e) =>
                setNewNotice({ ...newNotice, description: e.target.value })
              }
            />
          </div>

          <textarea
            className="weex-input"
            style={{
              marginTop: '10px',
              height: '40px',
              width: '220px',
              transition: 'none',
              fontSize: '15px',
              fontFamily: 'Titillium Web',
            }}
            value={newNotice.ending}
            placeholder="Ending Description"
            onChange={(e) =>
              setNewNotice({ ...newNotice, ending: e.target.value })
            }
          />
        </form>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <big> weexSchools Notice Template Generator</big>
          <small className="base-color">
            After creating a template, full screen it and take a screenshot of
            it. Your notice is all set..!
          </small>
        </div>
      </div>
      <div className="student-list">
        <big
          style={{
            marginTop: '40px',
            fontSize: '15px',
            textAlign: 'center',
            fontWeight: 'bolder',
          }}
        >
          {localStorage.getItem('institution')}, {newNotice.city}.
        </big>
        <center>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '4px solid #00638f',
              width: '50%',
            }}
          >
            <big
              style={{
                marginTop: '25px',
                fontSize: '30px',
                textAlign: 'center',
                fontWeight: 'bolder',
              }}
            >
              {newNotice.title}
            </big>
          </div>
        </center>
        <div style={{ textAlign: 'center' }}>
          {/* <h1 style={{ textShadow: '4px 0 10px #00638f' }}>
            {newNotice.title}
          </h1> */}
          <p
            style={{
              textAlign: 'center',
              fontSize: '18px',
              marginTop: '3px',
            }}
          >
            {newNotice.date}
          </p>

          <p style={{ fontSize: '20px', lineHeight: '40px' }}>
            {newNotice.description}
          </p>
          <strong style={{ fontSize: '20px', fontWeight: 'bolder' }}>
            {newNotice.stronglyNeedToMention}
          </strong>
          <p
            style={{
              textShadow: '4px 0 10px #00638f',
              textAlign: 'left',
              fontSize: '20px',
              lineHeight: '40px',
            }}
          >
            {newNotice.ending}
          </p>

          <p
            style={{
              marginTop: '40px',
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'left',
            }}
          >
            {newNotice.author}
          </p>
          <p
            style={{
              marginTop: '-10px',
              fontSize: '15px',
              fontWeight: 'bold',
              textAlign: 'left',
            }}
          >
            <small>
              - {newNotice.authorPosition},{' '}
              {localStorage.getItem('institution')}, {newNotice.city}.
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default addNotice;
