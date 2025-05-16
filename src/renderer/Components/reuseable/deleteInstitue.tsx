import React from 'react';

export const deleteInstitute = () => {
  const institutionMemory = localStorage.getItem('institution');
  const alertUser = confirm(
    `Are you sure to delete ${institutionMemory}? All the data will be lost!`
  );
  if (alertUser) {
    localStorage.clear();
    window.electron.ipcRenderer.sendMessage('deleteInstitution', null);
    return location.reload();
  } else {
    alert('Feww, that was close! 😨');
  }
};

export const renameInstitue = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  institutionName: string
) => {
  localStorage.setItem('institution', institutionName);
  alert(`Institution name changed to ${institutionName}.`);
  return location.reload();
};
