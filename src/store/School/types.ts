export interface School {
    UniId: number;
    UniName: string;
    information: Array<SchoolCourseInfo>;
    type: string;
    rank: string;
    sessionTest: null;
}

export interface SchoolCourseInfo {
    informationId: number;
    date: string;
    courseName: string;
    content: string;
}
