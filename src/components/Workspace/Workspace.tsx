import React from "react";
import Split from "react-split";
import ProblemDescription from "./problemDescription/problemDescription";
import { Problem } from "@/mockProblems/problems";
import Playground from "./Playground/Playground";

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  return (
    <Split className="split">
      <ProblemDescription problem={problem} />
      <Playground />
    </Split>
  );
};

export default Workspace;
