import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SignUp, SignIn, User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user: user as User | undefined,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}

export function useSignUp() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: SignUp) => {
      const response = await apiRequest("/api/auth/signup", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: SignIn) => {
      const response = await apiRequest("/api/auth/signin", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await apiRequest("/api/auth/signout", {}, { method: "POST" });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });
}