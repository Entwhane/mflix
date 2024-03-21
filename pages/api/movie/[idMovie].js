import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';
import { MongoConfig } from "../../config/mongoconfig";
import { OrmService } from "../../../services/OrmService";

/**
 * @swagger
 * tags:
 *   name: Films
 *   description: Operations liées aux films
 * /api/movie/{idMovie}:
 *   get:
 *     description: Retourne un film par son id
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Film non trouvé
 *   post:
 *     description: Ajoute un nouveau film
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               plot:
 *                 type: string
 *               year:
 *                 type: integer
 *               poster:
 *                 type: string
 *     responses:
 *       201:
 *         description: Film ajouté avec succès
 *       400:
 *         description: Invalid request body
 *   put:
 *     description: Met à jour un film par son id
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: false
 *               plot:
 *                 type: string
 *                 required: false
 *               year:
 *                 type: integer
 *                 required: false
 *               poster:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Film modifié avec succès
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Aucune modification apportée
 *   delete:
 *     description: Supprime un film par son id
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Film supprimé avec succès
 *       400:
 *         description: Identifiant invalide
 *       404:
 *         description: Aucune suppression apportée
 */
export default async function handler(req, res) {
  const { method, query, body } = req
  const { idMovie } = query

  try {
    switch (method) {
      case 'GET':
        if (idMovie) {
          const movie = await OrmService.connectAndFindOne(MongoConfig.collections.movies, idMovie);
          if (movie) {
            res.status(200).json({ status: 200, data: movie });
          } else {
            res.status(404).json({ status: 404, message: 'Film non trouvé' });
          }
        } else {
          res.status(400).json({ status: 400, message: 'Erreur' });
        }
        break;
        
        case 'POST':
          
          const { title, plot, year, poster } = body;
          
          const myMovie = {
            title: title,
            plot: plot,
            poster: poster,
            year: parseInt(year)
          }
          
          const result = await OrmService.connectAndPostOne(MongoConfig.collections.movies, myMovie);
          res.status(201).json({ status: 201, message: 'Film ajouté avec succès', result: result });
          break;
          
          case 'PUT':
            
            if (idMovie) {
              const result = await OrmService.connectAndPutOne(MongoConfig.collections.movies, idMovie, body);
              if (result.modifiedCount > 0) {
                res.status(200).json({ status: 200, message: 'Film modifié avec succès', result: result });
              } else {
                res.status(404).json({ status: 404, message: 'Aucune modification apportée' });
              }
            } else {
              res.status(400).json({ status: 400, message: 'Identifiant invalide' });
            }
            break;
            
            case 'DELETE':
              
              if (idMovie) {
                const result = await OrmService.connectAndDeleteOne(MongoConfig.collections.movies, idMovie);
                if (result.deletedCount > 0) {
                  res.status(200).json({ status: 200, message: 'Film supprimé avec succès', result: result });
          } else {
            res.status(404).json({ status: 404, message: 'Aucune suppression apportée' });
          }
        } else {
          res.status(400).json({ status: 400, message: 'Identifiant invalide' });
        }
        break;

      default:
        res.status(405).json({ message: 'Méthode non autorisé' });
        break;
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
