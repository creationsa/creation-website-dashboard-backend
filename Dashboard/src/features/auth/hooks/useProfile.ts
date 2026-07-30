import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/getProfile";

export function useProfile() {
  const {
    data: profileData,
    isPending: isProfileLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfile,
  });

  return { profileData, isProfileLoading, error };
}
