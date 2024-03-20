'use client'
import ReactModal from 'react-modal';
import { useModalState } from '../../../../store/modalState';
import { ImageSquare, Video } from '@phosphor-icons/react';

export default function UploadModal() {
  const { isOpen, action } = useModalState();
  return (
    <ReactModal
      overlayClassName=""
      className="max-w-2xl w-[50%] md:w-3/4 h-[400px] sm:h-[500px] md:h-[750px] bg-white shadow-md shadow-gray-800 flex flex-col focus:outline-none border border-gray-300 rounded-lg"
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => action()}
      shouldCloseOnEsc={true}
      style={{
        overlay: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "hsla(0, 0%, 0%, 0.7)"
        },
      }}
    >
      <header className="border-b border-gray-300 min-w-full flex justify-center items-center p-2">
        <h1 className="font-semibold text-sm">Create new post</h1>
      </header>
      <main className='flex justify-center items-center relative h-full'>
        <section className="flex gap-2 flex-col justify-center items-center relative h-full p-5 sm:p-1">
          <div className='flex p-1'>
            <ImageSquare size={80} weight="thin" className="transform -rotate-12" />
            <Video size={80} weight="thin" className="transform rotate-12" />
          </div>
          <h2 className='text-md'>Drag photos and videos here</h2>
          <input type="file" accept=".jpg, .jpeg, .png" hidden id="upload-button" />
          <label htmlFor="upload-button" className='font-semibold text-xs bg-sky-500 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-500'>Select from your device</label>
        </section>
      </main>
    </ReactModal>
  );
};