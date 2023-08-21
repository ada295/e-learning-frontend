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
  name: string | undefined;
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
  filename: string | undefined;
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

export class Task {
  id: number = 0;
  name: String | undefined;
  description: String | undefined;
  status: String | undefined;
  endDate: Date | undefined;
  lesson: Lesson | undefined;
}

export class TaskToDo {
  task: Task | undefined;
  taskStudent: TaskStudent |undefined;
  status: string |undefined;
  icon: string | undefined;
}

export class TaskStudent {
  id: number = 0;
  status: string | undefined;
  task: Task | undefined;
  student: Student | undefined;
  points: number = 0;
  filename: string | undefined;
  comment: string | undefined;
}


export class Student {
  id: number = 0;
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  pesel: string | undefined;
  tasksStudent: TaskStudent[] = [];
}
