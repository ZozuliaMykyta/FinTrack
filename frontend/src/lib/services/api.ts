import { ISignUpRequest, ISignUpResponse } from "@/interfaces/IAuthApi";
import IUser from "@/interfaces/IUser";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FinTrackApi = createApi({
  reducerPath: "FinTrackApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUserStatus: builder.query<
      { user: IUser; isEmailVerified: boolean; userId: string; token: string },
      string
    >({
      query: (id) => `/api/auth/status/${id}`,
    }),
    signUpUser: builder.mutation<ISignUpResponse, ISignUpRequest>({
      query: (credentials) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const { useGetUserStatusQuery, useSignUpUserMutation } = FinTrackApi;
