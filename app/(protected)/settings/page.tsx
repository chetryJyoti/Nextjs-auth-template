import React from "react";

import { auth, signOut } from "../../../auth";
import { Button } from "../../../components/ui/button";
const page = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-center h-full">
      Settings page is protected <br />
      {JSON.stringify(session)} <br/>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" variant="destructive">
          Sign out
        </Button>
      </form>
    </div>
  );
};

export default page;
