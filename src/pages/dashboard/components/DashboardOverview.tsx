import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Today's Progress Card */}
      <Card className="p-4">
        <h3 className="font-medium text-lg">Today's Progress</h3>
        <div className="mt-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm">Overall</span>
            <span className="text-sm font-medium">90%</span>
          </div>
          <Progress value={90} className="h-2" />
        </div>
      </Card>

      {/* Streak Card */}
      <Card className="p-4">
        <h3 className="font-medium text-lg">Streak</h3>
        <div className="mt-2">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">7</span>
            <span className="text-sm ml-1">days</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Keep it up! You're building healthy habits.
          </p>
        </div>
      </Card>

      {/* Skin Goals Card */}
      <Card className="p-4">
        <h3 className="font-medium text-lg">Skin Goals</h3>
        <div className="mt-2 space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Hydration</span>
              <span className="text-sm font-medium">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Texture</span>
              <span className="text-sm font-medium">40%</span>
            </div>
            <Progress value={40} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
}
