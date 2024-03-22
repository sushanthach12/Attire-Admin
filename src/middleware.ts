import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/api/:path*'], // for making the api GET req public...(for this project)
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};