import { OrmService } from "/services/OrmService"
import { MongoConfig } from "../config/mongoconfig";


/**
 * @swagger
 * tags:
 *   name: Films
 *   description: Operations liées aux films
 * /api/movies:
 *   get:
 *     description: Retourne tous les films
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: Films retournés
 */
export default async function handler(req, res) {

    // Récupération des 10 premiers films
    const movies  = await OrmService.connectAndFind(MongoConfig.collections.movies);
    res.json({ status: 200, data: movies });
}
