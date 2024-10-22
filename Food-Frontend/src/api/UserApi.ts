import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";
import { User } from "src/types";
import { useCallback } from "react";
import { makeApiRequest } from "./ApiRequest";

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

type updateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useFetchCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const fetchUserData = useCallback(async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    return await makeApiRequest<User>("/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }, [getAccessTokenSilently]);

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery<User, Error>("fetchUserData", fetchUserData, {
    onError: () => {
      toast.error(
        "Unable to load your profile at this moment. Please try again later."
      );
    },
  });

  if (error) {
    toast.error("Something went wrong. Please try again.");
  }

  return {
    currentUser,
    isLoading,
  };
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await makeApiRequest<void>("/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: user,
    });
    return response;
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateUserRequest = useCallback(
    async (formData: updateUserRequest): Promise<void> => {
      const accessToken = await getAccessTokenSilently();

      await makeApiRequest<void>("/users", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: formData,
      });
    },
    [getAccessTokenSilently]
  );

  const { mutateAsync: updateUser, isLoading } = useMutation(
    updateUserRequest,
    {
      onSuccess: () => {
        toast.success("User profile updated!");
        queryClient.invalidateQueries("fetchUserData");
      },
      onError: () => {
        toast.error("Failed to update user. Please try again later.");
      },
    }
  );

  return {
    updateUser,
    isLoading,
  };
};
