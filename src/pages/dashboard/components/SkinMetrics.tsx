import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";
import { saveSkinMetrics } from "@/lib/database";
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

      // In a real app, we would use our database helper
      // const today = new Date().toISOString().split("T")[0];
      // await saveSkinMetrics(
      //   userId,
      //   today,
      //   currentMetrics.hydrationLevel,
      //   currentMetrics.oiliness,
      //   currentMetrics.redness,
      //   currentMetrics.texture,
      //   currentMetrics.overall
      // );
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
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger
              value="track"
              className="bg-white/50 data-[state=active]:bg-white"
            >
              Track Today
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="bg-white/50 data-[state=active]:bg-white"
            >
              View Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="track" className="space-y-4">
            <div className="space-y-6 bg-white p-6 rounded-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Hydration</h3>
                    <p className="text-xs text-gray-500">
                      How hydrated does your skin feel?
                    </p>
                  </div>
                  <span className="text-sm font-medium bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                    {currentMetrics.hydrationLevel}%
                  </span>
                </div>
                <Slider
                  value={[currentMetrics.hydrationLevel]}
                  min={0}
                  max={100}
                  step={1}
                  className="py-2"
                  onValueChange={(value) =>
                    setCurrentMetrics({
                      ...currentMetrics,
                      hydrationLevel: value[0],
                    })
                  }
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Very Dry</span>
                  <span>Well Hydrated</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Oiliness</h3>
                    <p className="text-xs text-gray-500">
                      How oily does your skin feel today?
                    </p>
                  </div>
                  <span className="text-sm font-medium bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                    {currentMetrics.oiliness}%
                  </span>
                </div>
                <Slider
                  value={[currentMetrics.oiliness]}
                  min={0}
                  max={100}
                  step={1}
                  className="py-2"
                  onValueChange={(value) =>
                    setCurrentMetrics({ ...currentMetrics, oiliness: value[0] })
                  }
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Not Oily</span>
                  <span>Very Oily</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Texture</h3>
                    <p className="text-xs text-gray-500">
                      How smooth does your skin feel?
                    </p>
                  </div>
                  <span className="text-sm font-medium bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                    {currentMetrics.texture}%
                  </span>
                </div>
                <Slider
                  value={[currentMetrics.texture]}
                  min={0}
                  max={100}
                  step={1}
                  className="py-2"
                  onValueChange={(value) =>
                    setCurrentMetrics({ ...currentMetrics, texture: value[0] })
                  }
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Rough</span>
                  <span>Smooth</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Overall Skin Health</h3>
                    <p className="text-xs text-gray-500">
                      How would you rate your skin today?
                    </p>
                  </div>
                  <span className="text-sm font-medium bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                    {currentMetrics.overall}%
                  </span>
                </div>
                <Slider
                  value={[currentMetrics.overall]}
                  min={0}
                  max={100}
                  step={1}
                  className="py-2"
                  onValueChange={(value) =>
                    setCurrentMetrics({ ...currentMetrics, overall: value[0] })
                  }
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Needs Improvement</span>
                  <span>Excellent</span>
                </div>
              </div>

              <Button
                className="w-full bg-pink-500 hover:bg-pink-600 mt-4"
                onClick={handleSaveMetrics}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Today's Metrics"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-4">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-medium mb-4">Your Progress Over Time</h3>

              {metrics.length > 0 ? (
                <div className="space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">Hydration</h4>
                        <span className="text-sm text-pink-600 font-medium">
                          +15%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="flex h-full">
                          <div
                            className="bg-gray-300 h-full"
                            style={{ width: "40%" }}
                          ></div>
                          <div
                            className="bg-pink-500 h-full"
                            style={{ width: "25%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Last Month: 40%</span>
                        <span>Current: 65%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">Texture</h4>
                        <span className="text-sm text-pink-600 font-medium">
                          +20%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="flex h-full">
                          <div
                            className="bg-gray-300 h-full"
                            style={{ width: "30%" }}
                          ></div>
                          <div
                            className="bg-pink-500 h-full"
                            style={{ width: "30%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Last Month: 30%</span>
                        <span>Current: 50%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">
                          Overall Skin Health
                        </h4>
                        <span className="text-sm text-pink-600 font-medium">
                          +25%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="flex h-full">
                          <div
                            className="bg-gray-300 h-full"
                            style={{ width: "35%" }}
                          ></div>
                          <div
                            className="bg-pink-500 h-full"
                            style={{ width: "25%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Last Month: 35%</span>
                        <span>Current: 60%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium mb-3">Recent Entries</h4>
                    {metrics.map((metric, index) => (
                      <div
                        key={metric.id}
                        className="border rounded-md p-3 mb-2 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{metric.date}</p>
                          <span className="text-sm bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                            {metric.overall}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <p className="text-gray-500">
                    No metrics recorded yet. Start tracking today!
                  </p>
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    Track Your First Day
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
