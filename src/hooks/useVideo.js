import { useContext } from "react";
import { VideoContext } from "../context/VideoContextProvider";

const useVideo = () => useContext(VideoContext)
export default useVideo;