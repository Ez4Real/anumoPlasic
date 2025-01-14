export type Body_login_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}


enum ProductCategory {
  CARABINER = "Carabiner",
  BOOK_HOLDER = "Book holder",
  CHOKER = "Choker",
  PLATE = "Plate",
  SOAP_HOLDER = "Soap holder",
}

enum CarabinerTags {
  BUNNY = "bunny",
  HEART = "heart",
  SHURIKEN = "shuriken",
  SPIKELET = "spikelet",
}

type ProductImageCreate = {
  url: string;
  alt_text?: string | null; 
  order: number;   
}

type ProductBase = {
  category: ProductCategory;
  title_en: string;
  title_uk: string;
  material_en: string;
  material_uk: string;
  price_usd: number;
  price_uah: number;
  size: string;
  weight?: string | null;       
  tag?: CarabinerTags | null;      
}

export type ProductCreate = ProductBase & {
  images?: ProductImageCreate[] | null; 
};

export type ProductPublic = ProductBase & {
  id: string
  owner_id: string
  images?: ProductImageCreate[];
}

export type ProductUpdate = ProductBase & {
  category?: ProductCategory | null;
  title_en?: string | null;
  title_uk?: string | null;
  material_en?: string | null;
  material_uk?: string | null;
  size?: string | null;
  price_usd?: number | null;
  price_uah?: number | null;
  images?: ProductImageCreate[] | null;
}

export type ProductsPublic = {
  data: Array<ProductPublic>
  count: number
}


export type SubscriberPublic = {
  email: string
  is_active?: boolean
  mailing_language?: string | null
  id: string
}

export type SubscribersPublic = {
  data: Array<SubscriberPublic>
  count: number
}

export type Message = {
  message: string
}

export type NewPassword = {
  token: string
  new_password: string
}

export type Token = {
  access_token: string
  token_type?: string
}

export type UpdatePassword = {
  current_password: string
  new_password: string
}

export type UserCreate = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password: string
}

export type UserPublic = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  id: string
}

export type UserRegister = {
  email: string
  password: string
  full_name?: string | null
}

export type UserUpdate = {
  email?: string | null
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password?: string | null
}

export type UserUpdateMe = {
  full_name?: string | null
  email?: string | null
}

export type UsersPublic = {
  data: Array<UserPublic>
  count: number
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}
