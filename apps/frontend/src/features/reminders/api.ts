import { baseApi } from '../../services/baseApi'
import type { UserReminder } from './types'

export const remindersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listReminders: builder.query<UserReminder[], void>({
      query: () => '/reminders/me',
      providesTags: (result) =>
        result
          ? [
              ...result.map((r) => ({ type: 'Reminders' as const, id: r.id })),
              { type: 'Reminders', id: 'LIST' },
            ]
          : [{ type: 'Reminders', id: 'LIST' }],
    }),
    createReminder: builder.mutation<
      UserReminder,
      { scholarshipId: string; reminderAt: string }
    >({
      query: ({ scholarshipId, reminderAt }) => ({
        url: `/reminders/scholarship/${scholarshipId}`,
        method: 'POST',
        body: { reminderAt },
      }),
      invalidatesTags: [{ type: 'Reminders', id: 'LIST' }],
    }),
    updateReminder: builder.mutation<
      UserReminder,
      { id: string; reminderAt: string }
    >({
      query: ({ id, reminderAt }) => ({
        url: `/reminders/${id}`,
        method: 'PATCH',
        body: { reminderAt },
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Reminders', id },
        { type: 'Reminders', id: 'LIST' },
      ],
    }),
    deleteReminder: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/reminders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Reminders', id },
        { type: 'Reminders', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useListRemindersQuery,
  useCreateReminderMutation,
  useUpdateReminderMutation,
  useDeleteReminderMutation,
} = remindersApi
