const TitleBar = () => {
  function sendIPC(str: string) {
    window.electron.ipcRenderer.sendMessage(str, null);
  }

  return (
    <nav>
      <ul className="ul">
        <li onClick={() => sendIPC('close')}>✖</li>
        <li onClick={() => sendIPC('maximize')}>🗖</li>
        <li onClick={() => sendIPC('minimize')}>—</li>
      </ul>
    </nav>
  );
};

export default TitleBar;
