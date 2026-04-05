import { type RoleType } from "@/domains/auth";
import { redirect } from "@tanstack/react-router";
import { RouterContext } from "../interfaces/router/types";

type Props = {
  whenLoggedIn?: boolean;
  roles?: RoleType[];
};

export const CanAccessRouteHandler =
  ({ whenLoggedIn, roles }: Props) =>
  ({ context }: { context: RouterContext }) => {
    const isLoggedIn = !!context.user;
    const hasRole = roles
      ? context.user
        ? roles.includes(context.user.role)
        : false
      : true;

    if (whenLoggedIn !== isLoggedIn && hasRole) {
      throw redirect({
        to: "/"
      });
    }
  };
