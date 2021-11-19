export interface StopInformationDataModel {
  stops: [
      {
    stop_id: number,
    latitude: number,
    longitude: number,
    description: string
      }
  ],
  alerts: [],
  departures: [
    {
      actual: boolean,
      trip_id: string,
      stop_id: number,
      departure_text: string,
      departure_time: number,
      description: string,
      gate: string,
      route_id: string,
      route_short_name: string,
      direction_id: number,
      direction_text: string,
      schedule_relationship: string
    }
  ]
}
