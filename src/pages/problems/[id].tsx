import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { Problem } from "@/mockProblems/problems";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  );
};

export default ProblemPage;
