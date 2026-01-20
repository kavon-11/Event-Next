import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

import connectDB from "@/lib/mongodb";
import Event from '@/database/event.model';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json({ message: 'Invalid JSON data format' }, { status: 400 })
    }

    const file = formData.get('image') as File;

    if (!file) return NextResponse.json({ message: 'Image file is required' }, { status: 400 })

    let tags, agenda;

    try {
      tags = JSON.parse(formData.get('tags') as string || '[]');
      agenda = JSON.parse(formData.get('agenda') as string || '[]');
    } catch (e) {
      return NextResponse.json({
        message: 'Invalid JSON format',
        error: 'Tags and agenda must be valid JSON arrays'
      }, { status: 400 });
    }

    // Validate required fields
    const requiredFields = ['title', 'description', 'overview', 'venue', 'location', 'date', 'time', 'mode', 'audience', 'organizer'];
    const missingFields = requiredFields.filter(field => !event[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({
        message: 'Validation failed',
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Normalize and validate mode
    let mode = '';
    if (event.mode && typeof event.mode === 'string') {
      const modeValue = event.mode.toLowerCase().trim();

      if (modeValue.includes('hybrid')) {
        mode = 'hybrid';
      } else if (modeValue.includes('online')) {
        mode = 'online';
      } else if (modeValue.includes('offline') || modeValue.includes('in-person')) {
        mode = 'offline';
      } else if (['online', 'offline', 'hybrid'].includes(modeValue)) {
        mode = modeValue;
      }
    }

    if (!mode || !['online', 'offline', 'hybrid'].includes(mode)) {
      return NextResponse.json({
        message: 'Validation failed',
        error: `Invalid mode: "${event.mode}". Must be one of: online, offline, hybrid`
      }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (error, results) => {
        if (error) return reject(error);

        resolve(results);
      }).end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create({
      ...event,
      mode: mode,
      tags: tags,
      agenda: agenda,
    });

    return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
  } catch (e) {
    console.error('Event creation error:', e);

    let errorMessage = 'Unknown error occurred';

    // Handle specific MongoDB errors
    if (e && typeof e === 'object' && 'code' in e) {
      if (e.code === 11000) {
        return NextResponse.json({
          message: 'Event Creation Failed',
          error: 'An event with similar details already exists'
        }, { status: 409 });
      }
    }

    // Handle validation errors
    if (e && typeof e === 'object' && 'name' in e && e.name === 'ValidationError') {
      errorMessage = e.message || 'Validation failed';
    } else if (e instanceof Error) {
      errorMessage = e.message;
    } else if (typeof e === 'string') {
      errorMessage = e;
    } else if (e && typeof e === 'object') {
      // Try to extract meaningful error information
      errorMessage = JSON.stringify(e, null, 2);
    }

    return NextResponse.json({
      message: 'Event Creation Failed',
      error: errorMessage
    }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: 'Event fetching failed', error: e }, { status: 500 });
  }
}