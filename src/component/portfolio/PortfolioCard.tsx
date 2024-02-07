import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface PortofolioCardsProps {
  repository: GitHubRepository;
}

const PortfolioCard: React.FC<PortofolioCardsProps> = ({ repository }) => {
  return (
    <div className="bg-darkBlue text-cyan flex justify-between items-start w-[350px] aspect-[4/3] p-6 rounded-3xl">
      <div className="flex flex-col justify-between w-fit h-full gap-3">
        <h1 className="text-2xl break-all">{repository.name}</h1>
        <p className="text-sm">{repository.description}</p>
        <Link
          href={repository.html_url}
          className="border border-cyan rounded-md px-5 py-1 w-fit"
        >
          Get More
        </Link>
      </div>
      <FontAwesomeIcon
        icon={faGithub}
        size="2x"
        width={40}
        className="flex items-start text-white"
      />
    </div>
  );
};

export default PortfolioCard;
