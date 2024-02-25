import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      }
      return !!token;
    },
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/panel")) {
        return true;
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: ["/panel/:path*", "/admin/:path*"],
};
