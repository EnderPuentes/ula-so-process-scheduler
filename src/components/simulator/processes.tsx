import { Process, ProcessState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type ProcessControlProps = {
  title: string;
  processes: Process[];
};

export function SimulatorProcesses({ title, processes }: ProcessControlProps) {
  const getStateStyles = (state: ProcessState) => {
    switch (state) {
      case ProcessState.RUNNING:
        return "bg-emerald-600 text-white";
      case ProcessState.READY:
        return "bg-sky-600 text-white";
      case ProcessState.BLOCKED:
        return "bg-rose-600 text-white";
      case ProcessState.COMPLETED:
        return "bg-indigo-600 text-white";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto w-full">
        <div className="overflow-auto h-[calc(100vh)] max-w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Process</TableHead>
                <TableHead className="text-center">Priority</TableHead>
                <TableHead className="text-center">State</TableHead>
                <TableHead className="text-center">Arrival</TableHead>
                <TableHead className="text-center">Burst</TableHead>
                <TableHead className="text-center">Remaining</TableHead>
                <TableHead className="text-center">Burst Io</TableHead>
                <TableHead className="text-center">Remaining Io</TableHead>
                <TableHead className="text-center">Waiting</TableHead>
                <TableHead className="text-center">Turnaround</TableHead>
                <TableHead className="text-center">Response</TableHead>
                <TableHead className="text-center">Blocking</TableHead>
                <TableHead className="text-center">Completion</TableHead>
                <TableHead className="text-center">Exec CPU</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.length > 0 ? (
                processes.map((process: Process) => (
                  <TableRow key={process.id}>
                    <TableCell className="text-center">{process.id}</TableCell>
                    <TableCell className="text-center">
                      {process.priority}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={cn(getStateStyles(process.state), "text-xs")}
                      >
                        {process.state}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {process.arrivalTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.burstTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.remainingTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.burstIoTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.remainingIoTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.waitingTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.turnaroundTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.responseTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.blockingTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.completionTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.executionCount}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="text-center">
                  <TableCell colSpan={14}>
                    <span className="text-sm font-semibold block py-4">
                      No processes
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
