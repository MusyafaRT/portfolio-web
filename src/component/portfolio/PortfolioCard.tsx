import { ProjectDetail } from "@/types/api/Project";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface PortofolioCardsProps {
  project: ProjectDetail;
}

const PortfolioCard: React.FC<PortofolioCardsProps> = ({ project }) => {
  console.log(project);
  return (
    <div className="relative bg-darkBlue text-cyan flex justify-between items-start p-6 rounded-3xl">
      <div className="flex flex-col justify-between gap-3">
        <div className="flex justify-between">
          <h1 className="text-2xl break-all">{project.title}</h1>
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            width={40}
            className="z-10 flex items-start text-white"
          />
        </div>
        <div className="relative min-h-[220px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="rounded-xl "
          />
        </div>
        <span className="text-xs opacity-80">{project.type}</span>
        <p className="text-sm">{project.content}</p>
      </div>
    </div>
  );
};

export default PortfolioCard;
