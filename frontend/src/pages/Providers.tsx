import AddressProvider from "@/contexts/public/AddressProvider";
import AuthProvider from "@/contexts/public/AuthProvider";
import CategoryFiltersProvider from "@/contexts/public/CategoryFiltersProvider";
import MultiCartProvider from "@/contexts/public/MultiCartProvider";
import RestaurantProvider from "@/contexts/public/RestaurantProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <AddressProvider>
        <MultiCartProvider>
          <CategoryFiltersProvider>
            <RestaurantProvider>{children}</RestaurantProvider>
          </CategoryFiltersProvider>
        </MultiCartProvider>
      </AddressProvider>
    </AuthProvider>
  );
}
