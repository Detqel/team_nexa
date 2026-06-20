import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen, Plus, Upload, X, ChevronRight, ChevronLeft,
  Image, Video, FileText, Tag, DollarSign, Globe, Lock,
  CheckCircle2, AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { InstructorLayout } from "../components/instructor-sidebar";
import { Progress } from "../components/ui/progress";
import { getUser } from "../lib/auth";
import { getUserAvatarUrl } from "../lib/avatar";
import { coursesApi } from "../lib/api";
import { resizeImageToDataUrl } from "../lib/images";
import { toast } from "sonner";

const PUBLISHED_COURSES_KEY = "nexa_published_courses";

const steps = [
  { id: 1, label: "Basic Info", icon: FileText },
  { id: 2, label: "Curriculum", icon: BookOpen },
  { id: 3, label: "Media", icon: Image },
  { id: 4, label: "Pricing", icon: DollarSign },
  { id: 5, label: "Publish", icon: Globe },
];

export function CreateCoursePage() {
  const navigate = useNavigate();
  const thumbnailInputRef = useRef(null);
  const [step, setStep] = useState(1);
  const [publishing, setPublishing] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [form, setForm] = useState({
    title: "", subtitle: "", description: "", category: "", level: "", language: "English",
    tags: [], tagInput: "",
    sections: [{ id: 1, title: "Introduction", lessons: [{ id: 1, title: "Welcome to the course", type: "video", duration: "" }] }],
    thumbnail: null, promoVideo: "",
    price: "", originalPrice: "", isFree: false,
    isPublic: true, isCertificate: true, allowPreview: true,
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const addTag = () => {
    if (form.tagInput.trim() && !form.tags.includes(form.tagInput.trim())) {
      set("tags", [...form.tags, form.tagInput.trim()]);
      set("tagInput", "");
    }
  };

  const removeTag = (t) => set("tags", form.tags.filter((x) => x !== t));

  const addSection = () =>
    set("sections", [...form.sections, { id: Date.now(), title: "New Section", lessons: [] }]);

  const addLesson = (sectionId) =>
    set("sections", form.sections.map((s) =>
      s.id === sectionId
        ? { ...s, lessons: [...s.lessons, { id: Date.now(), title: "New Lesson", type: "video", duration: "" }] }
        : s
    ));

  const removeLesson = (sectionId, lessonId) =>
    set("sections", form.sections.map((s) =>
      s.id === sectionId ? { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId) } : s
    ));

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  const isStepComplete = (s) => {
    if (s === 1) return form.title && form.description && form.category && form.level;
    if (s === 2) return form.sections && form.sections.some((sec) => sec.lessons && sec.lessons.length > 0);
    if (s === 3) return !!form.thumbnail || !!form.promoVideo;
    if (s === 4) return form.isFree || (!!form.price && Number(form.price) > 0);
    return true;
  };

  const attemptStep = (target) => {
    if (target <= step) {
      setStep(target);
      return;
    }
    // allow moving forward only if previous step is complete
    if (isStepComplete(target - 1)) {
      setStep(target);
    } else {
      alert('Please complete the previous step before proceeding.');
    }
  };

  const handleNextStep = () => {
    if (step >= steps.length) return;
    if (!isStepComplete(step)) {
      alert('Please complete required fields before moving to the next step.');
      return;
    }
    setStep((s) => Math.min(steps.length, s + 1));
  };

  const handleThumbnailChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    setUploadingThumbnail(true);
    try {
      const dataUrl = await resizeImageToDataUrl(file, 1280, 720, 0.85);
      set("thumbnail", dataUrl);
      toast.success("Thumbnail uploaded!");
    } catch (error) {
      toast.error(error.message || "Failed to upload thumbnail.");
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handlePublish = async () => {
    const user = getUser();
    if (!user) {
      toast.error("Please log in to publish a course.");
      return;
    }

    if (!isStepComplete(1) || !isStepComplete(2) || !isStepComplete(3) || !isStepComplete(4)) {
      toast.error("Please complete all required steps before publishing.");
      return;
    }

    const totalLessons = form.sections.reduce((sum, section) => sum + section.lessons.length, 0);

    setPublishing(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        level: form.level,
        thumbnail: form.thumbnail,
        price: form.isFree ? 0 : Number(form.price) || 0,
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        durationHours: Math.max(1, Math.ceil(totalLessons * 0.5)),
        lessons: totalLessons,
      };

      const data = await coursesApi.create(payload);
      const course = {
        ...data.course,
        instructor: user.name,
        avatar: getUserAvatarUrl(user),
        publishedAt: new Date().toISOString(),
        totalLessons,
      };

      const existing = JSON.parse(localStorage.getItem(PUBLISHED_COURSES_KEY) || "[]");
      localStorage.setItem(PUBLISHED_COURSES_KEY, JSON.stringify([course, ...existing]));

      toast.success("Course published successfully!");
      navigate("/courses");
    } catch (error) {
      toast.error(error.message || "Failed to publish course.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Create New Course ✨</h1>
          <p className="text-muted-foreground">Fill in the details step by step to publish your course</p>
        </div>

        {/* Stepper */}
        <Card>
          <CardContent className="pt-6 pb-4">
            <div className="flex items-center justify-between mb-3 overflow-x-auto gap-2">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => attemptStep(s.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${step === s.id ? "bg-primary text-primary-foreground" : step > s.id ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-muted text-muted-foreground"}`}
                  >
                    {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-1.5" />
          </CardContent>
        </Card>

        {/* Step 1 - Basic Info */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <CardHeader><CardTitle>Basic Information</CardTitle><CardDescription>Tell students what your course is about</CardDescription></CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Course Title *</Label>
                  <Input placeholder="e.g., Complete React Development Bootcamp" value={form.title} onChange={(e) => set("title", e.target.value)} />
                  <p className="text-xs text-muted-foreground">{form.title.length}/60 characters</p>
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Input placeholder="A short description that appears under the title" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Course Description *</Label>
                  <Textarea placeholder="Describe what students will learn, prerequisites, target audience..." rows={6} value={form.description} onChange={(e) => set("description", e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={form.category} onValueChange={(v) => set("category", v)}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {["Web Development", "Mobile Development", "Data Science", "Design", "Marketing", "AI & Machine Learning", "Backend", "DevOps", "Cybersecurity"].map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Level *</Label>
                    <Select value={form.level} onValueChange={(v) => set("level", v)}>
                      <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                      <SelectContent>
                        {["Beginner", "Intermediate", "Advanced", "All Levels"].map(l => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={form.language} onValueChange={(v) => set("language", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["English", "Tamil", "Hindi", "Spanish", "French"].map(l => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Add a tag and press Enter" value={form.tagInput}
                      onChange={(e) => set("tagInput", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                    <Button type="button" variant="outline" onClick={addTag}><Plus className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="gap-1">
                        {t}
                        <button onClick={() => removeTag(t)}><X className="h-3 w-3" /></button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2 - Curriculum */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div><CardTitle>Curriculum</CardTitle><CardDescription>Organize your course into sections and lessons</CardDescription></div>
                  <Button variant="outline" onClick={addSection}><Plus className="h-4 w-4 mr-2" />Add Section</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.sections.map((section, si) => (
                  <Card key={section.id} className="border-dashed">
                    <CardContent className="pt-4 pb-3 space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="flex-shrink-0">Section {si + 1}</Badge>
                        <Input value={section.title} onChange={(e) =>
                          set("sections", form.sections.map((s) => s.id === section.id ? { ...s, title: e.target.value } : s))
                        } className="font-medium" />
                      </div>
                      <div className="pl-4 space-y-2">
                        {section.lessons.map((lesson, li) => (
                          <div key={lesson.id} className="flex items-center gap-2 p-2 bg-muted/40 rounded-lg">
                            <Video className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <Input value={lesson.title} placeholder="Lesson title"
                              onChange={(e) => set("sections", form.sections.map((s) =>
                                s.id === section.id ? { ...s, lessons: s.lessons.map((l) => l.id === lesson.id ? { ...l, title: e.target.value } : l) } : s
                              ))} className="flex-1 h-8 text-sm" />
                            <Select value={lesson.type} onValueChange={(v) =>
                              set("sections", form.sections.map((s) =>
                                s.id === section.id ? { ...s, lessons: s.lessons.map((l) => l.id === lesson.id ? { ...l, type: v } : l) } : s
                              ))
                            }>
                              <SelectTrigger className="w-24 h-8 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="article">Article</SelectItem>
                                <SelectItem value="quiz">Quiz</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input value={lesson.duration} placeholder="0:00" className="w-16 h-8 text-xs"
                              onChange={(e) => set("sections", form.sections.map((s) =>
                                s.id === section.id ? { ...s, lessons: s.lessons.map((l) => l.id === lesson.id ? { ...l, duration: e.target.value } : l) } : s
                              ))} />
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeLesson(section.id, lesson.id)}>
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="ghost" size="sm" className="text-primary" onClick={() => addLesson(section.id)}>
                          <Plus className="h-3.5 w-3.5 mr-1" /> Add Lesson
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3 - Media */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <CardHeader><CardTitle>Course Media</CardTitle><CardDescription>Upload a thumbnail and promotional video</CardDescription></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Course Thumbnail *</Label>
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={handleThumbnailChange}
                  />
                  <div
                    className="border-2 border-dashed rounded-xl p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => thumbnailInputRef.current?.click()}
                  >
                    {form.thumbnail ? (
                      <img
                        src={form.thumbnail}
                        alt="Course thumbnail preview"
                        className="mx-auto mb-3 max-h-40 rounded-lg object-cover"
                      />
                    ) : (
                      <Image className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    )}
                    <p className="font-medium mb-1">
                      {uploadingThumbnail ? "Uploading..." : "Click to upload thumbnail"}
                    </p>
                    <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB • Recommended: 1280×720px</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-3"
                      disabled={uploadingThumbnail}
                      onClick={(e) => {
                        e.stopPropagation();
                        thumbnailInputRef.current?.click();
                      }}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {form.thumbnail ? "Change Image" : "Choose Image"}
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Promotional Video URL</Label>
                  <Input placeholder="https://youtube.com/watch?v=..." value={form.promoVideo} onChange={(e) => set("promoVideo", e.target.value)} />
                  <p className="text-xs text-muted-foreground">A short 2–3 minute preview that shows up on your course landing page</p>
                </div>
                <div className="space-y-2">
                  <Label>Or Upload a Video File</Label>
                  <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/30 transition-colors">
                    <Video className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">MP4, MOV up to 500MB</p>
                    <Button variant="outline" size="sm" className="mt-2"><Upload className="h-4 w-4 mr-2" />Upload Video</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4 - Pricing */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <CardHeader><CardTitle>Pricing</CardTitle><CardDescription>Set your course price and discount</CardDescription></CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-3 p-4 bg-muted/40 rounded-xl">
                  <Switch checked={form.isFree} onCheckedChange={(v) => set("isFree", v)} />
                  <div>
                    <p className="font-medium">Free Course</p>
                    <p className="text-sm text-muted-foreground">Make this course available for free to all students</p>
                  </div>
                </div>
                {!form.isFree && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Course Price ($) *</Label>
                      <Input type="number" placeholder="e.g., 89.99" value={form.price} onChange={(e) => set("price", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Original Price ($)</Label>
                      <Input type="number" placeholder="e.g., 199.99" value={form.originalPrice} onChange={(e) => set("originalPrice", e.target.value)} />
                      <p className="text-xs text-muted-foreground">The "was" price shown as strikethrough</p>
                    </div>
                  </div>
                )}
                {!form.isFree && form.price && form.originalPrice && (
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Students save {Math.round(((form.originalPrice - form.price) / form.originalPrice) * 100)}% — ${(form.originalPrice - form.price).toFixed(2)} discount
                    </p>
                  </div>
                )}
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-semibold">Access Settings</h3>
                  {[
                    { key: "isPublic", label: "Public Course", desc: "Anyone can find and enroll", icon: Globe },
                    { key: "isCertificate", label: "Certificate of Completion", desc: "Award a certificate when students finish", icon: CheckCircle2 },
                    { key: "allowPreview", label: "Allow Free Preview", desc: "Let non-enrolled students preview first lessons", icon: Lock },
                  ].map(({ key, label, desc, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between p-4 border rounded-xl">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                      <Switch checked={form[key]} onCheckedChange={(v) => set(key, v)} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 5 - Publish */}
        {step === 5 && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <Card>
              <CardHeader><CardTitle>Ready to Publish?</CardTitle><CardDescription>Review your course details before going live</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Course Title", value: form.title || "—", ok: !!form.title },
                  { label: "Description", value: form.description ? `${form.description.slice(0, 60)}...` : "—", ok: !!form.description },
                  { label: "Category", value: form.category || "—", ok: !!form.category },
                  { label: "Level", value: form.level || "—", ok: !!form.level },
                  { label: "Price", value: form.isFree ? "Free" : form.price ? `$${form.price}` : "—", ok: form.isFree || !!form.price },
                  { label: "Curriculum", value: `${form.sections.length} sections, ${form.sections.reduce((a, s) => a + s.lessons.length, 0)} lessons`, ok: form.sections.some(s => s.lessons.length > 0) },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{item.value}</span>
                      {item.ok ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-yellow-500" />}
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1">Save as Draft</Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    onClick={handlePublish}
                    disabled={publishing}
                  >
                    {publishing ? "Publishing..." : "🚀 Publish Course"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button onClick={handleNextStep} disabled={step === steps.length || !isStepComplete(step)} className="bg-gradient-to-r from-indigo-500 to-purple-600">
            {step === steps.length ? "Finish" : "Next"} <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </InstructorLayout>
  );
}
