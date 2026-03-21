import IUser from "@/interfaces/IUser";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FinTrackApi = createApi({
  reducerPath: "FinTrackApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser[], void>({
      query: () => "/api/auth/users",
    }),
  }),
});
export const { useGetUserQuery } = FinTrackApi;
