export class Course {
  id: number = 0;
  owner: User = new User();
  name: string = "";
  description: string = "";
  finished: boolean = false;
  customLink: string = "";
  customLabel: string = "";
  accessCode: string = "";
}


export class User {
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  disabledAccount: boolean = false;
  roles: string[] = [];
  customLink: string = "";
}

export class StudentUserInCourseTable extends User {
  removeFromCourse = "Usuń";
}

export class Lesson {
  id: number = 0;
  name: string | undefined;
  course: Course | undefined;
}

export class Announcement {
  id: number = 0;
  name: string | undefined;
  description: string | undefined;
  date: Date | undefined;
  course: Course | undefined;
}

export class CourseDetails {
  course: Course | undefined;
  lessons: Lesson[] = [];
  announcements: Announcement[] = [];
  students: User[] = [];
}

export class Material {
  id: number = 0;
  name: string | undefined;
  description: string | undefined;
  fileType: string | undefined;
  filename = "plik";
  lesson: Lesson | undefined;
}

export class ExamDetailsExamResponse {
  id: number = 0;
  name: string | undefined;
  description: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  maxMinutes: number = 0;
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
  startDate: Date | undefined | null;
  endDate: Date | undefined | null;
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
  description: string | undefined;
  status: string | undefined;
  endDate: Date | undefined;
  lesson: Lesson | undefined;
}

export class TaskToDo {
  task: Task | undefined;
  taskStudent: TaskStudent | undefined;
  status: string | undefined;
  icon: string | undefined;
}

export class StudentSolutionForTask {
  task: TaskToDo | undefined;
  student: User | undefined;
}

export class Grade {
  id: number = 0;
  category: string | undefined;
  comment: string | undefined;
  value: number | undefined;
  lesson: Lesson = new Lesson();
}

export class TaskStudent {
  id: number = 0;
  status: string | undefined;
  task: Task | undefined;
  student: Student | undefined;
  filename: string | undefined;
  grade: Grade | undefined;
}


export class Student {
  id: number = 0;
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  pesel: string | undefined;
  tasksStudent: TaskStudent[] = [];
}
