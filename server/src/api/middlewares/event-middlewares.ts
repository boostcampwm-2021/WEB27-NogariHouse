import {  Request, Response } from 'express';
import eventsService from '@services/events-service';

export const get10EventItemsMiddleware = async (req:Request,res:Response) => {
    const {count} = req.query;
    const items = await eventsService.get10EvnetItems(Number(count));
    res.json({items})
}