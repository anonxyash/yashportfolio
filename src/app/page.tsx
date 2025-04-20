"use client";
import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

const SPLINE_SCENE = "https://prod.spline.design/ACBE2TK7gZ16TPDN/scene.splinecode";

const LOADING_MESSAGES = [
  'Loading AI shaders…',
  'Optimizing GPU output…',
  'Syncing RGB lighting…',
  'Boosting network packets…',
  'Calibrating fan curves…',
  'Unleashing NPU power…',
  'Healing performance cores…',
  'Engaging coolant overdrive…',
  'Mapping audio frequencies…',
  'Overclocking memory lanes…',
  'Aligning pixel grids…',
  'Charging hyperdrive fans…',
  'Securing data fortress…',
  'Scanning system integrity…',
  'Patching time dilations…',
  'Harvesting quantum frames…',
  'Preparing mech exosuit…',
  'Igniting thermal shields…',
  'Portaling hub interface…',
  'Activating phantom overclock',
];

import RotatingText from "../blocks/TextAnimations/RotatingText/RotatingText";
import "./dots-loader.css";

function LoadingOverlay() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'rgba(0,0,0,0.55)',
      padding: '1.1em 2.2em',
      borderRadius: 18,
      boxShadow: '0 4px 32px 0 rgba(0,0,0,0.16)'
    }}>
      <div style={{
        width: 44,
        height: 44,
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ width: 70, height: 28, marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="dots-loader">
            <div className="dot dot1"></div>
            <div className="dot dot2"></div>
            <div className="dot dot3"></div>
            <div className="dot dot4"></div>
            <div className="dot dot5"></div>
          </div>
        </div>
      </div>
      <div style={{
        width: 220,
        minHeight: 14,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.89rem',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}>
        <RotatingText
          texts={LOADING_MESSAGES}
          auto={true}
          rotationInterval={2000}
          mainClassName="loading-rotating-text"
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [textFade, setTextFade] = useState(true); // for fade in/out




  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (splineLoaded) {
      timer = setTimeout(() => setShowText(true), 7500);
    } else {
      setShowText(false);
    }
    return () => clearTimeout(timer);
  }, [splineLoaded]);

  // Handle fade out text and show exit on fullscreen
  const handleFullScreen = () => {
    setTextFade(false);
    setTimeout(() => {
      setShowText(false);
      setFullscreenActive(true);
      setShowExit(true);
    }, 1000); // fade out in 1s
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  // Handle exit: fade out exit, fade in text
  const handleExit = () => {
    setShowExit(false);
    setFullscreenActive(false);
    setTextFade(false); // start with fade-out
    setTimeout(() => {
      setShowText(true);
      setTimeout(() => {
        setTextFade(true); // fade in
      }, 20); // allow DOM update
    }, 1000); // after exit button fades out
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", inset: 0, background: "#000", overflow: "hidden", margin: 0, padding: 0, zIndex: 0, cursor: 'default' }}>
      {/* Loading spinner overlay (shown until Spline loads) */}
      {!splineLoaded && (
        <LoadingOverlay />
      )}
      <Spline
        scene={SPLINE_SCENE}
        onLoad={() => setSplineLoaded(true)}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          cursor: 'default',
        }}
      />
      {/* Overlay text and controls */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100vw",
          display: showText ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 48,
          zIndex: 10,
          opacity: textFade ? 1 : 0,
          transform: textFade ? 'translateY(0)' : 'translateY(40px)',
          transition: "opacity 1s cubic-bezier(.55,0,.1,1), transform 1s cubic-bezier(.55,0,.1,1)",
          pointerEvents: showText ? "auto" : "none",
        }}
      >
        <h1
          style={{
            fontWeight: 800,
            fontSize: "1.2rem",
            marginBottom: 6,
            textAlign: "center",
            display: "inline-block",
            whiteSpace: "nowrap",
            maxWidth: "100vw",
            textShadow: "0 2px 12px #000",
            background: "linear-gradient(90deg, #FF3CAC 0%, #fff 60%, #FFB6EC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent"
          }}
        >
          Crafting Digital Experiences in 3D
        </h1>
        <div
          style={{ color: "#fff", fontWeight: 400, fontSize: "0.95rem", marginBottom: 0, marginTop: 0, textShadow: "0 1px 4px rgba(0,0,0,0.22)", textAlign: 'center' }}
        >
          Where creativity meets code — building stunning sites that sell and scale.
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
          {!fullscreenActive && (
            <button
              style={{
                minWidth: 70,
                fontSize: "0.95em",
                padding: "6px 20px",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                border: "1.3px solid #fff",
                borderRadius: 999,
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                fontWeight: 500,
                transition: "background .2s, color .2s, border .2s",
                marginRight: 6,
                cursor: 'pointer'
              }}
              onClick={handleFullScreen}
            >
              Full Screen
            </button>
          )}
          <a
            href="/work"
            style={{
              minWidth: 70,
              fontSize: "0.95em",
              padding: "6px 20px",
              background: "linear-gradient(90deg, #FF3CAC 0%, #784BA0 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              fontWeight: 600,
              transition: "background .2s, color .2s, border .2s",
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            Next
          </a>
        </div>
      </div>
      <style>{`
        canvas { cursor: default !important; }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {/* Exit fullscreen button */}
      {showExit && (
        <button
          style={{
            position: 'absolute',
            right: 32,
            bottom: 32,
            zIndex: 20,
            padding: '10px 28px',
            background: 'linear-gradient(90deg,#ff0080 0%,#ff8cff 80%,#fff 100%)',
            color: '#222',
            border: 'none',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: '1.05em',
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.12)',
            cursor: 'pointer',
            opacity: showExit ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
          onClick={handleExit}
        >
          Exit
        </button>
      )}
    </div>
  );
}
