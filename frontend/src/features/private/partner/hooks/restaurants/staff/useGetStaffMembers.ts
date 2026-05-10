import { GetStaffMembersResponse } from "@partner/types/staff/staff.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetStaffMembersOptions = {
  restaurantId: string;
};

export function useGetStaffMembers({
  restaurantId,
}: UseGetStaffMembersOptions) {
  return useQuery<GetStaffMembersResponse>({
    queryKey: ["partner-staff", restaurantId],
    queryFn: () => fetchData(`/partner/restaurants/${restaurantId}/staff`),
  });
}
