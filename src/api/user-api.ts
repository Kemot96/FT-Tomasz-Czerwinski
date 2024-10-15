import { api } from 'src/boot/axios';
import { IPagination, IGetUsersResponse, IUserRequest } from 'src/types';

export async function getUsers(
  pagination: IPagination
): Promise<IGetUsersResponse> {
  const { page, rowsPerPage } = pagination;
  try {
    const response = await api.get('/users', {
      params: {
        page,
        per_page: rowsPerPage,
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function getUser(id: number) {
  try {
    const response = await api.get(`/users/${id}`, {});
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function addUser(user: IUserRequest) {
  try {
    const response = await api.post('/users', user, {});
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(user: IUserRequest) {
  try {
    const response = await api.put(`/users/${user.id}`, user, {});
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    const response = await api.delete(`/users/${id}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
