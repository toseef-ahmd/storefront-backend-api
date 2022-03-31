export interface Product {
  //ID is optional and ReadOnly as we don't need to send ID in Request Object.
  //But we would wantto have it in Response.
  readonly id?: number
  name: string
  price: number
  category: string
}
