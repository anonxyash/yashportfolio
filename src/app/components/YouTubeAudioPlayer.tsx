"use client";
import React from "react";

export default function YouTubeAudioPlayer() {
  const [playing, setPlaying] = React.useState(false);
  const videoId = "SG6aKXt77Gw"; // To The Stars
  const playerRef = React.useRef<any>(null);

  // Inject YouTube IFrame API once
  React.useEffect(() => {
    if ((window as any).YT) return;
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  // Create YT player and control playback
  React.useEffect(() => {
    let player: any;
    function onYouTubeIframeAPIReady() {
      player = new (window as any).YT.Player('yt-audio-player', {
        videoId,
        events: {
          onReady: () => {
            playerRef.current = player;
            if (playing) player.playVideo();
          },
        },
        playerVars: {
          autoplay: 0,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          loop: 1,
          playlist: videoId,
        },
      });
      (window as any).ytAudioPlayer = player;
    }
    if ((window as any).YT && (window as any).YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }
    return () => {
      if (player && player.destroy) player.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  // Play/pause logic
  const handleToggle = () => {
    const player = (window as any).ytAudioPlayer;
    if (!player) return;
    if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setPlaying(!playing);
  };

  return (
    <div style={{ position: 'fixed', bottom: 32, left: 0, width: '100vw', display: 'flex', justifyContent: 'center', zIndex: 9999, pointerEvents: 'none' }}>
      {/* Hidden YouTube iframe for audio */}
      <div style={{ width: 0, height: 0, overflow: 'hidden', position: 'absolute' }}>
        <iframe
          id="yt-audio-player"
          title="To The Stars Audio"
          width="0"
          height="0"
          style={{ display: 'none' }}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=0&loop=1&playlist=${videoId}`}
          frameBorder="0"
          allow="autoplay"
        />
      </div>
      {/* Custom play/pause button styled like image */}
      <button
        onClick={handleToggle}
        style={{
          background: 'rgba(0,0,0,0.14)',
          border: '1.5px solid #7c8b99',
          color: '#b7c8d6',
          fontFamily: 'monospace',
          fontSize: 22,
          letterSpacing: 2,
          borderRadius: 12,
          padding: '12px 38px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          boxShadow: '0 2px 16px 0 rgba(0,0,0,0.15)',
          pointerEvents: 'auto',
          userSelect: 'none',
          outline: 'none',
          margin: 0,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 600, opacity: 0.7 }}>{'<<'}</span>
        <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: 600, fontSize: 18, letterSpacing: 2, opacity: 0.93 }}>
          TO THE STARS
        </span>
        <span style={{ fontSize: 22, fontWeight: 600, opacity: 0.7 }}>{'>>'}</span>
        <span style={{ marginLeft: 18, fontSize: 18, opacity: 0.7 }}>{playing ? '⏸' : '▶️'}</span>
      </button>
    </div>
  );
}
