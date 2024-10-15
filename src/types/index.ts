export interface IUser {
  id: number;
  avatar: string;
  full_name: string;
}

export interface IUserRequest {
  avatar: string;
  first_name: string;
  last_name: string;
  id?: number;
}

export interface IPagination {
  page: number;
  rowsPerPage: number;
  totalPages: number;
  rowsNumber?: number;
}

export interface IGetUsersResponse {
  data: {
    avatar: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
  }[];
  page: number;
  per_page: number;
  support: {
    text: string;
    url: string;
  };
  total: number;
  total_pages: number;
}
