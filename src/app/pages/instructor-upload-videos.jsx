import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload, Video, X, CheckCircle2, Clock, AlertCircle,
  FileVideo, Play, Trash2, MoreVertical, RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Label } from "../components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { InstructorLayout } from "../components/instructor-sidebar";

const mockUploaded = [
  { id: 1, name: "01-introduction.mp4", size: "245 MB", duration: "12:34", course: "Complete Web Development Bootcamp", status: "ready", uploadedAt: "2 days ago", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&h=70&fit=crop" },
  { id: 2, name: "02-html-basics.mp4", size: "312 MB", duration: "18:22", course: "Complete Web Development Bootcamp", status: "ready", uploadedAt: "2 days ago", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=70&fit=crop" },
  { id: 3, name: "advanced-hooks.mp4", size: "198 MB", duration: "22:05", course: "Advanced React & TypeScript", status: "processing", uploadedAt: "1 hour ago", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=120&h=70&fit=crop" },
  { id: 4, name: "typescript-intro.mp4", size: "156 MB", duration: "15:40", course: "Advanced React & TypeScript", status: "failed", uploadedAt: "3 hours ago", thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=120&h=70&fit=crop" },
];

// ---- helpers -------------------------------------------------------------

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function formatBytes(bytes) {
  if (!bytes) return "0 MB";
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

function formatDuration(seconds) {
  if (!seconds || Number.isNaN(seconds) || !Number.isFinite(seconds)) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Reads a real <video> file in the browser to grab its duration and a
// frame to use as a thumbnail, so newly uploaded videos look "real" in
// the library instead of using a placeholder image.
function extractVideoMeta(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.src = url;

    const cleanup = (result) => {
      URL.revokeObjectURL(url);
      resolve(result);
    };

    video.onloadeddata = () => {
      try {
        video.currentTime = Math.min(1, (video.duration || 2) / 2);
      } catch {
        cleanup({ duration: video.duration || 0, thumbnail: null });
      }
    };
    video.onseeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 160;
        canvas.height = 90;
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
        cleanup({ duration: video.duration || 0, thumbnail: canvas.toDataURL("image/jpeg", 0.7) });
      } catch {
        cleanup({ duration: video.duration || 0, thumbnail: null });
      }
    };
    video.onerror = () => cleanup({ duration: 0, thumbnail: null });
  });
}

let idCounter = 0;
const nextId = (prefix) => `${prefix}-${Date.now()}-${idCounter++}`;

// ---- component -------------------------------------------------------------

export function UploadVideosPage() {
  const [videos, setVideos] = useState(mockUploaded);
  const [uploadsList, setUploadsList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [courseWarning, setCourseWarning] = useState(false);

  const fileInputRef = useRef(null);
  const cancelledRef = useRef(new Set());

  const remove = (id) => setVideos((v) => v.filter((x) => x.id !== id));

  const openFileExplorer = () => {
    if (!selectedCourse) {
      setCourseWarning(true);
      setTimeout(() => setCourseWarning(false), 2500);
      return;
    }
    fileInputRef.current?.click();
  };

  const cancelUpload = (id) => {
    cancelledRef.current.add(id);
    setUploadsList((prev) => prev.filter((u) => u.id !== id));
  };

  const retryVideo = (id) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, status: "processing" } : v)));
    setTimeout(() => {
      setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, status: "ready" } : v)));
    }, 1500);
  };

  // Simulates a chunked upload + processing pipeline for one file, then
  // moves it into the Video Library so it's clearly shown as uploaded.
  const simulateUpload = async (id, file, course) => {
    let progress = 0;
    while (progress < 100) {
      if (cancelledRef.current.has(id)) {
        cancelledRef.current.delete(id);
        return;
      }
      await sleep(250 + Math.random() * 250);
      progress = Math.min(100, progress + 8 + Math.random() * 16);
      setUploadsList((prev) => prev.map((u) => (u.id === id ? { ...u, progress } : u)));
    }

    if (cancelledRef.current.has(id)) {
      cancelledRef.current.delete(id);
      return;
    }

    await sleep(300);
    setUploadsList((prev) => prev.filter((u) => u.id !== id));

    const meta = await extractVideoMeta(file);
    const newVideo = {
      id: nextId("video"),
      name: file.name,
      size: formatBytes(file.size),
      duration: formatDuration(meta.duration),
      course,
      status: "processing",
      uploadedAt: "Just now",
      thumbnail: meta.thumbnail,
    };
    setVideos((prev) => [newVideo, ...prev]);

    // Brief "processing" phase before it's marked ready, mirroring how
    // a real backend would transcode the file after the upload finishes.
    await sleep(1200);
    setVideos((prev) => prev.map((v) => (v.id === newVideo.id ? { ...v, status: "ready" } : v)));
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith("video/"));
    if (files.length === 0) return;
    if (!selectedCourse) {
      setCourseWarning(true);
      setTimeout(() => setCourseWarning(false), 2500);
      return;
    }
    for (const file of files) {
      const id = nextId("upload");
      setUploadsList((prev) => [
        ...prev,
        { id, name: file.name, size: formatBytes(file.size), progress: 0, course: selectedCourse },
      ]);
      simulateUpload(id, file, selectedCourse);
    }
  };

  const onInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const statusBadge = (status) => {
    if (status === "ready") return <Badge className="bg-green-500 text-white text-xs gap-1"><CheckCircle2 className="h-3 w-3" />Ready</Badge>;
    if (status === "processing") return <Badge className="bg-yellow-500 text-white text-xs gap-1"><RefreshCw className="h-3 w-3 animate-spin" />Processing</Badge>;
    return <Badge className="bg-red-500 text-white text-xs gap-1"><AlertCircle className="h-3 w-3" />Failed</Badge>;
  };

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Upload Videos 🎬</h1>
          <p className="text-muted-foreground">Upload and manage all your course video content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Videos", value: videos.length, color: "from-blue-500 to-cyan-500" },
            { label: "Ready", value: videos.filter(v => v.status === "ready").length, color: "from-green-500 to-emerald-500" },
            { label: "Processing", value: videos.filter(v => v.status === "processing").length + uploadsList.length, color: "from-yellow-500 to-orange-500" },
            { label: "Total Storage", value: "1.4 GB", color: "from-purple-500 to-pink-500" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Upload Zone */}
        <Card>
          <CardHeader><CardTitle>Upload New Videos</CardTitle><CardDescription>Drag & drop or click to select video files</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Assign to Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="max-w-sm">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {["Complete Web Development Bootcamp", "Advanced React & TypeScript", "JavaScript Essentials"].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <AnimatePresence>
                {courseWarning && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-destructive flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />Please select a course before uploading
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Hidden native file input — this is what opens the OS file explorer */}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={onInputChange}
            />

            <div
              role="button"
              tabIndex={0}
              onClick={openFileExplorer}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openFileExplorer(); }}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer
                ${dragOver ? "border-primary bg-primary/5" : "hover:bg-muted/30"}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              <FileVideo className={`h-16 w-16 mx-auto mb-4 transition-colors ${dragOver ? "text-primary" : "text-muted-foreground/40"}`} />
              <p className="text-xl font-semibold mb-1">Drop your videos here</p>
              <p className="text-muted-foreground mb-4">Supports MP4, MOV, AVI, MKV up to 2GB per file</p>
              <Button
                className="bg-gradient-to-r from-indigo-500 to-purple-600"
                onClick={(e) => { e.stopPropagation(); openFileExplorer(); }}
              >
                <Upload className="h-4 w-4 mr-2" />Browse Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Currently Uploading */}
        <AnimatePresence>
          {uploadsList.length > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <Card>
                <CardHeader><CardTitle>Uploading ({uploadsList.length})</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <AnimatePresence>
                    {uploadsList.map((u) => (
                      <motion.div key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="p-4 border rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <Video className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{u.name}</p>
                                <p className="text-xs text-muted-foreground">{u.size} · {u.course}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-primary">{Math.round(u.progress)}%</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => cancelUpload(u.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Progress value={u.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {u.progress < 100 ? "Uploading…" : "Finishing up…"}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Library */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div><CardTitle>Video Library</CardTitle><CardDescription>{videos.length} videos uploaded</CardDescription></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <AnimatePresence>
                {videos.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-center gap-4 p-3 border rounded-xl hover:bg-muted/40 transition-colors group">
                      <div className="relative flex-shrink-0 w-24 h-14 rounded-lg overflow-hidden bg-muted">
                        {v.thumbnail ? (
                          <img src={v.thumbnail} alt={v.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Video className="h-6 w-6 text-muted-foreground/50" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{v.name}</p>
                        <p className="text-xs text-muted-foreground">{v.course}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{v.duration}</span>
                          <span>{v.size}</span>
                          <span>Uploaded {v.uploadedAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {statusBadge(v.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Play className="h-4 w-4 mr-2" />Preview</DropdownMenuItem>
                            {v.status === "failed" && (
                              <DropdownMenuItem onClick={() => retryVideo(v.id)}>
                                <RefreshCw className="h-4 w-4 mr-2" />Retry
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive" onClick={() => remove(v.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </InstructorLayout>
  );
}