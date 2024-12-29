interface Location {
  name: string;
  address: string;
  bloodInventoryCapacity: number;
  capacityPerPerson: number;
}

interface City {
  name: string;
  locations: Location[];
}

const cities: City[] = [
  {
    name: "New York",
    locations: [
      {
        name: "NY Blood Center",
        address: "310 E 67th St, New York, NY 10065",
        bloodInventoryCapacity: 500,
        capacityPerPerson: 5,
      },
      {
        name: "Metropolitan Hospital",
        address: "1901 1st Ave, New York, NY 10029",
        bloodInventoryCapacity: 300,
        capacityPerPerson: 3,
      },
      {
        name: "Metropolitan Hospital",
        address: "1901 1st Ave, New York, NY 10029",
        bloodInventoryCapacity: 300,
        capacityPerPerson: 12,
      },
    ],
  },
  {
    name: "Los Angeles",
    locations: [
      {
        name: "LA Blood Donation Center",
        address: "1234 Sunset Blvd, Los Angeles, CA 90026",
        bloodInventoryCapacity: 400,
        capacityPerPerson: 4,
      },
      {
        name: "Cedars-Sinai Medical Center",
        address: "8700 Beverly Blvd, Los Angeles, CA 90048",
        bloodInventoryCapacity: 600,
        capacityPerPerson: 6,
      },
    ],
  },
  {
    name: "Chicago",
    locations: [
      {
        name: "Chicago Blood Bank",
        address: "123 Michigan Ave, Chicago, IL 60601",
        bloodInventoryCapacity: 450,
        capacityPerPerson: 4,
      },
      {
        name: "Northwestern Memorial Hospital",
        address: "251 E Huron St, Chicago, IL 60611",
        bloodInventoryCapacity: 350,
        capacityPerPerson: 3,
      },
      {
        name: "Chicago Blood Bank",
        address: "123 Michigan Ave, Chicago, IL 60601",
        bloodInventoryCapacity: 450,
        capacityPerPerson: 5,
      },
    ],
  },
];

export default cities;
