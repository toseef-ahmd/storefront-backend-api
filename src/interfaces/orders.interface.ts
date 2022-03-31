export interface Order {
  //ID is optional and ReadOnly as we don't need to send ID in Request Object.
  //But we would wantto have it in Response.
  readonly id?: number
  user_id: number
  status: string
}
