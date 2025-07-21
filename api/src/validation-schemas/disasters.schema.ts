import Joi from 'joi';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface NearbyNaturalDisastersQuery {
  coordinates: Coordinates;
}

export const naturalDisasterSchemas = {
  getNearbyNaturalDisasters: Joi.object<NearbyNaturalDisastersQuery>({
    coordinates: Joi.object({
      latitude: Joi.number().required().min(-90).max(90),
      longitude: Joi.number().required().min(-180).max(180)
    }).required()
  })

};
