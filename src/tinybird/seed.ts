
import { subDays, subMinutes } from "date-fns";
import { publishStatusCheck } from "./tinybird";

const REGIONS = ['na-east', 'eu-west', 'ap-south'];
const MONITOR_ID = 1;

// Statistics tracking interface
interface RegionStats {
  totalRequests: number;
  status200: number;
  status404: number;
  latencySum: number;
  minLatency: number;
  maxLatency: number;
}

export async function generateAndIngestFakeData() {

  const data = await publishStatusCheck({
    monitor_id: 1,
    status_code: 200,
    response_time: 200,
    region: 'na-east',
    timestamp: Math.floor(Date.now() / 1000),
  })
  // const now = new Date();
  // const thirtyDaysAgo = subDays(now, 30);
  // const dataPoints = [];
  
  // // Initialize statistics tracker
  // const stats: Record<string, RegionStats> = {};
  // REGIONS.forEach(region => {
  //   stats[region] = {
  //     totalRequests: 0,
  //     status200: 0,
  //     status404: 0,
  //     latencySum: 0,
  //     minLatency: Infinity,
  //     maxLatency: -Infinity
  //   };
  // });

  // let currentDate = thirtyDaysAgo;
  
  // while (currentDate < now) {
  //   const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
  //   const isError = Math.random() < 0.15;
  //   const statusCode = isError ? 404 : 200;
  //   const baseLatency = statusCode === 200 ? 200 : 500;
  //   const latency = baseLatency + Math.random() * 300;
    
  //   // Update statistics
  //   const regionStats = stats[region];
  //   regionStats.totalRequests++;
  //   regionStats.latencySum += latency;
    
  //   if (statusCode === 200) {
  //     regionStats.status200++;
  //   } else {
  //     regionStats.status404++;
  //   }
    
  //   if (latency < regionStats.minLatency) {
  //     regionStats.minLatency = latency;
  //   }
    
  //   if (latency > regionStats.maxLatency) {
  //     regionStats.maxLatency = latency;
  //   }

  //   dataPoints.push({
  //     monitor_id: MONITOR_ID,
  //     status_code: statusCode,
  //     response_time: Math.floor(latency),
  //     region: region,
  //     timestamp: Math.floor(currentDate.getTime() / 1000),
  //   });

  //   currentDate = subMinutes(currentDate, -30);
  // }

  // // Print statistics before ingestion
  // console.log("Generated Data Statistics:");
  // console.log("==========================");
  // Object.entries(stats).forEach(([region, data]) => {
  //   console.log(`Region: ${region}`);
  //   console.log(`- Total Requests: ${data.totalRequests}`);
  //   console.log(`- Success (200): ${data.status200} (${((data.status200 / data.totalRequests) * 100).toFixed(1)}%)`);
  //   console.log(`- Errors (404): ${data.status404} (${((data.status404 / data.totalRequests) * 100).toFixed(1)}%)`);
  //   console.log(`- Avg Latency: ${(data.latencySum / data.totalRequests).toFixed(2)}ms`);
  //   console.log(`- Min Latency: ${data.minLatency.toFixed(2)}ms`);
  //   console.log(`- Max Latency: ${data.maxLatency.toFixed(2)}ms`);
  //   console.log("--------------------------");
  // });

  // // Ingestion code remains the same
  // const batchSize = 100;
  // for (let i = 0; i < dataPoints.length; i += batchSize) {
  //   const batch = dataPoints.slice(i, i + batchSize);
  //   try {
  //     await publishStatusCheck(batch);
  //     console.log(`Ingested batch ${i / batchSize + 1} of ${Math.ceil(dataPoints.length / batchSize)}`);
  //   } catch (error) {
  //     console.error(`Failed batch ${i / batchSize + 1}:`, error);
  //     // Add retry logic if needed
  //   }
  //   await new Promise(resolve => setTimeout(resolve, 500)); // Increase delay
  // }
  // console.log('Finished ingesting fake data!');
}
