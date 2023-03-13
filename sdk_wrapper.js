import { useEffect, useRef } from "react";
import React from 'react' 
const ReactDOM  = require('react-dom')

import { useXtraVisionAssessmentContext, XtraVisionAssessmentProvider as AssessmentProvider } from "@xtravision/xtravision-react";

const AppContainer = ({ videoElementRef, libData }) => {

  const { lastJsonMessage, setIsCamOn } = useXtraVisionAssessmentContext();

  // response forward to frontend
  if (libData.onServerResponse) {
    onServerResponse(lastJsonMessage)
  };

  useEffect(() => {
    // Camera will be start once the SDK will be loaded
    startCamera();

    // onExitPage: close camera and stop WebCam
    // need to test this
    return () => {
      stopCamera()
      setIsCamOn(false)
    }
  }, [])
  
  const startCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const deviceInfos = await navigator.mediaDevices.enumerateDevices();
      let defaultCamId;

      for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind === "videoinput") {
          defaultCamId = deviceInfo.deviceId;
          break;
        }
      }

      if (!defaultCamId) return;

      const constraints = {
        video: {
          deviceId: { exact: defaultCamId },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElementRef.current.stream = stream;
      videoElementRef.current.srcObject = stream;
      videoElementRef.current.play();
      setIsCamOn(true);
    } catch (err) {
      console.error(err);
      setIsCamOn(false);
    }
  };

  const stopCamera = () => {
    var stream = videoElementRef.current.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }

    videoElementRef.current.srcObject = null;
  };

  if (!libData.videoElementCSS) {
    libData.videoElementCSS = {minHeight: "100vh", minWidth: "100vw"}
  }

  return (
      <video ref={videoElementRef} style={ libData.videoElementCSS} />
    );
  }

const AssessmentPage = ({connectionData, requestData, libData} ) => {
  
  const videoElementRef = useRef(null);

  return (
    <AssessmentProvider
      videoElementRef={videoElementRef}
      connectionData={connectionData}
      requestData={requestData}
    >
      <AppContainer
        videoElementRef={videoElementRef}
        connectionData={connectionData}
        libData = {libData}
      />
    </AssessmentProvider>
  );
};

export { AssessmentPage, AssessmentProvider, useXtraVisionAssessmentContext, React, ReactDOM};
