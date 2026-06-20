import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authApi } from "../lib/api";
import { updateStoredUser } from "../lib/auth";
import { getUserAvatarUrl, getUserInitials } from "../lib/avatar";
import { toast } from "sonner";

export function ProfilePhotoUpload({ user, onUserUpdated, avatarClassName = "h-20 w-20" }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be 5MB or smaller.");
      return;
    }

    setUploading(true);
    try {
      const data = await authApi.uploadAvatar(file);
      if (!data.user) {
        throw new Error("Upload failed");
      }
      updateStoredUser(data.user);
      onUserUpdated?.(data.user);
      toast.success(data.message || "Profile photo updated!");
    } catch (error) {
      toast.error(error.message || "Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!user?.avatar) return;

    setRemoving(true);
    try {
      const data = await authApi.deleteAvatar();
      updateStoredUser(data.user);
      onUserUpdated?.(data.user);
      toast.success("Profile photo removed.");
    } catch (error) {
      toast.error(error.message || "Failed to remove photo.");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="flex items-center gap-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="relative">
        <Avatar className={`${avatarClassName} ring-4 ring-primary/20`}>
          <AvatarImage src={getUserAvatarUrl(user)} alt={user?.name || "Profile"} />
          <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
        </Avatar>
        <Button
          type="button"
          size="icon"
          className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full"
          variant="secondary"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div>
        <p className="font-medium">Profile Photo</p>
        <p className="text-sm text-muted-foreground mb-3">PNG, JPG up to 5MB recommended 400×400px</p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading || removing}
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-3.5 w-3.5 mr-1" />
            {uploading ? "Uploading..." : "Upload"}
          </Button>
          {user?.avatar && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive"
              disabled={uploading || removing}
              onClick={handleRemove}
            >
              {removing ? "Removing..." : "Remove"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
