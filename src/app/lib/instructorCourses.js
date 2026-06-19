

const STORAGE_KEY = "nexa_instructor_courses";



const SEED_COURSES = [
  {
    id: "course-1",
    title: "Complete Web Development Bootcamp",
    curriculum: [
      {
        id: "section-1",
        title: "Getting Started",
        lessons: [
          { id: "lesson-1", title: "01-introduction.mp4", type: "video", duration: "12:34", videoId: 1 },
          { id: "lesson-2", title: "02-html-basics.mp4", type: "video", duration: "18:22", videoId: 2 },
        ],
      },
    ],
  },
  {
    id: "course-2",
    title: "Advanced React & TypeScript",
    curriculum: [
      {
        id: "section-2",
        title: "Advanced Patterns",
        lessons: [
          { id: "lesson-3", title: "advanced-hooks.mp4", type: "video", duration: "22:05", videoId: 3 },
          { id: "lesson-4", title: "typescript-intro.mp4", type: "video", duration: "15:40", videoId: 4 },
        ],
      },
    ],
  },
  {
    id: "course-3",
    title: "JavaScript Essentials",
    curriculum: [
      {
        id: "section-3",
        title: "Fundamentals",
        lessons: [],
      },
    ],
  },
];

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_COURSES));
      return SEED_COURSES;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_COURSES;
  }
}

function writeStore(courses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  // Notify any other open tabs/components listening for changes
  window.dispatchEvent(new CustomEvent("nexa:courses-updated", { detail: courses }));
}

let idCounter = 0;
const nextId = (prefix) => `${prefix}-${Date.now()}-${idCounter++}`;

export const instructorCoursesApi = {
  /**
   * Returns the instructor's courses: [{ id, title, curriculum }]
   * Mirrors what GET /api/instructor/courses would return.
   */
  async getMyCourses() {
    await Promise.resolve(); // keep the async shape for an easy real-API swap
    return { courses: readStore() };
  },

  /**
   * Appends a new lesson to the FIRST section of the given course's
   * curriculum (creating a default section if none exists yet), then
   * persists it. Returns the updated course.
   *
   * Mirrors what POST /api/courses/:id/lessons would do server-side.
   */
  async addLessonToCourse(courseId, lesson) {
    await Promise.resolve();
    const courses = readStore();
    const courseIndex = courses.findIndex((c) => c.id === courseId);
    if (courseIndex === -1) throw new Error("Course not found");

    const course = { ...courses[courseIndex] };
    const curriculum = course.curriculum?.length
      ? [...course.curriculum]
      : [{ id: nextId("section"), title: "New Section", lessons: [] }];

    const newLesson = {
      id: nextId("lesson"),
      type: "video",
      ...lesson,
    };

    // Add to the last section so newest content appears at the bottom,
    // matching how most course curriculum builders behave.
    const lastSectionIndex = curriculum.length - 1;
    curriculum[lastSectionIndex] = {
      ...curriculum[lastSectionIndex],
      lessons: [...curriculum[lastSectionIndex].lessons, newLesson],
    };

    course.curriculum = curriculum;
    courses[courseIndex] = course;
    writeStore(courses);

    return { course, lesson: newLesson };
  },

  /**
   * Subscribe to course-list changes (e.g. another tab adds a lesson).
   * Returns an unsubscribe function.
   */
  onCoursesUpdated(callback) {
    const handler = (e) => callback(e.detail);
    const storageHandler = (e) => {
      if (e.key === STORAGE_KEY) callback(readStore());
    };
    window.addEventListener("nexa:courses-updated", handler);
    window.addEventListener("storage", storageHandler);
    return () => {
      window.removeEventListener("nexa:courses-updated", handler);
      window.removeEventListener("storage", storageHandler);
    };
  },
};