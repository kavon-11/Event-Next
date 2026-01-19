import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";

export async function POST (req:NextRequest) {
    try {
        await connectDB();
        const event = await req.json();
        
        // Normalize mode field if present
        if (event.mode) {
            const modeValue = event.mode.toLowerCase();
            if (modeValue.includes('hybrid') || modeValue.includes('in-person & online')) {
                event.mode = 'hybrid';
            } else if (modeValue.includes('online') || modeValue.includes('virtual')) {
                event.mode = 'online';
            } else if (modeValue.includes('offline') || modeValue.includes('in-person') || modeValue.includes('physical')) {
                event.mode = 'offline';
            } else if (!['online', 'offline', 'hybrid'].includes(event.mode)) {
                return NextResponse.json({ 
                    message: 'Validation Error', 
                    error: `Invalid mode: '${event.mode}'. Mode must be either 'online', 'offline', or 'hybrid'`
                }, { status: 400 });
            }
        }
        
        const createdEvent =  await Event.create(event);
        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
    }
    catch (error) {
        console.error(error);
        
        // Handle validation errors specifically
        if (error instanceof Error && error.message.includes('validation failed')) {
            return NextResponse.json({ 
                message: 'Validation Error', 
                error: error.message 
            }, { status: 400 });
        }
        
        return NextResponse.json({ message: 'Internal Server Error' , 
            error: error instanceof Error ? error.message : 'Unknown Error'
         }, { status: 500 });
    }
}