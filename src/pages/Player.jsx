import React, { useEffect, useRef, useState } from "react";
import useVideo from "../hooks/useVideo";
import {
    ArrowBigLeft,
    Expand,
    FastForward,
    Pause,
    Play,
    Rewind,
    Volume2,
    VolumeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Player() {
    const { videoURL, handleVideoRemove } = useVideo();
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    function togglePlayPause() {
        if (!videoRef.current) return;

        if (isVideoPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    }

    function formatTime(time) {
        if (!time || isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }


    function handleRewind() {
        if (!videoRef.current) return;
        videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
    }

    function handleForward() {
        if (!videoRef.current) return;
        videoRef.current.currentTime = Math.min(
            videoRef.current.currentTime + 5,
            videoRef.current.duration
        );
    }

    function handleMute() {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    }

    function handleFullscreen() {
        if (!videoRef.current) return;

        if (!document.fullscreenElement) {
            // Enter fullscreen
            videoRef.current.requestFullscreen?.();
        } else {
            // Exit fullscreen
            document.exitFullscreen?.();
        }
    }

    function handleSeek(e) {
        if (!videoRef.current) return;
        const value = Number(e.target.value);
        videoRef.current.currentTime = (value / 100) * duration;
        setProgress(value);
    }

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.target.tagName === "INPUT") return; // don’t trigger when typing in inputs

            switch (e.key.toLowerCase()) {
                case " ": // Spacebar
                    e.preventDefault(); // avoid scrolling
                    togglePlayPause();
                    break;

                case "f":
                    handleFullscreen();
                    break;

                case "m":
                    handleMute();
                    break;

                case "arrowleft": // rewind 5s
                    handleRewind();
                    break;

                case "arrowright": // forward 5s
                    handleForward();
                    break;

                case "arrowup": // volume up
                    if (videoRef.current) {
                        videoRef.current.volume = Math.min(videoRef.current.volume + 0.1, 1);
                    }
                    break;

                case "arrowdown": // volume down
                    if (videoRef.current) {
                        videoRef.current.volume = Math.max(videoRef.current.volume - 0.1, 0);
                    }
                    break;

                default:
                    break;
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [togglePlayPause, handleFullscreen, handleMute, handleRewind, handleForward]);

    useEffect(() => {
        if (!videoURL) {
            navigate("/");
            return;
        }

        if (videoRef.current) {
            setIsVideoPlaying(!videoRef.current.paused);

            videoRef.current.addEventListener("ended", () => {
                setIsVideoPlaying(false);
            });
        }
    }, [videoURL, navigate]);

    useEffect(() => {
        if (!videoRef.current) return;

        const video = videoRef.current;

        function handlePlay() {
            setIsVideoPlaying(true);
        }

        function handlePause() {
            setIsVideoPlaying(false);
        }

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("ended", handlePause);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("ended", handlePause);
        };
    }, []);


    useEffect(() => {
        if (!videoRef.current) return;

        const video = videoRef.current;

        function updateProgress() {
            setCurrentTime(video.currentTime);
            setProgress((video.currentTime / video.duration) * 100);
        }

        function setVideoDuration() {
            setDuration(video.duration);
        }

        video.addEventListener("timeupdate", updateProgress);
        video.addEventListener("loadedmetadata", setVideoDuration);

        return () => {
            video.removeEventListener("timeupdate", updateProgress);
            video.removeEventListener("loadedmetadata", setVideoDuration);
        };
    }, [videoURL]);

    return (
        <div className="space-y-5 px-5">
            <button
                onClick={handleVideoRemove}
                className="bg-orange-300 text-[#101010] px-4 py-2 rounded-md font-lilita flex flex-col gap-0 items-center cursor-pointer"
            >
                <ArrowBigLeft size={18} strokeWidth={2.5} />
            </button>

            <video
                className="w-full aspect-video bg-black rounded-md"
                onClick={togglePlayPause}
                ref={videoRef}
                src={videoURL}
                controls={false} 
                autoPlay
            />

            <div className="flex items-center gap-3 w-full">
                <span className="text-xs font-mono text-nowrap">
                    {formatTime(currentTime)}
                </span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full cursor-pointer accent-orange-400"
                />
                <span className="text-xs font-mono text-nowrap">
                    {formatTime(duration)}
                </span>
            </div>


            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleRewind}
                        className="bg-orange-300 text-[#101010] px-6 py-2 rounded-md font-lilita flex gap-3 items-center cursor-pointer"
                    >
                        <Rewind size={16} strokeWidth={2.5} />
                    </button>

                    <button
                        onClick={togglePlayPause}
                        className="bg-orange-300 text-[#101010] px-6 py-2 rounded-md font-lilita flex gap-3 items-center cursor-pointer"
                    >
                        {isVideoPlaying ? (
                            <Pause size={16} strokeWidth={2.5} />
                        ) : (
                            <Play size={16} strokeWidth={2.5} />
                        )}
                    </button>

                    <button
                        onClick={handleForward}
                        className="bg-orange-300 text-[#101010] px-6 py-2 rounded-md font-lilita flex gap-3 items-center cursor-pointer"
                    >
                        <FastForward size={16} strokeWidth={2.5} />
                    </button>

                    <button
                        onClick={handleMute}
                        className="bg-orange-300 text-[#101010] px-6 py-2 rounded-md font-lilita flex gap-3 items-center cursor-pointer"
                    >
                        {isMuted ? (
                            <VolumeOff size={16} strokeWidth={2.5} />
                        ) : (
                            <Volume2 size={16} strokeWidth={2.5} />
                        )}
                    </button>
                </div>

                <div>
                    <button
                        onClick={handleFullscreen}
                        className="bg-orange-300 text-[#101010] px-6 py-2 rounded-md font-lilita flex gap-3 items-center cursor-pointer"
                    >
                        <Expand size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
