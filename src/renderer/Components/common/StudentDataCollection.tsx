import React, { useEffect, useRef, useState } from 'react';
import deleteFromStorage from '../reuseable/deleteStorage';

const studentDataCollection = () => {
  // - Useref to automatically get focused on the first input (name field)
  const [newStudent, setNewStudent] = useState({
    name: '',
    gurdian: '',
    mobile: '',
    class: '',
    section: '',
  });
  const [success, setSuccess] = useState(''); // Successfully added message popup
  const [showStudentList, setShowStudentList] = useState(); // Student List JSX
  const [classnameValue, setClassnameValue] = useState('');
  const [loopedJSXCLASS, setLoopedJSXCLASS] = useState();
  const [sheet, setSheet] = useState('');
  const nameRef = useRef(null);
  const descDiv = useRef(null);
  const loopList = useRef(null);
  const classSheet = localStorage.getItem('dataSheet');

  // == // == // == // == // == // == // == // == // == // == // == // == // == // == // == // == // == //

  let clonedArray;
  let loopedJSX: React.SetStateAction<undefined>;
  let studentJSX: React.SetStateAction<undefined>;
  let genloopedJSX: React.SetStateAction<undefined>;
  let getStudentList = localStorage.getItem(sheet);
  let getBillPaid = localStorage.getItem(sheet + 'Status');

  function fetchStudentList(sheetName) {
    setSheet(sheetName);

    // getStudentList = localStorage.getItem(sheet); // Trying to getItem from the Localstorage
    // getBillPaid = localStorage.getItem(sheet + 'Status');

    if (getStudentList !== null) {
      studentJSX = JSON.parse(getStudentList!).map(
        (file: any, index: number) => {
          return (
            <div className="adjust-columns">
              <div className="loop-column">
                <small>{index < 9 ? '0' + (index + 1) : index + 1}</small>
              </div>
              <div className="loop-column">
                <strong>
                  <small id="name">{file.name}</small>
                </strong>
              </div>
              <div className="loop-column">
                <small>{file.gurdian}</small>
              </div>
              <div className="loop-column">
                <small>{file.mobile}</small>
              </div>
              <div className="loop-column">
                <small>{file.class}</small>
              </div>
              <div className="loop-column">
                <small>{file.section}</small>
              </div>

              <button
                onClick={() =>
                  deleteFromStorage(index, sheetName, sheetName + 'Status')
                }
                id="submit"
              >
                Delete
              </button>
            </div>
          );
        }
      );
      setShowStudentList(studentJSX);
    }
  }

  useEffect(() => {
    fetchStudentList(sheet);
  }, [getStudentList, sheet]);

  useEffect(() => {
    setShowStudentList(studentJSX);
    setSheet('');
  }, [classSheet]);

  const addNewStudent = (e) => {
    e.preventDefault();

    // - Getting ready with a object stored variable
    let getStudentList = localStorage.getItem(sheet);
    let getBillPaid = localStorage.getItem(sheet + 'Status');

    let studentObj;
    let billObj;
    if (getStudentList === null) {
      studentObj = [];
      billObj = [];
    } else {
      // - Parsing localstorage strings into Objects
      studentObj = JSON.parse(getStudentList);
      billObj = JSON.parse(getBillPaid!);
    }

    if (
      newStudent.name === '' ||
      newStudent.gurdian === '' ||
      newStudent.mobile === '' ||
      newStudent.class === '' ||
      newStudent.section === ''
    ) {
      setSuccess('- Sensitive Informations are missing! 😨');
    } else if (sheet === '') {
      setSuccess(
        '- You have to select/create a sheet specifically to add records. 🙂'
      );
    } else {
      studentObj.push(newStudent);
      billObj.push({
        name: newStudent.name,
        mobile: newStudent.mobile,
        attendance: 0,
        absence: 0,
        clickedAttendance: 1,
        bill: '❌',
      });
      localStorage.setItem(sheet, JSON.stringify(studentObj));
      localStorage.setItem(sheet + 'Status', JSON.stringify(billObj));

      setSuccess(newStudent.name + ' ' + 'Added Successfully!' + ' ' + sheet);
      setNewStudent({
        name: '',
        gurdian: '',
        mobile: '',
        class: '',
        section: '',
      });
      nameRef.current.focus();
    }
  };

  if (classSheet === null) {
    clonedArray = [];
  } else {
    clonedArray = JSON.parse(classSheet);
  }

  useEffect(() => {
    setLoopedJSXCLASS(genloopedJSX);
  }, [loopedJSXCLASS, classSheet]);

  if (classSheet !== null) {
    genloopedJSX = JSON.parse(classSheet!).map(
      (sheetName: any, index: number) => {
        return (
          <div className="adjust-columns">
            <button
              onClick={() => fetchStudentList(sheetName)}
              style={{ width: '170px' }}
              className="onclick-highlight"
              id="submit"
            >
              {sheetName}
            </button>
            <button
              onClick={() => deleteSheet(sheetName, index)}
              style={{
                fontSize: '8px',
                height: '10px',
                display: 'flex',
                alignItems: 'center',
              }}
              id="submit"
            >
              🗑️
            </button>
          </div>
        );
      }
    );
  }

  function generateClassList(e: any) {
    e.preventDefault();
    if (classnameValue === '') {
      return setSuccess("Sheet's name cannot be Empty!");
    }
    clonedArray.push(classnameValue);
    localStorage.setItem('dataSheet', JSON.stringify(clonedArray));
    setClassnameValue('');
  }

  function deleteSheet(receivedSheetName, receivedIndex) {
    const classSheetPARSED = JSON.parse(classSheet);
    localStorage.removeItem(receivedSheetName);
    localStorage.removeItem(receivedSheetName + 'Status');
    classSheetPARSED.splice(receivedIndex, 1);
    localStorage.setItem('dataSheet', JSON.stringify(classSheetPARSED));
    setSuccess(receivedSheetName + ' ' + 'Deleted Successfully!');
    if (classSheetPARSED.length == 0) {
      return localStorage.removeItem('dataSheet');
    }
  }

  function hideDiv() {
    descDiv.current.classList.toggle('hidden');
    if (descDiv.current.classList.contains('hidden')) {
      loopList.current.style.height = innerHeight * 0.8 + 'px';
      loopList.current.style.marginBottom = 240 + 'px';
    } else {
      loopList.current.style.height = innerHeight * 0.5 - 80 + 'px';
      loopList.current.style.marginBottom = '';
    }
  }

  return (
    <div>
      <button onClick={() => hideDiv()} id="submit">
        ⚡
      </button>

      <div ref={descDiv}>
        <h1 style={{ textAlign: 'center' }}>
          {localStorage.getItem('institution')} - Student Lists
        </h1>

        <small> - Everybody stand up, your teacher has entered!! 🧡</small>
        <p className="base-color" style={{ textAlign: 'center' }}>
          {' '}
          - Completely separated from your Main data collection. You can store
          your previous students/batchs records here easily.
        </p>

        <form className="add-students-form no-drag">
          <input
            type="text"
            className="weex-input"
            style={{ height: '40px', width: '220px' }}
            placeholder="Sheet's Name"
            value={classnameValue}
            onChange={(e) => setClassnameValue(e.target.value)}
          />
          <button
            id="submit"
            style={{ width: '100px' }}
            onClick={(e) => generateClassList(e)}
          >
            Generate
          </button>
        </form>

        <p></p>
        <big style={{ textShadow: '0 0 5px white' }}>{success}</big>
        <form className="add-students-form">
          <input
            ref={nameRef}
            type="text"
            className="weex-input"
            style={{ height: '40px', width: '220px' }}
            placeholder="Student Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
          />
          <input
            type="text"
            className="weex-input"
            style={{ height: '40px', width: '220px' }}
            value={newStudent.gurdian}
            placeholder="Student Gurdian's Name"
            onChange={(e) =>
              setNewStudent({ ...newStudent, gurdian: e.target.value })
            }
          />
          <input
            type="text"
            className="weex-input"
            style={{ height: '40px', width: '220px' }}
            value={newStudent.mobile}
            placeholder="Mobile Number"
            onChange={(e) =>
              setNewStudent({ ...newStudent, mobile: e.target.value })
            }
          />
          <input
            type="text"
            className="weex-input"
            style={{ height: '40px', width: '220px' }}
            value={newStudent.class}
            placeholder="Batch"
            onChange={(e) =>
              setNewStudent({ ...newStudent, class: e.target.value })
            }
          />
          <input
            type="text"
            className="weex-input"
            style={{ height: '40px', width: '220px' }}
            value={newStudent.section}
            placeholder="Section"
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                section: e.target.value.toUpperCase(),
              })
            }
          />
          <button
            style={{ height: '40px', width: '240px' }}
            id="submit"
            type="submit"
            onClick={(e) => addNewStudent(e)}
          >
            {' '}
            Add{' '}
          </button>
        </form>

        <p
          style={{
            fontSize: '18px',
            textAlign: 'center',
          }}
        >
          ⭕ Current : {sheet}
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            marginTop: '40px',
          }}
        >
          {loopedJSXCLASS}
        </div>
      </div>

      <div className="student-list">
        <p></p>
        <big style={{ textAlign: 'center', fontWeight: 'bolder' }}>
          ✔ Student Lists - {localStorage.getItem('institution')}
        </big>

        <div className="search">
          <input type="text" className="weex-input" placeholder="Search 🔍" />
        </div>

        <div className="list-topbar">
          <small id="roll">Roll No.</small>
          <small id="name">Name</small>
          <small id="gurdian">Gurdian</small>
          <small id="mobile">Mobile</small>
          <small id="class">Batch</small>
          <small id="section">Section</small>
          <small id="section">Remove</small>
        </div>

        <div
          ref={loopList}
          className="scroll student-list"
          style={{ height: innerHeight * 0.5 - 80 }}
        >
          {showStudentList}
        </div>
      </div>
    </div>
  );
};

export default studentDataCollection;
