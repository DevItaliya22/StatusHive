// app/api/ingest-fake-data/route.ts
import { getMonitorAggregates, publishStatusCheck } from "@/tinybird/tinybird";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // await publishStatusCheck({
    //   monitor_id: 1,
    //   status_code: 200,
    //   response_time: 200,
    //   region: 'na-east',
    //   timestamp: Math.floor(Date.now() / 1000),
    // })
    // console.log(data)

    const data = await getMonitorAggregates({
      monitor_id: 1,
      days:10
    })
  return NextResponse.json({data:data});
  } catch (error) {
    console.log(error)
    return NextResponse.json({error:"jebgj"});
  }
}