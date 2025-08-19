import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const VideoContext = createContext({
    videoURL: null,
    handleVideoUpload: () => { },
    handleVideoRemove: () => { }
})

export default function VideoContextProvider({ children }) {

    const [videoURL, setVideoURL] = useState(null)
    const navigate = useNavigate()

    function handleVideoUpload(e) {
        const file = e.target.files[0]
        if (file) {
            setVideoURL(URL.createObjectURL(file))
            navigate('/player')
        }
    }

    function handleVideoRemove() {
        setVideoURL(null)
        navigate('/')
    }

    const values = {
        videoURL,
        handleVideoUpload,
        handleVideoRemove
    }

    return (
        <VideoContext.Provider value={values}>
            {children}
        </VideoContext.Provider>
    )
}