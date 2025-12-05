export interface PlayerInfo {
	ID: string;
	Username: string;
	Nationality: string;
	Level: number;
	Rank: string;
	ProfilePicture: string;
	ExtraInfo: string;
}

export interface EventInfo {
	Title: string; // Clark GT3 Hotlap
	Type: string; // hotlap, online, etc.
	Class: string; // GT3
	State: string; // Ongoing, Finished, etc.
	Picture: string;
	Track: {
		Name: string; // Clark International Speedway
		Layout: string; // East Course
	};
	Laps?: number;
	StartsAt?: number;
	EndsAt?: number;
	HighReward: boolean; // true
}

export interface ReplayInfo {
	Duration: number;
} // TODO
