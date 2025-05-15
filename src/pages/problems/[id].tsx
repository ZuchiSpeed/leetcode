import Topbar from "@/components/Topbar/Topbar";
// import Workspace from "@/components/Workspace/workspace";
import { Problem } from "@/mockProblems/problems";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  return (
    <div>
      <Topbar problemPage />
      {/* <Workspace problem /> */}
    </div>
  );
};

export default ProblemPage;
