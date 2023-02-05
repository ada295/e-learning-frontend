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

export class ExamDetailsExamResponse {
  id: number = 0;
  name: string | undefined;
}

export class ExamDetailsQuestionResponse {
  id: number = 0;
  content: string | undefined;
  points: number = 0;
  answers: ExamDetailsAnswerResponse[] = [];
}

export class ExamDetailsAnswerResponse {
  id: number = 0;
  content: string | undefined;
}

export class ExamDetailsResponse {
  exam: ExamDetailsExamResponse | undefined;
  questions: ExamDetailsQuestionResponse[] = [];
}
