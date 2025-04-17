export type Address = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    name: string;
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    island?: string;
    city?: string;
    county: string;
    state: string;
    state_code?: string;
    postcode?: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
};

export type AddressEssentials = {
  address: Address["address"];
  addressString: string;
};
