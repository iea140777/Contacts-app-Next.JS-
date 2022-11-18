import { HYDRATE } from "next-redux-wrapper";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Contact, ContactsList, UserData } from "../utils/types";

type GetUserRequestParams = Pick<UserData, "email" | "password">;

const USER_TAGS = {
  UserData: "UserData",
  Contacts: "Contacts",
};

const userApi = createApi({
  reducerPath: "userData",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000` }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: Object.values(USER_TAGS),
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserData, GetUserRequestParams>({
      query: ({ email, password }) => ({
        url: "/api/login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: [USER_TAGS.Contacts],
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/api/login",
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: [USER_TAGS.Contacts],
    }),
    getUserContacts: builder.query<ContactsList, string>({
      query: (searchString) => ({
        url: `api/contacts?q=${searchString}`,
      }),
      providesTags: [USER_TAGS.Contacts],
    }),
    addUserContact: builder.mutation<Contact, Contact>({
      query: (contact) => ({
        url: "/api/contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: [USER_TAGS.Contacts],
    }),
    updateUserContact: builder.mutation<Contact, Contact>({
      query: (contact) => ({
        url: "/api/contacts/",
        method: "PUT",
        body: contact,
      }),
      invalidatesTags: [USER_TAGS.Contacts],
    }),
    deleteUserContact: builder.mutation<void, number>({
      query: (contactId) => ({
        url: "/api/contacts",
        method: "DELETE",
        body: contactId,
      }),
      invalidatesTags: [USER_TAGS.Contacts],
    }),
  }),
});

const {
  useLogoutUserMutation,
  useLoginUserMutation,
  useLazyGetUserContactsQuery,
  useGetUserContactsQuery,
  useAddUserContactMutation,
  useUpdateUserContactMutation,
  useDeleteUserContactMutation,
} = userApi;

export {
  userApi,
  useLogoutUserMutation,
  useLoginUserMutation,
  useLazyGetUserContactsQuery,
  useAddUserContactMutation,
  useDeleteUserContactMutation,
  useGetUserContactsQuery,
  useUpdateUserContactMutation,
};
