"use client";

import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import Loader from "./components/Loader";
import { getClerkUsers, getDocumentUsers } from "./lib/actions/user.action";
import { useUser } from "@clerk/nextjs";

const provider = ({ children }: { children: ReactNode }) => {
  const {user:clerkUser} = useUser()
  return (
    <LiveblocksProvider
     authEndpoint={"/api/liveblocks-auth"}
     resolveUsers={async({userIds})=>{
      const users= await getClerkUsers({userIds});
    
      return users
    }}
    resolveMentionSuggestions={async({text,roomId})=>{
      const roomUsers = await getDocumentUsers({
        roomId,
        currentUser : clerkUser?.emailAddresses[0].emailAddress!,
        text,
      })

      return roomUsers
    }}
    >
      <ClientSideSuspense fallback={<Loader/>}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};
export default provider;
