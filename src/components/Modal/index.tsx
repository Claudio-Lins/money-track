import React from 'react'

interface ModalProps {
  isOpen?: boolean
  setIsOpen?: () => void
  status: boolean
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export default function Modal({isOpen, status, setStatus, children}: ModalProps) {

  function handleModalStateChange(e:any) {
    if (e.target.classList.contains('modalBg')) {
      setStatus(false)
    }
  }

  return (
    <>
      {status && (
        <div
          id='modal'
          onClick={handleModalStateChange} 
          className='modalBg fixed inset-0 bg-zinc-900/90 z-50 flex justify-center items-center'>
        <div className="w-full p-8 max-w-5xl flex justify-center bg-white rounded-lg">{
          children
        }</div>
      </div>
      ) }
    </>
  )
}
