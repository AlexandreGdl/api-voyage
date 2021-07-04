export declare const lookUpDonors: ({
    $lookup: {
        from: string;
        let: {
            userId: string;
        };
        pipeline: ({
            $match: {
                $expr: {
                    $in: string[];
                };
            };
            $project?: undefined;
        } | {
            $project: {
                password: number;
            };
            $match?: undefined;
        })[];
        as: string;
    };
    $addFields?: undefined;
    $project?: undefined;
} | {
    $addFields: {
        'slates.donorUser': {
            $arrayElemAt: (string | {
                $indexOfArray: (string | {
                    _id: string;
                })[];
            })[];
        };
    };
    $lookup?: undefined;
    $project?: undefined;
} | {
    $project: {
        slates_donors: number;
    };
    $lookup?: undefined;
    $addFields?: undefined;
})[];
export declare const lookUpRecipients: ({
    $lookup: {
        from: string;
        let: {
            userId: string;
        };
        pipeline: ({
            $match: {
                $expr: {
                    $in: string[];
                };
            };
            $project?: undefined;
        } | {
            $project: {
                password: number;
            };
            $match?: undefined;
        })[];
        as: string;
    };
    $addFields?: undefined;
    $project?: undefined;
} | {
    $addFields: {
        'slates.recipientUser': {
            $arrayElemAt: (string | {
                $indexOfArray: (string | {
                    _id: string;
                })[];
            })[];
        };
    };
    $lookup?: undefined;
    $project?: undefined;
} | {
    $project: {
        slates_recipients: number;
    };
    $lookup?: undefined;
    $addFields?: undefined;
})[];
