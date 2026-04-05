import { type RoleType } from "@/domains/auth";

export type UserManagementUserDto = {
  id: string;
  email: string;
  picture: string | null;
  firstName?: string;
  lastName?: string;
  authority: RoleType;
  createdAt: Date;
};

export type UserManagementUserDef = {
  picture: string | null;
  id: string;
  email: string;
  firstName?: string;
  role: RoleType;
  lastName?: string;
  createdAt: Date;
};
