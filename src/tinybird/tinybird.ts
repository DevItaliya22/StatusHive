import { env } from "../lib/env";
import { Tinybird } from "@chronark/zod-bird";
import { z } from "zod";

console.log(env.TINYBIRD_TOKEN);
const tb = new Tinybird({ token: env.TINYBIRD_TOKEN});

// Data Ingestion
export const publishStatusCheck = tb.buildIngestEndpoint({
  datasource: "status_checks",
  event: z.object({
    monitor_id: z.number().int(),
    status_code: z.number().int(),
    response_time: z.number().int(),
    region: z.string(),
    timestamp: z.any(),
  }),
});

// Pipe Clients
export const getMonitorAggregates = tb.buildPipe({
  pipe: "monitor_aggregates__v1",
  parameters: z.object({
    monitor_id: z.number().int(),
    days: z.number().int().default(7),
  }),
  data: z.array(
    z.object({
      status_code: z.number(),
      total_requests: z.number(),
      avg_latency: z.number(),
      min_latency: z.number(),
      max_latency: z.number(),
      success_count: z.number(),
      error_count: z.number(),
    })
  ),
});

export const getRegionalLatency = tb.buildPipe({
  pipe: "regional_latency__v1",
  parameters: z.object({
    monitor_id: z.number().int(),
    region: z.string(),
    days: z.number().int().default(7),
  }),
  data: z.array(
    z.object({
      time_bucket: z.string(),
      region: z.string(),
      avg_latency: z.number(),
      p95_latency: z.number(),
      success_count: z.number(),
      error_count: z.number(),
    })
  ),
});

export const getRegionalPerformance = tb.buildPipe({
  pipe: "regional_performance__v1",
  parameters: z.object({
    monitor_id: z.number().int(),
    days: z.number().int().default(7),
  }),
  data: z.array(
    z.object({
      region: z.string(),
      max_latency: z.number(),
      min_latency: z.number(),
      avg_latency: z.number(),
      total_checks: z.number(),
      success_rate: z.number(),
      last_check: z.number(),
    })
  ),
});