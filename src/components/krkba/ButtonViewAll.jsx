import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function ButtonViewAll({ tittle }) {
  return (
    <>
      <h3>
        <Link
          to={`/${tittle}`}
          className="font-medium text-[16px] flex items-center gap-3 hover:text-[var(--accent)]"
        >
          View all <HiOutlineArrowNarrowRight />
        </Link>
      </h3>
    </>
  );
}
