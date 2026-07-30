export type UserType = "super_admin" | "admin" | "user";

export type Gender = "male" | "female";

export interface Role {
  id: number;
  name: string;
}

export type Locale = "en" | "ar";

export interface Permission {
  id: number;
  icon: string | null;
  title: string;
  url: string;
  back_route_name: string | null;
}

export interface Country {
  id: number;
  name: string;
  short_name: string;
  phone_code: string;
  phone_number_limit: number;
  flag: string | null;
  is_active: boolean;
}

export interface LoginResponse {
  id: number;
  full_name: string;
  image: string;
  phone_code: string;
  phone: string;
  phone_complete_form: string;
  email: string;
  user_type: UserType;
  gender: Gender;
  is_ban: boolean;
  ban_reason: string;
  role_id: number | null;
  country: Country;
  locale: Locale;
  role: null | Role;
  token: string;
  permission: Permission[];
  created_at: string;
}

export interface ProfileFormProps {
  profile: LoginResponse;
}
