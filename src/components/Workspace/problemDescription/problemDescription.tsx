import { auth } from "@/firebase/firebase";
import { Problem } from "@/mockProblems/problems";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  AiFillLike,
  AiOutlineLoading3Quarters,
  AiFillDislike,
  AiFillStar,
} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

type ProblemDescriptionProps = {
  problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="bg-dark-layer-1">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={
            "bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem?.title}
              </div>
            </div>

            <div className="flex items-center mt-3">
              <div
                className={`text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}
              >
                Easy
              </div>
              <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                <BsCheck2Circle />
              </div>

              <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 ml-4 text-lg transition-color duration-200 text-dark-gray-6 p-[3px]">
                <AiFillLike />
                <span className="text-xs">120</span>
              </div>
              <div className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6">
                <TiStarOutline />
              </div>
            </div>

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <p className="mt-3">
                Given an array of integers <code>nums</code> and an integer
                <code>target</code>, return
                <em>
                  indices of the two numbers such that they add up to
                </em>{" "}
                <code>target</code>.
              </p>
              <p className="mt-3">
                You may assume that each input would have{" "}
                <strong>exactly one solution</strong>, and you may not use the
                same element twice.
              </p>

              <p className="mt-3">You can return the answer in any order.</p>
            </div>

            {/* Examples */}
            <div className="mt-4">
              <div>
                <p className="font-medium text-white">Example 1:</p>
                <div className="example-card">
                  <pre>
                    <strong className="text-white">Input: </strong>nums =
                    [2,7,11,15], target = 9 <br />
                    <strong>Outputs:</strong> [0,1] <br />
                    <strong>Explanation:</strong> Becouse nums[0] + nums[1] ==
                    9, we return [0, 1],
                  </pre>
                </div>
              </div>

              <div>
                <p className="font-medium text-white">Example 2:</p>
                <div className="example-card">
                  <pre>
                    <strong className="text-white">Input:</strong>
                    nums = [2,7,11,15], target = 9 <br />
                    <strong>Output:</strong> [0,1]
                    <br />
                    <strong>Explanation:</strong> Because nums[0] + nums[1] ==
                    9, we return [0, 1].
                  </pre>
                </div>
              </div>

              <div>
                <p className="font-medium text-white">Example 3:</p>
                <div className="example-card">
                  <pre>
                    <strong className="text-white">Input:</strong>
                    nums = [3, 3], target = 6 <br />
                    <strong>Output:</strong> [0,1]
                    <br />
                    <strong>Explanation:</strong>[0, 1] <br />
                  </pre>
                </div>
              </div>
            </div>

            {/* Constraints */}
            <div className="my-5">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc">
                <li className="mt-2">
                  <code>2 ≤ nums.length ≤ 10</code>
                </li>
                <li className="mt-2">
                  <code>-10 ≤ nums[i] ≤ 10</code>
                </li>
                <li className="mt-2">
                  <code>-10 ≤ target ≤ 10</code>
                </li>
                <li className="mt-2 text-sm">
                  <strong>Only one valid answer exists.</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
