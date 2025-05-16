import React, { useEffect, useRef, useState } from 'react';

const attendanceSheet = () => {
  const [success, setSuccess] = useState(''); // Successfully added message popup
  const [sheet, setSheet] = useState(''); // Updates the sheet Name.
  const [sheetLoopedJsx, setSheetLoopedJsx] = useState(''); // Updates the sheet Name.
  const [showStudentList, setShowStudentList] = useState(''); // Loops and set's the StudentList
  const studentStatus = localStorage.getItem(sheet + 'Status');
  const descDiv = useRef(null); // Beginning Description div's refference. (First 500px)
  const loopList = useRef(null);

  const classSheet = localStorage.getItem('studentsSheet');
  let genLoopedJsx;

  useEffect(() => {
    if (classSheet !== null) {
      genLoopedJsx = JSON.parse(classSheet).map(
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
            </div>
          );
        }
      );
    }
    setSheetLoopedJsx(genLoopedJsx);
  }, [genLoopedJsx]);
  let loopedAttendanceJSX;
  function fetchStudentList(sheetName) {
    // getStudentList = localStorage.getItem(sheet); // Trying to getItem from the Localstorage
    // getBillPaid = localStorage.getItem(sheet + 'Status');
    if (localStorage.getItem(sheetName + 'Status') !== null) {
      setSheet(sheetName);
      loopedAttendanceJSX = JSON.parse(
        localStorage.getItem(sheetName + 'Status')
      ).map((student: any, index: number) => {
        return (
          <div
            className={
              Number(student.attendance) + Number(student.absence) ===
              Number(student.clickedAttendance)
                ? 'adjust-columns'
                : 'adjust-columns base-color'
            }
          >
            <div className="loop-column">
              <small>{index + 1}</small>
            </div>
            <div className="loop-column">
              <strong>
                <small>{student.name}</small>
              </strong>
            </div>
            <div className="loop-column">
              <strong>
                <small>
                  ✅ {student.attendance}{' '}
                  <span className="base-color">
                    {' '}
                    ({student.attendance}/{student.clickedAttendance})
                  </span>
                </small>
              </strong>
            </div>
            <div className="loop-column">
              <strong>
                <small>
                  ❌ {student.absence}{' '}
                  <span className="base-color">
                    ({student.absence}/{student.clickedAttendance})
                  </span>
                </small>
              </strong>
            </div>

            <div style={{ display: 'block' }}>
              <button
                onClick={() =>
                  updateAttendanceStatus('increment', index, sheetName)
                }
                id="submit"
                style={{ width: '80px', marginRight: '15px' }}
              >
                <small>✅</small>
              </button>
              <button
                onClick={() =>
                  updateAttendanceStatus('decrement', index, sheetName)
                }
                id="submit"
                style={{ width: '80px' }}
              >
                <small>❌</small>
              </button>
            </div>
          </div>
        );
      });
      setShowStudentList(loopedAttendanceJSX);
    }
  }

  const updateAttendanceStatus = (
    action: string,
    index: number,
    sheetName: string
  ) => {
    let updateAttendanceStatusTick = JSON.parse(
      localStorage.getItem(sheetName + 'Status')
    );

    const foundObject = updateAttendanceStatusTick[index];

    // ==//==//==//==//==//==//==//==//====//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//=//
    if (
      Number(foundObject.attendance) + Number(foundObject.absence) >=
      Number(foundObject.clickedAttendance)
    ) {
      console.log('Hello');
      return setSuccess(
        '❌ You forgot to change your attendance sheet! ❌ Click on the "Next⏭" Button to change your sheet.'
      );
    }
    // ==//==//==//==//==//==//==//==//====//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//=//

    const updateFoundObject =
      action === 'increment'
        ? {
            ...foundObject,
            attendance: Number(foundObject.attendance) + 1,
          }
        : {
            ...foundObject,
            absence: Number(foundObject.absence) + 1,
          };
    updateAttendanceStatusTick.splice(index, 1, updateFoundObject);
    localStorage.setItem(
      sheetName + 'Status',
      JSON.stringify(updateAttendanceStatusTick)
    );
    action === 'increment'
      ? setSuccess(`${foundObject.name}'s status present! 🥳`)
      : setSuccess(`${foundObject.name} was counted as Absent 🥺'`);

    return fetchStudentList(sheetName);
  };

  const resetAttendances = () => {
    if (sheet == '') {
      return setSuccess(
        'You have to select a sheet specifically before you act it! 🙂'
      );
    }
    let updateAttendanceStatusTick;
    let updateFoundObject = [];
    // Same ifElse statement as before
    if (studentStatus == null) {
      updateAttendanceStatusTick = [];
    } else {
      updateAttendanceStatusTick = JSON.parse(studentStatus);

      for (let index = 0; index < updateAttendanceStatusTick.length; index++) {
        const getOneStatus = updateAttendanceStatusTick[index];
        const updateOneStatus = {
          ...getOneStatus,
          attendance: 0,
          absence: 0,
          clickedAttendance: 1,
        };
        updateFoundObject.push(updateOneStatus);
      }
    }
    localStorage.setItem(sheet + 'Status', JSON.stringify(updateFoundObject));
    setSuccess('📛 Sheets has been reset successfully!!');

    return fetchStudentList(sheet);
  };

  const nextDaySheet = () => {
    if (sheet == '') {
      return setSuccess(
        'You have to select a sheet specifically before you act it! 🙂'
      );
    }
    let changeNextDaySheet;
    let updateSheet = [];
    // Same ifElse statement as before
    if (studentStatus == null) {
      changeNextDaySheet = [];
    } else {
      changeNextDaySheet = JSON.parse(studentStatus);

      for (let index = 0; index < changeNextDaySheet.length; index++) {
        const getOneStatus = changeNextDaySheet[index];
        const updateOneStatus = {
          ...getOneStatus,
          clickedAttendance: Number(getOneStatus.clickedAttendance) + 1,
        };
        updateSheet.push(updateOneStatus);
      }
    }
    localStorage.setItem(sheet + 'Status', JSON.stringify(updateSheet));
    setSuccess('👌🏻 Perfect! Sheet Changed!');

    return fetchStudentList(sheet);
  };

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
          {localStorage.getItem('institution')} - Attendace Sheet
        </h1>

        <small> - Is everybody present in the class? 💙</small>
        <div className="student-list">
          <big style={{ textAlign: 'center', fontWeight: 'bolder' }}>
            ⚫ Attendances - {localStorage.getItem('institution')}
          </big>
          <p></p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
            }}
          >
            {sheetLoopedJsx}
          </div>
          <p style={{ fontSize: '18px', textAlign: 'center' }}>{success}</p>
        </div>
      </div>
      <div className="day-changer">
        <big>
          Class{' '}
          <strong className="theme-color" style={{ fontSize: '30px' }}>
            {JSON.parse(localStorage.getItem(sheet + 'Status')) == null ||
            JSON.parse(localStorage.getItem(sheet + 'Status')).length === 0
              ? '❌'
              : JSON.parse(localStorage.getItem(sheet + 'Status'))[0]
                  .clickedAttendance}
          </strong>
        </big>
        <button
          onClick={nextDaySheet}
          id="submit"
          style={{
            width: '80px',
          }}
        >
          Next⏭
        </button>
      </div>
      <small className="base-color">
        Total Students :{' '}
        {localStorage.getItem(sheet + 'Status')
          ? Math.ceil(
              JSON.parse(localStorage.getItem(sheet + 'Status')!)?.length
            )
          : '0'}
      </small>
      <p
        style={{
          fontSize: '18px',
          textAlign: 'center',
        }}
      >
        ⭕ Batch : {sheet}
      </p>
      <div
        className="list-topbar"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <small>Roll No.</small>
        <small style={{ marginLeft: '50px' }}>Name</small>
        <small style={{ marginLeft: '90px' }}>Attendance ✅</small>
        <small style={{ marginRight: '20px' }}>Absence ❌</small>
        <small>Update Attendance</small>
      </div>

      <div
        ref={loopList}
        className="scroll student-list"
        style={{ height: innerHeight * 0.5 - 120 }}
      >
        {showStudentList}
      </div>

      <button
        onClick={resetAttendances}
        id="submit"
        style={{
          width: '80px',
        }}
      >
        Reset
      </button>

      <details className="no-drag" style={{ cursor: 'pointer' }}>
        <summary style={{ fontSize: '12px' }}>README</summary>
        <p className="base-color" style={{ margin: '0px 15px' }}>
          Click on the ✅ icon to increment (✅) the Attendance status. Again,
          click on the ❌ icon to decrement (❌) the absence status. If you want
          to reset your attendance sheet, press "Reset."
        </p>
      </details>
    </div>
  );
};

export default attendanceSheet;
