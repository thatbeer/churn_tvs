import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const stmt = db.prepare('SELECT * FROM subscribers');
        const subscribers = stmt.all() as any[];

        // Parse tags back to array and map snake_case to camelCase
        const formattedSubscribers = subscribers.map((sub: any) => ({
            id: sub.id,
            name: sub.name,
            email: sub.email,
            plan: sub.plan,
            status: sub.status,
            ltv: Number(sub.ltv),
            joinDate: sub.join_date,
            lastActive: sub.last_active,
            churnProbability: Number(sub.churn_probability),
            riskScore: Number(sub.risk_score),
            favoriteGenre: sub.favorite_genre,
            bufferingEvents: Number(sub.buffering_events),
            watchTimeHours: Number(sub.watch_time_hours),
            tags: sub.tags ? sub.tags.split(',') : []
        }));

        return NextResponse.json(formattedSubscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
    }
}
