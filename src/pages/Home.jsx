import { HardDriveDownload } from "lucide-react";
import useVideo from "../hooks/useVideo";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const { handleVideoUpload } = useVideo()
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-5 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-orange-300 font-lilita uppercase">
                Kasset
            </h1>

            <p className="max-w-2xl text-gray-300 text-lg leading-relaxed">
                Relive the charm of cassettes in a modern way. Upload, play, and enjoy
                your videos with a sleek and simple player made just for you.
            </p>

            <div className="flex flex-col items-center space-y-3">
                <input type="file" accept="video/*,.mkv" id="file" name="file" className="hidden" onChange={handleVideoUpload} />
                <label htmlFor="file" className="bg-orange-300 text-[#101010] px-10 py-4 rounded-xl flex items-center gap-3 font-medium text-lg shadow-lg transition uppercase font-lilita cursor-pointer">
                    <HardDriveDownload size={28} />
                    <p>
                        Insert Kasset
                    </p>
                </label>

                <p className="text-sm text-gray-400 max-w-md">
                    Your video will not be uploaded anywhere — it stays private and safe on your device.
                </p>
            </div>
        </div>
    );
}
