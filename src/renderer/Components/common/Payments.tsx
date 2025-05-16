import { useEffect, useRef, useState } from 'react';

const checkPayment = () => {
  const [success, setSuccess] = useState('');
  const [BillList, setBillList] = useState();
  const [sheet, setSheet] = useState(''); // Updates the sheet Name.
  const [sheetLoopedJsx, setSheetLoopedJsx] = useState(''); // Updates the sheet Name.
  const [paymentTickLists, setpaymentTickLists] = useState(''); // Loops and set's the StudentList
  const getBillList = localStorage.getItem(sheet + 'Status');
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
                onClick={() => fetchPaymentList(sheetName)}
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

  let loopedPaymentJSX;

  function fetchPaymentList(sheetName) {
    const getBillList = localStorage.getItem(sheetName + 'Status');
    if (getBillList !== null) {
      setSheet(sheetName);
      loopedPaymentJSX = JSON.parse(getBillList).map(
        (student: any, index: number) => {
          return (
            <div className="adjust-columns">
              <div className="loop-column">
                <small>{index + 1}</small>
              </div>
              <div className="loop-column" style={{ marginLeft: '-215px' }}>
                <strong>
                  <small>{student.name}</small>
                </strong>
              </div>
              <div className="loop-column">
                <strong>
                  <small>{student.mobile}</small>
                </strong>
              </div>

              <button
                onClick={() => updatePaymentStatus(index, sheetName)}
                id="submit"
                style={{ width: '80px' }}
              >
                <small>{student.bill}</small>
              </button>
            </div>
          );
        }
      );
      setpaymentTickLists(loopedPaymentJSX);
    }
  }

  const updatePaymentStatus = (index: number, sheetName: string) => {
    let updatePaymentStatusTick = JSON.parse(
      localStorage.getItem(sheetName + 'Status')
    );
    console.log(updatePaymentStatusTick[index]);
    const foundObject = updatePaymentStatusTick[index];
    const updateFoundObject = { ...foundObject, bill: '✅' };
    updatePaymentStatusTick.splice(index, 1, updateFoundObject);
    localStorage.setItem(
      sheetName + 'Status',
      JSON.stringify(updatePaymentStatusTick)
    );

    return fetchPaymentList(sheetName);
  };

  const resetPayments = () => {
    if (sheet == '') {
      return setSuccess(
        'You have to select a sheet specifically before you act it! 🙂'
      );
    }
    let updateFoundObject = [];
    let updatePaymentStatusTick = JSON.parse(
      localStorage.getItem(sheet + 'Status')
    );

    for (let index = 0; index < updatePaymentStatusTick.length; index++) {
      const getOneStatus = updatePaymentStatusTick[index];
      const updateOneStatus = { ...getOneStatus, bill: '❌' };
      updateFoundObject.push(updateOneStatus);
    }

    localStorage.setItem(sheet + 'Status', JSON.stringify(updateFoundObject));

    setSuccess('📛 Sheets has been reset successfully!!');
    return fetchPaymentList(sheet);
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
          {localStorage.getItem('institution')} - Payment TickSheet
        </h1>
        <small> - Do not delay to submit your fees, it is important! 💜</small>
        <div className="student-list">
          <big style={{ textAlign: 'center', fontWeight: 'bolder' }}>
            ⚫ Payment Registration - {localStorage.getItem('institution')}
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
        <small>Roll</small>
        <small style={{ marginLeft: '-190px' }}>Name</small>
        <small>Number</small>
        <small>Payment</small>
      </div>

      <div
        ref={loopList}
        className="scroll student-list"
        style={{ height: innerHeight * 0.5 - 120 }}
      >
        {paymentTickLists}
      </div>

      <button
        onClick={resetPayments}
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

export default checkPayment;

//   const updatePaymentStatus = (index: number) => {

// const updateFoundObject = { ...foundObject, bill: '✅' };
// updatePaymentStatusTick.splice(index, 1, updateFoundObject);
// localStorage.setItem(
//   'studentStatus',
//   JSON.stringify(updatePaymentStatusTick)
// );
//   };

//   const resetPayments = () => {
//     let updatePaymentStatusTick;
//      let updatePaymentStatusTick = JSON.parse(getBillList);

//       for (let index = 0; index < updatePaymentStatusTick.length; index++) {
//         const getOneStatus = updatePaymentStatusTick[index];
//         const updateOneStatus = { ...getOneStatus, bill: '❌' };
//         updateFoundObject.push(updateOneStatus);
//       }
//     }
//     localStorage.setItem('studentStatus', JSON.stringify(updateFoundObject));
//   };

//   let loopedJSX: React.SetStateAction<undefined>;
//   if (getBillList !== null) {
//     loopedJSX = JSON.parse(getBillList).map((student: any, index: number) => {
//       return (
//         <div className="adjust-columns">
//           <div className="loop-column">
//             <small>{index + 1}</small>
//           </div>
//           <div className="loop-column" style={{ marginLeft: '-215px' }}>
//             <strong>
//               <small>{student.name}</small>
//             </strong>
//           </div>
//           <div className="loop-column">
//             <strong>
//               <small>{student.mobile}</small>
//             </strong>
//           </div>

//           <button
//             onClick={() => updatePaymentStatus(index)}
//             id="submit"
//             style={{ width: '80px' }}
//           >
//             <small>{student.bill}</small>
//           </button>
//         </div>
//       );
//     });
//   }

//   function hideDiv() {
//     descDiv.current.classList.toggle('hidden');
//     if (descDiv.current.classList.contains('hidden')) {
//       loopList.current.style.height = innerHeight * 0.8 + 'px';
//       loopList.current.style.marginBottom = 240 + 'px';
//     } else {
//       loopList.current.style.height = innerHeight * 0.5 - 80 + 'px';
//       loopList.current.style.marginBottom = '';
//     }
//   }

//   useEffect(() => {
//     setBillList(loopedJSX);
//   }, [BillList]);

//   return (
//     <div>
//       <button
//         style={{ position: 'absolute' }}
//         onClick={() => hideDiv()}
//         id="submit"
//       >
//         HIDE
//       </button>
//       <div ref={descDiv}>
//         <h1 style={{ textAlign: 'center' }}>
//           {localStorage.getItem('institution')} - Payment Status
//         </h1>

//         <small> - Do not delay to submit your fees, it is important! 💜</small>
//         <p>{success}</p>
//       </div>
//       <div className="student-list">
//         <big style={{ textAlign: 'center', fontWeight: 'bolder' }}>
//           ⚫ Payments - {localStorage.getItem('institution')}
//           <p></p>
//           <small className="base-color">
//             Total Students :{' '}
//             {localStorage.getItem('noticesList')
//               ? Math.ceil(
//                   JSON.parse(localStorage.getItem('studentStatus')!)?.length
//                 )
//               : '0'}
//           </small>
//         </big>
//         <div className="search">
//           <input type="text" className="weex-input" placeholder="Search 🔍" />
//         </div>
//         <div
//           className="list-topbar"
//           style={{ display: 'flex', justifyContent: 'space-between' }}
//         >
//           <small>Roll</small>
//           <small style={{ marginLeft: '-190px' }}>Name</small>
//           <small>Number</small>
//           <small>Payment</small>
//         </div>

//         <div
//           ref={loopList}
//           className="scroll student-list"
//           style={{ height: innerHeight * 0.5 - 20 }}
//         >
//           {BillList}
//         </div>

//         <button
//           onClick={resetPayments}
//           id="submit"
//           style={{
//             width: '80px',
//           }}
//         >
//           Reset
//         </button>

//         <details className="no-drag" style={{ cursor: 'pointer' }}>
//           <summary style={{ fontSize: '12px' }}>README</summary>
//           <p className="base-color" style={{ margin: '0px 15px' }}>
//             Click on the ❌ icon to verify (✅) the payment status. Please note
//             that once the payment status is changed to ✅, it cannot be undo to
//             ❌. To reset the list, click to the "Reset Button"
//           </p>
//         </details>
//       </div>
//     </div>
//   );
// };

// export default checkPayment;
