import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("[API Route] Revalidating posts list cache");
    revalidateTag("posts");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
