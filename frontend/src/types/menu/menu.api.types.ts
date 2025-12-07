import { ApiResponse } from "../api.types";
import { Menu } from "./menu.types";

export type GetMenuResponse = { menu: Menu[] } & ApiResponse;
