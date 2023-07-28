export class Course {
  id: number = 0;
  name: string = "";
  description: string = "";
  finished: boolean = false;
}

export class Teacher {
  id: number = 0;
  name: string = "";
  surname: string = "";
  email: string = "";
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

export class Material {
  id: number = 0;
  name: string | undefined;
  description: string | undefined;
  fileType: string | undefined;
  fileName: string | undefined;
  lesson: Lesson | undefined;
}

export class ExamDetailsExamResponse {
  id: number = 0;
  name: string | undefined;
}

export class ExamDetailsQuestionResponse {
  id: number = 0;
  content: string | undefined;
  points: number = 0;
  questionType: string | undefined;
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

export class AddExam {
  name: string | undefined | null;
  description: string | undefined | null;
  questions: AddExamQuestion[] = [];
}

export class AddExamQuestion {
  content: string | undefined;
  points: number = 0;
  answers: AddQuestionAnswer[] = [];
  type: string = "";
}

export class AddQuestionAnswer {
  content: string | undefined;
  correct: boolean = false;
}

export class CalendarEvent {
  id: number = 0;
  day: number = 0;
  month: number = 0;
  year: number = 0;
  description: string | undefined;
  type: string | undefined;
  hour: number = 0;
  minutes: number = 0;
  lesson: Lesson | undefined;
}
