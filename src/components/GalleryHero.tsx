"use client";
import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Heading, Flex, Text, Button } from "@/once-ui/components";
import Link from "next/link";

export default function GalleryHero() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showSpline, setShowSpline] = useState(false);

  // Lazy-load Spline after a short delay for perceived speed
  useEffect(() => {
    const timer = setTimeout(() => setShowSpline(true), 200);
    return () => clearTimeout(timer);
  }, []);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(0);

  // Show overlay after 8 seconds with 1s fade-in (initial mount)
  useEffect(() => {
    const timerId = setTimeout(() => setOverlayVisible(true), 8000);
    return () => clearTimeout(timerId);
  }, []);

  // Hide overlay for 15s and show timer when Full Screen is clicked
  const handleHideOverlay = () => {
    setOverlayVisible(false);
    setTimerActive(true);
    setTimer(15);
  };

  // Countdown effect for timer
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (timerActive && timer > 0) {
      countdown = setTimeout(() => setTimer(t => t - 1), 1000);
    } else if (timerActive && timer === 0) {
      setOverlayVisible(true);
      setTimerActive(false);
    }
    return () => clearTimeout(countdown);
  }, [timerActive, timer]);

  // Timeout fallback if Spline fails to load
  const [loadFailed, setLoadFailed] = useState(false);
  useEffect(() => {
    if (!splineLoaded) {
      const timeout = setTimeout(() => setLoadFailed(true), 10000);
      return () => clearTimeout(timeout);
    }
  }, [splineLoaded]);

  return (
    <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", minHeight: "100vh", overflow: "hidden", background: "#000", zIndex: 0, pointerEvents: "none" }}>
      {/* Spline background */}
      <div className="absolute inset-0 z-0" style={{width:'100vw',height:'100vh',minHeight:'100vh',pointerEvents:'none'}}>
        {/* Fallback image always visible until Spline loads */}
        <img
          src="/spline-fallback.jpg"
          alt="3D preview"
          style={{position:'absolute',inset:0,width:'100vw',height:'100vh',objectFit:'cover',zIndex:0,background:'#000'}}
        />
        {/* Spline overlays fallback only when loaded */}
        {!loadFailed && (
          <div style={{display: splineLoaded ? 'block' : 'none'}}>
            <Spline 
              scene="https://prod.spline.design/ACBE2TK7gZ16TPDN/scene.splinecode"
              style={{width:'100vw',height:'100vh',minHeight:'100vh',pointerEvents:'none',position:'absolute',inset:0}}
              onLoad={() => setSplineLoaded(true)}
            />
          </div>
        )}
        {/* Loading spinner/message overlays fallback while waiting */}
        {!splineLoaded && !loadFailed && (
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:2}}>
            <div style={{color:'#fff',fontSize:'1.2rem',background:'rgba(0,0,0,0.7)',padding:'2em 3em',borderRadius:16}}>Loading 3D experience...</div>
          </div>
        )}
        {/* Fallback error overlays fallback image if Spline fails */}
        {loadFailed && (
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:2}}>
            <div style={{color:'#fff',fontSize:'1.2rem',background:'rgba(0,0,0,0.7)',padding:'2em 3em',borderRadius:16}}>
              3D experience failed to load.<br />Please check your connection or try again later.
            </div>
          </div>
        )}
      </div>
      {/* Overlay text and buttons */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 24,
          zIndex: 10,
          opacity: overlayVisible ? 1 : 0,
          transition: "opacity 2s",
          pointerEvents: overlayVisible ? 'auto' : 'none',
        }}
      >
        <Heading
          variant="display-strong-m"
          as="h1"
          style={{
            fontWeight: 700,
            fontSize: "1.4rem",
            marginBottom: 8,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            border: 0,
            background: "none",
            boxShadow: "none"
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #FF3CAC 0%, #fff 60%, #FFB6EC 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
              whiteSpace: "nowrap",
              maxWidth: "100vw",
              textShadow: "0 2px 24px #000",
              fontWeight: 800
            }}
          >
            Crafting Digital Experiences in 3D
          </span>
        </Heading>
        <Text
          variant="heading-default-m"
          align="center"
          style={{ color: "#fff", fontWeight: 400, fontSize: "1rem", marginBottom: 0, marginTop: 0, textShadow: "0 1px 4px rgba(0,0,0,0.22)" }}
        >
          Where creativity meets code — building stunning sites
        </Text>
        <Text
          variant="heading-default-m"
          align="center"
          style={{ color: "#fff", fontWeight: 400, fontSize: "0.95rem", marginBottom: 14, marginTop: 0, textShadow: "0 1px 4px rgba(0,0,0,0.18)" }}
        >
          that sell and scale.
        </Text>
        <Flex gap="8" horizontal="center" style={{ marginTop: 0 }}>
          <Button
            variant="secondary"
            size="s"
            style={{
              minWidth: 90,
              fontSize: "0.95em",
              padding: "6px 28px",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              border: "1.5px solid #fff",
              borderRadius: 999,
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              fontWeight: 500,
              transition: "background .2s, color .2s, border .2s",
            }}
            onClick={handleHideOverlay}
          >
            Full Screen
          </Button>
          <Button
            variant="primary"
            size="s"
            style={{
              minWidth: 90,
              fontSize: "0.95em",
              padding: "6px 28px",
              background: "linear-gradient(90deg, #FF3CAC 0%, #784BA0 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              fontWeight: 600,
              transition: "background .2s, color .2s, border .2s",
            }}
            href="/services"
          >
            Next
          </Button>
        </Flex>
      </div>
      {/* Countdown Timer Floating */}
      {timerActive && (
        <div
          style={{
            position: "fixed",
            right: 40,
            bottom: 32,
            zIndex: 1000,
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.3rem",
            textShadow: "0 2px 8px #000"
          }}
        >
          {timer}
        </div>
      )}
      {/* Black overlay while loading Spline */}
      {!splineLoaded && (
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "#000",
          transition: "opacity 0.3s",
          opacity: 1,
          pointerEvents: "all"
        }} />
      )}
    </div>
  );
}
