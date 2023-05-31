"use client";
import { useState } from "react";
import axios from "axios";
//import Avatar from 'react-avatar-edit';
import dynamic from "next/dynamic";
import Image from "next/image";
import { loader } from '@public/assets';

const Avatar = dynamic(() => import("react-avatar-edit"), { ssr: false });

export default function FormAvatar({ id, image }) {
  console.log(id, image);

  const [state, setState] = useState({
    preview: image ? image : null,
    actualAvatar: image ? image : null,
    src: "",
    alertAvatar: "",
    showAlert: false,
    msgAlert: "",
  });

  const [modalShow, setModalShow] = useState(false);

  const handleClick = (e) => {
    const show = !modalShow;
    setModalShow(show);
  };

  const onClose = () => {
    setState({
      ...state,
      preview: null,
    });
  };

  const onCrop = (preview) => {
    setState({
      ...state,
      preview,
    });
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 1097152) {
      alert("La imagen es muy grande!");
      elem.target.value = "";
    }
  };

  const classesAlert = "alert " + state.alertAvatar;

  const saveAvatar = async (e) => {
    console.log("guardar el avatar");

    const url = "/api/updateUser/avatar";
    const datos = { avatar: state.preview, id_usuario: id };
    console.log(state.preview)
    let res = await axios.put(url, datos);
    console.log(res);
  };

  return (

    <div className="static p-4">
      <div className="">
        <div className="w-[10rem]">
          <Image
            className="avatar-preview"
            src={image}
            alt="avatar"
            width="100"
            height="100"
          />
          <button className="btn-navbar" onClick={handleClick}>
            Editar
          </button>
        </div>
      </div>
      {modalShow && (
        <div
          dialogClassName="avatar-modal"
          className="w-full h-screen absolute top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center"
        >
          <div className="bg-white w-[40rem] rounded-md flex flex-col overflow-hidden shadow-2xl">
            <div className="px-3 py-5 bg-slate-100">
              <h2 className="text-xl font-semibold font-titleFont text-gray-700">
                Establecer avatar
              </h2>
            </div>
            <div className="p-8 flex flex-row items-center justify-between">
              <Avatar
                width={300}
                height={295}
                onCrop={onCrop}
                onClose={onClose}
                onBeforeFileLoad={onBeforeFileLoad}
                src={state.src}
              />
              {state.preview && (
                <Image
                  className="avatar-modal"
                  src={state.preview}
                  alt="avatar"
                  height='100'
                  width='100'
                />
              )}

              {state.showAlert && (
                <div className={classesAlert}>{state.msgAlert}</div>
              )}
            </div>
            <div className="p-4 flex flex-row gap-3 items-center justify-end bg-slate-100">
              <button className="btn-navbar" onClick={handleClick}>
                Cerrar
              </button>
              <button
                className="btn-navbar"
                variant="primary"
                onClick={saveAvatar}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}