import { routes } from "@/app/navigation/routes";
import { Link } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

export default function ProfileAvatar() {
  const { profileData } = useProfile();

  return (
    profileData && (
      <Link
        to={routes.profile}
        className="dark:text-white-100 text-black-100 hover:text-tiffany-600 hover:dark:text-tiffany-100 flex items-center gap-2 rounded-xl px-2 py-1 transition duration-300"
        title={profileData.full_name}
      >
        <img
          src={profileData.image}
          alt={profileData.full_name}
          className="size-8 rounded-full object-cover"
        />
        <span className="hidden text-sm font-medium sm:block">
          {profileData.full_name}
        </span>
      </Link>
    )
  );
}
