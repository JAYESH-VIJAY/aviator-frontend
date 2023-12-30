import { requestData } from "./../ClientFunction";
import {toast} from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAuthRegister() {
  const url = `/auth/register`;
  const response = useMutation({
    mutationFn: (data) => 
       requestData("post", url, data)
    ,
    onError: () => {
      toast.error("Something Went Wrong!...");
    },
  });

  return response;
}

export function useAuthLogin(data) {
  const url = `/auth/login`;
  const response = useMutation({
    mutationFn: () => requestData("post", url, data),
  });
  return response;
}
