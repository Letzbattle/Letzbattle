import NextAuth from 'next-auth';
import authConfig from './auth.config';
import {DEFAULT_LOGIN_REDIRECT,apiAuthPrefix,authRoutes,publicRoutes} from './routes'
const {auth}=NextAuth(authConfig)
export default auth((req)=>{
    const {nextUrl}=req;
    const isLoggedIn=!!req.auth;
    const isAPiAuthRoute=nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute=publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute=authRoutes.includes(nextUrl.pathname)
console.log('middleware')
    if(isAPiAuthRoute){
        return 
    }
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }

        return 
    }
    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login",nextUrl))
    }
    return 

})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
   };