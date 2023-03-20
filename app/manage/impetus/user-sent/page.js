import { authOptions } from "@/pages/api/auth/[...nextauth]";
import NotyNav from "@/components/notyNav";
import { getServerSession } from "next-auth";
import UserSentComponent from "@/components/UserSentComponent";

async function requestSentData(session) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/user/impetus/requests`,
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

export default async function UserSent() {
  const eventName = "impetus";
  const session = await getServerSession(authOptions);
  const data = await requestSentData(session);
  const requests = data.requests;
  return (
    <>
      <NotyNav eventName={eventName} />

      <UserSentComponent
        eventName={eventName}
        requests={requests}
        session={session}
      />
    </>
  );
}
