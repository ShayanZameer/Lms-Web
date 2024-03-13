import React from 'react'

const RecordsItem= ({dateOfRecord, reason, isApproved, type, id}) => {
  return (
    <div className='recordItem flex w-2/3 p-8 mx-auto my-2 border-black border'>
        <div className='justify-start flex-[3]'>
            <h4>{dateOfRecord}</h4>
            <div className={type!=="leave"? "hidden": ""}>
        <p>{reason} </p>
          <p>{isApproved? "status: Approved":"Status: Not Approved"}</p>
            </div>
        </div>
        <div className='flex justify-end flex-[1] items-center gap-8'>
          <div className='flex gap-2'>
            <input type="radio" checked={type === "present"} readOnly/>
            <p className='btn'>Present</p>
          </div>
          <div className='flex gap-2'>
            <input type="radio" checked={type === "absent"} readOnly/>
            <p className='btn'>Absent</p>
          </div>
          <div className='flex gap-2'>
            <input type="radio" checked={type === "leave"} readOnly/>
            <p className='btn'>Leave</p>
          </div>
        </div>
    </div>
  )
}

export default RecordsItem