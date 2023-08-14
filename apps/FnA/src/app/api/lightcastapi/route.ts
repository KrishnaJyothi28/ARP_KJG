import { NextRequest, NextResponse } from 'next/server'
import { lightcastAPI } from 'src/services/lightcastAPI'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { endpoint, jsonData, scope } = await req.json()

  const apiData = await lightcastAPI.postLightcastAPI(endpoint, jsonData, scope)
  return NextResponse.json(apiData)
}

export async function GET(req: NextRequest) {
  const { endpoint, scope } = await req.json()

  const apiData = await lightcastAPI.getLightcastAPI(endpoint as string, scope as string)
  return NextResponse.json(apiData)
}
