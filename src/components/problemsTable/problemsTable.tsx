import { problems } from "@/mockProblems/problems";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import YouTube from "react-youtube";
import { IoClose } from "react-icons/io5";

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  //state to open youtube player
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });

  // Function to close the modal and reset videoId
  // This function is called when the user clicks outside the modal or presses Escape
  const closeModel = () => {
    setYoutubePlayer((prev) => ({ ...prev, isOpen: false, videoId: "" }));
  };

  // Listens for Escape key press to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModel();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []); // Empty dependency array ensures effect runs only once

  return (
    <>
      <tbody className="text-body">
        {problems.map((problem, idx) => {
          const difficulyColor =
            problem.difficulty === "Easy"
              ? "text-dark-green-s"
              : problem.difficulty === "Medium"
              ? "text-dark-yellow"
              : "text-dark-pink";

          return (
            <tr
              className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
              key={problem.id}
            >
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                <BsCheckCircle fontSize={"18"} width="18" />
              </th>
              <td className="px-6 py-4">
                <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`/problems/${problem.id}`}
                >
                  {problem.title}
                </Link>
              </td>
              <td className={`px-6 py-4 ${difficulyColor}`}>
                {problem.difficulty}
              </td>
              <td className={"px-6 py-4"}>{problem.category}</td>
              <td className={"px-6 py-4"}>
                {problem.videoId ? (
                  <AiFillYoutube
                    fontSize={"18"}
                    className="hover:text-red-600 cursor-pointer"
                    //onClick sets the youtube player to open
                    //and sets the videoId to the problem's videoId
                    onClick={() => {
                      setYoutubePlayer({
                        isOpen: true,
                        videoId: problem.videoId as string,
                      });
                    }}
                  />
                ) : (
                  <p className="text-gray-400">Coming Soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {/* Youtube player modal */}
      {youtubePlayer.isOpen && (
        <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div
            className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
            onClick={closeModel} // Clicking the backdrop triggers modal close
          ></div>
          <div className="w-full z-50 h-full px-6 relative max-w-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <IoClose
                  fontSize={"35"}
                  className="cursor-pointer absolute -top-16 right-0"
                  onClick={closeModel} // Clicking the close button triggers modal close
                />
                <YouTube
                  videoId={youtubePlayer.videoId} //dynamic videoId data coming from state
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  );
};

export default ProblemsTable;
