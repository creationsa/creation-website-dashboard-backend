import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import ProfileForm from "../components/profileForm";
import { useProfile } from "../hooks/useProfile";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { profileData, isProfileLoading } = useProfile();

  if (isProfileLoading) return <Spinner size="lg" />;

  if (!profileData) return null;

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title={t("auth.profile")} />

      {/* Avatar + Info */}
      <div className="flex items-center gap-4">
        <img
          src={profileData.image}
          alt={profileData.full_name}
          className="ring-border size-20 rounded-full object-cover ring-2"
        />
        <div>
          <p className="text-lg font-semibold">{profileData.full_name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            {profileData.email}
          </p>
        </div>
      </div>

      {/* Form */}
      <ProfileForm profile={profileData} />
    </div>
  );
}
