import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { Camera, Upload } from "lucide-react";

interface ProgressPhotosProps {
  userId: string;
}

export default function ProgressPhotos({ userId }: ProgressPhotosProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<{ url: string; date: string }[]>([
    {
      url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
      date: "2023-05-15",
    },
    {
      url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
      date: "2023-06-15",
    },
  ]);

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
        setPhotos([
          ...photos,
          {
            url: URL.createObjectURL(file),
            date: today,
          },
        ]);
        setIsUploading(false);
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
    } finally {
      setIsUploading(false);
    }
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
              <div className="aspect-square rounded-md overflow-hidden border">
                <img
                  src={photo.url}
                  alt={`Progress photo from ${photo.date}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {photo.date}
              </p>
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

        <Button className="w-full" disabled={isUploading}>
          {isUploading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Save Progress
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
