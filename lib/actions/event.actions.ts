'use server';

import Event from '@/database/event.model';
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });

        return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
    } catch {
        return [];
    }
}

export const getSimilarEventsByTags = async (tags: string[], excludeId: string = '') => {
    try {
        await connectDB();
        
        const query: any = { tags: { $in: tags } };
        if (excludeId && excludeId.match(/^[0-9a-fA-F]{24}$/)) { // validation for mongoose objectid
            query._id = { $ne: excludeId };
        } else if (excludeId) {
            // If excludeId is not a valid ObjectId (e.g. 'local-slug'), we simply don't filter by _id 
            // relying on the fact that DB ids are ObjectIds, so they won't match 'local-...' anyway
            // But we still want to filter out the same event if it happened to be in DB? 
            // logic: find events with same tags. 
        }
        
        return await Event.find(query).limit(3).lean();
    } catch (e) {
        console.log(e);
        return [];
    }
}