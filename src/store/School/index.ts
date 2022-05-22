import { School, SchoolCourseInfo } from "./types";
import { defineStore } from "pinia";
import faker from '@faker-js/faker/locale/zh_CN';
import moment from "moment";


export interface SchoolState {
    schools: School[]
}

export const useSchoolState = defineStore('School', {
    state: () => {
        return {
            schools: []
        } as SchoolState
    },
    getters: {
        courses(): string[] {
            const course = new Set<string>();
            for (const i of this.schools) {
                for (const j of i.information) {
                    course.add(j.courseName);
                }
            }
            return [...course.values()];
        },
        schoolCategory(): string[] {
            return [...new Set<string>(this.schools.map((value) => value.type))];
        },
        schoolNames(): { key: number, label: string }[] {
            const data: { key: number, label: string }[] = [];
            this.schools.forEach((value) => {
                data.push({key: value.UniId, label: value.UniName});
            });
            return data;
        },
    },
    actions: {
        getSchoolInfo() {
            fetch("http://hjlhjlhjl.xyz:8070/uniFunction/findAll")
                .then((response: Response) => response.json())
                .then((json: Array<School>) => this.schools = json)
                .catch((err) => {
                    console.log(err);
                });
        },
        addSchoolInfo(info: School[]) {
            this.schools.push(...info);
        },
        genTestData() {
            const data: School[] = [];
            const type: string[] = ['综合类大学', '理工类大学', '财经类大学', '师范类大学'];
            const name: string[] = ['南京理工大学', '浙江大学', '南京审计大学', '杭州电子科技大学', '山东财经大学', '广东财经大学'];
            const course: string[] = "财务基础,数据库系统原理,数据结构,软件建模分析,数学,英语,Python与人工智能,计算机组成原理,WEB应用程序设计,企业税务管理与决策,风险管控和数字审计,大数据与智能财务,公司战略和风险管理,海量数据存储和管理,云计算和分布式系统".split(',')
            for (let i = 0; i < 15; i++) {
                const information: SchoolCourseInfo[] = []
                for (let j = 0; j < Math.floor(Math.random() * 5 + 5); j++) {
                    information.push({
                        informationId: j,
                        date: moment(faker.date.recent()).format(),
                        courseName: course[Math.floor(Math.random() * course.length)],
                        content: faker.lorem.lines(),
                    })
                }
                data.push({
                    UniId: i,
                    UniName: name[Math.floor(Math.random() * name.length)],
                    information,
                    type: type[Math.floor(Math.random() * type.length)],
                    rank: faker.name.jobTitle(),
                    sessionTest: null
                })
            }
            this.schools = data
        }
    },

})
