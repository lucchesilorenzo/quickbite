import AddressProvider from "@/contexts/AddressProvider";
import AuthProvider from "@/contexts/AuthProvider";
import CategoryFiltersProvider from "@/contexts/CategoryFiltersProvider";
import MultiCartProvider from "@/contexts/MultiCartProvider";
import RestaurantProvider from "@/contexts/RestaurantProvider";

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
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
