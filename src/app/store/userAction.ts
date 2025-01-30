import { createAction, props } from "@ngrx/store";


export const updateName = createAction('name-edit', props<{name: string}>())
export const updateEmail = createAction('email-edit', props<{email: string}>())

