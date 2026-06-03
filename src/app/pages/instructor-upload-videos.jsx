import { useState } from "react";
import { motion } from "motion/react";
import {
  Upload, Video, X, CheckCircle2, Clock, AlertCircle,
  FileVideo, Play, Trash2, MoreVertical, RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
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

const uploading = [
  { id: 101, name: "redux-deep-dive.mp4", size: "420 MB", progress: 67, course: "Advanced React & TypeScript" },
  { id: 102, name: "final-project.mp4", size: "580 MB", progress: 23, course: "Complete Web Development Bootcamp" },
];

export function UploadVideosPage() {
  const [videos, setVideos] = useState(mockUploaded);
  const [uploads] = useState(uploading);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const remove = (id) => setVideos((v) => v.filter((x) => x.id !== id));

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
            { label: "Processing", value: videos.filter(v => v.status === "processing").length + uploads.length, color: "from-yellow-500 to-orange-500" },
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
            </div>
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer
                ${dragOver ? "border-primary bg-primary/5" : "hover:bg-muted/30"}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={() => setDragOver(false)}
            >
              <FileVideo className={`h-16 w-16 mx-auto mb-4 transition-colors ${dragOver ? "text-primary" : "text-muted-foreground/40"}`} />
              <p className="text-xl font-semibold mb-1">Drop your videos here</p>
              <p className="text-muted-foreground mb-4">Supports MP4, MOV, AVI, MKV up to 2GB per file</p>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
                <Upload className="h-4 w-4 mr-2" />Browse Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Currently Uploading */}
        {uploads.length > 0 && (
          <Card>
            <CardHeader><CardTitle>Uploading ({uploads.length})</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {uploads.map((u) => (
                <motion.div key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                        <span className="text-sm font-semibold text-primary">{u.progress}%</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><X className="h-4 w-4" /></Button>
                      </div>
                    </div>
                    <Progress value={u.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">Estimated time remaining: {Math.round((100 - u.progress) * 0.5)} seconds</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Video Library */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div><CardTitle>Video Library</CardTitle><CardDescription>{videos.length} videos uploaded</CardDescription></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {videos.map((v, i) => (
                <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-center gap-4 p-3 border rounded-xl hover:bg-muted/40 transition-colors group">
                    <div className="relative flex-shrink-0">
                      <img src={v.thumbnail} alt={v.name} className="w-24 h-14 rounded-lg object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
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
                          {v.status === "failed" && <DropdownMenuItem><RefreshCw className="h-4 w-4 mr-2" />Retry</DropdownMenuItem>}
                          <DropdownMenuItem className="text-destructive" onClick={() => remove(v.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InstructorLayout>
  );
}
