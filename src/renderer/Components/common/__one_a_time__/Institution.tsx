import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Institution = () => {
  const [institution, setInstitution] = useState('');
  const useNavigator = useNavigate();
  const userJoinedTime: Date = new Date();

  // - On submit Function
  /* Saving all the informations such as institution
  name and the joining date in order to show these into the
  home page to the user */
  const submitInstitution = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    localStorage.setItem('institution', institution);
    localStorage.setItem(
      'joinDate',
      userJoinedTime.toLocaleDateString() +
        ' ' +
        userJoinedTime.toLocaleTimeString()
    );

    institution !== ''
      ? useNavigator('/home')
      : setInstitution('Untitled_Institution');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <big style={{ textAlign: 'center' }}>
        {institution !== ''
          ? institution + ' is ' + 'Ready to Rock!! 💛🔥'
          : null}
      </big>
      <input
        className="input weex-input"
        type="text"
        style={{ height: '40px', width: '600px' }}
        placeholder="Your Institution Name"
        onChange={(e) => setInstitution(e.target.value)}
      />

      <button id="submit" onClick={submitInstitution}>
        Get Started
      </button>
    </div>
  );
};

export default Institution;
