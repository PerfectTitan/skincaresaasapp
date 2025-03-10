import { useState, useRef, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    title: string;
    date: string;
  } | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [photos, setPhotos] = useState<
    { url: string; title: string; date: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        // Fetch photos from Supabase
        const { data, error } = await supabase
          .from("progress_photos")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const formattedPhotos = data.map((photo) => ({
            url: photo.photo_url,
            title: photo.title || `Photo from ${photo.date}`,
            date: photo.date,
          }));
          setPhotos(formattedPhotos);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
        // Keep the default photos if there's an error
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchPhotos();
    }
  }, [userId]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      // Upload to Supabase storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const today = new Date().toISOString().split("T")[0];

      // Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("progress-photos")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from("progress-photos")
        .getPublicUrl(fileName);

      const photoUrl = urlData.publicUrl;

      // Save the photo metadata to the database
      const photoTitle = `Photo from ${today}`;
      const { data: photoData, error: photoError } = await supabase
        .from("progress_photos")
        .insert({
          user_id: userId,
          photo_url: photoUrl,
          title: photoTitle,
          date: today,
          created_at: new Date().toISOString(),
        })
        .select();

      if (photoError) throw photoError;

      // Update the UI
      const newPhoto = {
        url: photoUrl,
        title: photoTitle,
        date: today,
      };

      setPhotos([...photos, newPhoto]);

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "Photo uploaded",
        description: "Your progress photo has been added successfully.",
      });
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

      // Save to Supabase
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

  const handleUpdateTitle = async () => {
    if (!selectedPhoto) return;

    try {
      // Update the title in the database
      const { error } = await supabase
        .from("progress_photos")
        .update({ title: editTitle })
        .eq("photo_url", selectedPhoto.url);

      if (error) throw error;

      // Update the local state
      const updatedPhotos = photos.map((photo) =>
        photo.url === selectedPhoto.url
          ? { ...photo, title: editTitle }
          : photo,
      );

      setPhotos(updatedPhotos);
      setSelectedPhoto(null);

      toast({
        title: "Title updated",
        description: "Photo title has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating photo title:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating the photo title.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Photos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
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
                    <p className="text-xs text-muted-foreground">
                      {photo.date}
                    </p>
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
          </>
        )}
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
