import { environment } from "@/environment";

export const baseURL = environment.production ? environment.apiURL : "/api";
