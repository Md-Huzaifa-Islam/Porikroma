import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  authService,
  userService,
  User,
  LoginRequest,
  RegisterRequest,
} from "../services/authService";

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "currentUser"] as const,
};

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// Auth hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => {
      const user = authService.getCurrentUser();
      return Promise.resolve(user);
    },
    staleTime: Infinity, // This data rarely changes
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (user) => {
      // Update the current user cache
      queryClient.setQueryData(authKeys.currentUser(), user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (user) => {
      // Update the current user cache
      queryClient.setQueryData(authKeys.currentUser(), user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      authService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all queries when logging out
      queryClient.clear();
      // Set current user to null
      queryClient.setQueryData(authKeys.currentUser(), null);
    },
  });
};

// User management hooks
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: userService.getAllUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      userService.updateUser(id, data),
    onSuccess: (updatedUser, { id }) => {
      // Update the specific user cache
      queryClient.setQueryData(userKeys.detail(id), updatedUser);
      // Invalidate the users list to refresh it
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });

      // If updating current user, update that cache too
      const currentUser = queryClient.getQueryData(
        authKeys.currentUser()
      ) as User | null;
      if (currentUser && currentUser.userId === id) {
        queryClient.setQueryData(authKeys.currentUser(), updatedUser);
        // Also update localStorage
        authService.setCurrentUser(updatedUser);
      }
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
