"use client";

import ReactModal from "react-modal";
import { useModalState } from "../../../../store/modalState";
import { CircleNotch, ImageSquare, Video, TrashSimple } from "@phosphor-icons/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from "firebase/storage";

export default function UploadModal() {
  const { data: session } = useSession();
  const { isOpen, action } = useModalState();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [imageFileUrl, setImageFileUrl] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>): void => {
    const fileReader = new FileReader();
    const file = e?.target?.files![0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadPhoto = async (): Promise<void> => {
    if (loading) return;
    setLoading(true)

    const fileName = `${new Date().getTime()} - ${selectedFile.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on("state_changed", 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, 
      (error) => {
        setLoading(false);
        setImageFileUrl(null);
        setSelectedFile(null);

    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        setImageFileUrl(downloadUrl);
        setLoading(false);
        createPost(downloadUrl);
      });
    });
  };

  const createPost = async (downloadUrl: any) => {
    const postInfo = {
      caption,
      username: session?.user.username,
      profileImage: session?.user.image ?? "",
      uid: session?.user.uid,
      image: downloadUrl,
      timestamp: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, "posts"), postInfo);
    action();
  };

  return (
    <ReactModal
    className="max-w-2xl w-[50%] md:w-3/4 h-[450px] sm:h-[500px] md:h-[550px] 2xl:h-[750px] bg-white shadow-md shadow-gray-800 flex flex-col focus:outline-none border border-gray-300 rounded-lg"
    isOpen={isOpen}
    ariaHideApp={false}
    onRequestClose={() => {
      action();
      setSelectedFile(null);
    }}
    shouldCloseOnEsc={true}
    style={{
      overlay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "hsla(0, 0%, 0%, 0.7)"
      },
    }}
    >
      <header className="border-b border-gray-300 min-w-full flex justify-center items-center p-2">
        <h1 className="font-semibold text-sm">Create new post</h1>
      </header>
      <main className="flex justify-center items-center relative h-full">
        <section className="flex flex-col justify-between items-center relative h-full w-full">
         { selectedFile 
            ?
            (
              <div className="flex flex-grow gap-10 flex-col justify-center items-center p-1">
                <img src={imageFileUrl} alt="" className={`w-full max-h-[350px] object-cover ${loading && "animate-pulse"}`}/> 
                { 
                  loading 
                  ?
                  <TrashSimple className="text-2xl text-gray-300 cursor-not-allowed" />
                  :
                  <TrashSimple  onClick={() => setSelectedFile(null)} className="post-buttons hover:text-red-600 hover:bg-red-200 hover:scale-[1.2] transition-all duration-700 ease-in-out"/>
                }
              </div> 
            )
            : 
            (
              <div className="flex-grow flex gap-2 flex-col justify-center items-center p-1">
                <div className="flex">
                  <ImageSquare size={80} weight="thin" className="transform -rotate-12" />
                  <Video size={80} weight="thin" className="transform rotate-12" />
                </div>
                <h2 className="text-md">Drag photos and videos here</h2>
                <input type="file" accept=".jpg, .jpeg, .png" hidden id="upload-button" onChange={(e) => addImageToPost(e)}/>
                <label htmlFor="upload-button" className="font-semibold text-xs bg-sky-500 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-500">Select from your device</label>
              </div>
            )
          }
          <div className="flex gap-1 flex-col items-center p-2 w-full">
            <input type="text" placeholder="Enter your caption" className="focus:ring-0 border-none placeholder-shown:text-center text-center text-sm w-full" max={50} onChange={(e) => setCaption(e.target.value)} value={caption}/>
            <button 
            onClick={uploadPhoto}
            disabled= {loading || !selectedFile || caption.trim() === ""} className="font-semibold text-xs bg-sky-500 text-white p-3 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:text-slate-500 disabled:bg-gray-300 w-1/4 hover:bg-blue-500">
              { loading ? <CircleNotch className="text-lg text-sky-500 animate-spin min-w-full" /> : "Upload" }
            </button>
          </div>
        </section>
      </main>
    </ReactModal>
  );
};