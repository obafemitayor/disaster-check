export const mockDisasterEvents = [
  {
    id: "EONET_1234",
    title: "Sample Wildfire",
    description: "A test wildfire event",
    geometry: [
      {
        coordinates: [-122.4194, 37.7749] // San Francisco coordinates
      }
    ],
    categories: [
      {
        id: "wildfires",
        title: "Wildfires"
      }
    ]
  },
  {
    id: "EONET_5678",
    title: "Sample Flood",
    description: "A test flood event",
    geometry: [
      {
        coordinates: [-122.5, 37.8] // Near San Francisco
      }
    ],
    categories: [
      {
        id: "floods",
        title: "Floods"
      }
    ]
  }
];
