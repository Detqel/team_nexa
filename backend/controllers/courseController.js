const Course = require("../models/Course");
const { STATUS, COURSE_MESSAGES, DEFAULTS } = require("../constants/appConstants");

const formatCourse = (course) => ({
  id: course._id.toString(),
  title: course.title,
  instructor: course.instructor,
  avatar: course.avatar,
  rating: course.rating,
  reviews: course.reviews,
  students: course.students,
  durationHours: course.durationHours,
  duration: `${course.durationHours} hours`,
  lessons: course.lessons,
  price: course.price,
  originalPrice: course.originalPrice,
  thumbnail: course.thumbnail,
  level: course.level,
  category: course.category,
  bestseller: course.bestseller,
  description: course.description,
  createdAt: course.createdAt,
});

const getCourses = async (req, res, next) => {
  try {
    const {
      search,
      category,
      rating,
      priceMin,
      priceMax,
      level,
      durationMin,
      durationMax,
      sort = DEFAULTS.SORT,
    } = req.query;

    const filter = {};

    if (search?.trim()) {
      filter.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { instructor: { $regex: search.trim(), $options: "i" } },
        { category: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (category) {
      const categories = category.split(",").filter(Boolean);
      if (categories.length > 0) {
        filter.category = { $in: categories };
      }
    }

    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = parseFloat(priceMin);
      if (priceMax) filter.price.$lte = parseFloat(priceMax);
    }

    if (level) {
      const levels = level.split(",").filter(Boolean);
      if (levels.length > 0) {
        filter.level = { $in: levels };
      }
    }

    if (durationMin || durationMax) {
      filter.durationHours = {};
      if (durationMin) filter.durationHours.$gte = parseFloat(durationMin);
      if (durationMax) filter.durationHours.$lte = parseFloat(durationMax);
    }

    let query = Course.find(filter);

    switch (sort) {
      case "title-asc":
        query = query.sort({ title: 1 });
        break;
      case "title-desc":
        query = query.sort({ title: -1 });
        break;
      case "rating-high":
        query = query.sort({ rating: -1 });
        break;
      case "rating-low":
        query = query.sort({ rating: 1 });
        break;
      case "price-low":
        query = query.sort({ price: 1 });
        break;
      case "price-high":
        query = query.sort({ price: -1 });
        break;
      case "newest":
        query = query.sort({ createdAt: -1 });
        break;
      case "oldest":
        query = query.sort({ createdAt: 1 });
        break;
      default:
        query = query.sort({ title: 1 });
    }

    const courses = await query.exec();

    res.status(STATUS.OK).json({
      count: courses.length,
      courses: courses.map(formatCourse),
    });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(STATUS.NOT_FOUND).json({ message: COURSE_MESSAGES.NOT_FOUND });
    }
    res.status(STATUS.OK).json({ course: formatCourse(course) });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Course.distinct("category");
    res.status(STATUS.OK).json({ categories });
  } catch (error) {
    next(error);
  }
};

const enrollCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(STATUS.NOT_FOUND).json({ message: COURSE_MESSAGES.NOT_FOUND });
    }

    const user = req.user;
    if (user.enrolledCourses.some((id) => id.toString() === course._id.toString())) {
      return res.status(STATUS.BAD_REQUEST).json({ message: COURSE_MESSAGES.ALREADY_ENROLLED });
    }

    user.enrolledCourses.push(course._id);
    if (!user.courseProgress.get(course._id.toString())) {
      user.courseProgress.set(course._id.toString(), 0);
    }
    await user.save();

    res.status(STATUS.OK).json({
      message: COURSE_MESSAGES.ENROLL_SUCCESS,
      enrolledCourses: user.enrolledCourses.map((id) => id.toString()),
      courseProgress: Object.fromEntries(user.courseProgress),
    });
  } catch (error) {
    next(error);
  }
};

const addToWishlist = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(STATUS.NOT_FOUND).json({ message: COURSE_MESSAGES.NOT_FOUND });
    }

    const user = req.user;
    if (user.wishlist.some((id) => id.toString() === course._id.toString())) {
      return res.status(STATUS.BAD_REQUEST).json({ message: COURSE_MESSAGES.WISHLIST_DUPLICATE });
    }

    user.wishlist.push(course._id);
    await user.save();

    res.status(STATUS.OK).json({
      message: COURSE_MESSAGES.WISHLIST_ADDED,
      wishlist: user.wishlist.map((id) => id.toString()),
    });
  } catch (error) {
    next(error);
  }
};

const removeFromWishlist = async (req, res, next) => {
  try {
    const user = req.user;
    user.wishlist = user.wishlist.filter((id) => id.toString() !== req.params.id);
    await user.save();

    res.status(STATUS.OK).json({
      message: COURSE_MESSAGES.WISHLIST_REMOVED,
      wishlist: user.wishlist.map((id) => id.toString()),
    });
  } catch (error) {
    next(error);
  }
};

const getEnrolledCourses = async (req, res, next) => {
  try {
    const user = await req.user.populate("enrolledCourses");
    const courses = user.enrolledCourses.map((course) => ({
      ...formatCourse(course),
      progress: user.courseProgress.get(course._id.toString()) || 0,
    }));
    res.status(STATUS.OK).json({ courses });
  } catch (error) {
    next(error);
  }
};

const getWishlistCourses = async (req, res, next) => {
  try {
    const user = await req.user.populate("wishlist");
    res.status(STATUS.OK).json({ courses: user.wishlist.map(formatCourse) });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  getCategories,
  enrollCourse,
  addToWishlist,
  removeFromWishlist,
  getEnrolledCourses,
  getWishlistCourses,
  formatCourse,
};