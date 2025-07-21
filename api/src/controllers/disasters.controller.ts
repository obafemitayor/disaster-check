import { Request, Response } from 'express';
import { DisasterService } from '../services/disasters.service';
import { validateRequest } from '../utils/validation';
import logger from '../utils/logger';
import { NearbyNaturalDisastersQuery } from '../validation-schemas/disasters.schema';
import { naturalDisasterSchemas } from '../validation-schemas/disasters.schema';

export class DisastersController {
  /**
   * Get natural disasters in or around specific coordinates
   */
  public static async getNearbyNaturalDisasters(req: Request, res: Response): Promise<void> {
    try {
      const validation = validateRequest<NearbyNaturalDisastersQuery>(req.query, naturalDisasterSchemas.getNearbyNaturalDisasters);
      if (validation.error) {
        res.status(400).json({
          success: false,
          error: validation.error
        });
        return;
      }

      const { coordinates } = validation.value as NearbyNaturalDisastersQuery;
      const disasters = await DisasterService.getNearbyNaturalDisasters({ coordinates });
      
      res.json({
        success: true,
        data: {
          disasters
        }
      });
    } catch (error) {
      logger.error('Controller error in getNearbyNaturalDisasters:', error instanceof Error ? error.message : 'Unknown error');
      res.status(500).json({ 
        success: false,
        error: 'Failed to fetch nearby natural disasters' 
      });
    }
  }


}
