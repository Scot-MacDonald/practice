import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const pathsToRevalidate = ["/media", "/"]; // add any page using media

    pathsToRevalidate.forEach((path) => revalidatePath(path));

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { message: "Revalidation failed", error: err },
      { status: 500 }
    );
  }
}
