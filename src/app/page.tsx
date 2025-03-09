"use client";

import { SimulatorConfiguration } from "@/components/simulator/configuration";
import { SimulatorProcessControl } from "@/components/simulator/process-control";
import { SimulatorProcessor } from "@/components/simulator/processor";
import { ProcessSchedulerSimulator } from "@/lib/simulator";
import { Process, SimulatorConfig, SimulatorState } from "@/lib/types";
import { useEffect, useState } from "react";

export default function SimulatorHome() {
  const [simulator, setSimulator] = useState<ProcessSchedulerSimulator | null>(
    null
  );
  const [tick, setTick] = useState(0);
  const [state, setState] = useState<SimulatorState>(SimulatorState.STOPPED);

  const [currentProcess, setCurrentProcess] = useState<Process | null>(null);
  const [processes, setProcesses] = useState<Process[]>([]);

  const [queueReadyProcesses, setQueueReadyProcesses] = useState<Process[]>([]);
  const [queueBlockedProcesses, setQueueBlockedProcesses] = useState<Process[]>(
    []
  );
  const [listCompletedProcesses, setListCompletedProcesses] = useState<
    Process[]
  >([]);

  const [config, setConfig] = useState<SimulatorConfig | null>(null);

  useEffect(() => {
    const simulatorInstance = new ProcessSchedulerSimulator();
    setSimulator(simulatorInstance);
    setConfig(simulatorInstance.getConfig());

    simulatorInstance.subscribe(() => {
      setState(simulatorInstance.getCurrentState());
      setTick(simulatorInstance.getCurrentTick());
      setCurrentProcess(simulatorInstance.getCurrentProcess());
      setProcesses(simulatorInstance.getProcesses());
      setQueueReadyProcesses(simulatorInstance.getQueueReadyProcesses());
      setQueueBlockedProcesses(simulatorInstance.getQueueBlockedProcesses());
      setListCompletedProcesses(simulatorInstance.getListCompletedProcesses());
      setConfig(simulatorInstance.getConfig());
    });
  }, []);

  return (
    <section className="flex flex-col gap-4 w-full min-h-screen py-10">
      <div className="container">
        <div className="grid grid-cols-[280px_1fr] gap-4">
          <div className="flex flex-col gap-4">
            <SimulatorProcessor
              state={state}
              tick={tick}
              tickSpeed={config?.processor.tickSpeed ?? 0}
              start={() => simulator?.start()}
              pause={() => simulator?.pause()}
              reset={() => simulator?.reset()}
              restart={() => simulator?.restart()}
              currentProcess={currentProcess}
            />
            {config && (
              <SimulatorConfiguration
                simulatorState={state}
                config={config}
                updateConfig={(newConfig: SimulatorConfig) =>
                  simulator?.updateConfig(newConfig)
                }
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className=" p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">Ready Queue</h2>
                <p>Total: {queueReadyProcesses.length}</p>
                {/* <ul>
                  {queueReadyProcesses.map((process) => (
                    <li key={process.id}>
                      ID: {process.id}, State: {process.state}
                    </li>
                  ))}
                </ul> */}
              </div>
              <div className=" p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">Blocked Queue</h2>
                <p>Total: {queueBlockedProcesses.length}</p>
                {/* <ul>
                  {queueBlockedProcesses.map((process) => (
                    <li key={process.id}>
                      ID: {process.id}, State: {process.state}
                    </li>
                  ))}
                </ul> */}
              </div>
              <div className=" p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">Completed Processes</h2>
                <p>Total: {listCompletedProcesses.length}</p>
                {/* <ul>
                  {listCompletedProcesses.map((process) => (
                    <li key={process.id}>
                      ID: {process.id}, State: {process.state}
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
            <SimulatorProcessControl processes={processes} />
          </div>
        </div>
      </div>
    </section>
  );
}
