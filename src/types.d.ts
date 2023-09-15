declare module 'mic-recorder-to-mp3'

type RESPONSE = {
	id: string;
	phone_number: string;
	is_valid: boolean;
	country_calling_code: string;
	line_type: string;
	carrier: string;
	is_prepaid: boolean;
	is_commercial: boolean;
	belongs_to: {
		id: string;
		name: string;
		firstname: string;
		middlename: string;
		lastname: string;
		alternate_names: string[];
		age_range: string;
		gender: string;
		type: string;
		industry: string;
		link_to_phone_start_date: string;
	};
	current_addresses: {
		id: string;
		location_type: string;
		street_line_1: string;
		street_line_2: null;
		city: string;
		postal_code: string;
		zip4: string;
		state_code: string;
		country_code: string;
		lat_long: {
			latitude: number;
			longitude: number;
			accuracy: string;
		};
		is_active: any;
		delivery_point: string;
		link_to_person_start_date: string;
	}[];
	historical_addresses: {
		id: string;
		location_type: string;
		street_line_1: string;
		street_line_2: string;
		city: string;
		postal_code: string;
		zip4: string;
		state_code: string;
		country_code: string;
		lat_long: {
			latitude: number;
			longitude: number;
			accuracy: string;
		};
		is_active: string;
		delivery_point: string;
		link_to_person_start_date: string;
		link_to_person_end_date: string;
	}[];
	associated_people: {
		id: string;
		name: string;
		firstname: string;
		middlename: string;
		lastname: string;
		relation: string;
	}[];
	alternate_phones: {
		id: string;
		phone_number: string;
		line_type: string;
	}[];
	error: string;
	warnings: any[];
};


interface response {
    message: string;
    success: boolean;
    formatted: string;
    local_format: string;
    valid: boolean;
    fraud_score: number;
    recent_abuse: boolean;
    VOIP: boolean;
    prepaid: boolean;
    risky: boolean;
    active: boolean;
    name: string;
    carrier: string;
    line_type: string;
    country: string;
    region: string;
    city: string;
    timezone: string;
    zip_code: string;
    dialing_code: number;
    do_not_call: boolean;
    leaked: boolean;
    spammer: boolean;
    active_status: string;
    user_activity: string;
    associated_email_addresses: {
        status: string;
        emails: string[];
    };
    request_id: string;
}


type TMinutes = {
	1: number;
	2: number;
	3: number;
	4: number;
	5: number;
	10: number;
	15: number;
	20: number;
	30: number;
	31: number;
	60: number;
	120: number;
	240: number;
};
