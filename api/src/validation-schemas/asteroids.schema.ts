import Joi from 'joi';

export interface AsteroidQuery {
  startDate?: string;
  endDate?: string;
  minHazardSize?: number;
}

export const asteroidSchemas = {
  getAsteroidData: Joi.object<AsteroidQuery>({
    startDate: Joi.date().iso().optional(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).optional()
  }),

  getHazardousAsteroids: Joi.object<AsteroidQuery>({
    startDate: Joi.date().iso().optional(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).optional(),
    minHazardSize: Joi.number().min(0).optional()
  })
};
