import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import LeaderSentReq from "@/components/LeaderSentReq";

async function leaderSentInvites(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/innoventure/addMember`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function LeaderSent() {
  const eventName = "innoventure";
  const session = await getServerSession(authOptions);
  const data = await leaderSentInvites(session);
  const requests = data.requests;
  return (
    <LeaderSentReq
      eventName={eventName}
      requests={requests}
      session={session}
    />
  );
}
