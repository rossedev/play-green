import { useUser } from "@/firebase/auth/user";
import { BarContainer } from "@/styles/Bar.styled";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaClock } from "react-icons/fa";
import { RiHomeFill } from "react-icons/ri";
import { RxExit } from "react-icons/rx";

export const Bar = () => {
  const pathname = usePathname();
  const { handleSignOut } = useUser();

  const samePath = (path: string): string => {
    return pathname === path ? "current" : "";
  };

  return (
    <BarContainer>
      <Link
        href="/dashboard"
        className={`container-icon ${samePath("/dashboard")}`}
      >
        <RiHomeFill />
      </Link>
      <Link
        href="/history"
        className={`container-icon ${samePath("/history")}`}
      >
        <FaClock />
      </Link>
      <div className={`container-icon ${samePath("/aux")}`}>
        <RxExit onClick={handleSignOut} />
      </div>
    </BarContainer>
  );
};
