import { defineStore } from 'pinia';
import {
  getUsers,
  getUser,
  updateUser,
  addUser,
  deleteUser,
} from 'src/api/user-api';
import { IUser, IPagination, IUserRequest } from 'src/types';
import { handleApiError, showSuccess } from 'src/utils/notifications';
import { getUserFullName } from 'src/utils/users';

export const useUserStore = defineStore('api', {
  state: () => ({
    users: [] as Array<IUser>,
    isLoading: false,
  }),
  actions: {
    async fetchUsers(pagination: IPagination) {
      this.isLoading = true;
      try {
        const response = await getUsers(pagination);
        this.users = response.data.map((user) => {
          return {
            id: user.id,
            avatar: user.avatar,
            full_name: getUserFullName(user.first_name, user.last_name),
          };
        });
        return response;
      } catch (error: unknown) {
        handleApiError(error, 'Unexpected error occurred while fetching users');
      } finally {
        this.isLoading = false;
      }
    },
    async fetchUser(id: number, updateStore = true) {
      this.isLoading = true;
      try {
        const response = await getUser(id);
        const user = response.data;
        if (updateStore) {
          this.users = [
            {
              id: user.id,
              avatar: user.avatar,
              full_name: getUserFullName(user.first_name, user.last_name),
            },
          ];
        }
        return user;
      } catch (error: unknown) {
        handleApiError(error, 'Unexpected error occurred while fetching user');
      } finally {
        this.isLoading = false;
      }
    },
    async addUser(user: IUserRequest) {
      try {
        await addUser(user);
        showSuccess('User added!');
      } catch (error: unknown) {
        handleApiError(error, 'Unexpected error occurred while adding user');
      }
    },
    async updateUser(user: IUserRequest) {
      try {
        await updateUser(user);
        showSuccess('User updated!');
      } catch (error: unknown) {
        handleApiError(error, 'Unexpected error occurred while updating user');
      }
    },
    async deleteUser(id: number) {
      try {
        await deleteUser(id);
        showSuccess(`Deleted user with id = ${id}`);
      } catch (error: unknown) {
        handleApiError(error, 'Unexpected error occurred while deleting user');
      }
    },
  },
});
