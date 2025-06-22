// src/app/api/climate-reports/route.js
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const reports = await client.db().collection("climateReports").find().toArray();
  return Response.json(reports);
}

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const result = await client.db().collection("climateReports").insertOne(body);

  return Response.json({ message: "Report added", id: result.insertedId });
}

export async function PUT(request) {
  const { id, ...updateData } = await request.json();
  const client = await clientPromise;
  const result = await client
    .db()
    .collection("climateReports")
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  return Response.json({ message: "Report updated", modified: result.modifiedCount });
}

export async function DELETE(request) {
  const { id } = await request.json();
  const client = await clientPromise;
  const result = await client
    .db()
    .collection("climateReports")
    .deleteOne({ _id: new ObjectId(id) });

  return Response.json({ message: "Report deleted", deleted: result.deletedCount });
}
