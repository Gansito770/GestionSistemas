import React from 'react'
// import CoordinadorTable from '../../components/Coordinador/CoordinadorTable';
import PageTitle from '../../components/Common/PageTitle'
// quickAddCoordinador


export const CoordinadorListScreen = () => {
  return (
    <div>
        <div className='p-4'>
            <PageTitle title='Coordinador' />
        </div>

        <div>
            <div className='w-full lg:w-4/6 pl-4 sm:pl-4 sm:pr-0 mb-4 sm:mb-1'>
                {/* <CoordinadorTable showAdvanceSearch /> */}
            </div>
            <div className='w-full lg:w-2/6 pl-4 pr-4 sm:pl-4 sm:pr-2'>
                {/* QuickAddCoordinador */}
            </div>
        </div>
    </div>
  )
}

export default CoordinadorListScreen;