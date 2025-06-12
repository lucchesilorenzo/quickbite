import MenuCategoriesListMobile from "../mobile/MenuCategoriesListMobile";
import MenuCategoriesListDesktop from "./MenuCategoriesListDesktop";

export default function MenuCategoriesList() {
  return (
    <>
      <MenuCategoriesListDesktop />
      <MenuCategoriesListMobile />
    </>
  );
}
