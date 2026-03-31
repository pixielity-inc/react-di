import { useState, useEffect } from "react";
import { useInject } from "@abdokouta/react-di";
import { Card, Button, Chip, Input, Label } from "@heroui/react";
import { ConfigService } from "@/services/config.service";
import { ApiService } from "@/services/api.service";
import { CacheService } from "@/services/cache.service";
import { TestableService } from "@/services/testable.service";
import { RequestService } from "@/services/request.service";
import { TransientService } from "@/services/transient.service";
import { LifecycleService } from "@/services/lifecycle.service";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

export default function AdvancedPage() {
  const configService = useInject(ConfigService);
  const apiService = useInject(ApiService);
  const cacheService = useInject(CacheService);
  const testableService = useInject(TestableService);
  const lifecycleService = useInject(LifecycleService);
  const requestService1 = useInject(RequestService);
  const requestService2 = useInject(RequestService);
  const transientService1 = useInject(TransientService);
  const transientService2 = useInject(TransientService);

  const [apiStatus, setApiStatus] = useState(false);
  const [cacheKey, setCacheKey] = useState("");
  const [cacheValue, setCacheValue] = useState("");
  const [cachedData, setCachedData] = useState<string | undefined>();
  const [cacheStats, setCacheStats] = useState(cacheService.getStats());
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [lifecycleStatus, setLifecycleStatus] = useState(
    lifecycleService.getStatus(),
  );
  const [lifecycleInitialized, setLifecycleInitialized] = useState(false);

  useEffect(() => {
    setApiStatus(apiService.getConnectionStatus());
  }, [apiService]);

  const config = configService.getAll();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Advanced DI Patterns</span>
        </div>

        <div className="w-full max-w-6xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Dynamic Modules</h2>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">forRoot Pattern</h3>
              <p className="text-default-500 mb-4">
                ConfigModule uses forRoot() to accept runtime configuration
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold w-32">API URL:</span>
                  <Chip variant="soft">
                    <Chip.Label>{config.apiUrl}</Chip.Label>
                  </Chip>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold w-32">Timeout:</span>
                  <Chip variant="soft">
                    <Chip.Label>{config.timeout}ms</Chip.Label>
                  </Chip>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Async Factory</h3>
              <p className="text-default-500 mb-4">
                ApiModule uses useAsyncFactory for async initialization
              </p>
              <div className="space-y-4">
                <Chip color={apiStatus ? "success" : "danger"} variant="soft">
                  <Chip.Label>
                    {apiStatus ? "Connected" : "Disconnected"}
                  </Chip.Label>
                </Chip>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Service Scopes</h2>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Transient Scope</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Instance 1:</span>
                  <Chip variant="soft">
                    <Chip.Label>{transientService1.getInstanceId()}</Chip.Label>
                  </Chip>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Instance 2:</span>
                  <Chip variant="soft">
                    <Chip.Label>{transientService2.getInstanceId()}</Chip.Label>
                  </Chip>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
