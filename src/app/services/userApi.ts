import type { User } from "../types"
import { api } from "./api"

export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<
			{ token: string },
			{ username: string; password: string }
		>({
			query: (userData) => ({
				url: "/login",
				method: "POST",
				body: userData,
			}),
		}),
		register: builder.mutation<
			{ email: string; password: string; username: string },
			{ email: string; password: string; username: string }
		>({
			query: (userData) => ({
				url: "/register",
				method: "POST",
				body: userData,
			}),
		}),
		current: builder.query<User, void>({
			query: () => ({
				url: "/current",
				method: "GET",
			}),
		}),
        sendEmail: builder.mutation<
        { status: string },
        { amount: string; term: string; }
        >({
            query: (data) => ({
                url: "/send-email",
                method: "POST",
                body: data
            })
        })
	}),
})

export const {
	useRegisterMutation,
	useLoginMutation,
	useCurrentQuery,
	useLazyCurrentQuery,
    useSendEmailMutation,
} = userApi

export const {
	endpoints: { login, register, current, sendEmail },
} = userApi