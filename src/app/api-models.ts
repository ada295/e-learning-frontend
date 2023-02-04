export class Course {
  id: number = 0;
  name: string = "";
  description: string = "";
  finished: boolean = false;
}

export class Lesson {
  id: number = 0;
  name: string = "";
  course: Course | undefined;
}

export class CourseDetails {
  course: Course | undefined;
  lessons: Lesson[] = [];
  // students: null,
}
