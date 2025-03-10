import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { Camera, Upload, X, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { saveProgressLog } from "@/lib/database";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface ProgressPhotosProps {
  userId: string;
}

export default function ProgressPhotos({ userId }: ProgressPhotosProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    title: string;
    date: string;
  } | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [photos, setPhotos] = useState<
    { url: string; title: string; date: string }[]
  >([
    {
      url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
      title: "Before starting routine",
      date: "2023-05-15",
    },
    {
      url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
      title: "One month progress",
      date: "2023-06-15",
    },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      // In a real app, upload to Supabase storage
      // For now, we'll just simulate the upload
      setTimeout(() => {
        const today = new Date().toISOString().split("T")[0];
        const newPhoto = {
          url: URL.createObjectURL(file),
          title: `Photo from ${today}`,
          date: today,
        };
        setPhotos([...photos, newPhoto]);
        setIsUploading(false);

        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        toast({
          title: "Photo uploaded",
          description: "Your progress photo has been added successfully.",
        });
      }, 1500);

      // Real implementation would be:
      // const { data, error } = await supabase.storage
      //   .from('progress-photos')
      //   .upload(`${userId}/${Date.now()}_${file.name}`, file);
      //
      // if (error) throw error;
      //
      // const photoUrl = supabase.storage.from('progress-photos').getPublicUrl(data.path).data.publicUrl;
      //
      // await supabase.from('progress_logs').insert({
      //   user_id: userId,
      //   date: new Date().toISOString(),
      //   notes,
      //   photo_url: photoUrl
      // });
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast({
        title: "Upload failed",
        description:
          "There was an error uploading your photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProgress = async () => {
    try {
      setIsSaving(true);

      // In a real app, save to Supabase
      // For now, we'll just simulate the save
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const today = new Date().toISOString().split("T")[0];
      const completedSteps = []; // This would be populated with actual steps in a real app

      // Save progress log
      await saveProgressLog(
        userId,
        today,
        completedSteps,
        notes,
        photos[photos.length - 1]?.url,
      );

      toast({
        title: "Progress saved",
        description: "Your progress has been saved successfully.",
      });

      // Clear notes after saving
      setNotes("");
    } catch (error) {
      console.error("Error saving progress:", error);
      toast({
        title: "Save failed",
        description:
          "There was an error saving your progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoClick = (photo: (typeof photos)[0]) => {
    setSelectedPhoto(photo);
    setEditTitle(photo.title);
  };

  const handleUpdateTitle = () => {
    if (!selectedPhoto) return;

    const updatedPhotos = photos.map((photo) =>
      photo.url === selectedPhoto.url ? { ...photo, title: editTitle } : photo,
    );

    setPhotos(updatedPhotos);
    setSelectedPhoto(null);

    toast({
      title: "Title updated",
      description: "Photo title has been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Photos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="space-y-2">
              <div
                className="aspect-square rounded-md overflow-hidden border cursor-pointer relative group"
                onClick={() => handlePhotoClick(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.title || `Progress photo from ${photo.date}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm font-medium">
                    Click to view
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">{photo.date}</p>
                <p
                  className="text-xs font-medium truncate max-w-[120px]"
                  title={photo.title}
                >
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
          <div className="aspect-square rounded-md border border-dashed flex items-center justify-center">
            <label
              htmlFor="photo-upload"
              className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Add Photo</p>
              </div>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
                ref={fileInputRef}
              />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add notes about your skin's progress..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <Button
          className="w-full"
          disabled={isUploading || isSaving}
          onClick={handleSaveProgress}
        >
          {isUploading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
              Uploading...
            </>
          ) : isSaving ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
              Saving...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Save Progress
            </>
          )}
        </Button>
      </CardContent>

      {/* Photo Modal */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex-1">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="font-semibold"
                />
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="ml-2"
                onClick={handleUpdateTitle}
              >
                <Edit2 className="h-4 w-4 mr-1" /> Save
              </Button>
            </DialogTitle>
            <DialogDescription>
              Photo taken on {selectedPhoto?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md overflow-hidden border my-4">
            {selectedPhoto && (
              <img
                src={selectedPhoto.url}
                alt={
                  selectedPhoto.title ||
                  `Progress photo from ${selectedPhoto.date}`
                }
                className="w-full object-contain max-h-[60vh]"
              />
            )}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
