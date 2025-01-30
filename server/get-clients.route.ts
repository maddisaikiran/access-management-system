import {Request, Response} from 'express';
import {CLIENTS} from "./db-data";

export function getAllClients(req: Request, res: Response) {

  res.status(200).json({payload: CLIENTS});

}