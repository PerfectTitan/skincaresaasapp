import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { SkinMetric } from "@/types";

interface SkinMetricsProps {
  userId: string;
}

export default function SkinMetrics({ userId }: SkinMetricsProps) {
  const [metrics, setMetrics] = useState<SkinMetric[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState({
    hydrationLevel: 50,
    oiliness: 50,
    redness: 50,
    texture: 50,
    overall: 50,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // In a real app, fetch from Supabase
        // For now, we'll use mock data
        const mockMetrics = [
          {
            id: "1",
            userId,
            date: "2023-06-01",
            hydrationLevel: 40,
            oiliness: 60,
            redness: 70,
            texture: 30,
            overall: 45,
          },
          {
            id: "2",
            userId,
            date: "2023-06-15",
            hydrationLevel: 45,
            oiliness: 55,
            redness: 60,
            texture: 40,
            overall: 50,
          },
          {
            id: "3",
            userId,
            date: "2023-07-01",
            hydrationLevel: 55,
            oiliness: 50,
            redness: 50,
            texture: 50,
            overall: 60,
          },
        ];

        setMetrics(mockMetrics);

        // Set current metrics to the most recent entry
        if (mockMetrics.length > 0) {
          const latest = mockMetrics[mockMetrics.length - 1];
          setCurrentMetrics({
            hydrationLevel: latest.hydrationLevel || 50,
            oiliness: latest.oiliness || 50,
            redness: latest.redness || 50,
            texture: latest.texture || 50,
            overall: latest.overall || 50,
          });
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [userId]);

  const handleSaveMetrics = async () => {
    try {
      setIsSaving(true);

      // In a real app, save to Supabase
      // For now, we'll just simulate the save
      setTimeout(() => {
        const today = new Date().toISOString().split("T")[0];
        const newMetric = {
          id: `metric-${Date.now()}`,
          userId,
          date: today,
          ...currentMetrics,
        };

        setMetrics([...metrics, newMetric]);
        setIsSaving(false);
      }, 1000);

      // Real implementation would be:
      // await supabase.from('skin_metrics').insert({
      //   user_id: userId,
      //   date: new Date().toISOString(),
      //   hydration_level: currentMetrics.hydrationLevel,
      //   oiliness: currentMetrics.oiliness,
      //   redness: currentMetrics.redness,
      //   texture: currentMetrics.texture,
      //   overall: currentMetrics.overall
      // });
    } catch (error) {
      console.error("Error saving metrics:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skin Health Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="track">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="track">Track Today</TabsTrigger>
            <TabsTrigger value="progress">View Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="track" className="space-y-4 mt-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Hydration Level</Label>
                  <span className="text-sm text-muted-foreground">
                    {currentMetrics.hydrationLevel}%
                  </span>
                </div>
                <Slider
                  value={[currentMetrics.hydrationLevel]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) =>
                    setCurrentMetrics({
                      ...currentMetrics,
                      hydrationLevel: value[0],
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Oiliness</Label>
                  <span className="text-sm text-muted-foreground">
                    {currentMetrics.oiliness}%
                  </span>
                </div>
                <Slider
                  value={[currentMetrics.oiliness]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) =>
                    setCurrentMetrics({ ...currentMetrics, oiliness: value[0] })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Redness</Label>
                  <span className="text-sm text-muted-foreground">
                    {currentMetrics.redness}%
                  </span>
                </div>
                <Slider
                  value={[currentMetrics.redness]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) =>
                    setCurrentMetrics({ ...currentMetrics, redness: value[0] })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Texture</Label>
                  <span className="text-sm text-muted-foreground">
                    {currentMetrics.texture}%
                  </span>
                </div>
                <Slider
                  value={[currentMetrics.texture]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) =>
                    setCurrentMetrics({ ...currentMetrics, texture: value[0] })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Overall Skin Health</Label>
                  <span className="text-sm text-muted-foreground">
                    {currentMetrics.overall}%
                  </span>
                </div>
                <Slider
                  value={[currentMetrics.overall]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) =>
                    setCurrentMetrics({ ...currentMetrics, overall: value[0] })
                  }
                />
              </div>

              <Button
                className="w-full"
                onClick={handleSaveMetrics}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Today's Metrics"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your skin health metrics over time:
              </p>

              {metrics.length > 0 ? (
                <div className="space-y-6">
                  {/* In a real app, this would be a chart */}
                  {metrics.map((metric, index) => (
                    <div
                      key={metric.id}
                      className="border rounded-md p-3 space-y-2"
                    >
                      <p className="font-medium">{metric.date}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Hydration: {metric.hydrationLevel}%</div>
                        <div>Oiliness: {metric.oiliness}%</div>
                        <div>Redness: {metric.redness}%</div>
                        <div>Texture: {metric.texture}%</div>
                        <div>Overall: {metric.overall}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No metrics recorded yet. Start tracking today!
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
