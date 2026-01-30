export type Plan = 'Basic' | 'Standard' | 'Premium';
export type Status = 'Active' | 'At-Risk' | 'Churned';
export type Genre = 'Action' | 'Drama' | 'Comedy' | 'Sci-Fi' | 'Documentary';

export interface Subscriber {
    id: string;
    name: string;
    email: string;
    plan: Plan;
    status: Status;
    ltv: number;
    joinDate: string;
    lastActive: string;
    churnProbability: number;
    riskScore: number;
    favoriteGenre: Genre;
    bufferingEvents: number;
    watchTimeHours: number;
    tags: string[];
}

export interface MonthlyStats {
    month: string;
    churned: number;
    predicted: number;
    lowerBound: number;
    upperBound: number;
}

const NAMES = [
    "Emma Thompson", "Liam Wilson", "Olivia Davis", "Noah Martinez", "Ava Robinson",
    "Elijah Clark", "Sophia Rodriguez", "James Lewis", "Isabella Lee", "Benjamin Walker",
    "Mia Hall", "Lucas Allen", "Charlotte Young", "Henry King", "Amelia Wright",
    "Alexander Scott", "Harper Green", "Michael Baker", "Evelyn Adams", "Daniel Nelson",
    "William Garcia", "Emily Martinez", "Mason Lee", "Abigail Harris", "Ethan Clark",
    "Madison Lewis", "Jacob Walker", "Elizabeth Hall", "Logan Young", "Sofia Allen",
    "Jackson King", "Avery Wright", "Sebastian Rodriguez", "Ella Thompson", "Aiden Davis",
    "Scarlett Wilson", "Matthew Robinson", "Grace Martinez", "Samuel Nelson", "Chloe Baker",
    "David Scott", "Victoria Green", "Joseph Adams", "Aria Lopez", "Carter Gonzalez",
    "Zoey Hill", "Wyatt Moore", "Penelope Campbell", "John Taylor", "Lily Anderson"
];

const GENRES: Genre[] = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Documentary'];
const PLANS: Plan[] = ['Basic', 'Standard', 'Premium'];

