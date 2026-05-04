import { useEffect, useId, useRef } from "react";
import cloudinary, { type VideoPlayer } from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";

const CLOUDINARY_CLOUD_NAME = "dyoeaw8ik";

type CloudinaryVideoPlayerProps = {
  source: string;
  poster?: string;
  title: string;
  autoPlay?: boolean;
  className?: string;
};

export function CloudinaryVideoPlayer({
  source,
  poster,
  title,
  autoPlay = false,
  className = "",
}: CloudinaryVideoPlayerProps) {
  const reactId = useId();
  const playerId = `cld-video-${reactId.replace(/:/g, "")}`;
  const playerRef = useRef<VideoPlayer | null>(null);
  const disposeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (disposeTimerRef.current !== null) {
      window.clearTimeout(disposeTimerRef.current);
      disposeTimerRef.current = null;
    }

    if (!playerRef.current) {
      playerRef.current = cloudinary.videoPlayer(playerId, {
        cloudName: CLOUDINARY_CLOUD_NAME,
        autoplay: autoPlay,
        controls: true,
        fluid: true,
        muted: autoPlay,
        sourceTypes: ["auto"],
      });
    }

    playerRef.current.source(source, {
      sourceTypes: ["auto"],
      ...(poster ? { posterOptions: { publicId: poster } } : {}),
    });

    if (autoPlay) {
      playerRef.current.mute();
      playerRef.current.play();
    }
  }, [autoPlay, playerId, poster, source]);

  useEffect(() => {
    return () => {
      disposeTimerRef.current = window.setTimeout(() => {
        playerRef.current?.dispose();
        playerRef.current = null;
      }, 0);
    };
  }, []);

  return (
    <div className={`cld-player-shell ${className}`}>
      <video
        id={playerId}
        className="cld-video-player cld-fluid"
        autoPlay={autoPlay}
        controls
        muted={autoPlay}
        playsInline
        poster={poster}
        aria-label={title}
      />
    </div>
  );
}
