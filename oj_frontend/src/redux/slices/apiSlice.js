// src/redux/slices/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "ojApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint !== "/login" && endpoint !== "/register") {
        const token = Cookies.get("token"); // Use 'token' as a string instead of a variable

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    addQuestion: builder.mutation({
      query: (quesData) => ({
        url: "/questions/create",
        method: "POST",
        body: quesData,
      }),
    }),
    updateQuestion: builder.mutation({
      query: (quesData) => ({
        url: `/questions/${quesData.quesId}`,
        method: "PUT",
        body: quesData,
      }),
    }),
    deleteQuestion: builder.mutation({
      query: () => ({
        url: `/questions/${quesId}`,
        method: "DELETE",
      }),
    }),
    getQuestion: builder.query({
      query: (quesId) => ({
        url: `/questions/${quesId}`,
      }),
    }),
    getAllQuestion: builder.query({
      query: () => ({
        url: `/questions/all`,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionQuery,
  useGetAllQuestionQuery,
} = apiSlice;