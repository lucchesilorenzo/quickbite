import { Box } from "@mui/material";
import { useCookies } from "react-cookie";

export default function AreaPage() {
  const [cookie] = useCookies(["address"]);
  console.log(cookie.address.address?.house_number);

  return <Box component="main">AreaPage</Box>;
}
