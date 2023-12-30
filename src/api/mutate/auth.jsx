import { requestData } from "./../ClientFunction";

import { useMutation } from "@tanstack/react-query";

export function useAuthRegister(data) {
  const url = `/auth/register`;
  const response = useMutation({
    mutationFn: () => requestData("post", url, data),
  });
  return response;
}
