import { problems } from "@/mockProblems/problems";
import Link from "next/link";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  return (
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
                />
              ) : (
                <p className="text-gray-400">Coming Soon</p>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ProblemsTable;