// Generate subscribers with consistent stats
// For dashboard KPIs: 342 at-risk out of ~4500 total = ~7.6% churn rate, 92.4% retention
export const generateSubscribers = (count: number = 150): Subscriber[] => {
    const targetAtRiskRate = 0.076; // 7.6% to match "342 at-risk" metric

    return Array.from({ length: count }, (_, i) => {
        // Distribute risk to match dashboard stats
        const random = Math.random();
        const isAtRisk = random < targetAtRiskRate;
        const isCritical = isAtRisk && random < 0.03; // 3% critically at-risk

        const plan = PLANS[Math.floor(Math.random() * PLANS.length)];
        const genre = GENRES[Math.floor(Math.random() * GENRES.length)];

        // Realistic watch patterns
        let watchTimeHours: number;
        let bufferingEvents: number;
        let churnProb: number;

        if (isCritical) {
            // Critical risk: very low engagement, many buffering issues
            watchTimeHours = Math.floor(Math.random() * 10) + 1;
            bufferingEvents = Math.floor(Math.random() * 20) + 10;
            churnProb = 0.85 + (Math.random() * 0.15);
        } else if (isAtRisk) {
            // At-risk: declining engagement
            watchTimeHours = Math.floor(Math.random() * 30) + 10;
            bufferingEvents = Math.floor(Math.random() * 10) + 3;
            churnProb = 0.65 + (Math.random() * 0.2);
        } else {
            // Healthy subscribers
            watchTimeHours = Math.floor(Math.random() * 100) + 30;
            bufferingEvents = Math.floor(Math.random() * 3);
            churnProb = Math.random() * 0.35;
        }

        // Plan-based LTV calculation
        const monthlyValue = plan === 'Premium' ? 17.99 : plan === 'Standard' ? 13.99 : 8.99;
        const avgLifetimeMonths = isAtRisk ? 6 : 18;
        const ltv = Math.floor(monthlyValue * avgLifetimeMonths);

        // Realistic dates
        const joinDaysAgo = Math.floor(Math.random() * 730) + 30; // 30 days to 2 years
        const lastActiveDaysAgo = isAtRisk
            ? Math.floor(Math.random() * 14) + 7 // 7-21 days ago
            : Math.floor(Math.random() * 3); // 0-3 days ago

        const joinDate = new Date(Date.now() - joinDaysAgo * 86400000).toISOString().split('T')[0];
        const lastActive = new Date(Date.now() - lastActiveDaysAgo * 86400000).toISOString().split('T')[0];

        // Tags based on behavior
        const tags: string[] = [];
        tags.push(`${genre} Fan`);
        if (isCritical) tags.push('Critical Risk', 'Immediate Action');
        else if (isAtRisk) tags.push('At Risk', 'Monitor');
        else tags.push('Loyal');
        if (plan === 'Premium') tags.push('Premium');
        if (watchTimeHours > 80) tags.push('Power User');

        return {
            id: `SUB-${1000 + i}`,
            name: NAMES[i % NAMES.length] + (i >= NAMES.length ? ` ${Math.floor(i / NAMES.length)}` : ''),
            email: `${NAMES[i % NAMES.length].toLowerCase().replace(' ', '.')}${i >= NAMES.length ? i : ''}@example.com`,
            plan,
            status: isCritical ? 'At-Risk' : isAtRisk ? 'At-Risk' : 'Active',
            ltv,
            joinDate,
            lastActive,
            churnProbability: parseFloat(churnProb.toFixed(2)),
            riskScore: Math.floor(churnProb * 100),
            favoriteGenre: genre,
            bufferingEvents,
            watchTimeHours,
            tags
        };
    });
};

export interface RiskAlert {
    id: string;
    subscriberId: string;
    subscriberName: string;
    type: 'Critical' | 'Warning' | 'Info';
    message: string;
    timestamp: string;
}

export const generateRiskAlerts = (count: number = 15): RiskAlert[] => {
    const alertTypes: ('Critical' | 'Warning' | 'Info')[] = ['Critical', 'Warning', 'Info'];
    const messages = [
        "High buffering detected (>15 events)",
        "Sudden drop in watch time (-50%)",
        "Subscription payment failed",
        "User logged in from new device",
        "Plan downgrade requested",
        "No activity for 14 days",
        "Customer service complaint",
        "Viewing from competitor's market",
        "Free trial ending soon",
        "Multiple login failures"
    ];

    return Array.from({ length: count }, (_, i) => {
        const weightedType = i < 3 ? 'Critical' : i < 8 ? 'Warning' : 'Info';
        return {
            id: `ALERT-${1000 + i}`,
            subscriberId: `SUB-${1000 + i}`,
            subscriberName: NAMES[i % NAMES.length],
            type: weightedType,
            message: messages[Math.floor(Math.random() * messages.length)],
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString()
        };
    });
};

export const generateMonthlyStats = (): MonthlyStats[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, idx) => {
        // Show improving trend over time
        const baseChurn = 45 - (idx * 3);
        const variance = Math.floor(Math.random() * 5) - 2;
        const churned = baseChurn + variance;

        return {
            month,
            churned,
            predicted: churned + Math.floor(Math.random() * 6) - 3,
            lowerBound: churned - 4,
            upperBound: churned + 8
        };
    });
};

// Export a singleton instance for consistent data across components
let cachedSubscribers: Subscriber[] | null = null;

export const getSubscribers = (): Subscriber[] => {
    if (!cachedSubscribers) {
        cachedSubscribers = generateSubscribers(150);
    }
    return cachedSubscribers;
};

export const resetSubscribers = () => {
    cachedSubscribers = null;
};

